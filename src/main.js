// App entry point: builds the UI and starts the first game.
import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { createBoard } from './components/board.js';
import { createHeader } from './components/header.js';
import { showLeaderboardModal } from './components/leaderboardModal.js';
import { createModal } from './components/modal.js';
import { createStats } from './components/stats.js';
import { showWinModal } from './components/winModal.js';
import { getResults, saveResult } from './storage/leaderboard.js';
import { createElement } from './utils/createElement.js';

// Arrow wrappers defer access to `game`, which is declared below
const header = createHeader({
  onNewGame: () => game.start(),
  // Read storage on every open, so the table always shows fresh results
  onShowLeaderboard: () => showLeaderboardModal(modal, getResults()),
});
const board = createBoard({ onCardClick: (uid) => game.handleCardClick(uid) });
const stats = createStats();
const modal = createModal();

const game = createGame({
  cards: CARDS,
  onRender: board.render,
  onCardUpdate: board.updateCard,
  onStatsUpdate: stats.update,
  // Called once per finished game, so the result is saved exactly once
  onWin: (moves) => {
    saveResult(moves);
    showWinModal(modal, { moves, onNewGame: () => game.start() });
  },
});

const app = createElement('main', { className: 'app' }, stats.element, board.element);

document.body.append(header, app, modal.element);
game.start();
