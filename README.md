# Arabisch Letterbord

Oefen-app voor Arabische letters, de Mijnrace en hifz (Uit het hoofd).

## Online zetten met GitHub Pages

1. Maak op github.com een nieuwe repository, bijvoorbeeld `arabisch-letterbord` (Public).
2. Klik op **Add file → Upload files** en sleep alle bestanden en de map `fonts` erin. Klik **Commit changes**.
3. Ga naar **Settings → Pages**. Kies bij *Source*: **Deploy from a branch**, branch **main**, map **/ (root)**. Klik **Save**.
4. Na 1 à 2 minuten staat de app op `https://JOUW-NAAM.github.io/arabisch-letterbord/`.

## Een surah toevoegen (vanaf elk apparaat)

Open `surahs.js` in je repository, klik op het potloodje (bewerken), vul de surah in zoals in het voorbeeld en klik **Commit changes**.
Na een paar minuten staat hij in de app bij Mehr Sultan. Dit kan ook in de GitHub-app op je telefoon.

## Opslaan en delen tussen apparaten

Alles (surahs, woorden, voortgang en diamanten) wordt via Firebase gedeeld tussen alle apparaten.
De instellingen staan in `firebase-config.js`. Zonder internet wordt alles op het apparaat bewaard en later gedeeld.
In de app zie je onderaan bij Ouders of de verbinding met Firebase werkt.

## Lettertypes

KFGQPC Uthmanic Script Hafs (King Fahd Glorious Quran Printing Complex, vrij te gebruiken en verspreiden, niet aanpassen),
Baloo 2 en Pixelify Sans (SIL Open Font License, zie `fonts/`).
