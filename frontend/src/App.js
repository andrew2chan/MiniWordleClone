import './App.css';
import react, {useState, useEffect} from 'react';
import AnswerBoxes from './Components/AnswerBoxes/Answers';
import Keyboard from './Components/Keyboard/Keyboard';

function App() {
	const [boardState, updateBoardState] = useState();
	const [currentBox, updateCurrentBox] = useState({"Row": 0, "Col": 0});
	const [errorMessage, updateErrorMessage] = useState();
	const [wordOfTheDay, updateWordOfTheDay] = useState();
	
	useEffect(() => {
		let initArray = [];
		
		for(let i = 0; i < 6; i++) {
			initArray.push(new Array(5));
		}
		
		for(let i = 0; i < 6; i++) {
			for(let k = 0; k < 5; k++) {
				initArray[i][k] = {"letter": "", "correct": 0};
			}
		}
		
		fetch("http://localhost:8080/WordOfTheDay", {
			method: "GET"
		}).then(response => response.json())
		.then(data => {
			updateWordOfTheDay(data);
		});
		
		updateBoardState(initArray);
	}, []);
	
	console.log(wordOfTheDay);
	console.log(boardState);
	
	return (
	<div className="App">
		{[0,1,2,3,4,5].map(function(currRow) {
			return (
				  <header className="App-header" key={currRow}>
					<AnswerBoxes row={currRow} boardstate={boardState} currentbox={currentBox} wordoftheday={wordOfTheDay} />
				  </header>
			  )
			})
		}
		<header className="App-header">
			<div className="error" id="errormessage">{errorMessage}</div>
		</header>
		<header className="App-header keyboardAppHeader">
			<Keyboard boardstate={boardState} updateboardstate={updateBoardState} currentbox={currentBox} updatecurrentbox={updateCurrentBox} updateerrormessage={updateErrorMessage} wordoftheday={wordOfTheDay} />
		</header>
	</div>
	);
}

export default App;
