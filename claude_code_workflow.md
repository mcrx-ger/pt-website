# Claude Code Workflow — PT-Prototyp aufwerten

**Ziel:** Den bestehenden, voll funktionsfähigen PT-Prototyp mit Claude Code in mehreren Schichten zu einem präsentationsreifen, DSGVO-konformen, SEO- und AEO-optimierten Demo-Objekt aufwerten.

**Ausgangslage:** Die Seite ist funktional komplett — Chatbot antwortet über die Netlify Function, Cal.com-Buttons öffnen die Buchung, Formspree verschickt Kontakt-E-Mails. Was fehlt: professionelle Anmutung, sauberer Content, echte Bilder, SEO/AEO-Optimierung, DSGVO-Konformität. **Die Funktionalität bleibt in allen Schichten unangetastet** — angepasst werden nur Design, Struktur, Content und die datenschutzrelevanten Aspekte.

**Prinzip:** Ein Prompt = eine Schicht = ein klares Ziel. Zwischen den Schichten reviewst du, testest kurz und committest.

**Endzustand nach dem Refactor:** Der Prototyp dient als Vorzeigeobjekt für Akquise-DMs *und* als Code-Basis-Template für alle Kundenprojekte. Bilder und Texte werden pro Kunde ausgetauscht — Struktur, Design-System und die DSGVO-Bausteine bleiben identisch.

---

## Setup vor dem ersten Prompt

### Vorbereitungen (~30 Min.)

1. **Backup:** 
2. **Claude Code installieren** 
3. **Ins Projekt navigieren:** 
4. **Skill installieren** (Taste Skill von Leonxlnx):
   ```
   npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
   ```
5. **Playwright MCP für Screenshots und Lighthouse-Checks:**
   ```
   claude mcp add playwright npx @playwright/mcp
   ```
   Damit kann Claude Code die Seite selbst rendern, prüfen und benoten.
6. **Ein CLAUDE.md-File anlegen** 
---

## Zielbild der Landingpage (referenziert in Schicht 1 und 2)

- **Hero-Section:** kurzer, klarer Claim (max. 10 Worte). Zwei prominente CTA-Buttons nebeneinander:
  - **Primär:** *Termin buchen* — Smooth-Scroll zur `#buchung`-Sektion
  - **Sekundär:** *Chat starten* — öffnet das Chatbot-Widget
- Darunter: Über-mich, Angebote (die Cal.com-Buttons pro Termintyp), Buchungssektion mit Cal.com-Kalender, FAQ, Kontaktformular, Footer.
- **Anmutung:** professionell, modern, seriös. Nicht "Fitness-Boutique", nicht "Startup-Landing", nicht "aggressiver PT". Näher an **linear.app**, **notion.so**, **apple.com** als an **gymshark.com**.

---

## Der Workflow — Schicht für Schicht

**Grundregel:** Nach jeder Schicht kurz testen (Live Server, mobile View, Chatbot antworten lassen, Buchung klicken). Erst dann committen und weitermachen.

---

### Schicht 0 — Kickoff & Audit (~15 Min.)

**Ziel:** Claude Code soll dir sagen, was aus SEINER Sicht schlecht am aktuellen Code ist, bevor er anfängt zu ändern. Kein Schreiben, nur Analyse.

**Prompt:**

```
Ich möchte diese PT-Website in mehreren Schichten aufwerten. WICHTIG: 
die Seite ist bereits voll funktional — Chatbot antwortet, Cal.com-
Buttons öffnen die Buchung, Formspree verschickt E-Mails. Der Refactor 
betrifft ausschließlich Design, Content, Struktur, Performance, SEO, 
Accessibility und DSGVO. Funktionalität wird nicht neu gebaut.

Bevor du irgendetwas änderst, mach mir bitte einen Audit:

1. Lies alle HTML/CSS/JS-Dateien
2. Identifiziere in einer Liste, welche Probleme du siehst — in diesen Kategorien:
   - Design (generischer AI-Look, fehlende Hierarchie, Bild-Qualität)
   - Copywriting (Platzhalter, generische Formulierungen)
   - Semantik (falsche Tags, fehlende Landmarks)
   - Accessibility (Alt-Texte, ARIA, Kontrast)
   - Performance (Bilder-Größen, blockierende Scripts)
   - SEO (Meta-Tags, Header-Struktur, Schema)
   - DSGVO (externe Ressourcen, Cookies, fehlende Rechtstexte)
3. Nichts schreiben, nichts ändern. Nur die Liste.

Grouple die Probleme nach Priorität: kritisch / mittel / kosmetisch.

Ignoriere in diesem Audit die Chatbot-Logik, die Cal.com-data-Attribute 
und die Formspree-URL — die sind absichtlich so und dürfen nicht 
verändert werden.
```

**Was du machst:** Die Liste lesen, dir Notizen machen, was du wirklich willst. Manche Sachen wirst du absichtlich lassen (z.B. bewusst schlichtes Design).

---

### Schicht 1 — Copywriting & Content-Struktur (~1 Std.)

**Ziel:** Alle Platzhalter-Texte durch echte, verkaufsstarke Formulierungen ersetzen. Header-Hierarchie (h1 → h2 → h3) begradigen. Klare CTAs. Landingpage-Struktur festlegen.

**Wichtige Punkte, die oft übersehen werden:**

- Genau EIN `<h1>` pro Seite — SEO-Basiswissen, viele AI-generierte Seiten haben 3+ h1
- `<h2>` für Hauptsektionen, `<h3>` für Untersektionen — keine Sprünge (h1 → h3)
- CTAs sind Verben in Imperativ: "Termin buchen", "Chat starten" — nicht "Klick hier" oder "Mehr erfahren"
- Jede Sektion hat ein klares Ziel. Keine Sektion ohne CTA oder Zweck.

