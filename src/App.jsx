import { useState, useRef } from 'react'
import Game from './components/Game'
import './App.css'

function App() {
  const [showGame, setShowGame] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [incTime, setIncTime] = useState(0);
  const [fieldPrueba, setFieldPrueba] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowGame(true);
  };

  const handleValueChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFieldPrueba(fieldValue);

    switch (fieldName) {
      case "hours":
        setHour(fieldValue);
        break;

      case "minutes":
        setMinute(fieldValue);
        break;

      case "seconds":
        setSecond(fieldValue);
        break;

      case "increment":
        setIncTime(fieldValue);
        break;

      default:
        break;
    }
  }


  return (
    <>
      <div className={`mainMenuContainer-display-${!showGame}`}>
        <h2 className="title">Menu de configuracion</h2>
        <div className="configs">
          <form onSubmit={handleSubmit}>
            <label htmlFor="hours">Hours: </label>
            <select name="hours" id="hours" onChange={(e) => handleValueChange(e) }>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <label htmlFor="minutes">Minutes: </label>
            <select name="minutes" id="minutes" onChange={(e) => handleValueChange(e) }>
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>

            <label htmlFor="seconds">Seconds: </label>
            <select name="seconds" id="seconds" onChange={(e) => handleValueChange(e) }>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="30">30</option>
            </select>

            <label htmlFor="increment">Increment: </label>
            <select name="increment" id="increment" onChange={(e) => handleValueChange(e)}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>


            <div className="buttons">
              <button className="startGameBtn" type="submit">Comenzar partida</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`timer-${showGame}`}>
        <Game hours={hour} minutes={minute} seconds={second} incTime={incTime} key={fieldPrueba}/>
      </div>
    </>
  )
}

export default App