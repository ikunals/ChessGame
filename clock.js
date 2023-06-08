
let timeControl = 3;
let oldNow = new Date().getTime();
let timeEnd = oldNow + (timeControl * 60 * 1000);
let timeElapsedWhite = 0;
let timeElapsedBlack = 0;

setInterval(() => {
    if (!gameEnded) {
        if (whoToPlay == "w") {
            now = new Date().getTime();
            let timeNeeded = timeEnd - now + timeElapsedBlack;
    
            let minutes = Math.floor((timeNeeded % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeNeeded % (1000 * 60)) / 1000);
            let clockElement = document.getElementById("whitetimer");
            clockElement.innerHTML = minutes + " mins " + seconds + " secs ";
            timeElapsedWhite += 1000;
        }
        else {
            now = new Date().getTime();
            let timeNeeded = timeEnd - now + timeElapsedWhite;
    
            let minutes = Math.floor((timeNeeded % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeNeeded % (1000 * 60)) / 1000);
            let clockElement = document.getElementById("blacktimer");
            clockElement.innerHTML = minutes + " mins " + seconds + " secs ";
            timeElapsedBlack += 1000;
        }
    }
}, 1000);
