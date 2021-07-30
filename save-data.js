
let gameState = {
    playerName: 'Player',
    levelIndex: 1,
    score: 0,
    multiplier: 1,
    consecutiveAnswers: 0,
    longestNoteStreak: 0,
};

let highScores = [
    {name: 'AAA', score: 100000},
    {name: 'BBB', score: 75000},
    {name: 'CCC', score: 50000},
    {name: 'DDD', score: 25000},
    {name: 'EEE', score: 10000}
];

let highNoteStreaks = [
    {name: 'AAA', score: 100},
    {name: 'BBB', score: 75},
    {name: 'CCC', score: 50},
    {name: 'DDD', score: 25},
    {name: 'EEE', score: 10}
];


function loadGameState() {
    gameState = JSON.parse(localStorage.getItem("myGameState"));
}

function loadHighScores() {
    highScores = JSON.parse(localStorage.getItem("myHighScores"));
    console.log('Loaded high scores');
}

function loadHighNoteStreaks() {
    highNoteStreaks = JSON.parse(localStorage.getItem("myHighNoteStreaks"));
    console.log('Loaded high note streaks');
}

function saveGameState() {
    localStorage.setItem("myGameState", JSON.stringify(gameState));
}

function saveHighScores() {
    localStorage.setItem("myHighScores", JSON.stringify(highScores));
    localStorage.setItem("myHighNoteStreaks", JSON.stringify(highNoteStreaks));
    console.log('Saved high scores');
}


function saveGameData() {
    gameState.levelId = levelIndex;
    gameState.score = score;
    gameState.multiplier = scoreMultiplier;
    gameState.consecutiveAnswers = consecutiveAnswers;
    gameState.longestNoteStreak = longestNoteStreak;
    saveGameState();
}


function updateHighScores(score) {
    for (let i = 0; i < highScores.length; i++) {
        if (score >= highScores[i].score) {
            let newHighScore = {name: 'Player', score: score};
            highScores.splice(i, 0, newHighScore);
            highScores.pop();
            console.log(highScores);
            return;
        }
    }
}

function updateHighNoteStreaks(noteStreak) {
    for (let i = 0; i < highNoteStreaks.length; i++) {
        if (noteStreak >= highNoteStreaks[i].score) {
            let newHighNoteStreak = {name: 'Player', score: noteStreak};
            highNoteStreaks.splice(i, 0, newHighNoteStreak);
            highNoteStreaks.pop();
            console.log(highNoteStreaks);
            return;
        }
    }
}

