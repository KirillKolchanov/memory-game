// App entry point: builds the UI and starts the first game.
import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { createBoard } from './components/board.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createElement } from './utils/createElement.js';

// Arrow wrappers defer access to `game`, which is declared below
const header = createHeader({ onNewGame: () => game.start() });
const board = createBoard({ onCardClick: (uid) => game.handleCardClick(uid) });
const stats = createStats();

const game = createGame({
  cards: CARDS,
  onRender: board.render,
  onCardUpdate: board.updateCard,
  onStatsUpdate: stats.update,
  // Win modal comes in the next steps
  onWin: () => {},
});

const app = createElement('main', { className: 'app' }, stats.element, board.element);

document.body.append(header, app);
game.start();
