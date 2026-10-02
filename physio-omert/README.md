# Physiotherapie Thomas Omert – Redesign-Entwurf

Statischer One-Pager (HTML/CSS/JS, kein Build nötig). `index.html` im Browser öffnen.

## Logo einsetzen
Logo als `img/logo.svg` ablegen (PNG geht auch → in `index.html` 2× `img/logo.svg` auf `.png` ändern).
Ohne Logo wird automatisch die Textmarke „Thomas Omert“ angezeigt.

## Markenfarben anpassen
`css/style.css` → ganz oben `:root`. Meist reicht `--c-primary` (Hauptfarbe aus dem Logo) und `--c-accent`.

## Stockbilder durch eigene Fotos ersetzen
Jedes Bild hat `data-replace="..."` mit der Beschreibung des gewünschten Motivs.
Foto in `img/` legen und `src` ändern, z. B. `src="img/hero.jpg"`.

| Stelle | Motiv | Format |
|---|---|---|
| Hero | Behandlungsszene, Thomas am Patienten | 4:5 hochkant |
| Leistung Physiotherapie | Aktive Übung / Krankengymnastik | 4:3 |
| Leistung Osteopathie | Ruhige Hände an Nacken/Kopf | 4:3 |
| Leistung Naturheilkunde | Detail: Tape, Wärme, Hände | 4:3 |
| Über mich | Portrait Thomas, natürliches Licht | 4:5 hochkant |
| Galerie groß | Behandlungsraum, Weitwinkel | 4:3 / quer |
| Galerie klein 1 | Empfang / Eingang | quer |
| Galerie klein 2 | Detail Hände bei Behandlung | quer |

Bilder vor dem Einbau auf max. ~2000 px Breite exportieren (WebP/JPG, ~80 % Qualität).

## Offen / prüfen
- E-Mail: Website nennt `physio-omert@t-online.de`, Verzeichnisse teils `Thomas.omert@gmx.de` → mit Kunde klären.
- Impressum/Datenschutz verlinken aktuell auf die bestehende Seite.
- Texte (Zitat, „Langjährige Erfahrung“, Ablauf) sind Entwurf → mit Kunde abstimmen.
- Kassen-/Rezeptinfos und ggf. Team ergänzen.
