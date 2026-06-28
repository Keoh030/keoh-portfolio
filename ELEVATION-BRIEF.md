# Elevation-Brief · Shared Design Source für alle Agenten

Zweck: Die drei Deliverables (Website, Deck, One-Pager) auf Top-Design-Niveau heben. Marke bleibt gelockt, kreative Namen anwenden, KEINE erfundenen Daten. Jeder Agent liest DIESEN Brief plus seine Zieldatei und hebt sie, ohne sie komplett umzubauen.

## HARTE REGELN (nicht verhandelbar)
- KEINE erfundenen Zahlen. KEINE Fake-Testimonials. KEINE Nutzer-/Traffic-/Kundenzahlen erfinden.
- Diese realen Fakten DÜRFEN bleiben (sind belegbar, keine Traffic-Zahlen): myjobscan 45→4 Min · DSGVO-Radar 9+6 Checks · Case-Score 2→8,5 in 4 Wochen · Franklin 87/100 · 18 Jahre Service · 15 Zertifikate · 2 Tools live.
- Kein "Senior-Engineer", kein "Senior-PM". Solo-Builder-Niveau ehrlich.
- Keine Kundennamen. Case bleibt "DACH-KMU".
- Keine Em-Bindestriche (— verboten), Mittelpunkt · als Trenner.
- Berlin (nicht Brandenburg). Kein Thailand im First-Touch. Keine Küchen-/Koch-Metaphern.
- Keine Emojis als Icons. Inline-SVG wenn Icon nötig.

## KREATIVE NAMEN (anwenden)
- Die Arbeit/Proof-Sektion heißt jetzt **Werkstücke** (Eyebrow/Untertitel: "aus der Werkstatt").
- Der Scanner heißt im Display **DSGVO-Radar**, mit kleinem Untertitel "KEOH Security-Scanner".
- **myjobscan** bleibt unverändert (echte Domain myjobscan.com).
- Praxis-Rahmen wo passend: **KEOH Lab · die Werkstatt**.

## MARKEN-TOKENS (gelockt, nicht ändern)
```
--bg:#F5F1EA  --bg2/-deep:#EDE7DC  --ink:#1C1A17
--ink-soft:rgba(28,26,23,.78)  --ink-mute:rgba(28,26,23,.52)  --ink-faint:rgba(28,26,23,.12)
--rust:#A82D14 (Akzent, SPARSAM)  --gold:#7A6A4F (Sekundär)  --card:#EBE5DA  --card-deep:#E0D9CB
```
Fonts: Bebas Neue (Display) · DM Serif Display (Serif/Italic) · DM Sans (Body) · JetBrains Mono (Labels) · Mr Dafoe (Signatur, sparsam).

## DESIGN-PRINZIPIEN (aus ui-ux-pro-max validiert)
- Portfolio-Pattern: neutraler Grund, Arbeit im Fokus, Akzent minimal und tragend.
- Motion-Driven aber diszipliniert: nur transform/opacity, 150–300ms, prefers-reduced-motion-Gate auf JEDER Animation, maximal 1 gepinnter Abschnitt.
- Hierarchie über Typografie und Weißraum, nicht über Farbe.

## UX-CHECKLISTE (Pflicht beim Heben)
- [ ] Sichtbare :focus-visible-States auf allen Links/Buttons (NEU, war eine Lücke) · 2–3px Rust-Outline mit Offset.
- [ ] cursor:pointer auf allen Klick-Elementen.
- [ ] Hover-Transitions 150–300ms, weiches Easing.
- [ ] Kontrast Text/Grund mindestens 4.5:1 (Gold auf Cream prüfen, ggf. abdunkeln für Fließtext).
- [ ] prefers-reduced-motion respektiert (vorhanden, beibehalten).
- [ ] Responsive sauber bei 375 / 768 / 1024 / 1440.
- [ ] Keine Layout-Shifts (Bild width/height, reservierter Platz).

## WAS "HEBEN" HEISST (und was NICHT)
Heben = mehr Politur, Tiefe, Konsistenz, A11y, die kreativen Namen, ein klarer Signature-Moment. Heben heißt NICHT: neue Sektionen erfinden, Inhalte aufblähen, Marke umfärben, oder Fakten dazudichten. Im Zweifel: weniger, aber präziser.
