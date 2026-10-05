import { MISMATCH_DELAY } from '../constants.js';
import { createDeck } from './deck.js';

/**
 * Creates game logic. Knows nothing about DOM: reports every change through callbacks.
 */
export function createGame({ cards, onRender, onCardUpdate, onStatsUpdate, onWin }) {
  const totalPairs = cards.length;
  let state = null;

  function getStats() {
    return { moves: state.moves, matchedPairs: state.matchedPairs, totalPairs };
  }

  function start() {
    state = {
      deck: createDeck(cards),
      firstCard: null,
      moves: 0,
      matchedPairs: 0,
      isFinished: false,
    };

    onRender(state.deck);
    onStatsUpdate(getStats());
  }

  function finish() {
    state.isFinished = true;
    onWin(state.moves);
  }

  function closeCards(...pair) {
    pair.forEach((card) => {
      card.isOpen = false;
      onCardUpdate(card);
    });
  }

  function handleCardClick(uid) {
    // Ignore clicks that must not change the game
    if (state.isFinished) return;

    const card = state.deck.find((item) => item.uid === uid);
    if (!card || card.isOpen || card.isMatched) return;

    card.isOpen = true;
    onCardUpdate(card);

    // First card of the move: wait for the second one
    if (!state.firstCard) {
      state.firstCard = card;
      return;
    }

    // Second card: the move counts regardless of the result
    const { firstCard } = state;
    state.firstCard = null;
    state.moves += 1;

    if (firstCard.id === card.id) {
      firstCard.isMatched = true;
      card.isMatched = true;
      onCardUpdate(firstCard);
      onCardUpdate(card);
      state.matchedPairs += 1;
      onStatsUpdate(getStats());

      if (state.matchedPairs === totalPairs) {
        finish();
      }
      return;
    }

    onStatsUpdate(getStats());
    setTimeout(() => closeCards(firstCard, card), MISMATCH_DELAY);
  }

  return { start, handleCardClick };
}
