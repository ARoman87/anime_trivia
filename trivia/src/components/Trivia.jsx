import React from "react"


export default function Trivia(props) {

    function styler(option,index){
        if (props.showAnswers === true)
        {
            if(props.question.correct_answer === option)
            {
                return({backgroundColor: "#94D7A2", color: "black", border: "3px black solid"})
            }else if(props.question.selected_answer === index)
            {
                return({backgroundColor: "#F8BCBC", color: "gray", border: "1px gray solid"})
            }else{
                return({backgroundColor: "#F0F0F0", color: "gray", border: "1px gray solid"})
            }
        }else {
            return(props.question.selected_answer === index ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
    }

    const options = props.question.options.map((option, index) => 
    <button
        className="choices"
        onClick={(event) => props.selectAnswer(event,props.id,index)}
        key={index}
        dangerouslySetInnerHTML={{__html: option}}
        style={styler(option, index)}
        disabled={props.showAnswers}
        ></button>)

    
    return (
        <div>
            <div className="triviaMain">
                
                <div className="question" dangerouslySetInnerHTML={{__html: props.question.question}}></div>
                <div className="buttons">
                    {options}
                
                </div>
                
                

                
                
            </div>
        </div>
    )
}