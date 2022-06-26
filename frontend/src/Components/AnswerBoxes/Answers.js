import react, {useState, useEffect} from 'react';
import '../../App.css';

const AnswerBoxes = (props) => {
	const { row } = props;
	const { boardstate: boardState, currentbox: currentBox, wordoftheday: wordOfTheDay } = props;
	
	let bs = boardState;
	
	/*useEffect(() => {
		for(let i = 0; i < currentBox["Col"]; i++) {
			if(boardState[currentBox["Row"]][i].letter == wordOfTheDay.Word[i]) {
				bs[currentBox["Row"]][i].correct = 1;
			}
			else if(wordOfTheDay.Word.includes(boardState[currentBox["Row"]][i].letter)) {
				bs[currentBox["Row"]][i].correct = 2;
			}
		}
	}, [boardState, currentBox, wordOfTheDay]);*/
	
	const colorShow = (cc) => {
		if(boardState[row][cc].correct == 1) {
			return "boxes boxesCorrect";
		}
		else if(boardState[row][cc].correct == 2) {
			return "boxes boxesExist";
		}
		else if(boardState[row][cc].correct == 0) {
			return "boxes boxesUnanswered";
		}
	}
	
	return( //entire object return
		<>
			{boardState && [0,1,2,3,4].map(function(currCol) {
					return( //map return
						<div key={"box" + row + "" + currCol}>
							<div className={colorShow(currCol)} id={row + "x" + currCol}>{boardState[row][currCol].letter}</div>
						</div>
					)
				})
			}
		</>
	)
}

export default AnswerBoxes;