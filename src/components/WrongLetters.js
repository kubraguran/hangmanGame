import React from 'react'

const WrongLetters = ({wrongLetters}) => {
  return (
    <div className='wrongLettersContainer'>
      {/* ',' between letters */}
    {wrongLetters.length > 0 && <p className='wrongLetterHeader'>Wrong Letters</p>}
    {wrongLetters.map((letter, i) => <span key = {i} className='letterWrong'>{letter}</span>)
    .reduce((prev, curr) => prev === null ? [curr]: [prev, ', ' , curr] , null)}

    </div>
  )
}

export default WrongLetters