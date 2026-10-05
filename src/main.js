// App entry point: builds the UI and starts the first game.
import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { createBoard } from './components/board.js';
import { createElement } from './utils/createElement.js';

const board = createBoard({ onCardClick: (uid) => game.handleCardClick(uid) });

const game = createGame({
  cards: CARDS,
  onRender: board.render,
  onCardUpdate: board.updateCard,
  // Counters and win modal come in the next steps
  onStatsUpdate: () => {},
  onWin: () => {},
});

const app = createElement('main', { className: 'app' }, board.element);

document.body.append(app);
game.start();
