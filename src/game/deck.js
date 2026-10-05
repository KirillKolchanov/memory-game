import { shuffle } from '../utils/shuffle.js';

/**
 * Builds a shuffled deck where every card from the set appears twice.
 */
export function createDeck(cards) {
  const pairs = [...cards, ...cards];

  const deck = pairs.map((card, index) => ({
    ...card,
    uid: index,
    isOpen: false,
    isMatched: false,
  }));

  return shuffle(deck);
}
