import { createElement } from '../utils/createElement.js';
import { createCard, updateCard } from './card.js';

/**
 * Creates the game board. Reports clicked card uid via onCardClick and knows nothing about game rules.
 */
export function createBoard({ onCardClick }) {
  const element = createElement('section', { className: 'board', attrs: { 'aria-label': 'Game board' } });
  const cardElements = new Map();

  // One delegated listener for all cards: survives re-renders on a new game
  element.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card');
    if (!cardElement) return;

    onCardClick(Number(cardElement.dataset.uid));
  });

  function render(deck) {
    cardElements.clear();

    const cards = deck.map((card) => {
      const cardElement = createCard(card);
      cardElements.set(card.uid, cardElement);
      return cardElement;
    });

    element.replaceChildren(...cards);
  }

  function update(card) {
    const cardElement = cardElements.get(card.uid);
    if (cardElement) {
      updateCard(cardElement, card);
    }
  }

  return { element, render, updateCard: update };
}
