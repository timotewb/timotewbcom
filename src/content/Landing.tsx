import { useState, useEffect } from 'react';
import useGlobalKeyboardListener from './useGlobalKeyboardListener';
import useGlobalMouseClickListener from './useGlobalMouseClickListener';
import './Landing.css'

function Landing() {
    const [displayText, setDisplayText] = useState<string>('chur');
    const [keyString, setKeyString] = useState<string>('');
    const [mouseString, setMouseString] = useState<string>('');
    const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
    const [canChange, setCanChange] = useState<boolean>(true);

    useGlobalMouseClickListener((timeDifference) => {
      if (mouseString.length > 100){
        setMouseString("");
      }
      if (timeDifference < 100) {
        console.log('. Dot', timeDifference); // Dot
        setMouseString(mouseString => mouseString + ".");
      } else {
        console.log('- Dash', timeDifference); // Dash
        setMouseString(mouseString => mouseString + "-");
      }
      console.log(mouseString);
    });

    useGlobalKeyboardListener((event, currentKey) => {
      if (keyString.length > 100){
        setKeyString("");
      }
      setKeyString(keyString => keyString + currentKey);
      console.log(keyString);
          }, keyString);

    useEffect(() => {
        if (keyString === 'chur' && canChange) {
          setKeyString("");
          setCanChange(false);
          setShouldFadeOut(true);
          setTimeout(() => {
            setDisplayText('chur bro'); // Change to the next text after delay
            setShouldFadeOut(false);
          }, 2000); // Delay to allow fade-out animation
        }
        if (mouseString === "-.-." && canChange){
          setMouseString("");
          setCanChange(false);
          setShouldFadeOut(true);
          setTimeout(() => {
            setDisplayText('chur bro'); // Change to the next text after delay
            setShouldFadeOut(false);
          }, 2000); // Delay to allow fade-out animation

        }
      }, [keyString, mouseString, canChange]);

  return (
    <p>
<p className={`fade ${shouldFadeOut ? 'fade-out' : ''}`}>{displayText}</p>
    </p>
  );
}

export default Landing;


