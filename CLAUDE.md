# PT-Demo-Website

Statische Website für einen fiktiven Personal Trainer als Prototyp/Demo für Akquise.
Zielgruppe der Demo: reale PTs, die eine ähnliche Website bei mir kaufen sollen.
Zweck: (1) Vorzeigeobjekt für DMs, (2) Code-Basis-Template für alle 
späteren Kundenprojekte — Bilder und Texte werden pro Kunde ausgetauscht.

## Stack
- HTML, CSS, Vanilla JS (kein Framework)
- Cal.com Element-Click Embed (Namespaces: probetraining, probecall, trainingseinheit)
- OpenAI Chatbot über Netlify Function (Proxy)
- Formspree für Kontaktformular
- Deployment: Netlify

## Constraints
- Kein Framework, bleib bei Vanilla
- Kein Build-Step
- Mobile-first
- DSGVO-Konformität ist Pflicht (Betreiber sitzt in Deutschland)

## WICHTIG: Was NICHT angefasst werden darf
- Die Chatbot-Logik in js/chat.js (fetch → Netlify Function → OpenAI-Antwort)
- Die Cal.com data-cal-*-Attribute auf den Buttons
- Die Formspree-Endpoint-URL im Kontaktformular
- Die Netlify Function unter /netlify/functions/
Diese Elemente sind funktional korrekt. Nur ihr Styling / ihre Einbettung 
darf verändert werden. Außerdem können (sollen) unnötige Funktionen wie das Motivationszitat, Kalorienrechner entfernt werden.