**Prompt:**

```
Schicht 1: Copywriting und Content-Struktur.

Wichtig zur Erinnerung: die Seite ist funktional komplett. Ich möchte 
hier NUR Texte und HTML-Struktur überarbeiten — kein JS anfassen, keine 
data-cal-Attribute anfassen, keine Formspree-URL anfassen.

1. Landingpage-Struktur festlegen:
   - Hero: kurzer Claim (max. 10 Wörter) + zwei CTA-Buttons nebeneinander:
     * Primär "Termin buchen" — Ziel: <a href="#buchung"> mit smooth-scroll
     * Sekundär "Chat starten" — soll das bestehende Chatbot-Widget öffnen 
       (die JS-Funktion existiert bereits, prüfe wie sie heißt und ruf 
       sie im Click-Handler auf)
   - Danach: Über mich → Angebote → Buchung (Cal.com) → FAQ → Kontakt → Footer

2. Überarbeite alle Texte. Aktueller Zustand: Platzhalter oder generische 
   AI-Sprache. Zielzustand: echte Formulierungen für einen fiktiven 
   Personal Trainer in [DEINE STADT]. Zielgruppe: Menschen 25-45, die 
   sich unsicher sind, ob PT was für sie ist.

3. Ton: warm, direkt, ohne Fitness-Branchen-Klischees ("PUSH YOUR LIMITS", 
   "Change your life today"). Konkret, bodennah. Zweite Person (du/dich), 
   nicht Sie.

4. Header-Struktur bereinigen: 
   - Genau 1x <h1> (in der Hero-Section)
   - <h2> für jede Hauptsektion
   - <h3> für Karten-Titel innerhalb einer Sektion
   - Keine Level-Sprünge

5. Alle CTAs prüfen: sind es klare Verben? 
   Gut: "Termin buchen", "Chat starten", "Nachricht schreiben"
   Schlecht: "Klick hier", "Mehr erfahren", "Los geht's"

6. Jede Sektion muss einen Zweck haben. Wenn eine Sektion keinen klaren 
   Zweck oder CTA hat: markiere sie mit HTML-Kommentar und frag mich.

Sensibilität: KEIN Ausrufezeichen-Spam, keine Emojis im Fließtext,
keine "In nur 12 Wochen"-Versprechen. Ehrlich verkaufen.
```

**Was du prüfst:**
- Kannst du in unter 10 Sekunden erkennen, was die Seite anbietet?
- Ist jeder CTA-Button mit einem Verb beschriftet?
- Nur ein h1?
- Klick auf "Termin buchen" scrollt sanft zum Kalender?
- Klick auf "Chat starten" öffnet den Chatbot?

---

### Schicht 2 — Design (mit Taste Skill) (~1,5 Std.)

**Ziel:** Der generische AI-Look weg. Professionelle, hochwertige Anmutung. Zwei Design-Ausgaben zum Vergleich, dann eine wählen.

**Wichtige Punkte:**

- Skill wird über SKILL.md automatisch geladen, wenn du Design-Requests machst — falls Claude Code den Skill nicht "greift", explizit erwähnen: *"Nutze den design-taste-frontend Skill"*
- Zwei Varianten anfordern, nicht eine — sonst wählt Claude Code eine Richtung, und du hast nichts zu vergleichen
- Screenshot-Review durch Playwright MCP nach dem Refactor

**Prompt:**

```
Schicht 2: Design-Refactor mit dem design-taste-frontend Skill.

Kontext: PT-Website, Zielgruppe 25-45. Zielbild ist NICHT typisches 
Fitness-Branding (kein Schwarz-Rot, keine "aggressive" Typo, keine 
Muskel-Fotos). 

Zielbild ist eine professionelle, hochwertige Designstudio-Anmutung. 
Referenzen für die ANMUTUNG (nicht kopieren, nur die Anmutung inspirieren):
- linear.app (klare Typo, ruhige Palette)
- notion.so (weiß, viel Weißraum, Vertrauen)
- apple.com/de (Produkt im Mittelpunkt, keine Ablenkung)

WICHTIG: Funktionalität nicht anfassen. Der Chatbot-JS bleibt, die 
Cal.com-data-Attribute bleiben, die Formspree-URL bleibt. Du darfst 
umstylen, aber nicht die Verkabelung ändern.

Aufgabe:
1. Nutze den design-taste-frontend Skill für die Design-Entscheidungen.
2. Erstelle ZWEI Design-Varianten der Seite in getrennten Dateien 
   (z.B. index-variante-a.html + zugehörige CSS, index-variante-b.html + 
   zugehörige CSS):
   
   Variante A: minimalistisch, viel Weißraum, ruhige Serifentitel + 
   Grotesk-Body, gedämpfte Palette (Off-White, warmes Schwarz, ein 
   Akzent aus der Sand/Terracotta-Familie). Anmutung wie ein 
   Designstudio-Portfolio.
   
   Variante B: expressiver, asymmetrische Layouts, größere Typo-Kontraste, 
   Palette aus Kaltweiß + Anthrazit + einem selbstbewussten Akzent 
   (dunkles Grün oder ein tiefes Blau). Anmutung wie eine hochwertige 
   Consumer-App-Landingpage.

3. Regeln (Anti-Slop):
   - Keine zentrierten Hero-Sections mit gradientem Background
   - Kein Purple-Gradient
   - Keine Emojis
   - Keine "99% zufrieden"-Fake-Stats
   - Grid statt Flexbox-Math wo sinnvoll
   - System-Fonts oder LOKAL gehostete Schriftarten (Schicht 7 sorgt für lokale Fonts)
   - Mobile-first: bau Layouts von 320px aufwärts

4. Die zwei Hero-CTAs ("Termin buchen" + "Chat starten") sind das 
   wichtigste UI-Element. Primärer Button visuell dominant, sekundärer 
   Button klar als sekundär erkennbar (Outline/Ghost/schwächerer 
   Kontrast). Beide auf Mobile untereinander, auf Desktop nebeneinander.

5. Nach dem Refactor: öffne beide Varianten mit Playwright MCP, mach 
   Screenshots (Desktop + Mobile) und lass mir kurz deinen Eindruck da.

Erinnerung: Chatbot-Widget, Cal.com-Buttons und Kontaktformular bleiben 
funktional identisch. Nur ihr Styling darf sich ändern.
```

