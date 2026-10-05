import { createElement } from '../utils/createElement.js';

/**
 * Creates moves and pairs counters. Only displays values passed from game logic.
 */
export function createStats() {
  const movesValue = createElement('span', { className: 'stats__value', text: '0' });
  const pairsValue = createElement('span', { className: 'stats__value', text: '0' });

  const element = createElement(
    'div',
    { className: 'stats', attrs: { 'aria-live': 'polite' } },
    createElement('p', { className: 'stats__item', text: 'Ходы: ' }, movesValue),
    createElement('p', { className: 'stats__item', text: 'Пары: ' }, pairsValue),
  );

  function update({ moves, matchedPairs, totalPairs }) {
    movesValue.textContent = moves;
    pairsValue.textContent = `${matchedPairs} из ${totalPairs}`;
  }

  return { element, update };
}
