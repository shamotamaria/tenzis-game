import React from "react"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"
import Die from "./components/Die"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allIsHeld = dice.every(el => el.isHeld)
        const firstVal = dice[0].value
        const allHasSameValue = dice.every(el => el.value === firstVal)

        setTenzies(allIsHeld && allHasSameValue)

    }, [dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        } else {
            setDice(allNewDice())
        }

    }

    function holdDice(id) {
        setDice(prevDice => {
            return prevDice.map((oldDie) => {
                if (oldDie.id === id) {
                    return {
                        ...oldDie,
                        isHeld: !oldDie.isHeld
                    }
                } else {
                    return oldDie
                }
            })
        })
    }
    const diceElements = dice.map((die) => {
        return(
            <Die
                value={die.value}
                key={die.id}
                id={die.id}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />)
    })

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button onClick={rollDice} className="roll-button">{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