**Was du prüfst:**
- Welche Variante gefällt dir? → die andere löschen
- Sieht es auf dem Handy wirklich gut aus? (F12 → Device Toolbar → iPhone SE)
- Sind Cal.com-Buttons, Chatbot und Kontaktformular noch funktional?
- Öffnet "Chat starten" wirklich den Chat, scrollt "Termin buchen" wirklich zur Buchung?

---

### Schicht 3 — Bildmaterial (~1 Std.)

**Ziel:** Der Cartoon-Trainer raus. 5–8 hochwertige Fotos rein, die "professionell + Personal Training" transportieren, ohne dass echte Personen erkennbar sein müssen (fiktiver Trainer).

**Vorgehen (empfohlen):** Selbst 10 Minuten auf Unsplash/Pexels investieren, Bilder aussuchen, URLs sammeln — Claude Code den Rest machen lassen.

**Bildthemen für einen PT-Prototyp (funktioniert ohne Gesicht):**
- Hero: Fitness-Studio-Ambiente, Übungsvorbereitung, Hantel-Nahaufnahme in gutem Licht
- Über-mich: kein Gesicht, aber z.B. Hände an einer Kettlebell, Trainer notiert etwas auf Tablet
- Angebote-Karten: verschiedene Übungssituationen (Kraft, Mobility, Ernährung)
- Buchungs-Sektion: ruhiges Studio-Foto als Hintergrund
- Kontakt-Sektion: warmes Interieur, minimalistisch

**Wichtig zu wissen:**
- Claude selbst hat kein Bildgenerierungs-Modell integriert
- Aber: Claude Code kann per `curl`/`wget` von jeder öffentlichen URL Bilder herunterladen
- Freies Browsen und Bildersuchen im Internet geht nicht — du musst URLs vorgeben
- Alternative (mehr Aufwand): AI-Bilder via MCP-Server (Nano Banana MCP, DALL-E MCP, Stable Diffusion MCP)

**Prompt:**

```
Schicht 3a: Bildmaterial einbauen.

Ich hänge dir eine Liste von Unsplash/Pexels-URLs an. Für jede URL steht 
dabei, wo das Bild eingebaut werden soll (z.B. "Hero", "Angebot-Karte 1").

Aufgaben:
1. Erstelle einen Ordner /images falls nicht vorhanden
2. Lade jedes Bild via curl in den Ordner, benenne sinnvoll 
   (hero.jpg, ueber-mich.jpg, angebot-1.jpg etc.)
3. Konvertiere JEDES Bild zusätzlich zu WebP (behalte Original als 
   Fallback für <picture>-Tag)
4. Ermittele die Original-Dimensionen jedes Bildes (für width/height-
   Attribute später)
5. Ersetze alle bisherigen Bild-Einbindungen in HTML durch <picture>-Tags:
   
   <picture>
     <source srcset="images/hero.webp" type="image/webp">
     <img src="images/hero.jpg" alt="..." width="..." height="..." 
          loading="lazy" decoding="async">
   </picture>
   
   Ausnahme: Hero-Bild bekommt kein loading="lazy" (above-the-fold)

6. Alt-Texte: NICHT der Dateiname. Beschreib was drauf ist und was 
   die Funktion ist. Ein Beispiel-Alt-Text: "Personal Trainer erklärt 
   Kundin die korrekte Kniebeuge-Ausführung"
   
7. Wenn ein Bild als CSS-Background verwendet wird und rein 
   dekorativ ist: prüf ob es besser als <img alt=""> im HTML wäre 
   (für Screen Reader) oder ob CSS-Background okay ist (dann brauchts 
   keinen Alt-Text)

Hier meine URLs:

Hero: [URL]
Über mich: [URL]
Angebot 1 (Einzeltraining): [URL]
Angebot 2 (Online-Coaching): [URL]
Angebot 3 (Ernährung): [URL]
Buchung-Hintergrund: [URL]
Kontakt: [URL]
```

**Alternative (AI-Bilder via MCP), falls du das lieber willst:**

```
Schicht 3a (alternativ, mit Nano-Banana-MCP oder ähnlichem):

1. Installiere einen Bildgenerierungs-MCP-Server (z.B. Nano Banana 2 
   oder DALL-E via einen der öffentlichen MCPs — Setup außerhalb dieses 
   Prompts)
2. Generiere 6 Bilder mit diesen Prompts:
   - Hero: "Modern minimalist gym interior, natural morning light, single 
     kettlebell on wooden floor, editorial photography style, no people"
   - Über-mich: "Close-up hands adjusting weight lifting belt, warm 
     natural light, editorial photography"
   - ...
3. Speichere in /images, konvertiere zu WebP, binde ein wie oben.
```

**Was du prüfst:**
- Bilder wirken zusammen wie eine Serie (gleiche Farbstimmung, ähnliche Bildsprache), nicht wie zufällig zusammengewürfelt
- Auf Mobile schneidet nichts Wichtiges weg
- Ladezeit vom Hero-Bild unter 1,5s (F12 → Network → Bild-Zeile)

