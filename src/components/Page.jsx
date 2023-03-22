import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { getQuestions } from "./api"
import { useLoaderData, Link } from "react-router-dom"
import '../index.css'

export async function loader() {
    try {
        const data = await getQuestions();
        return data;
    }
    catch(err) {
        return { error: err }
    }
}

function Page() {
    const data = useLoaderData()
    const [checked, setChecked] = useState(false)
    const [count, setCount] = useState(0)
    const { width, height } = useWindowSize()

    const correctedData = data.map(el => ({
        id: nanoid(),
        question: el.question,
        correct: el.correct_answer,
        allAnswers: makeAnswer([...el.incorrect_answers, el.correct_answer].sort())
    }));

    const [questions, setQuestions] = useState(correctedData)

    function makeAnswer(arr) {
        const newArr = []
        arr.map(el => (
            newArr.push({
                id: nanoid(),
                answer: el,
                selected: false,
                tr: false
            })
        ))
        return newArr
    }
    
    function answerClicked(answerId, questionId) {
        setQuestions(questions.map(el => {
            if (el.id === questionId) {
                const allNew = el.allAnswers.map(e => {
                    if (e.id === answerId) {
                        if (e.answer === el.correct) {
                            return {
                                ...e,
                                selected: !e.selected,
                                tr: true
                            }
                        } else {
                            return {
                                ...e,
                                selected: !e.selected
                            }
                        }
                    } 
                    
                    else if (e.id !== answerId && e.answer === el.correct) {
                        return {
                            ...e,
                            tr: true
                        }
                    }
                    
                    else {
                        return e
                    }
                }
                )
                return {
                    ...el,
                    allAnswers: allNew
                }
            } else {
                return el
            }
            
        }))
    }

    function handleCheck() {
        setChecked(old => !old);
        questions.map(el => {
            el.allAnswers.map(e => {
                if (e.tr && e.selected) {
                    setCount(old => old + 1)
                }
            })
        })
    }

    function restartGame() {
        setChecked(old => !old)
        setCount(0)
        setQuestions(correctedData)
    }

    const displayQuestions = questions.map(el => {
        let res = el.allAnswers.map(e => {
            
            const sel = {
                backgroundColor: e.selected ? "#D6DBF5" : "transparent"
            }

            const truth = {
                backgroundColor: e.tr && e.selected || e.tr && !e.selected ? "#94D7A2" : e.selected && !e.tr ? "#F8BCBC" : "transparent"
            }

            return (
                <p 
                    key={e.id}
                    className="ans"
                    style={!checked ? sel : truth}
                    onClick={() => answerClicked(e.id, el.id)}
                >
                    {e.answer}
                </p>
            )
        })
        
        return (
                <div className="item" key={el.id}>
                    <h3 className="question">{el.question}</h3>
                    <div className="answers">
                        {res}
                    </div>
                    <hr />
                </div>
        )
    })

    return (
        <div className="container">
            {
                checked && count >= 4 ? 
                <Confetti
                    width={width}
                    height={height}
                /> 
                : ""
            }
            {displayQuestions}
            {
                checked && <p className="right-answers">Right answers: 
                    <span 
                        className={count < 3 ? "less-than-three" : "three-or-more"}
                    >
                        {count}
                    </span>/5
                </p>
            }

            <div className="links">
                <Link
                    to="."
                    onClick={!checked ? handleCheck : restartGame}
                    className="btn"
                >
                    {!checked ? "Check answers" : "Play again"}
                </Link>

                <Link
                    to=".."
                    className="btn"
                >
                    Exit
                </Link>
            </div>

        </div>
    )
}

export default Page
