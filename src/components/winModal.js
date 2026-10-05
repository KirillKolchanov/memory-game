import { createElement } from '../utils/createElement.js';

/**
 * Opens the shared modal with win content: final moves and a "New game" action.
 */
export function showWinModal(modal, { moves, onNewGame }) {
  const content = createElement(
    'div',
    { className: 'win' },
    createElement('p', { className: 'win__text', text: 'Вы нашли все пары!' }),
    createElement(
      'p',
      { className: 'win__text', text: 'Количество ходов: ' },
      createElement('strong', { text: moves }),
    ),
  );

  const newGameButton = createElement('button', {
    className: 'btn',
    text: 'Новая игра',
    attrs: { type: 'button' },
    events: {
      click: () => {
        modal.close();
        onNewGame();
      },
    },
  });

  modal.open({ title: 'Победа! 🎉', content, actions: [newGameButton] });
}