---

### Schicht 3b — Performance (~45 Min.)

**Ziel:** Ladezeiten unter 2,5s LCP, keine blockierenden Scripts, saubere Netzwerk-Bilanz.

**Wichtige Punkte, die oft übersehen werden:**

- **`width` und `height` explizit setzen** — verhindert Cumulative Layout Shift (CLS)
- **Preconnect für externe Domains:** `<link rel="preconnect" href="https://cal.com">`
- **Scripts mit `defer`** (nicht `async`, defer respektiert Reihenfolge)
- **CSS im `<head>`, JS vor `</body>`**
- **`prefers-reduced-motion`** respektieren

**Prompt:**

```
Schicht 3b: Performance.

Bilder sind in Schicht 3a schon optimiert. Fokus hier: Scripts, 
externe Verbindungen, Layout-Stabilität.

1. Alle <script>-Tags prüfen:
   - Kritisches JS (initialisiert nichts sofort): defer
   - Cal.com-Embed-Script: ans Ende von <body>, defer
   - Chatbot-JS: ans Ende von <body>, defer
   - Kein render-blocking JS im <head>

2. Externe Ressourcen: <link rel="preconnect"> für 
   - cal.com (für die Buchung)
   - deine Netlify Function-URL (für den Chatbot)
   - formspree.io (für das Kontaktformular)
   Setze diese Tags in den <head>.

3. CSS: im <head>, nicht am Ende. Falls du mehrere CSS-Dateien hast: 
   in eine einzelne kombinieren, das spart Requests.

4. prefers-reduced-motion respektieren: alle CSS-Transitions/Animations 
   in einen Media Query wickeln:
   @media (prefers-reduced-motion: reduce) { 
     *, *::before, *::after { 
       animation-duration: 0.01ms !important; 
       transition-duration: 0.01ms !important; 
     } 
   }

5. Falls du CSS-Minifizierung willst: Netlify macht das automatisch 
   beim Deploy, keine lokale Aktion nötig.

Führe am Ende einen Lighthouse-Check aus (mit Playwright MCP) auf 
localhost und zeig mir die vier Scores: Performance, Accessibility, 
Best Practices, SEO.
```

**Was du prüfst:**
- Lighthouse Performance über 90?
- LCP unter 2,5s?
- CLS unter 0,1?
- Sind Bilder wirklich WebP? (F12 → Network → nach `.webp` filtern)

---

### Schicht 4 — SEO + AEO (~1 Std.)

**Ziel:** Google findet die Seite, ChatGPT/Perplexity zitieren sie bei "Personal Trainer in [Stadt]".

**Wichtige Punkte, die oft übersehen werden:**

- **Title-Tag:** unter 60 Zeichen, Keyword vorne, Ort drin. Beispiel: "Personal Trainer Schwäbisch Gmünd — Max Müller"
- **Meta-Description:** 150–160 Zeichen, verkaufsstark, mit CTA
- **Open Graph Tags** — für schöne Vorschauen bei WhatsApp/LinkedIn-Links
- **Twitter Cards** (twitter:card=summary_large_image)
- **Canonical URL** — verhindert Duplicate Content
- **Schema.org LocalBusiness / HealthClub / SportsActivityLocation** als JSON-LD
- **FAQ Schema** wenn du eine FAQ-Sektion hast
- **sitemap.xml und robots.txt** — für Google Search Console
- **Semantisches HTML:** `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` statt überall `<div>`
- **AEO-spezifisch:** kurze, direkte Antworten im Fließtext, weil LLMs solche Strukturen bevorzugt zitieren

**Prompt:**

```
Schicht 4: SEO + AEO.

Wichtig: nur Meta-Tags, semantische Tags und Schema-Daten ergänzen. 
Bestehende Funktionalität (Chatbot, Buchung, Formular) nicht anfassen.

Traditionelle SEO:
1. <title>: unter 60 Zeichen, Format "Personal Trainer [Stadt] — [Name]"
2. <meta name="description">: 150-160 Zeichen, verkaufsstark, mit 
   implizitem CTA ("Buche dein kostenloses Probetraining")
3. Open Graph Tags (og:title, og:description, og:image, og:url, og:type=website)
4. Twitter Cards (twitter:card=summary_large_image, twitter:image)
5. <link rel="canonical"> mit der Haupt-URL
6. sitemap.xml und robots.txt im Root anlegen
7. Semantisches HTML: alle nicht-strukturellen <div> prüfen — nutze 
   <section>, <article>, <nav>, <main>, <aside>, <header>, <footer> wo passend
8. lang-Attribut auf <html> setzen (de-DE)
9. Favicon: alle üblichen Größen. Nutz favicon.io um es zu generieren.
   Einbindung: <link rel="icon" ...>, apple-touch-icon.

Schema.org (JSON-LD, direkt vor </head>):
10. LocalBusiness Schema mit Name, Adresse, Telefon, Öffnungszeiten, Bild,
    sameAs (Social Links, falls vorhanden)
11. Person Schema für den Trainer (Name, jobTitle, worksFor)
12. Service Schema für jedes Angebot (Probetraining, Einzeltraining)
13. FAQPage Schema wenn eine FAQ-Sektion existiert. Falls nicht: 
    erstelle eine mit mindestens 5 Fragen:
    - Wie viel kostet ein Probetraining?
    - Bin ich fit genug für Personal Training?
    - Wo trainieren wir?
    - Wie oft sollte ich pro Woche trainieren?
    - Was ist der Unterschied zu einem normalen Gym?

AEO (AI Engine Optimization):
14. Prüfe die Copy: sind Antworten auf typische Fragen direkt und ohne 
    Umschweife formuliert? LLMs bevorzugen "Ein Probetraining kostet 
    nichts und dauert 30 Minuten." gegenüber "Wir bieten dir die 
    Möglichkeit, uns kennenzulernen."
15. Prüfe die FAQ-Antworten: Format "kurze Antwort in Satz 1, Details 
    danach". Ideal für Snippet-Extraction durch LLMs.
16. Zahlen als konkrete Zahlen ausschreiben (60 Minuten, nicht 
    "eine Stunde")

Zum Schluss: validiere das Schema.org via 
https://search.google.com/test/rich-results (URL kannst du per fetch 
aufrufen mit deiner localhost-URL) und zeig mir das Ergebnis.
```

