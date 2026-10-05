import { createElement } from '../utils/createElement.js';

const CLOSED_CARD_LABEL = 'Закрытая карточка';

/**
 * Syncs card element classes and accessible name with card state.
 */
export function updateCard(element, card) {
  const isVisible = card.isOpen || card.isMatched;

  element.classList.toggle('is-open', isVisible);
  element.classList.toggle('is-matched', card.isMatched);
  element.disabled = card.isMatched;
  element.setAttribute('aria-label', isVisible ? card.name : CLOSED_CARD_LABEL);
}

/**
 * Creates a card element: a button with a shared back side and a hidden front side.
 */
export function createCard(card) {
  const element = createElement(
    'button',
    {
      className: 'card',
      attrs: { type: 'button', 'data-uid': card.uid },
    },
    createElement('span', { className: 'card__back' }),
    createElement(
      'span',
      { className: 'card__front' },
      createElement('img', { className: 'card__image', attrs: { src: card.image, alt: '' } }),
    ),
  );

  updateCard(element, card);

  return element;
}
