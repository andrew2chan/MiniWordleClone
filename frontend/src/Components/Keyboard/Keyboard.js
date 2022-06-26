import react from 'react';
import '../../App.css';

const keyboardKeys = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","Remove last character", "Enter"];

const keyboard = (props) => {
	const { boardstate: boardState, updateboardstate: updateBoardState, currentbox: currentBox, updatecurrentbox: updateCurrentBox, updateerrormessage: updateErrorMessage, wordoftheday: wordOfTheDay} = props;
	
	const handleClickKeyboard = (e) => {
		let currentClicked = e.target.innerText;
		let bs = boardState;
		
		if(currentClicked == "Remove last character") {
			if(currentBox["Col"] > 0) {
				bs[currentBox["Row"]][currentBox["Col"] - 1].letter = "";
				updateCurrentBox({...currentBox, "Col": currentBox["Col"] - 1})
				updateBoardState(bs);
			}
		}
		else if(currentClicked == "Enter") {
			if(bs[currentBox["Row"]].some(item => item.letter == "")) {
				updateErrorMessage("Please make sure to choose 5 letters");
			}
			else {
				for(let i = 0; i < currentBox["Col"]; i++) {
					if(boardState[currentBox["Row"]][i].letter == wordOfTheDay.Word[i]) {
						bs[currentBox["Row"]][i].correct = 1;
					}
					else if(wordOfTheDay.Word.includes(boardState[currentBox["Row"]][i].letter)) {
						bs[currentBox["Row"]][i].correct = 2;
					}
				}
				
				updateErrorMessage("");
				updateCurrentBox({"Row": currentBox["Row"] + 1, "Col": 0})
			}
		}
		else {
			if(currentBox["Col"] < 5) {
				bs[currentBox["Row"]][currentBox["Col"]].letter = currentClicked;
				updateCurrentBox({...currentBox, "Col": currentBox["Col"] + 1})
				updateBoardState(bs);
			}
		}
	}
	
	return( // parent
		<>
			{keyboardKeys.map(function(currKey) {
					return(
						<div key={currKey}>
							<div className="boxes boxesUnanswered" id={currKey} onClick={handleClickKeyboard}>{currKey}</div>
						</div>
					)
				})
			}
		</>
	)
}

export default keyboard;