**Was du prüfst:**
- `view-source:` auf deine Seite: sind alle Meta-Tags drin?
- Kopier eine URL in WhatsApp — kommt eine schöne Vorschau?
- Google's Rich Results Test (search.google.com/test/rich-results): validiert das Schema?

---

### Schicht 5 — Mobile-first Check (~30 Min.)

**Ziel:** Die Seite ist auf dem Handy nicht "responsiv gemacht", sondern **für das Handy designed** — und ordentlich hoch auf größere Screens skaliert.

**Wichtige Punkte:**

- **Google's Mobile-First Indexing:** Google crawlt seit 2019 primär die Mobile-Version. Schlechtes Mobile = schlechtes Desktop-Ranking.
- **Touch-Targets mindestens 44×44px** (iOS) bzw. 48×48px (Material)
- **Font-Size mindestens 16px** im Body — sonst zoomt iOS-Safari automatisch
- **Kein horizontales Scrollen:** kein Element darf breiter als 100vw sein
- **Chat-Widget auf Mobile:** ideal als Fullscreen-Overlay, nicht als kleines Fensterchen

**Prompt:**

```
Schicht 5: Mobile-first Audit.

Öffne die Seite mit Playwright MCP in drei Viewport-Größen und mach 
jeweils Screenshots:
- iPhone SE (375x667) 
- iPad (768x1024)
- Desktop (1440x900)

Prüfe für jede Größe:

1. Kein horizontales Scrollen (kein Element > 100vw)
2. Alle Touch-Targets ≥ 44x44px (miss die Buttons, insbesondere die 
   zwei Hero-CTAs und die Cal.com-Termintyp-Buttons)
3. Alle Fonts im Body ≥ 16px, Titel angemessen groß
4. Chatbot-Widget: 
   - Auf Mobile beim Öffnen: füllt den Bildschirm (min 90% vh)
   - Kein winziges Fenster mit unlesbarem Text
   - Der Schließen-Button klar erreichbar
5. Navigation: 
   - Ab welchem Breakpoint wird die Nav zum Hamburger-Menü?
   - Ist das Hamburger-Menü mit Tastatur bedienbar?
6. Bilder: passen sie sich der Größe an? Kein Cropping wichtiger Bildteile?
7. Die beiden Hero-CTAs: auf Mobile untereinander mit ausreichend 
   Abstand (min. 8px Gap), auf Desktop nebeneinander.

Danach: was ist auf Mobile schlechter als auf Desktop? Liste — dann 
schlägst du Fixes vor, ich sag ja/nein.
```

**Was du prüfst:**
- DevTools Device Toolbar auf iPhone-SE-Format
- Mach den "Daumen-Test": kannst du mit einer Hand am Handy den Buchungsbutton drücken, ohne zu rutschen?

---

### Schicht 6 — Accessibility (~45 Min.)

**Ziel:** WCAG 2.1 AA erreicht. Nicht nur für sehbehinderte Nutzer — Accessibility ist auch SEO-Signal.

**Wichtige Punkte, die oft übersehen werden:**

- **Alt-Texte auf JEDEM Bild** — auch dekorativen. Dekorative: `alt=""` (leerer String, nicht weglassen!)
- **Farbkontrast:** Text/Hintergrund mindestens 4,5:1 für Body (WCAG AA)
- **Focus-Ringe sichtbar** — die AI-Tendenz `outline: none` überall zu setzen ist ein A11y-Killer
- **ARIA-Labels für Icon-only Buttons** (Chatbot-Öffnen-Button z.B.)
- **Keyboard Navigation:** die ganze Seite mit Tab durchspielbar
- **Skip-to-content Link** (unsichtbar bis Tab-Fokus)
- **Form-Labels:** jedes `<input>` braucht ein zugehöriges `<label>` oder `aria-label`
- **Live-Regions für Chatbot:** neue Bot-Nachrichten müssen Screen Reader ankündigen (`aria-live="polite"`)

**Prompt:**

```
Schicht 6: Accessibility (WCAG 2.1 AA).

1. Alt-Texte:
   - Jedes <img>: aussagekräftiger Alt-Text
   - Dekorative Bilder: alt="" (leer, aber nicht weggelassen)

2. Farbkontrast:
   - Prüfe alle Text/Hintergrund-Kombinationen
   - WCAG AA: 4.5:1 für Body, 3:1 für Text ≥ 18px oder Bold ≥ 14px
   - Liste alle Fails, schlag alternative Farben vor

3. Focus:
   - KEIN "outline: none" ohne Ersatz
   - Fokus-Ringe müssen sichtbar sein (mind. 2px, klarer Kontrast)
   - :focus-visible statt :focus verwenden

4. Interaktive Elemente:
   - Icon-only Buttons: aria-label ergänzen
   - Chat-Öffnen-Button (Hero-CTA "Chat starten"): 
     aria-label="Chatbot mit Assistent öffnen"
   - Chat-Schließen-Button: aria-label="Chat schließen"
   - Alle <a> müssen ein href haben

5. Keyboard:
   - Tab-Reihenfolge logisch (folgt DOM-Reihenfolge)
   - Chatbot als Modal: Focus-Trap implementieren
   - Esc schließt Chat und Cal.com-Modal

6. Landmarks + Skip-Link:
   - Skip-to-Content am Anfang von <body>
   - <main id="main"> ist Ziel des Skip-Links
   - Nur ein <main> pro Seite

7. Formulare (Kontaktformular):
   - Jedes Input hat ein Label
   - Fehlermeldungen: aria-live="assertive" oder role="alert"
   - Erforderliche Felder: required + aria-required="true"

8. Chatbot spezifisch:
   - Chat-Nachrichten-Container: role="log" aria-live="polite"
   - Neue Bot-Nachrichten werden dann automatisch angekündigt

Führe einen Accessibility-Scan mit axe-core (über Playwright) aus und 
zeig mir die Fehler-Liste.
```

