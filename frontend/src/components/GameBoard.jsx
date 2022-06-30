import LetterSquare from './LetterSquare';

const GameBoard = () =>  {
  const tempBoard = [
    [ 'A', 'B', 'C', 'D' ],
    [ 'E', 'F', 'G', 'H' ],
    [ 'I', 'J', 'K', 'L' ],
    [ 'M', 'N', 'O', 'P' ]
  ]

  return (
    <div className="flex flex-col justify-center items-center space-y-4 m-6">
      {tempBoard.map((row, rowIndex) => (
        <div className="flex justify-center items-center space-x-4" key={rowIndex}>
          {row.map((letter, columnIndex) => (
            <LetterSquare value={letter} key={`${rowIndex}-${columnIndex}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
