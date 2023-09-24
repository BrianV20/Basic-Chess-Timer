import React, { useState, useEffect } from 'react'
import './Game.css'

//1) hacer el timer. Deben aparecer los minutos y segundos en el formato mm:ss
// 2) separar la pantalla en dos, con la barra de configuracion en el medio.
// 3)el timer (componente que será cada mitad de la pantalla) debe recibir por props el tiempo y el incremento

//! hacer toda la logica del timer en Game.jsx. La logica de la configuacion (recibir el tiempo de los dropdowns y pasarlo al game.jsx) hacerla en el App.jsx.

const Game = ({ hours, minutes, seconds, keyy }) => {
    //desde el app.jsx pasar una string que va a ser = (minutes + ":" + seconds)

    const convertTime = (hours, minutes, seconds) => {
        return Number(Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
    }

    const convertHours = (hours) => {
        return Number(hours) * 3600;
    }

    const convertMinutes = (minutes) => {
        return Number(minutes) * 60;
    }

    const convertSeconds = (seconds) => {
        return Number(seconds);
    }

    const [ volumeClass, setVolumeClass ] = useState('fa-solid fa-volume-xmark');
    const [ clockState, setClockState ] = useState('fa-solid fa-play');
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
    const [key, setKey] = useState(keyy);


    const handleVolumeClick = () => {
        if(volumeClass === 'fa-solid fa-volume-xmark') {
            setVolumeClass('fa-solid fa-volume-high');
        }
        else {
            setVolumeClass('fa-solid fa-volume-xmark');
        }
    };

    const handleGameStateClick = (id) => () => {
        if(!isPaused) {
            if(id == '1') {
                if(activePlayer != 2) {
                    setActivePlayer(2);
                }
                if(!isRunning) {
                    setIsRunning(!isRunning);
                    changeStateIcon();
                }
            } else if(id == '2') {
                if(activePlayer != 1) {
                    setActivePlayer(1);
                }
                if(!isRunning) {
                    setIsRunning(!isRunning);
                    changeStateIcon();
                }
            }
            else {
                setIsRunning(!isRunning);
                setIsPaused(!isPaused);
                changeStateIcon();
            }
        }
        else {
            if(id == '3') {
                setIsPaused(!isPaused);
                changeStateIcon();
                setIsRunning(!isRunning);
            }
        }
        // setIsRunning(!isRunning);
    };

    const changeStateIcon = () => {
        if(clockState === 'fa-solid fa-play') {
            setClockState('fa-solid fa-pause');
        }
        else {
            setClockState('fa-solid fa-play');
        }
    }

    // make use of useEffect to make the timer work dont comment the code below
    useEffect(() => {
        setKey(key + 1);
        console.log("hours: ", hours, "minutes: ", minutes, "seconds: ", seconds);
        if(isRunning) {
            if(activePlayer == 1) {
                //make a function with setInterval that will decrease the time of player1
                clearInterval(actualInterval);
                 setActualInterval(setInterval(() => {
                    // console.log("player1Time: ", player1Time, "typeof: ", typeof player1Time);
                    // (player1Time);
                    //make a function to decrease the time of player1, taking into account the fact that player1Time is an object with hours, minutes and seconds.
                    

                    convertTime(setPlayer1Time(previousTime => {
                        if(previousTime.seconds === 0) {
                            if(previousTime.minutes === 0) {
                                if(previousTime.hours === 0) {
                                    //end of the game
                                    //show a modal with the winner
                                    //stop the timer
                                    //stop the game
                                    //show the menu again
                                    //reload the page
                                    // window.location.reload();
                                    // return {
                                    //     ...previousTime,
                                    //     seconds: previousTime.seconds - 1
                                    // }
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
                // setPlayer1Time(Number(player1Time) - 1);
                // console.log("player1Time: ", player1Time, "typeof: ", typeof(player1Time));
            }
            else {
                clearInterval(actualInterval);
                setActualInterval(setInterval(() => {
                    convertTime(setPlayer2Time(previousTime => {
                        if(previousTime.seconds === 0) {
                            if(previousTime.minutes === 0) {
                                if(previousTime.hours === 0) {
                                    //end of the game
                                    //show a modal with the winner
                                    //stop the timer
                                    //stop the game
                                    //show the menu again
                                    //reload the page
                                    // window.location.reload();
                                    // return {
                                    //     ...previousTime,
                                    //     seconds: previousTime.seconds - 1
                                    // }
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



    const setAP = (player) => () => {
        setActivePlayer(player);
    }


    return (
        <>
            <main className="container">
                {/* la mitad de arriba */}
                <div className={`${activePlayer === 1 ? "half top active" : "half top"}`}
                onClick={ handleGameStateClick(1) }>
                    <div>
                        {/* <h2>{player1Time[hours]}</h2> */}
                        <h2>{player1Time.hours}:{player1Time.minutes}:{player1Time.seconds}</h2>
                        {/* <h2>{player1Time}</h2> */}
                        {/* <h2>02:00</h2> */}
                    </div>
                </div>


                {/* la barra de configuracion */}
                <div className="config-bar">
                    <i className="fa-solid fa-arrow-rotate-right"></i>
                    <i className={ clockState } onClick={ handleGameStateClick(3) } ></i>

                    <i className={ volumeClass } onClick={ handleVolumeClick } ></i>

                    {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                    <i className="fa-solid fa-house" onClick={(e) => {
                        window.location.reload();
                    }} ></i>
                </div>


                {/* la mitad de abajo */}
                <div className={`${activePlayer === 2 ? "half bottom active" : "half bottom"}`}
                onClick={ handleGameStateClick(2) }>
                    <div>
                        <h2>{player2Time.hours}:{player2Time.minutes}:{player2Time.seconds}</h2>
                        {/* <h2>02:00</h2> */}
                    </div>
                </div>

            </main>
        </>
    );
}

export default Game