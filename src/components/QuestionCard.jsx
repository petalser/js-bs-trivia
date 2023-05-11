import React from "react";


export default function QuestionCard ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions}) {
        return (
            <>
                <p className="px-3 lead">
                    Qustion: {questionNr}/{totalQuestions}</p>
                <p className='mx-auto lead'>{question}</p>
                <ul className="list-group w-100">
                    {answers.map(answer => (
                       <div  key={answer}>
                       <button className="btn btn-primary w-100 m-1" disabled={!!userAnswer} value={answer} onClick={callback}>
                           <span dangerouslySetInnerHTML={{ __html: answer}} />
                       </button>
                   </div>
                       
                       // <li className="list-group-item w-50 mx-auto my-1" key={answer}>
                        //     <button className="text-primary" disabled={!userAnswer} value={answer} onClick={callback}>
                        //         {answer}
                        //     </button>
                        // </li>
                    ))}
                </ul>
            </>
        );
    } 

