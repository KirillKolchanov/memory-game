import { createElement } from '../utils/createElement.js';

const SCROLL_LOCK_CLASS = 'is-scroll-locked';

/**
 * Creates a reusable modal on top of <dialog>. The shell and the "Close" button are shared,
 * content and extra actions are passed to open() by each specific modal.
 */
export function createModal() {
  const title = createElement('h2', { className: 'modal__title', attrs: { id: 'modal-title' } });
  const body = createElement('div', { className: 'modal__body' });
  const actions = createElement('div', { className: 'modal__actions' });

  const closeButton = createElement('button', {
    className: 'btn btn--secondary',
    text: 'Close',
    attrs: { type: 'button' },
    events: { click: () => close() },
  });

  // Padding lives on the inner wrapper, so only a backdrop click targets the dialog itself
  const dialog = createElement(
    'dialog',
    { className: 'modal', attrs: { 'aria-labelledby': 'modal-title' } },
    createElement('div', { className: 'modal__inner' }, title, body, actions),
  );

  // Close on backdrop click only if the press also started there (not a text selection drag)
  let isPressedOnBackdrop = false;

  dialog.addEventListener('pointerdown', (event) => {
    isPressedOnBackdrop = event.target === dialog;
  });

  dialog.addEventListener('click', (event) => {
    if (isPressedOnBackdrop && event.target === dialog) {
      close();
    }
  });

  // Escape closes the dialog natively, bypassing close(), so unlock scroll on the event too.
  // The event is async: skip cleanup if the modal was reopened before it fired.
  dialog.addEventListener('close', () => {
    if (!dialog.open) {
      document.body.classList.remove(SCROLL_LOCK_CLASS);
    }
  });

  function open({ title: titleText, content, actions: extraActions = [] }) {
    title.textContent = titleText;
    body.replaceChildren(content);
    actions.replaceChildren(...extraActions, closeButton);

    document.body.classList.add(SCROLL_LOCK_CLASS);

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function close() {
    dialog.close();
    document.body.classList.remove(SCROLL_LOCK_CLASS);
  }

  return { element: dialog, open, close };
}
