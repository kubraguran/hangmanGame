
import { useState, useEffect } from 'react';
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Popup from './components/Popup';
import Notification from './components/Notification';
import Word from './components/Word';
import Figure from './components/Figure';
import {showNotification as show} from './components/helpers/helpers';
import style from './components/style/style.scss'


const words = ['cantaloupe', 'banana', 'avocado', 'blackberries'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect (() => {
    const handleKeyDown = event => {
      const {key, keyCode} = event;
      if(playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if(selectedWord.includes(letter)) {
          if(!correctLetters.includes(letter)){
            setCorrectLetters(currentLetters => [...currentLetters, letter])
          }else {
            show(setShowNotification);
          }
        }else {
          if(!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter])

          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [correctLetters, wrongLetters, playable]);

  function playAgain () {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
 
  }
  return (
    <>
       <Header />
    <div className="gameContainer">
       <Figure wrongLetters = {wrongLetters} />
      <WrongLetters wrongLetters = {wrongLetters}  />
      <Word selectedWord = {selectedWord} correctLetters = {correctLetters}/>
    </div>
    <Popup wrongLetters = {wrongLetters} correctLetters = {correctLetters} selectedWord = {selectedWord} setPlayable = {setPlayable} playAgain = {playAgain}/>
    <Notification showNotification = {showNotification} />

    </>
  );
}

export default App;
