import React, { useState, useEffect } from 'react'
import './Game.css'

const Game = ({ hours, minutes, seconds, incTime, myKey }) => {
    const convertTime = (hours, minutes, seconds) => {
        return Number(Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
    }

    const [volumeClass, setVolumeClass] = useState('fa-solid fa-volume-xmark');
    const [clockState, setClockState] = useState('fa-solid fa-play inactiveIcon');
    const [player1Time, setPlayer1Time] = useState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });
    const [player2Time, setPlayer2Time] = useState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });
    const [activePlayer, setActivePlayer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [actualInterval, setActualInterval] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [increTime, setIncreTime] = useState(null);
    const [moves, setMoves] = useState(0);
    const [isThereAWinner, setIsThereAWinner] = useState(0);


    const handleVolumeClick = () => {
        if (volumeClass === 'fa-solid fa-volume-xmark') {
            setVolumeClass('fa-solid fa-volume-high');
        }
        else {
            setVolumeClass('fa-solid fa-volume-xmark');
        }
    };

    const addIncrement = () => {
        if (moves != 0) {
            if (activePlayer == 1) {
                setPlayer1Time(previousTime => {
                    if (Number(Number(previousTime.seconds) + Number(increTime)) >= 60) {
                        return {
                            ...previousTime,
                            minutes: Number(Number(previousTime.minutes) + 1),
                            seconds: Number((Number(previousTime.seconds) - 60) + Number(increTime))
                        }
                    }
                    else {
                        return {
                            ...previousTime,
                            seconds: Number(Number(previousTime.seconds) + Number(increTime))
                        }
                    }
                })
            }
            else {
                setPlayer2Time(previousTime => {
                    //0:5:!6
                    if (Number(Number(previousTime.seconds) + Number(increTime)) >= 60) {
                        return {
                            ...previousTime,
                            minutes: Number(Number(previousTime.minutes) + 1),
                            seconds: Number((Number(previousTime.seconds) - 60) + Number(increTime))
                        }
                    }
                    else {
                        return {
                            ...previousTime,
                            seconds: Number(Number(previousTime.seconds) + Number(increTime))
                        }
                    }
                })
            }
        }
        setMoves(moves + 1);
    };

    const handleGameStateClick = (id) => () => {
        if (isPaused == false) {
            if (id == '1') {
                if (activePlayer != 2) {
                    setActivePlayer(2);
                    addIncrement();
                }
                if (!isRunning) {
                    setIsRunning(!isRunning);
                    changeStateIcon();
                }
            } else if (id == '2') {
                if (activePlayer != 1) {
                    setActivePlayer(1);
                    addIncrement();
                }
                if (!isRunning) {
                    setIsRunning(!isRunning);
                    changeStateIcon();
                }
            }
            else {
                setIsRunning(!isRunning);
                setIsPaused(true);
                changeStateIcon();
            }
        }
        else {
            if (id == '3') {
                setIsPaused(false);
                changeStateIcon();
                setIsRunning(!isRunning);
            }
        }
    };

    const handleRestart = () => {
        setPlayer1Time({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
        setPlayer2Time({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
        setIsRunning(false);
        setIsPaused(false);
        setMoves(0);
        setIncreTime(null);
        setClockState('fa-solid fa-play inactiveIcon');
        setActivePlayer(0);
    }

    const changeStateIcon = () => {
        if (clockState === 'fa-solid fa-play inactiveIcon') {
            setClockState('fa-solid fa-pause activeIcon');
        }
        else if (clockState === 'fa-solid fa-play activeIcon') {
            setClockState('fa-solid fa-pause activeIcon');
        }
        else {
            setClockState('fa-solid fa-play activeIcon');
        }
    }

    const showWinner = () => {
        setIsRunning(false);
        if (player1Time.hours === 0 && player1Time.minutes === 0 && player1Time.seconds === 0) {
            setIsThereAWinner(1);
        }
        else if (player2Time.hours === 0 && player2Time.minutes === 0 && player2Time.seconds === 0) {
            setIsThereAWinner(1);
        }
    };


    useEffect(() => {
        if (increTime === null) {
            setIncreTime(incTime);
        }
        if (moves > 0) {

        }
        if (isRunning) {
            if (activePlayer == 1) {
                clearInterval(actualInterval);
                setActualInterval(setInterval(() => {
                    convertTime(setPlayer1Time(previousTime => {
                        if (previousTime.seconds === 0) {
                            if (previousTime.minutes === 0) {
                                if (previousTime.hours === 0) {
                                    showWinner();
                                }
                                else {
                                    return {
                                        ...previousTime,
                                        hours: previousTime.hours - 1,
                                        minutes: 59,
                                        seconds: 59
                                    }
                                }
                            }
                            else {
                                return {
                                    ...previousTime,
                                    minutes: previousTime.minutes - 1,
                                    seconds: 59
                                }
                            }
                        }
                        else {
                            return {
                                ...previousTime,
                                seconds: previousTime.seconds - 1
                            }
                        }
                    }));
                }, 1000));
            }
            else {
                clearInterval(actualInterval);
                setActualInterval(setInterval(() => {
                    convertTime(setPlayer2Time(previousTime => {
                        if (previousTime.seconds === 0) {
                            if (previousTime.minutes === 0) {
                                if (previousTime.hours === 0) {
                                    showWinner();
                                }
                                else {
                                    return {
                                        ...previousTime,
                                        hours: previousTime.hours - 1,
                                        minutes: 59,
                                        seconds: 59
                                    }
                                }
                            }
                            else {
                                return {
                                    ...previousTime,
                                    minutes: previousTime.minutes - 1,
                                    seconds: 59
                                }
                            }
                        }
                        else {
                            return {
                                ...previousTime,
                                seconds: previousTime.seconds - 1
                            }
                        }
                    }));
                }, 1000));
            }
        } else {
            clearInterval(actualInterval);
        }
    }, [isRunning, activePlayer, player1Time, player2Time]);


    return (
        <>
            <main className={`container ${!isThereAWinner ? "showWinner" : "hideWinner"}`}>
                {/* la mitad de arriba */}
                <div className={`${activePlayer === 1 ? "half top active" : "half top"}`}
                    onClick={handleGameStateClick(1)}>
                    <div>
                        <h2>{player1Time?.hours}:{player1Time?.minutes}:{player1Time?.seconds}</h2>
                    </div>
                </div>


                {/* la barra de configuracion */}
                <div className="config-bar">
                    <i className="fa-solid fa-arrow-rotate-right" onClick={handleRestart}></i>
                    <i className={clockState} onClick={handleGameStateClick(3)} ></i>

                    <i className={volumeClass} onClick={handleVolumeClick} ></i>

                    <i className="fa-solid fa-house" onClick={(e) => {
                        window.location.reload();
                    }} ></i>
                </div>


                {/* la mitad de abajo */}
                <div className={`${activePlayer === 2 ? "half bottom active" : "half bottom"}`}
                    onClick={handleGameStateClick(2)}>
                    <div>
                        <h2>{player2Time?.hours}:{player2Time?.minutes}:{player2Time?.seconds}</h2>
                    </div>
                </div>


            </main>
            <div className={`winnerContainer ${!isThereAWinner ? "hideWinner" : "showWinner"}`}>
                <div className="trophies">
                    <i className="fa-solid fa-trophy fa-bounce"></i>
                    <h2>You Win!</h2>
                    <i className="fa-solid fa-trophy fa-bounce"></i>
                </div>
                <p>Player {activePlayer} won.</p>
                <button onClick={(e) => {
                    window.location.reload();
                }}>Play Again</button>
            </div>
        </>
    );
}

export default Game