**Was du prüfst:**
- Nur mit Tab-Taste durch die Seite navigieren — kommst du überall hin?
- macOS VoiceOver (Cmd+F5) oder Windows NVDA testen — versteht man was passiert?

---

### Schicht 7 — DSGVO, Impressum, Datenschutz (~1,5 Std.)

**Ziel:** Die Seite ist rechtssicher genug, um sie Fremden zu zeigen.

**Wichtige Punkte:**

- **Google Fonts:** entweder komplett lokal hosten oder gar keine externen Fonts (System-Fonts sind super)
- **Cal.com Embed:** lädt Cookies und Scripts von Drittservern. Two-Click-Lösung schützt
- **OpenAI-API im Chatbot:** Nutzer-Eingaben gehen an OpenAI (USA). Muss in Datenschutzerklärung stehen
- **Formspree:** gleiches Thema
- **IP-Adressen in Logs:** Netlify loggt IPs — Standardpraxis, in Datenschutz erwähnen
- **Cookie-Banner:** nötig, wenn nicht-technisch-notwendige Cookies gesetzt werden. Cal.com setzt welche.
- **Impressum:** §5 TMG — Name, ladungsfähige Adresse (kein Postfach), E-Mail
- **Datenschutz:** DSGVO Art. 13 — Verantwortlicher, Daten, Zwecke, Rechtsgrundlage, Speicherdauer, Empfänger, Rechte

**Prompt (Teil A — technische Maßnahmen):**

```
Schicht 7a: DSGVO-Technik.

1. Google Fonts lokal hosten:
   - Identifiziere alle Google-Fonts-Einbindungen (fonts.googleapis.com, 
     fonts.gstatic.com)
   - Lade die Font-Dateien via google-webfonts-helper.herokuapp.com als 
     WOFF2 herunter, packe sie in /fonts/
   - Bau ein @font-face-Setup in der CSS-Datei
   - Entferne ALLE Verweise auf fonts.googleapis.com und fonts.gstatic.com
   - Verifiziere via curl oder Playwright: keine Requests mehr an 
     Google-Font-Server beim Seitenaufruf

2. Cal.com Embed — Two-Click-Lösung:
   - Ersetze das auto-loading Cal.com-Script durch einen 
     Placeholder-Zustand: die Termintyp-Buttons sind zunächst inaktiv 
     bzw. mit Overlay
   - Erst-Klick auf einen "Termine anzeigen"-Overlay-Button lädt das 
     Cal.com-Script und aktiviert die Element-Click-Buttons
   - Hinweis: "Beim Klick werden Daten an cal.com übertragen. Details 
     in der Datenschutzerklärung."
   - Setze einen sessionStorage-Flag, damit der Nutzer nur einmal 
     zustimmen muss

3. Chatbot — Consent vor erster Nachricht:
   - Beim ersten Öffnen des Chats zeigt der Bot als erste Nachricht:
     "Hallo! Wenn du mir schreibst, werden deine Nachrichten an OpenAI 
      in den USA übertragen, damit ich antworten kann. Details in der 
      Datenschutzerklärung. Möchtest du fortfahren? [Ja, chatten]"
   - Erst nach Klick werden Nachrichten wirklich an die Netlify Function 
     geschickt
   - localStorage-Flag, damit die Frage nicht bei jedem Besuch kommt

4. Formspree — Datenschutz-Hinweis unter dem Kontaktformular:
   - Kleiner Text: "Deine Angaben werden über Formspree verarbeitet. 
     Details siehe Datenschutz."
   - Checkbox "Ich habe die Datenschutzerklärung gelesen und stimme zu" 
     als required

5. Externe Ressourcen minimieren:
   - Liste alle externen Requests
   - Für alles außer Cal.com/OpenAI/Formspree: kann es lokal ersetzt 
     werden?

Zum Schluss: teste mit F12 → Network — welche externen Requests laufen 
beim ersten Aufruf der Seite? Vor Cal.com/Chatbot-Klick sollten NUR 
eigene Ressourcen geladen werden.
```

**Zwischenschritt (manuell, außerhalb Claude Code):**

- **Impressum-Generator:** impressum-generator.de (kostenlos, von eRecht24), Formular ausfüllen mit deinen echten Daten als Betreiber der Demo-Seite
- **Datenschutz-Generator:** datenschutz-generator.de (auch von eRecht24), Formular ausfüllen. Bausteine anhaken für: Kontaktformular (Formspree), Chatbot (OpenAI), Terminbuchung (Cal.com), Hosting (Netlify), lokale Google Fonts
- Generierte Texte in Zwischenablage kopieren

**Prompt (Teil B — Einbindung der Texte):**

