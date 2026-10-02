<?php
/**
 * Kontaktformular – Versand per E-Mail an die Praxis.
 * Es wird nichts gespeichert. Voraussetzung: Hosting mit PHP und funktionierendem mail().
 * Empfehlung für den Livebetrieb: Versand über SMTP des Mail-Providers (z. B. PHPMailer).
 */
declare(strict_types=1);

const EMPFAENGER = 'physio-omert@t-online.de';
const ABSENDER   = 'noreply@physio-omert.de';   // Muss zur Domain des Hostings passen

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function antwort(bool $ok, int $code = 200, string $error = ''): void {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    antwort(false, 405, 'method');
}

// Spam-Schutz: Honeypot-Feld muss leer sein, Formular nicht schneller als 3 Sekunden ausgefüllt
if (!empty($_POST['website'])) {
    antwort(true); // Bots erhalten eine scheinbare Erfolgsmeldung
}
$ts = (int)($_POST['ts'] ?? 0);
if ($ts > 0 && (time() * 1000 - $ts) < 3000) {
    antwort(false, 400, 'too_fast');
}

// Eingaben bereinigen (Zeilenumbrüche aus Kopfzeilenfeldern entfernen → kein Header-Injection)
$einzeilig = fn(string $k, int $max) => mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', (string)($_POST[$k] ?? ''))), 0, $max);
$name      = $einzeilig('name', 100);
$email     = $einzeilig('email', 150);
$telefon   = $einzeilig('telefon', 40);
$betreff   = $einzeilig('betreff', 80);
$nachricht = mb_substr(trim((string)($_POST['nachricht'] ?? '')), 0, 3000);
$dsgvo     = ($_POST['datenschutz'] ?? '') === 'ja';

if ($name === '' || $betreff === '' || $nachricht === '' || !$dsgvo || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwort(false, 422, 'validation');
}

$text = "Neue Anfrage über das Kontaktformular der Website\n"
      . "-----------------------------------------------\n"
      . "Name:     $name\n"
      . "E-Mail:   $email\n"
      . "Telefon:  " . ($telefon !== '' ? $telefon : '–') . "\n"
      . "Anliegen: $betreff\n\n"
      . "Nachricht:\n$nachricht\n\n"
      . "Datenschutzerklärung bestätigt: ja\n";

$headers = [
    'From: Website Praxis Omert <' . ABSENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
$subject = '=?UTF-8?B?' . base64_encode('Website-Anfrage: ' . $betreff) . '?=';

if (!mail(EMPFAENGER, $subject, $text, implode("\r\n", $headers))) {
    antwort(false, 500, 'mail');
}
antwort(true);
