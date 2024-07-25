import { useEffect } from 'react';

// Adjust the type definition to match the expected parameters
type KeyboardEventHandler = (event: KeyboardEvent, keyString: string) => void;

export default function useGlobalKeyboardListener(handler: KeyboardEventHandler, initialKeyString: string = '') {
  useEffect(() => {
    function handleKeyEvent(event: KeyboardEvent) {
      // Now correctly passing the event object as the first argument
      handler(event, event.key); 
    }

    // Add the event listener
    window.addEventListener('keydown', handleKeyEvent);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [handler, initialKeyString]);
}
