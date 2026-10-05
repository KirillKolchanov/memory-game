import { createElement } from '../utils/createElement.js';

/**
 * Creates the page header with game controls. Actions are passed in as callbacks.
 */
export function createHeader({ onNewGame }) {
  return createElement(
    'header',
    { className: 'header' },
    createElement('h1', { className: 'header__title', text: 'Memory Game' }),
    createElement(
      'div',
      { className: 'header__actions' },
      createElement('button', {
        className: 'btn',
        text: 'Новая игра',
        attrs: { type: 'button' },
        events: { click: onNewGame },
      }),
    ),
  );
}
