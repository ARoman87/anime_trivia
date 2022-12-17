import React, { Fragment } from "react"
import './App.css'
import Start from "./components/Start"
import Trivia from "./components/Trivia"
import {nanoid} from "nanoid"


function App() {

  const [trivia, setTrivia] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
      .then(res => res.json())
      .then(data => setTrivia(data.results))
  }, [])


  const element = trivia.map(x => {
    const answers = [...x.incorrect_answers, x.correct_answer]

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

    return <Trivia
      key={nanoid()}
      question = {x.question}
      choices = {shuffle(answers)}
      />
  })

  return (
    <div>
      <img src="./images/blobs.png" alt="" className="blob1"/>
      <img src="./images/blobs2.png" alt="" className="blob2"/>
      {/* <Start /> */}
      <div className="main">
        {element}
        <button className="check">Check Answers</button>
      </div>
    </div>
  )
}

export default App
