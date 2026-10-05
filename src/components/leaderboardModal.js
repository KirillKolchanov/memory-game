import { createElement } from '../utils/createElement.js';
import { formatDate } from '../utils/formatDate.js';

const COLUMNS = ['Место', 'Ходы', 'Дата'];

function createTable(results) {
  const head = createElement(
    'thead',
    {},
    createElement('tr', {}, ...COLUMNS.map((column) => createElement('th', { text: column, attrs: { scope: 'col' } }))),
  );

  // Results are already sorted, so the place is just the position in the list
  const rows = results.map((result, index) =>
    createElement(
      'tr',
      {},
      createElement('td', { text: index + 1 }),
      createElement('td', { text: result.moves }),
      createElement('td', { text: formatDate(result.date) }),
    ),
  );

  return createElement('table', { className: 'leaderboard' }, head, createElement('tbody', {}, ...rows));
}

/**
 * Opens the shared modal with the leaderboard table or an empty state message.
 */
export function showLeaderboardModal(modal, results) {
  const content =
    results.length > 0
      ? createTable(results)
      : createElement('p', { className: 'leaderboard__empty', text: 'Пока нет результатов' });

  modal.open({ title: 'Таблица лидеров', content });
}
