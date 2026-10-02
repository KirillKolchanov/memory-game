// App entry point: builds the UI and starts the first game.
import { CARDS } from './data/cards.js';
import { createDeck } from './game/deck.js';
import { createBoard } from './components/board.js';
import { createElement } from './utils/createElement.js';

// Card clicks are handled by game logic in the next step
const board = createBoard({ onCardClick: () => {} });
const app = createElement('main', { className: 'app' }, board.element);

document.body.append(app);
board.render(createDeck(CARDS));
