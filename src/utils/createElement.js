/**
 * Creates a DOM element with optional classes, text, attributes, event listeners and children.
 */
export function createElement(tag, options = {}, ...children) {
  const { className, text, attrs = {}, events = {} } = options;
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  Object.entries(attrs).forEach(([name, value]) => {
    // Boolean attributes (disabled, hidden) are present or absent, never "false"
    if (value === false || value === null || value === undefined) return;
    element.setAttribute(name, value === true ? '' : value);
  });

  Object.entries(events).forEach(([type, handler]) => {
    element.addEventListener(type, handler);
  });

  // Skip empty children so conditional rendering (cond && el) works
  element.append(...children.filter((child) => child !== null && child !== undefined && child !== false));

  return element;
}
