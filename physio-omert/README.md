# Praxis Thomas Omert – Website-Entwurf

Mehrseitige, statische Website (HTML/CSS/JS). Kein CMS, keine Datenbank, schnell und günstig zu hosten.

| Seite | Datei |
|---|---|
| Startseite (inkl. „Unsere Praxis“) | `index.html` |
| Physiotherapie | `physiotherapie.html` |
| Osteopathie | `osteopathie.html` |
| Karriere | `karriere.html` |
| Kontakt & Anfahrt | `kontakt.html` |

**Ansehen:** `index.html` doppelklicken. Für die Präsentation ohne gelbe Platzhalter-Markierungen: `index.html?clean`.
Screenshots liegen in `screenshots/`.

---

## Pflege

### Stellenanzeigen → `js/jobs.js`
Eine Datei, ein Block pro Stelle. Kopieren = neue Stelle, löschen oder `aktiv: false` = entfernen.
Wenn keine Stelle aktiv ist, erscheint automatisch der Hinweis auf die Initiativbewerbung.
Die beiden enthaltenen Anzeigen sind **Beispiele** (`beispiel: true`) – vor dem Livegang anpassen.

### Header, Kontaktbereich, Footer, Seiteninhalte → `_src/`
Header, Footer und Kontaktbereich existieren nur einmal in `_src/partials/`. Danach `python build.py` ausführen –
die fertigen Seiten im Hauptordner werden neu erzeugt. Fertige `.html` im Hauptordner nicht direkt bearbeiten.

### Bilder
Jedes Stockbild hat `data-replace="Motiv"`. Foto in `img/` legen und `src` ändern (z. B. `src="img/hero.jpg"`).
Lädt ein Bild nicht, erscheint automatisch ein beschrifteter Platzhalter.

| Stelle | Motiv | Format |
|---|---|---|
| Start – Hero | Thomas bei der Behandlung, ruhiges Licht | Querformat, breit |
| Start – Teaser Physio | Aktive Übung mit Anleitung | 16:10 |
| Start – Teaser Osteo | Hände an Kopf/Nacken | 16:10 |
| Start – Unsere Praxis | Portrait Thomas | 4:5 hoch |
| Start – Galerie | Behandlungsraum · Empfang · Detail Hände | quer |
| Physiotherapie – Hero | Behandlung auf der Liege | 4:3 |
| Osteopathie – Hero | Hände am Kopf/Nacken | 4:3 |
| Karriere – Hero | Thomas mit Mitarbeiter/in im Gespräch | 4:3 |

Export: max. 2000 px Breite, WebP oder JPG ~80 %.

### Logo & Unterschrift
- Logo: als `img/logo.svg` ablegen → ersetzt automatisch die Textmarke im Header.
- Unterschrift: `img/unterschrift.svg` ist ein **Platzhalter**. Echte Unterschrift auf weißem Papier mit schwarzem Stift,
  scannen/abfotografieren, freistellen, als SVG oder PNG mit transparentem Hintergrund unter gleichem Namen speichern.

### Farben
`css/style.css` → `:root` (`--black`, `--red`, `--white`).

---

## Technik & Datenschutz

- **Kontaktformular:** sendet an `kontakt.php` (PHP `mail()`), speichert nichts. Spam-Schutz per Honeypot + Zeitsperre.
  Hinweis gegen Gesundheitsdaten ist im Formular integriert. Für den Livebetrieb Versand per SMTP empfohlen.
  Ohne PHP-Server (z. B. lokal per Doppelklick) erscheint die Fehlermeldung – das ist korrekt so.
- **Karte:** Google Maps lädt erst nach Klick (2-Klick-Lösung). Vorher werden keine Daten an Google übertragen.
- **Schriften:** Systemschriften, keine Google Fonts → schnell und ohne DSGVO-Problem.
- **Stockbilder:** werden aktuell von Unsplash geladen. Vor dem Livegang lokal in `img/` ablegen (DSGVO, Ladezeit).
- **SEO:** eigene Titel/Beschreibungen je Seite, strukturierte Daten (LocalBusiness), `sitemap.xml`, `robots.txt`.
- **Barrierefreiheit:** Skip-Link, Tastaturbedienung, sichtbarer Fokus, Kontraste ≥ 4,5:1, beschriftete Formularfelder.

## Offen / mit Praxis klären
- [ ] E-Mail: Website nennt `physio-omert@t-online.de`, Verzeichnisse teils `Thomas.omert@gmx.de`
- [ ] Öffnungszeiten (aus Branchenverzeichnis: Mo–Do 8–20, Fr 8–14) bestätigen
- [ ] Texte von der bestehenden Seite „Unsere Praxis“ übernehmen bzw. abgleichen
- [ ] Gelb markierte Platzhalter: Berufsjahre, Kassen/Preise, Behandlungsdauer Osteopathie, Teamgröße
- [ ] Vorteile auf der Karriereseite nur zutreffende stehen lassen
- [ ] Datenschutzerklärung um Kontaktformular, Google-Maps-Einbindung und Bewerbungen ergänzen
- [ ] Impressum/Datenschutz verlinken aktuell auf die bestehende Website
