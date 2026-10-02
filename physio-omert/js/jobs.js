/* =========================================================
   STELLENANZEIGEN – hier pflegen
   ---------------------------------------------------------
   - Neue Stelle: einen Block { ... } kopieren und anpassen.
   - Stelle entfernen: Block löschen (oder aktiv: false setzen).
   - Keine Stellen aktiv? Dann erscheint automatisch der Hinweis
     auf die Initiativbewerbung.
   - beispiel: true zeigt den Hinweis "Beispielanzeige" an.
     Vor dem Livegang entfernen bzw. auf false setzen.
   ========================================================= */
window.JOBS = [
  {
    aktiv: true,
    beispiel: true,
    titel: "Physiotherapeut (m/w/d)",
    arbeitszeit: "Vollzeit oder Teilzeit",
    start: "ab sofort",
    intro: "Zur Verstärkung unseres Teams suchen wir eine/n Physiotherapeut/in, der/die Freude an ganzheitlicher Behandlung hat.",
    aufgaben: [
      "Eigenständige Befundung und Behandlung unserer Patientinnen und Patienten",
      "Krankengymnastik, Manuelle Therapie und weitere physiotherapeutische Verfahren",
      "Hausbesuche nach Absprache",
      "Dokumentation und fachlicher Austausch im Team"
    ],
    anforderungen: [
      "Abgeschlossene Ausbildung als Physiotherapeut/in",
      "Wünschenswert: Zertifikat Manuelle Therapie oder Lymphdrainage",
      "Freundliches Auftreten und Freude am Umgang mit Menschen",
      "Berufseinsteiger/innen sind herzlich willkommen"
    ],
    angebot: [
      "Ausreichend Zeit pro Behandlung",
      "Unterstützung bei Fortbildungen",
      "Flexible Arbeitszeiten",
      "Familiäres Team"
    ]
  },
  {
    aktiv: true,
    beispiel: true,
    titel: "Mitarbeiter Empfang / Praxisorganisation (m/w/d)",
    arbeitszeit: "Teilzeit oder Minijob",
    start: "nach Vereinbarung",
    intro: "Sie sind das freundliche Gesicht der Praxis und sorgen dafür, dass im Hintergrund alles rund läuft.",
    aufgaben: [
      "Terminvergabe und Patientenempfang",
      "Telefon- und E-Mail-Kommunikation",
      "Abrechnungsvorbereitung und allgemeine Verwaltung"
    ],
    anforderungen: [
      "Kaufmännische oder medizinische Ausbildung von Vorteil",
      "Sicherer Umgang mit PC und gängiger Software",
      "Organisationstalent und Freundlichkeit"
    ],
    angebot: [
      "Abwechslungsreiche Tätigkeit",
      "Feste, planbare Arbeitszeiten",
      "Kurze Wege und angenehmes Arbeitsklima"
    ]
  }
];

/* Kontakt für Bewerbungen */
window.JOBS_KONTAKT = {
  email: "physio-omert@t-online.de",
  telefon: "09773 89 83 89",
  ansprechpartner: "Thomas Omert"
};
