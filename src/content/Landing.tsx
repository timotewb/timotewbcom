import { useState, useEffect } from 'react';
import useGlobalKeyboardListener from './useGlobalKeyboardListener';
import './Landing.css'

function Landing() {
    const [displayText, setDisplayText] = useState<string>('chur');
    const [keyString, setKeyString] = useState<string>('');
    const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
    const [canChange, setCanChange] = useState<boolean>(true);

    useGlobalKeyboardListener((event, currentKey) => {
      if (keyString.length > 10){
        setKeyString("");
      }
      setKeyString(keyString => keyString + currentKey);
      console.log(keyString);
          }, keyString);

    useEffect(() => {
        if (keyString === 'chur' && canChange) {
          setCanChange(false);
          setShouldFadeOut(true);
          setTimeout(() => {
            setDisplayText('chur bro'); // Change to the next text after delay
            setShouldFadeOut(false);
          }, 2000); // Delay to allow fade-out animation
        }
      }, [keyString, canChange]);

  return (
    <p>
<p className={`fade ${shouldFadeOut ? 'fade-out' : ''}`}>{displayText}</p>
    </p>
  );
}

export default Landing;


