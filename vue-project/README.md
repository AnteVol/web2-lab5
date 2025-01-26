# Popis ostvarenih funkcionalnosti za lab 5:

- interpolation/one-way binding -> DA: `{{ note.content }}` -> `NoteView.vue` line 4
- two-way binding -> DA: `v-model="title"` -> `EditNoteView.vue` (line 16), `NewNoteView.vue` (line 9)
- methods -> DA -> `SingleNoteCard.vue` (line 26-47)
- computed properties -> DA -> `HomeView.vue` (line 46-49)
- barem jedan scoped style -> DA -> npr `HomeView.vue` line 65 nadalje
- koristiti barem jedan lifecycle hook -> DA: `onMounted` na dva mjesta -> `NoteView.vue` line 32
- routing (više stranica) -> oboje realizirano -> `index.ts` datoteka
    - aplikacija mora biti bookmarkable, tako da rade linkovi (ne samo na root, već i `moj-web.com/stranica1`, `moj-web.com/stranica2`) -> ima više stranica i ruta, sve su definirane u `index.ts` datoteci
    - dinamičko usmjeravanje s 404 stranicom ("catch all") -> `index.ts` linije 31-34
- (barem) dvije komponente -> DA
    - komponenta bez stanja, koristiti properties -> `SingleNoteCard.vue`
    - komponenta sa stanjem -> `NewNoteView` -> `ref` -> line 40-42
- barem jedna komponenta mora emitirati barem jedan event -> DA -> npr. `NewNoteView.vue` line 4
- store (Pinia) -> DA -> u datoteci `NotesStore.ts` te konkretna primjena npr `EditNoteView`: line 53, 64
- asinkroni dohvat podataka s backenda -> npr `fetchNotes` line 17-37 u `NotesStore` gdje se dohvaćaju podaci sa back4app

Sve je traženo za ovaj projekt je ostvareno.

Prilikom pokretanja projekta, prvi korak je napraviti `npm install` kako bi se projekt postavio. Za pokretanje projekta potrebno je napraviti naredbu `npm run dev` odnosno `npm run build`.

Link na deployanu verziju aplikacije: [https://web2-lab5-n51w.onrender.com/](https://web2-lab5-n51w.onrender.com/)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
