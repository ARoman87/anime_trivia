
export default function Trivia(props) {

    
    
    return (
        <div>
            <div className="triviaMain">
                
                <div className="question" dangerouslySetInnerHTML={{__html: props.question}}></div>
                <div className="buttons">
                    <button className="choices" dangerouslySetInnerHTML={{__html: props.choices[0]}}></button>
                    <button className="choices" dangerouslySetInnerHTML={{__html: props.choices[1]}}></button>
                    <button className="choices" dangerouslySetInnerHTML={{__html: props.choices[2]}}></button>
                    <button className="choices" dangerouslySetInnerHTML={{__html: props.choices[3]}}></button>
                </div>
                
                

                
                
            </div>
        </div>
    )
}