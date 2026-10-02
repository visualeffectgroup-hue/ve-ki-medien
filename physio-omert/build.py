#!/usr/bin/env python3
"""
Baut die fertigen HTML-Seiten aus _src/ zusammen.

  python build.py

- _src/partials/  Kopf, Header, Kontaktbereich, Footer (einmal pflegen, gilt für alle Seiten)
- _src/pages/     Inhalt der einzelnen Seiten. Oben stehen Meta-Angaben, dann "---", dann HTML.

Die erzeugten Dateien (index.html, physiotherapie.html, ...) liegen im Hauptordner
und können direkt hochgeladen werden. Nur die Dateien in _src/ bearbeiten.
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "_src"
BASE_URL = "https://physio-omert.de/"


def partial(name: str) -> str:
    return (SRC / "partials" / f"{name}.html").read_text(encoding="utf-8")


def parse(page: Path):
    raw = page.read_text(encoding="utf-8")
    head, body = raw.split("\n---\n", 1)
    meta = {}
    for line in head.strip().splitlines():
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()
    return meta, body


def build():
    for page in sorted((SRC / "pages").glob("*.html")):
        meta, body = parse(page)
        filename = page.name
        url = BASE_URL if filename == "index.html" else BASE_URL + filename

        head = partial("head")
        head = head.replace("{{title}}", meta["title"])
        head = head.replace("{{description}}", meta["description"])
        head = head.replace("{{url}}", url)
        head = head.replace("{{extra_head}}", partial("schema") if meta.get("schema") == "yes" else "")

        header = partial("header")
        # Aktiven Menüpunkt markieren
        nav_key = meta.get("nav", filename)
        header = header.replace(f'href="{nav_key}"', f'href="{nav_key}" aria-current="page"', 1)

        contact = partial("contact") if meta.get("contact", "yes") == "yes" else ""
        scripts = "".join(
            f'<script src="{src.strip()}" defer></script>\n'
            for src in meta.get("scripts", "").split(",") if src.strip()
        )

        html = (
            head
            + f'<body class="page-{page.stem}">\n'
            + header
            + body
            + contact
            + partial("footer")
            + scripts
            + '<script src="js/main.js" defer></script>\n</body>\n</html>\n'
        )
        (ROOT / filename).write_text(html, encoding="utf-8")
        print("gebaut:", filename)


if __name__ == "__main__":
    build()
