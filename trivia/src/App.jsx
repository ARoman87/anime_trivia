import React, { Fragment } from "react"
import './App.css'
import Start from "./components/Start"
import Trivia from "./components/Trivia"



function App() {

  const [questions, setQuestions] = React.useState([])
  const [showAnswers, setShowAnswers] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [showStart, setShowStart] = React.useState(true)
  const [allComplete, setAllComplete] = React.useState(false)


  function startQuiz() {
    setShowStart(false)
  }

  function playAgain() {
    setShowStart(true)
    setShowAnswers(false)
    setAllComplete(false)
  }

  function checkAnswers() {
    setShowAnswers(true)
  }

  function selectAnswer(event, quest_id, option_id) {
    setQuestions(function(prev) {
      return(questions.map(function(quest, qid) {
        if (quest_id === qid) {
          return({...quest, selected_answer: option_id})
        }
        else {
          return quest
        }
      }))
    })
  }


  React.useEffect(() => {
    if (showStart === false) {

    
    fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(function(question) {
        return({question: question.question,
                options:question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                selected_answer:undefined,
                correct_answer:question.correct_answer})
      })))
   }
  }, [showStart])

  React.useEffect(() => {
    var count = 0;
    for(var i = 0; i < questions.length; i++)
    {
      if (typeof questions[i].selected_answer !== 'undefined')
      {
        if(questions[i].options[questions[i].selected_answer] === questions[i].correct_answer)
        {
          count++;
        }
      }
    }
    setScore(count)
  },[showAnswers])

  React.useEffect( () => {
    setAllComplete(questions.every((quest) => typeof quest.selected_answer !== "undefined"))
  }, [questions])

  const quest = questions.map(function(question, index){
    return (<Trivia
      key={index}
      question = {question}
      showAnswers={showAnswers}
      selectAnswer={selectAnswer}
      id={index}
      />)
  })

  

  return (
    <div className="main">
      <img src="./images/blobs.png" alt="" className="blob1"/>
      <img src="./images/blobs2.png" alt="" className="blob2"/>
    
      
      {showStart ? <Start startQuiz={startQuiz}/> : 
      <div>
        {quest}
        {showAnswers ? 
        <div className="bottom"><h3 className="score">{"You scored " + score + "/5 correct answers"}</h3>
        <button className="check" onClick={playAgain}>Play Again</button></div>
        : 
        <div className="bottom"><button className="check" disabled={!allComplete} onClick={checkAnswers}>Check Answers</button></div>
      
        }
        
      </div>
      }
      
    </div>
  )
}

export default App
