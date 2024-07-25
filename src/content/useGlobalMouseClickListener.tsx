import { useEffect } from 'react';

// Adjust the type definition to match the expected parameters
type MouseClickHandler = (clickTimestamp: number) => void;

export default function useGlobalMouseClickListener(handler: MouseClickHandler) {
  useEffect(() => {
    let startTime: number | null = null;

    function handleClick(event: MouseEvent) {
      const currentTime = event.timeStamp;
      if (!startTime) {
        startTime = currentTime;
      } else {
        const timeDifference = currentTime - startTime;
        handler(timeDifference); // Pass the time difference to the handler
        startTime = null; // Reset for the next sequence
      }
    }

    // Add the event listener
    window.addEventListener('mousedown', handleClick); // Using mousedown for simplicity
    window.addEventListener('mouseup', handleClick); // Using mousedown for simplicity

  }, [handler]);
}
