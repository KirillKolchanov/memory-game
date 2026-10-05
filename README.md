# Memory Game

A card matching game: flip cards, remember where the dogs are and find all 8 pairs in as few moves as possible.

Built for the [RS School Memory Game task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game) with plain HTML, CSS and JavaScript — no frameworks or libraries.

## Features

- 16 cards (8 pairs of dog photos) shuffled with the Fisher–Yates algorithm on every load and new game.
- One move is opening two cards. A matched pair stays open, a mismatched pair closes after 1 second; other cards are locked meanwhile.
- Move and found-pair counters.
- Win modal with the final number of moves, "New game" and "Close" buttons.
- Leaderboard with the 10 best results (moves and date), saved in `localStorage`.
- "New game" restarts instantly without page reload, even while a mismatched pair is still visible.
- Modals close with the "Close" button, a backdrop click or Escape; the page behind them is not interactive and does not scroll.
- The whole UI is generated with `document.createElement`: `index.html` has only a `<script>` tag in `<body>`.

## Run locally

The app uses ES modules, so it must be served over HTTP: opening `index.html` directly from the file system (`file://`) will not work.

1. Clone the repository and switch to the `memory-game` branch:

   ```bash
   git clone https://github.com/KirillKolchanov/memory-game.git
   cd memory-game
   git checkout memory-game
   ```

2. Start any static server from the project root, for example:
   - VS Code: install the **Live Server** extension, right-click `index.html` → **Open with Live Server**;
   - Node.js: `npx serve .`
   - Python: `python3 -m http.server 8080`

3. Open the address printed by the server (for Python: <http://localhost:8080>).

No build step or dependency installation is needed.

## Project structure

```
├── index.html               # empty <body> with the module script only
├── styles/style.css
├── assets/images/           # dog photos (WebP)
└── src/
    ├── main.js              # entry point: wires components and game logic
    ├── constants.js
    ├── data/cards.js        # card set
    ├── game/
    │   ├── deck.js          # builds a shuffled deck of pairs
    │   └── game.js          # game state and rules, no DOM access
    ├── storage/
    │   └── leaderboard.js   # localStorage read/write, sorting, top 10
    ├── components/          # header, stats, board, card, shared modal, win and leaderboard modals
    └── utils/               # createElement helper, shuffle, date formatting
```

## Image credits

Dog photos are taken from [Unsplash](https://unsplash.com/license) and [Pexels](https://www.pexels.com/license/) (free to use), cropped, resized and converted to WebP.

| Card | Author | Source |
|---|---|---|
| Shiba Inu | [Minh Pham](https://unsplash.com/@minhphamdesign) | [Unsplash](https://unsplash.com/photos/orange-dog-RSiqCjdmKPM) |
| Staffordshire Terrier | Dana Ciurumelea | [Pexels](https://www.pexels.com/photo/close-up-photo-of-a-dog-10979190/) |
| Corgi | [Joycelyn Hung](https://unsplash.com/@jhungvisuals) | [Unsplash](https://unsplash.com/photos/a-brown-and-white-dog-sitting-on-top-of-a-white-floor-50birCocEv0) |
| West Highland White Terrier | Luc AVE | [Pexels](https://www.pexels.com/photo/adorable-west-highland-white-terrier-puppy-outdoors-31934792/) |
| Australian Shepherd | [Holly Spangler](https://unsplash.com/@h_spangler) | [Unsplash](https://unsplash.com/photos/a-dog-lying-in-the-grass-_39Mv1OoSsY) |
| Dachshund | [Khalid Elkady](https://unsplash.com/@k2kd36) | [Unsplash](https://unsplash.com/photos/a-small-brown-dog-sitting-on-top-of-a-white-floor-VA1JRsFJd70) |
| Toy Poodle | [Ramiro Pianarosa](https://unsplash.com/@rpianarosa) | [Unsplash](https://unsplash.com/photos/a-small-dog-looking-up-pRhZHhixRIY) |
| Golden Retriever | [Faber Leonardo](https://unsplash.com/@faberleonardo) | [Unsplash](https://unsplash.com/photos/a-close-up-of-a-dog-with-a-white-background-EVJZJ7_6CLY) |