```
Schicht 7b: Impressum und Datenschutz einbauen.

1. Erstelle zwei neue Seiten:
   - impressum.html
   - datenschutz.html
   
   Beide sollen dasselbe Design-System nutzen wie die Hauptseite 
   (gleiche Fonts, Farben, Header, Footer). Layout: mittige Textspalte, 
   max 720px breit, gut lesbar. Kein Chatbot, keine Cal.com-Elemente 
   auf diesen Seiten.

2. Ich füge dir gleich die generierten Texte in den Chat. Übernimm sie 
   1:1, aber:
   - Formatier semantisch sauber: <h1> für Titel, <h2> für 
     Hauptabschnitte, <h3> für Unterabschnitte
   - Adressen und Kontaktdaten in <address>-Tags
   - E-Mail-Links als mailto:
   - Keine Änderungen am Text-Inhalt, nur an der HTML-Struktur

3. Footer der Hauptseite anpassen:
   - Links zu /impressum.html und /datenschutz.html
   - Klar sichtbar, nicht in graue 10px-Schrift

4. Cookie-Banner:
   - Prüfe: welche Cookies werden gesetzt (F12 → Application → Cookies)?
   - Wenn nur technisch notwendige (Session): kein Banner nötig
   - Wenn Cal.com/OpenAI/andere setzen: bau einen einfachen Consent-Banner:
     * Erscheint beim ersten Besuch (localStorage-Flag)
     * Zwei Optionen gleichrangig: "Akzeptieren" und "Ablehnen"
     * Bei Ablehnung: Cal.com/Chatbot bleiben im Placeholder-Zustand
     * Link zu Datenschutz sichtbar
   - KEIN Dark-Pattern (kein hervorgehobener Akzeptieren-Button, 
     kein versteckter Ablehnen-Button)

Am Ende: teste alle drei Seiten (Home, Impressum, Datenschutz) mit 
Lighthouse und zeig mir die Scores.
```

**Text hier einfügen:** (Nach dem Prompt kopierst du die generierten Impressum- und Datenschutz-Texte direkt in den Chat.)

**Was du prüfst:**
- Netzwerk-Tab beim ersten Aufruf: KEINE Requests zu fonts.googleapis.com
- Cal.com-Modal öffnet sich erst nach explizitem Klick
- Impressum und Datenschutz sind vom Footer aus erreichbar
- Datenschutz enthält Abschnitte zu: OpenAI, Cal.com, Formspree, Netlify, lokale Fonts

---

### Schicht 8 — Final Audit & Deployment (~30 Min.)

**Ziel:** Alles nochmal überprüfen, dann ready für DMs.

**Prompt:**

```
Schicht 8: Final Audit vor Deployment.

Fahr eine Gesamtprüfung:

1. Lighthouse-Scores (Playwright + Lighthouse) auf ALLEN Seiten 
   (Home, Impressum, Datenschutz):
   - Performance ≥ 90
   - Accessibility ≥ 95
   - Best Practices ≥ 95
   - SEO ≥ 95

2. Rechtscheck:
   - Impressum von Startseite in max. 2 Klicks erreichbar?
   - Datenschutz von Startseite in max. 2 Klicks erreichbar?
   - Alle im Datenschutz genannten Dienste tatsächlich eingebunden?

3. Funktionaler Test (wichtig: hier prüfst du dass NICHTS an der 
   Funktionalität kaputt gegangen ist):
   - Hero-CTA "Termin buchen" → scrollt sanft zur Buchungssektion
   - Hero-CTA "Chat starten" → öffnet Chatbot-Widget
   - Chatbot antwortet auf eine Testfrage
   - Cal.com Probetraining-Button → Modal öffnet, Slot wählbar
   - Cal.com Einheit-60-Button → Modal öffnet, Slot wählbar
   - Kontaktformular → Test-Submit, E-Mail kommt an
   - Cookie-Banner (falls vorhanden): "Akzeptieren" und "Ablehnen" 
     funktionieren beide korrekt

4. Mobile-Test (Playwright, iPhone SE Viewport):
   - Alle Buttons erreichbar mit dem Daumen?
   - Text lesbar ohne Zoom?
   - Chat-Widget nutzbar?
   - Die zwei Hero-CTAs stapeln sich sauber?

5. Meta-Tags final check:
   - Title, Description auf jeder Seite unterschiedlich?
   - OG-Bild wird gerendert? (opengraph.xyz zum Testen)
   - Schema.org validiert? (Google Rich Results Test)

6. Git-Status:
   - Alles committed?
   - Sensible Daten (API-Keys) im .gitignore?
   - .env NICHT im Repo?

Erstelle einen Test-Report als checkliste.md im Root, den ich zum 
späteren Ausrollen auf Kunden-Sites wiederverwenden kann. Format: 
Checkbox-Liste, gruppiert nach den Kategorien oben.
```

**Was du machst:**
- `checkliste.md` in ein separates "Templates"-Verzeichnis kopieren
- Deploy zu Netlify (git push, Netlify baut auto)
- Teste die produktive URL auf dem echten Handy (nicht nur DevTools)

---

## Nach dem Refactor: das Template-Setup für Kundenprojekte

Der Prototyp erfüllt zwei Rollen: (1) Vorzeigeobjekt für Akquise und (2) Code-Basis für alle späteren Kundenprojekte. Für Rolle 2 machst du daraus ein wiederverwendbares Template:

1. **Kopie in ein separates Repo** (privat, z.B. `pt-website-template`)
2. **Alle kundenspezifischen Daten durch Platzhalter ersetzen:**
   - `{{TRAINER_NAME}}`, `{{TRAINER_STADT}}`, `{{TRAINER_EMAIL}}`, `{{TRAINER_TELEFON}}`
   - Cal.com-Slug: `{{CALCOM_SLUG}}/probetraining`, `{{CALCOM_SLUG}}/einheit-60`
   - Formspree-URL: `{{FORMSPREE_ENDPOINT}}`
   - Adresse für Impressum: `{{IMPRESSUM_ADRESSE}}`
