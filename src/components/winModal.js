import { createElement } from '../utils/createElement.js';

/**
 * Opens the shared modal with win content: final moves and a "New game" action.
 */
export function showWinModal(modal, { moves, onNewGame }) {
  const content = createElement(
    'div',
    { className: 'win' },
    createElement('p', { className: 'win__text', text: 'You found all pairs!' }),
    createElement(
      'p',
      { className: 'win__text', text: 'Moves: ' },
      createElement('strong', { text: moves }),
    ),
  );

  const newGameButton = createElement('button', {
    className: 'btn',
    text: 'New game',
    attrs: { type: 'button' },
    events: {
      click: () => {
        modal.close();
        onNewGame();
      },
    },
  });

  modal.open({ title: 'You win! 🎉', content, actions: [newGameButton] });
}
