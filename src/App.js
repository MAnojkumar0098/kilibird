import React, { useState, useRef } from 'react';
import Btn from './btn.js';

export function App() {
  const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  const [effects, setEffects] = useState(alphabet.split('').reduce((acc, letter) => ({ ...acc, [letter]: 'black' }), {}));
  const [dis, setDis] = useState([]);
  const [disColors, setDisColors] = useState([]);
  let newDis,key;
  const [content, setContent] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const[wpm,setWpm]=useState(0);
  const audioRefs = useRef(alphabet.split('').reduce((acc, letter) => ({ ...acc, [letter]: React.createRef() }), {}));

  function fn(e) {
    setTimeout(() => {
      setEffects(alphabet.split('').reduce((acc, letter) => ({ ...acc, [letter]: 'black' }), {}));
    }, 100);
    if(e.key==='Backspace')
    {
      dis.pop();
    }
    if(e.key===' ')
    {
      dis.push(' ');
    }
    else{
    key = e.key.toUpperCase();
    newDis=[...dis,key];
    }
    if (!startTime) {
      setStartTime(new Date());
    }

    if(e.key===',')
    {
      dis.push(',');
    }

    // Check if the sentence is complete
    if (e.key==='.') {
      dis.push('.');
      setEndTime(new Date());
    }

      // Calculate time in seconds
      const timeInSeconds = (endTime - startTime) / 1000;

      const numberOfCorrectCharacters = dis.join('').toLowerCase().split('').filter((char, index) => char === content.toLowerCase()[index]).length;
      const set=Math.round((numberOfCorrectCharacters / 5) / (timeInSeconds / 60)); // Assuming an average word length of 5 characters
      setWpm(set);
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }if (alphabet.includes(key) && audioRefs.current[key]) {
    audioRefs.current[key].current.play();
    setEffects((prevEffects) => ({ ...prevEffects, [key]: getRandomColor() }));
    setDis([...dis, key]);
    const lowerCaseContent = content.toLowerCase();  // Convert content to lowercase
    const lowerCaseNewDis = newDis.join('').toLowerCase();  // Convert newDis to lowercase
  
    if (lowerCaseContent.startsWith(lowerCaseNewDis)) {
      // The typed part matches the beginning of the content
      // Set the color to black for all letters in newDis
      setDisColors(Array(newDis.length).fill('black'));
    } else {
      // The typed part does not match the beginning of the content
      // Set the color to red for the letters that do not match
      setDisColors(newDis.map((letter, index) => (letter.toLowerCase() === lowerCaseContent[index] ? 'black' : 'red')));
    }
  }
  
  }

 
  function sentence(){
    var verbs, nouns, adjectives, adverbs, preposition;
    nouns = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
    verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"];
    adjectives = ["beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy"];
    adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];
    preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];
      var rand1 = Math.floor(Math.random() * 10);
      var rand2 = Math.floor(Math.random() * 10);
      var rand3 = Math.floor(Math.random() * 10);
      var rand4 = Math.floor(Math.random() * 10);
      var rand5 = Math.floor(Math.random() * 10);
      var rand6 = Math.floor(Math.random() * 10);
      //                var randCol = [rand1,rand2,rand3,rand4,rand5];
      //                var i = randGen();
      setContent((prevContent) =>
      "the " +
      adjectives[rand1] +
      " " +
      nouns[rand2] +
      " " +
      adverbs[rand3] +
      " " +
      verbs[rand4] +
      " because some " +
      nouns[rand1] +
      " " +
      adverbs[rand1] +
      " " +
      verbs[rand1] +
      " " +
      preposition[rand1] +
      " a " +
      adjectives[rand2] +
      " " +
      nouns[rand5] +
      " which, became a " +
      adjectives[rand3] +
      ", " +
      adjectives[rand4] +
      " " +
      nouns[rand6] +
      "..".toUpperCase()
    );
  }
  return (
    <>
      <div className='App' tabIndex={0} onKeyDown={fn} id='sent'>
        <div id='type'>   {dis.map((letter, index) => (
            <span key={index} style={{ color: disColors[index] }}>
              {letter.toLowerCase()}
            </span>
          ))}</div>
        {Object.keys(audioRefs.current).map((letter) => (
          <audio key={letter} ref={audioRefs.current[letter]} src={`${letter.toLowerCase()}-audio.mp3`} type="audio/mp3" />
        ))}
        <div id='sentence' onClick={sentence}>
          {content}
        </div>
      <div id={wpm?'wpm':'wm'}>WPM:{wpm}</div>
      </div>
      <div id='display' className='keyboard-base'>
        {alphabet.split('').map((letter) => (
          <Btn key={letter} alpha={letter} effect={effects[letter]} />
        ))}
      </div>
    </>
  );
}

export default App;