3. **Bilder in einen `/images-placeholder`-Ordner verlagern** mit generischen Namen (`hero-placeholder.jpg` etc.) — bei jedem Kunden werden diese durch echte ersetzt
4. **Impressum/Datenschutz-Templates mit Platzhaltern separat speichern** — Struktur bleibt, Kundendaten fliegen rein
5. **Ein `setup.sh` oder Node-Script bauen**, das:
   - nach den Kundendaten fragt (interaktiv)
   - alle Platzhalter in allen Dateien ersetzt
   - den Ordner unter einem neuen Namen speichert
6. **CLAUDE.md des Templates ergänzen:** "Dieses Repo ist ein Template. Beim Klonen für einen neuen Kunden bitte setup.sh ausführen."

Damit reduzierst du die Zeit für Kunde #2 von ~40 Stunden auf ~4 Stunden. Kunde #3, #4, #5 gehen dann jeweils in 2 Stunden.

**Für jeden Kunden zusätzlich manuell:**
- Neuen Cal.com-Account (oder Event-Types unter Kunden-Account) einrichten
- Neuer OpenAI-System-Prompt mit den Daten des Kunden
- Neue Impressum/Datenschutz-Texte via eRecht24-Generator mit Kunden-Daten
- 5–8 echte Fotos vom Trainer (oder Stockfotos, wenn Trainer keine hat)
- Netlify Deployment mit eigener Domain

---

## Anhang: Fallstricke, die oft übersehen werden

### Was AI-Tools bei Websites regelmäßig verkacken

1. **Zu viele h1-Tags** — SEO-Gift, immer nur eines.
2. **Purple Gradients everywhere** — der klassische "AI-Look". Taste-Skill blockt das, prüf trotzdem selbst.
3. **Emojis in CTAs** — wirkt unseriös. 🚀 hat auf einer PT-Seite nichts verloren.
4. **Fake Trust-Signals** — "10.000+ zufriedene Kunden". Nicht verwenden, außer es stimmt beweisbar.
5. **Zentrierte Hero + Button + Untertitel als default** — Layout-Konvention aus 2018. Asymmetrische Hero-Layouts wirken frischer.
6. **Fonts über CDN einbinden** — DSGVO-Falle. Immer lokal.
7. **`outline: none` auf Focus** — Accessibility-Killer.
8. **Fehlende `width`/`height` auf Bildern** — Layout Shift, senkt Core Web Vitals.
9. **Auto-play Videos oder Musik** — Nutzer-Killer, verstößt gegen A11y.
10. **Cookie-Banner mit Dark Pattern** — abmahnfähig seit 2022, und unnötig, wenn man sich sauber aufstellt.
11. **Impressum als Grafik statt Text** — nicht barrierefrei, nicht rechtsgültig.
12. **Contact-Formular ohne Datenschutz-Checkbox** — bei Consent-Modell zwingend.
13. **Kein 404-Fehlerseiten-Handling** — Netlify hat Default, eigene 404.html wirkt professioneller.
14. **Externe Iframes ohne Consent** — YouTube-Embeds, Google Maps, Cal.com: alles Iframe-basiert, alles Cookie-relevant.
15. **API-Keys im Frontend-Code** — bei jedem Refactor nochmal prüfen.
16. **Bildersuche unbekannter Lizenz** — bei Stockfotos immer auf Lizenz achten (Unsplash/Pexels sind sicher).
17. **Symmetrische Layouts überall** — Wirken schnell templated. Asymmetrische Grids sind schwerer, wirken aber wertiger.
18. **Übernutzung von Bulletpoints** — Kurze Prosa liest sich meist besser als sechs kurze Bullets.

### Nice-to-have (nicht kritisch, aber gut)

- **404-Seite** mit Link zur Home
- **`humans.txt`** im Root — nostalgisch, nettes Detail
- **`security.txt`** in `.well-known/` — Ansprechpartner für Sicherheitsforscher
- **CSP-Header** (Content-Security-Policy) in Netlify-Headers-File
- **HSTS-Header** — Netlify macht HTTPS-Redirect, HSTS ist die Bekräftigung
- **`prefers-color-scheme`** respektieren — Dark Mode als Bonus

### Was du NICHT machen solltest

- **Google Analytics** — mehr Aufwand für Consent + Datenschutz als es wert ist. Wenn Nutzertracking gewünscht: Plausible oder umami (DSGVO-freundlich, cookiefrei)
- **Facebook-Pixel** — Meta-Datenschutzprobleme
- **`<b>` und `<i>`** — nutze `<strong>` und `<em>` (semantisch)
- **Tabellen für Layout** — nur für Tabellendaten
- **Bilder als CSS-Background wenn sie inhaltlich sind** — nur für Dekoration. Inhalt gehört ins `<img>` mit Alt-Text

---

## Zeitrechnung (Übersicht)

| Schicht | Fokus | Zeit |
|---|---|---|
| 0 | Kickoff & Audit | 15 Min. |
| 1 | Copywriting & Struktur | 60 Min. |
| 2 | Design (Taste Skill) | 90 Min. |
| 3a | Bildmaterial | 60 Min. |
| 3b | Performance | 45 Min. |
| 4 | SEO + AEO | 60 Min. |
| 5 | Mobile-first Check | 30 Min. |
| 6 | Accessibility | 45 Min. |
| 7 | DSGVO + Impressum + Datenschutz | 90 Min. |
| 8 | Final Audit & Deployment | 30 Min. |
| **Total** | | **~9 Std.** |

Verteilt auf 3–4 Sessions. Nicht in einem Rutsch — dazwischen willst du mit klarem Kopf reviewen.
