const convertTimeToShow = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let timeToShow = `${hours}:${minutes}:${seconds}`;
    return timeToShow;
}


// if(isRunning) {
//     if(activePlayer == 1) {
//         //make a function with setInterval that will decrease the time of player1
//         setInterval(() => {
//             console.log("player1Time: ", player1Time, "typeof: ", typeof player1Time);
//             // (player1Time);
//             setPlayer1Time(Number(player1Time) - 1);
//         }, 1000);
//         // setPlayer1Time(Number(player1Time) - 1);
//         // console.log("player1Time: ", player1Time, "typeof: ", typeof(player1Time));
//     }
//     else {
//         setPlayer2Time(Number(player2Time) - 1);
//     }
// }



<input
    label="Tiempo a finish"
    type="text"
    name="timeToFinish"
// error={formErrors.timeToFinish}
/>
{/* <p>Tiempo de incremento: </p> */ }
<input
    label="Tiempo de incremento"
    type="text"
    name="timeToIncrement"
// error={formErrors.timeToIncrement}
/>