
let timeElapsedWhite = 0;
let timeElapsedBlack = 0;

setInterval(() => {
    if (!gameEnded && initGame && handshakeFin) {
        if (whoToPlay == "w") {
            now = new Date().getTime();
            let timeNeeded = timeEnd - now + timeElapsedBlack + timeSinceRefresh;
    
            let minutes = Math.floor((timeNeeded % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            let seconds = Math.floor((timeNeeded % (1000 * 60)) / 1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

            if (timeNeeded < 0) {
                gameEnded = true;
                document.getElementById("whotoplay").innerHTML = "Black Wins By Time";
                document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
                document.getElementById("whitetimer").innerHTML = "00:00";
            }
            else {
                document.getElementById("whitetimer").innerHTML = minutes + ":" + seconds;
                timeElapsedWhite += 1000;
            }
        }
        else {
            now = new Date().getTime();
            let timeNeeded = timeEnd - now + timeElapsedWhite + timeSinceRefresh;
    
            let minutes = Math.floor((timeNeeded % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            let seconds = Math.floor((timeNeeded % (1000 * 60)) / 1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            
            if (timeNeeded < 0) {
                gameEnded = true;
                document.getElementById("whotoplay").innerHTML = "White Wins By Time";
                document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
                document.getElementById("blacktimer").innerHTML = "00:00";
                checkmateSequence();
            }
            else {
                document.getElementById("blacktimer").innerHTML = minutes + ":" + seconds;
                timeElapsedBlack += 1000;
            }
        }
    }
}, 1000);