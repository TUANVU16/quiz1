import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";
import AnswerTimer from "./AnswerTimer/AnswerTimer";


const Quiz = ({questions}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] =useState(null);
    const [answer, setAnswer] =useState("");
    const [result, setResult] = useState(resultInitialState);
    const [showresult, setShowresult] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true)



    const {question, choices, correctAnswer} = questions[currentQuestion];
    const questionLength = questions.length;

    const onAnswerClick = (answer, index) =>{
        setAnswerIdx(index);
        if(answer === correctAnswer){
            setAnswer(true);
        }else{
            setAnswer(false);
        }
    }

    const onTryAgain = () =>{
        setResult(resultInitialState);
        setShowresult(false);
       
        
    }

    const onClickNext = (finalAnswer) =>{
        setAnswerIdx(null);
        setShowAnswerTimer(false)
        setResult((prev) => finalAnswer ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers +1
        } : {
            ...prev,
            wrongAnswers: prev.wrongAnswers +1
        });

        if(currentQuestion !== questionLength -1){
            setCurrentQuestion((prev) => prev +1);
        }else{
            setCurrentQuestion(0);
            setShowresult(true);
        }

        setTimeout(() =>{
            setShowAnswerTimer(true);

        })
    }

    const handleTimeUp = () =>{
        setAnswer(false);
        onClickNext(false);
       

    }

    return (
        <div className="quiz-container">
            {!showresult ? (
            <>
                {showAnswerTimer && <AnswerTimer duration={5} onTimeUp={handleTimeUp}/>}
                <span className="active-question-no">{currentQuestion +1}</span>
                <span className="total-question">/{questionLength}</span>
                <h2>{question}</h2>
                <ul>
                    {
                        choices.map((answer, index) =>(
                            <li 
                            key={answer}
                            onClick={() => onAnswerClick(answer, index)}
                            className={answerIdx === index ? "selected-answer" : null}
                            >
                                {answer}
                            </li>
                        ))
                    }
                </ul>
                <div className="footer">
                    <button 
                        onClick={() =>onClickNext(answer)}
                        disabled = {answerIdx === null}
                    >
                        {currentQuestion === questions.length -1 ? "finish" : "next"}
                    </button>
                </div>

            </>
) : <div className="result">
    <h3>Result</h3>
    <p>
        Total Questions: <span>{questions.length}</span>
    </p>
    <p>
        Total Score: <span>{result.score}</span>
    </p>
    <p>
        Correct answer: <span>{result.correctAnswers}</span>
    </p>
    <p>
        Wrong answer: <span>{result.wrongAnswers}</span>
    </p>

     <button onClick={onTryAgain}>Try Again</button>               

</div> 
}
        </div>
    )
}

export default Quiz;