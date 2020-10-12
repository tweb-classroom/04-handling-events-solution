import { Message } from './message.js';

/**
 * A function that listen to keyboard events.
 * @param listener
 */
function keyboard(listener) {
    const keys = new Set([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
    const downKeys = new Set();
    window.addEventListener('keydown', (event) => {
        const { key } = event;
        if (keys.has(key)) {
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
