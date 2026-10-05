import { LEADERBOARD_SIZE, LEADERBOARD_STORAGE_KEY } from '../constants.js';

function isValidResult(result) {
  return Number.isInteger(result?.moves) && result.moves > 0 && Number.isFinite(result?.date);
}

// Fewer moves first; on a tie the earlier game goes higher
function compareResults(a, b) {
  return a.moves - b.moves || a.date - b.date;
}

/**
 * Returns saved results sorted from best to worst. Broken or missing data gives an empty list.
 */
export function getResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEADERBOARD_STORAGE_KEY));
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidResult).sort(compareResults).slice(0, LEADERBOARD_SIZE);
  } catch {
    return [];
  }
}

/**
 * Adds a finished game result and keeps only the best ones.
 */
export function saveResult(moves) {
  // Dropping the 11th result is safe: results are only added, so it can never return to the top
  const results = [...getResults(), { moves, date: Date.now() }]
    .sort(compareResults)
    .slice(0, LEADERBOARD_SIZE);

  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Storage may be unavailable (private mode, quota): the game keeps working without saving
  }
}
