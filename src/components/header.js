import { createElement } from '../utils/createElement.js';

function createHeaderButton(text, onClick) {
  return createElement('button', {
    className: 'btn',
    text,
    attrs: { type: 'button' },
    events: { click: onClick },
  });
}

/**
 * Creates the page header with game controls. Actions are passed in as callbacks.
 */
export function createHeader({ onNewGame, onShowLeaderboard }) {
  return createElement(
    'header',
    { className: 'header' },
    createElement('h1', { className: 'header__title', text: 'Memory Game' }),
    createElement(
      'div',
      { className: 'header__actions' },
      createHeaderButton('Новая игра', onNewGame),
      createHeaderButton('Таблица лидеров', onShowLeaderboard),
    ),
  );
}
