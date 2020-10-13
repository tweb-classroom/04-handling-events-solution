import Message from './message.js';
import { keysValues } from './constants.js';

/**
 * A function that listen to keyboard events.
 * @param listener
 */
function keyboard(listener) {
  // TODO: implement a function that filters keyboard events and pass them to the listener
  const listenedKeysList = new Set([
    keysValues.arrowLeft,
    keysValues.arrowRight,
    keysValues.arrowUp,
    keysValues.arrowDown,
    keysValues.space,
  ]);
  const downKeys = new Set();
  window.addEventListener('keydown', (event) => {
    const { key } = event;
    if (listenedKeysList.has(key)) {
      event.preventDefault();
      if (!downKeys.has(key)) {
        downKeys.add(key);
        listener(new Message(event.type, event.key));
      }
    }
  });
  window.addEventListener('keyup', (event) => {
    const { key } = event;
    event.preventDefault();
    if (downKeys.has(key)) {
      downKeys.delete(key);
      listener(new Message(event.type, event.key));
    }
  });
}

export default keyboard;
