import { loadHowToPlayScreen } from './how-to-play.js';
import { loadHighScoresScreen } from './high-scores.js';
import { levels } from './levels.js';
import { notesLibrary } from './note-library.js';
import { maps } from './maps.js';


// Main game screen loader
function loadGameScreen() {

    const gameScreenContent = document.createElement('div');
    gameScreenContent.setAttribute('id', 'gameScreenContent');

    const leftContent = document.createElement('div');
    leftContent.classList.add('gameScreenSection', 'gameScreenSectionLeft');

    const centerContent = document.createElement('div');
    centerContent.classList.add('gameScreenSection', 'gameScreenSectionCenter');

    const rightContent = document.createElement('div');
    rightContent.classList.add('gameScreenSection', 'gameScreenSectionRight');

    let logo = document.createElement('object');
    logo.setAttribute('data', `./img/graphics/logo.svg`);
    logo.setAttribute('type', 'image/svg+xml');

    const levelDisplay = document.createElement('div');
    levelDisplay.setAttribute('id', 'levelDisplay');
    // levelDisplay.textContent = 'Level:';

    const levelNameDisplay = document.createElement('div');
    levelNameDisplay.setAttribute('id', 'levelNameDisplay');

    const lifeDisplay = document.createElement('div');
    lifeDisplay.setAttribute('id', 'lifeDisplay');

    const heartsDiv = document.createElement('div');
    heartsDiv.classList.add('heartsDiv');
    lifeDisplay.appendChild(heartsDiv);

    const scoreDisplay = document.createElement('div');
    scoreDisplay.setAttribute('id', 'scoreDisplay');
    const scoreTotal = document.createElement('div');
    scoreTotal.classList.add('scoreTotal');
    scoreTotal.textContent = 'Score: 0';
    scoreDisplay.appendChild(scoreTotal);

    const multiplierHeader = document.createElement('div');
    multiplierHeader.classList.add('multiplierHeader');
    multiplierHeader.textContent = 'Multiplier:';
    const multiplierDiv = document.createElement('div');
    multiplierDiv.classList.add('multiplierDiv');
    const multiplierBorder = document.createElement('div');
    multiplierBorder.classList.add('multiplierBorder');
    const multiplierEmpty = document.createElement('span');
    multiplierEmpty.classList.add('multiplierEmpty');
    const multiplierFill = document.createElement('span');
    multiplierFill.classList.add('multiplierFill');
    const multiplierText = document.createElement('span');
    multiplierText.classList.add('multiplierText');
    multiplierText.textContent = '1X';
    
    multiplierBorder.appendChild(multiplierEmpty);
    multiplierEmpty.appendChild(multiplierFill);
    multiplierDiv.appendChild(multiplierBorder);
    multiplierDiv.appendChild(multiplierText);

    const noteStreakDiv = document.createElement('div');
    noteStreakDiv.classList.add('noteStreakDiv');
    noteStreakDiv.textContent = 'Note streak: 0';
    

    // Level progress bar
    const levelProgressDiv = document.createElement('div');
    levelProgressDiv.classList.add('levelProgressDiv');
    const levelProgressBorder = document.createElement('div');
    levelProgressBorder.classList.add('levelProgressBorder');
    const levelProgressEmpty = document.createElement('span');
    levelProgressEmpty.classList.add('levelProgressEmpty');
    const levelProgressFill = document.createElement('span');
    levelProgressFill.classList.add('levelProgressFill');
    const levelProgressText = document.createElement('span');
    levelProgressText.classList.add('levelProgressText');
    levelProgressText.textContent = 'Progress:';

    levelProgressBorder.appendChild(levelProgressEmpty);
    levelProgressEmpty.appendChild(levelProgressFill);
    levelProgressDiv.appendChild(levelProgressText);
    levelProgressDiv.appendChild(levelProgressBorder);

    // TODO: Eventually remove result display, this is more for debugging.
    const resultDisplay = document.createElement('div');
    resultDisplay.setAttribute('id', 'resultDisplay');
    //resultDisplay.textContent = '[result]';

    const keyDisplay = document.createElement('div');
    keyDisplay.setAttribute('id', 'keyDisplay');

    const ringDisplay = document.createElement('div');
    ringDisplay.setAttribute('id', 'ringDisplay');

    const bossNoteDisplay = document.createElement('div');
    bossNoteDisplay.classList.add('bossNoteDisplay');

    const spellDisplay = document.createElement('div');
    spellDisplay.setAttribute('id', 'spellDisplay');
    spellDisplay.textContent = 'Spell charge:';

    const spellBarBorder = document.createElement('div');
    spellBarBorder.classList.add('spellBarBorder');
    const spellBarEmpty = document.createElement('span');
    spellBarEmpty.classList.add('spellBarEmpty');
    const spellBarFill = document.createElement('span');
    spellBarFill.classList.add('spellBarFill');
    
    spellBarBorder.appendChild(spellBarEmpty);
    spellBarEmpty.appendChild(spellBarFill);
    spellDisplay.appendChild(spellBarBorder);
    
    const spellChargedTextDiv = document.createElement('div');
    spellChargedTextDiv.classList.add('spellChargedTextDiv');
    const spellChargedText = document.createElement('div');
    spellChargedText.classList.add('spellChargedText');
    spellChargedTextDiv.appendChild(spellChargedText);

    const bossDisplay = document.createElement('div');
    bossDisplay.setAttribute('id', 'bossDisplay');
    bossDisplay.textContent = 'Boss life:';

    const bossBarBorder = document.createElement('div');
    bossBarBorder.classList.add('bossBarBorder');
    const bossBarEmpty = document.createElement('span');
    bossBarEmpty.classList.add('bossBarEmpty');
    const bossBarFill = document.createElement('span');
    bossBarFill.classList.add('bossBarFill');

    bossBarBorder.appendChild(bossBarEmpty);
    bossBarEmpty.appendChild(bossBarFill);
    bossDisplay.appendChild(bossBarBorder);

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timerDisplay');
    timerDisplay.textContent = 'Time:';
    const timerBarBorder = document.createElement('div');
    timerBarBorder.classList.add('timerBarBorder');
    const timerBarEmpty = document.createElement('span');
    timerBarEmpty.classList.add('timerBarEmpty');
    const timerBarFill = document.createElement('span');
    timerBarFill.classList.add('timerBarFill');

    timerBarBorder.appendChild(timerBarEmpty);
    timerBarEmpty.appendChild(timerBarFill);
    timerDisplay.appendChild(timerBarBorder);

    const staffDiv = document.createElement('div');
    staffDiv.setAttribute('class', 'staffDiv');

    const gameMapContainer = document.createElement('div');
    gameMapContainer.classList.add('gameMapContainer');

    const gameMap = document.createElement('div');
    gameMap.setAttribute('class', 'gameMap');
    gameMapContainer.appendChild(gameMap);

    const mobileControls = document.createElement('div');
    mobileControls.classList.add('mobileControls');
    mobileControls.setAttribute('aria-label', 'Touch controls');

    const directionPad = document.createElement('div');
    directionPad.classList.add('directionPad');

    [
        { label: 'Up', code: 'ArrowUp', icon: '↑', className: 'controlUp' },
        { label: 'Left', code: 'ArrowLeft', icon: '←', className: 'controlLeft' },
        { label: 'Down', code: 'ArrowDown', icon: '↓', className: 'controlDown' },
        { label: 'Right', code: 'ArrowRight', icon: '→', className: 'controlRight' }
    ].forEach(({ label, code, icon, className }) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('mobileControlButton', className);
        button.setAttribute('aria-label', label);
        button.textContent = icon;
        button.addEventListener('click', () => handlePlayerAction(code));
        directionPad.appendChild(button);
    });

    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.classList.add('mobileControlButton', 'controlAction');
    actionButton.setAttribute('aria-label', 'Action: select note or use item');
    actionButton.textContent = 'Action';
    actionButton.addEventListener('click', () => handlePlayerAction('Space'));

    mobileControls.appendChild(directionPad);
    mobileControls.appendChild(actionButton);

    const content = document.getElementById('content');
    content.textContent = '';

    // leftContent.appendChild(logo);
    leftContent.appendChild(levelDisplay);
    leftContent.appendChild(levelNameDisplay);
    leftContent.appendChild(scoreDisplay);
    leftContent.appendChild(multiplierHeader);
    leftContent.appendChild(multiplierDiv);
    leftContent.appendChild(noteStreakDiv);
    leftContent.appendChild(levelProgressDiv);
    leftContent.appendChild(bossNoteDisplay);
    leftContent.appendChild(staffDiv);
    leftContent.appendChild(spellChargedTextDiv);
    // leftContent.appendChild(resultDisplay);

    centerContent.appendChild(timerDisplay);
    //centerContent.appendChild(gameMap);
    centerContent.appendChild(gameMapContainer);

    rightContent.appendChild(lifeDisplay);
    rightContent.appendChild(spellDisplay);
    rightContent.appendChild(bossDisplay);
    rightContent.appendChild(keyDisplay);
    rightContent.appendChild(ringDisplay);


    gameScreenContent.appendChild(leftContent);
    gameScreenContent.appendChild(centerContent);
    gameScreenContent.appendChild(rightContent);
    gameScreenContent.appendChild(mobileControls);

    content.appendChild(gameScreenContent);

    const endGameOverlay = document.createElement('div');
    endGameOverlay.classList.add('endGameOverlay');
    const gameOver = document.createElement('div');
    gameOver.classList.add('gameOver');
    endGameOverlay.appendChild(gameOver);
    const gameOverScore = document.createElement('div');
    gameOverScore.classList.add('gameOverScore');
    endGameOverlay.appendChild(gameOverScore);

    const continueButtonDiv = document.createElement('div');
    continueButtonDiv.classList.add('continueButtonDiv');

    const continueButton = document.createElement('button');
    continueButton.classList.add('gameOverButton');
    continueButton.textContent = 'Continue?';
    continueButton.addEventListener('click', () => {
        let currentWorld = Math.floor((levels[levelIndex].id - 1) / 10);
        let continueLevel = (currentWorld * 10) + 1;
        // score = Math.floor(score / 2);
        score = 0;
        scoreMultiplier = 1;
        multiplierCharge = 0;
        consecutiveAnswers = 0;
        longestNoteStreak = 0;
        let multiplierFill = `0%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--multiplierFill', multiplierFill);
        multiplierText.textContent = `${scoreMultiplier}X`;
        noteStreakDiv.textContent = 'Note streak: 0';
        levelIndex = levels.findIndex(level => level.id === continueLevel);
        spellChargedText.textContent = '';
        spellChargeNotes = [];
        life = 5;
        if (levels[levelIndex].type === 'finalBoss') {
            
            loadFinalBossStage();
        } else {
            startNewLevel(levels[levelIndex]);
        }
    });
    continueButtonDiv.appendChild(continueButton);

    const continueNote = document.createElement('p');
    continueNote.classList.add('continueNote');
    continueNote.textContent = 'Your score will be reset.';
    continueButtonDiv.appendChild(continueNote);
    endGameOverlay.appendChild(continueButtonDiv);

    function createRestartButtonDiv() {
        const restartButtonDiv = document.createElement('div');
        restartButtonDiv.classList.add('restartButtonDiv');
        const restartButton = document.createElement('button');
        restartButton.classList.add('gameOverButton');
        restartButton.textContent = 'Restart (Level 1-1)';
        restartButton.addEventListener('click', () => {
            score = 0;
            scoreMultiplier = 1;
            multiplierCharge = 0;
            consecutiveAnswers = 0;
            longestNoteStreak = 0;
            let multiplierFill = `0%`;
            let root = document.querySelector(':root');
            root.style.setProperty('--multiplierFill', multiplierFill);
            multiplierText.textContent = `${scoreMultiplier}X`;
            noteStreakDiv.textContent = 'Note streak: 0';
            bossNoteDisplay.textContent = '';
            spellChargedText.textContent = '';
            spellChargeNotes = [];
            life = 5;
            levelIndex = 1;
            startNewLevel(levels[levelIndex]);
        });
        restartButtonDiv.appendChild(restartButton);
        return restartButtonDiv;
    }

    const gameOverRestartDiv = createRestartButtonDiv();
    endGameOverlay.appendChild(gameOverRestartDiv);
    content.appendChild(endGameOverlay);

    const winScreen = document.createElement('div');
    winScreen.classList.add('endGameOverlay');
    const winText = document.createElement('div');
    winText.classList.add('gameOver');
    const winScore = document.createElement('div');
    winScore.classList.add('gameOverScore');
    // const restartDiv = backToTitleScreenButton.cloneNode(true);
    const winScreenRestartDiv = createRestartButtonDiv();

    winScreen.appendChild(winText);
    winScreen.appendChild(winScore);
    // winScreen.appendChild(restartDiv);
    winScreen.appendChild(winScreenRestartDiv);
    content.appendChild(winScreen);


    // Ending screen
    const endingScreen = document.createElement('div');
    endingScreen.classList.add('endingScreen');
    const endingGraphicDiv = document.createElement('div');
    endingGraphicDiv.classList.add('endingGraphicDiv');

    const endingGraphic = document.createElement('img');
    endingGraphic.src = './img/graphics/ending-screen.png';
    endingGraphic.classList.add('endingGraphic');
    endingGraphicDiv.appendChild(endingGraphic);

    const endingButtonDiv = document.createElement('div');
    endingButtonDiv.classList.add('endingButtonDiv');
    const endingButton = document.createElement('button');
    endingButton.classList.add('gameButton');
    endingButton.textContent = 'Continue';
    endingButton.addEventListener('click', () => {
        endingScreen.style.display = 'none';
        displayWinScreen();
    });
    endingButtonDiv.appendChild(endingButton);
    endingScreen.appendChild(endingGraphicDiv);
    endingScreen.appendChild(endingButtonDiv);
    content.appendChild(endingScreen);


    // Gameplay variables
    let notesList = [];
    let correctAnswer;
    let correctOctave;
    let gridSize = 10; // Also must change in CSS
    let gridArea = gridSize ** 2;
    let activeTileIndex = 0;
    let activeTile;
    let enemyTileIndices = [];
    let enemyTiles = [];
    let score = 0;
    let life = 5;
    let haveKey = false;
    let spellCharge = 0;
    let gameOverStatus = false;
    let levelIndex = 1;
    let noteIndex = 0;
    correctAnswer = levels[levelIndex].notes[noteIndex].letter;
    let finalBossDefeated = false;
    let scoreMultiplier = 1;
    let consecutiveAnswers = 0;
    let longestNoteStreak = 0;
    let multiplierCharge = 0;
    let bossDefeated = false;
    let stairsOn = false;
    let stairsTileIndex;
    let spellChargeMax = 3;
    let spellChargeNotes = [];
    let finalSpellStatus = false;
    let finalNotes = [
        { tileIndex: 0, color: 'note-blue' },
        { tileIndex: gridArea - 1, color: 'note-green' },
        { tileIndex: gridSize - 1, color: 'note-orange' },
        { tileIndex: gridArea - gridSize, color: 'note-purple' },
        { tileIndex: Math.floor(gridArea / 2 + gridSize / 2), color: 'note-red' }
    ];
    let bossLife = 3;
    let maxBossLife = 3;
    let timeLeft;
    let bossTileIndex;
    let chordIndex;
    let chordNoteIndex;
    let finalBossTileIndex;
    let finalBossTileIndices = [];

    document.addEventListener('keydown', (event) => handlePlayerAction(event.code, event));

    function useKey(tileIndex) {
        let lockedTile = document.querySelector(`#tile${tileIndex}`);
        lockedTile.classList.remove('locked-tile');
        haveKey = false;
        keyDisplay.removeChild(keyDisplay.firstChild);
    }

    function handlePlayerAction(code, event) {
        let previousTileIndex = activeTileIndex,
            leftTile = (activeTileIndex % gridSize === 0) ? undefined : document.querySelector(`#tile${activeTileIndex - 1}`),
            rightTile = ((activeTileIndex + 1) % gridSize === 0) ? undefined : document.querySelector(`#tile${activeTileIndex + 1}`),
            upTile = (activeTileIndex < gridSize) ? undefined : document.querySelector(`#tile${activeTileIndex - gridSize}`),
            downTile = (activeTileIndex >= gridArea - gridSize) ? undefined : document.querySelector(`#tile${activeTileIndex + gridSize}`);

        if (gameOverStatus) {
            return;
        }

        if (code === "ArrowLeft") {
            if (activeTileIndex === 0 || activeTileIndex % gridSize === 0 || activeTile.classList.contains('wall-left') || (leftTile && (leftTile.classList.contains('locked-tile') && !haveKey))) {
                return;
            } else {
                activeTile.classList.remove('activeTile');
                activeTileIndex--;

                if (leftTile && leftTile.classList.contains('locked-tile')) {
                    useKey(activeTileIndex);
                }

                if (stairsOn && activeTileIndex === stairsTileIndex) {
                    goToNextLevel();
                    return;
                }

            }
        } else if (code === "ArrowRight") {
            if (activeTileIndex === gridArea - 1 || (activeTileIndex + 1) % gridSize === 0 || activeTile.classList.contains('wall-right') || (rightTile && (rightTile.classList.contains('locked-tile') && !haveKey))) {
                return;
            } else {
                activeTile.classList.remove('activeTile');
                activeTileIndex++;
                if (rightTile && rightTile.classList.contains('locked-tile')) {
                    useKey(activeTileIndex);
                }

                if (stairsOn && activeTileIndex === stairsTileIndex) {
                    goToNextLevel();
                    return;
                }
            }
        } else if (code === "ArrowUp") {
            if (activeTileIndex < gridSize || activeTile.classList.contains('wall-top') || (upTile && (upTile.classList.contains('locked-tile') && !haveKey))) {
                return;
            } else {
                activeTile.classList.remove('activeTile');
                activeTileIndex = activeTileIndex - gridSize;

                if (upTile && upTile.classList.contains('locked-tile')) {
                    useKey(activeTileIndex);
                }

                if (stairsOn && activeTileIndex === stairsTileIndex) {
                    goToNextLevel();
                    return;
                }
            }
        } else if (code === "ArrowDown") {
            if (activeTileIndex >= gridArea - gridSize || activeTile.classList.contains('wall-bottom') || (downTile && (downTile.classList.contains('locked-tile') && !haveKey))) {
                return;
            } else {
                activeTile.classList.remove('activeTile');
                activeTileIndex = activeTileIndex + gridSize;

                if (downTile && downTile.classList.contains('locked-tile')) {
                    useKey(activeTileIndex);
                }

                if (stairsOn && activeTileIndex === stairsTileIndex) {
                    goToNextLevel();
                    return;
                }
            }
        } else if (code === "Space") {
            event?.preventDefault();
            if (stairsOn) {
                return;

            } else if (bossDefeated) {
                if (activeTile.classList.contains('hasBossNote')) {
                    getBossNote();
                    activeTile.classList.remove('hasBossNote');
                    activeTile.innerHTML = '';
                } else {
                    return;
                }
            } else if ((levels[levelIndex].type === 'finalBoss') && spellCharge >= spellChargeMax && finalSpellStatus) {
                finalSpellCast();
            } else if ((levels[levelIndex].type === 'boss' || levels[levelIndex].type === 'finalBoss') && spellCharge >= spellChargeMax) {
                castSpell();

            } else if (activeTile.textContent === ' ') {
                return;
            } else if (activeTile.classList.contains('hasHeart')) {
                increaseLife();
                activeTile.classList.remove('hasHeart');
                activeTile.textContent = ' ';
            } else if (activeTile.classList.contains('hasKey')) {
                getKey();
                activeTile.classList.remove('hasKey');
                activeTile.textContent = ' ';
            } else if (activeTile.classList.contains('hasStopwatch')) {
                getStopwatch();
                activeTile.classList.remove('hasStopwatch');
                activeTile.textContent = ' ';
            } else if (activeTile.classList.contains('hasRing')) {
                getRing();
                activeTile.classList.remove('hasRing');
                activeTile.textContent = ' ';
            } else if (activeTile.classList.contains('correct')) {

                if (levels[levelIndex].type === 'practice') {
                    // resultDisplay.textContent = `Correct! - ${correctAnswer}`;
                    activeTile.classList.remove('correct');
                    let note = `${correctAnswer}${correctOctave}`;
                    playNote(note, 1);
                    let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
                    correctAnswer = randomNote.note;
                    correctOctave = randomNote.octave;
                    generateNotesList(gridArea);
                    clearTileClasses();
                    populateMap(gridArea);
                    placeRandomLocks(gridArea, 1);
                    updateStaffDiv(correctAnswer, correctOctave);

                } else if (levels[levelIndex].type === 'boss' || levels[levelIndex].type === 'finalBoss') {
                    // resultDisplay.textContent = `Correct! - ${correctAnswer}`;
                    activeTile.classList.remove('correct');
                    let note = `${correctAnswer}${correctOctave}`;
                    playNote(note, 1);
                    increaseScore();

                    if (finalSpellStatus) {
                        chargeFinalSpell(note);
                    } else {
                        chargeSpell(note);
                        let nextBossNote = getNextBossNote();
                        correctAnswer = nextBossNote.letter;
                        correctOctave = nextBossNote.octave;
                        // let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
                        // correctAnswer = randomNote.note;
                        // correctOctave = randomNote.octave;
                        generateNotesList(gridArea);
                        clearTileClasses();
                        populateMap(gridArea);
                        placeRandomLocks(gridArea, 1);
                        updateStaffDiv(correctAnswer, correctOctave);
                        highlightAnswers();
                    }

                } else {

                    // resultDisplay.textContent = `Correct! - ${correctAnswer}`;
                    activeTile.classList.remove('correct');
                    let note = `${correctAnswer}${levels[levelIndex].notes[noteIndex].octave}`;
                    playNote(note, 1);
                    increaseScore();
                    correctAnswer = getNextNote(levels[levelIndex], noteIndex);
                    if (noteIndex >= levels[levelIndex].notes.length - 1) {
                        levelComplete(levels[levelIndex]);
                        updateLevelProgressBar();
                    } else {
                        noteIndex++;
                        generateNotesList(gridArea);
                        clearTileClasses();
                        populateMap(gridArea);
                        placeRandomLocks(gridArea, 1);
                        let octave = `${levels[levelIndex].notes[noteIndex].octave}`;
                        updateStaffDiv(correctAnswer, octave);
                        updateLevelProgressBar();
                        highlightAnswers();
                    }

                }
            } else if (activeTile.textContent === 'X') {
                return; // Prevents player from choosing wrong note twice.
            } else {
                activeTile.textContent = 'X';
                // resultDisplay.textContent = 'Wrong!';
                if (levels[levelIndex].type === 'practice') {
                    return;
                } else if (hasRing) {
                    useRing();
                } else {
                    decreaseLife();
                }
            }

            // Prevent "hero" class from being removed after space is pressed.
            return;
        } else {
            return;
        }
        activeTile = document.querySelector(`#tile${activeTileIndex}`);
        activeTile.classList.add('activeTile');
        renderHeroSprite(activeTileIndex, previousTileIndex);


        if (levels[levelIndex].type === 'finalBoss' && finalBossDefeated === false) {
            checkFinalBossDamage();
            decideFinalBossMove(finalBossTileIndex);

        } else if (levels[levelIndex].type === 'boss' && bossDefeated === false) {
            decideEnemyMove(bossTileIndex);
        } else {
            enemyTileIndices.forEach(function (enemyTileIndex, i, arr) {
                decideEnemyMove(enemyTileIndex, i, arr);

            });
        }
    }

    function moveEnemyLeft(enemyTileIndex, i, arr) {
        let enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        let previousEnemyTileIndex = enemyTileIndex;
        if (enemyTileIndex === 0 || enemyTileIndex % gridSize === 0) {
            return;
        } else {
            enemyTile.classList.remove('enemyTile');
            enemyTileIndex--;
        }
        enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        enemyTile.classList.add('enemyTile');
        renderEnemySprite(enemyTileIndex, previousEnemyTileIndex);

        if (levels[levelIndex].type === 'boss') {
            bossTileIndex = enemyTileIndex;
        } else {
            arr[i] = enemyTileIndex;
        }
    }

    function moveEnemyRight(enemyTileIndex, i, arr) {
        let enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        let previousEnemyTileIndex = enemyTileIndex;
        if (enemyTileIndex === gridArea - 1 || (enemyTileIndex + 1) % gridSize === 0) {
            return;
        } else {
            enemyTile.classList.remove('enemyTile');
            enemyTileIndex++;
        }
        enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        enemyTile.classList.add('enemyTile');
        renderEnemySprite(enemyTileIndex, previousEnemyTileIndex);

        if (levels[levelIndex].type === 'boss') {
            bossTileIndex = enemyTileIndex;
        } else {
            arr[i] = enemyTileIndex;
        }
    }

    function moveEnemyUp(enemyTileIndex, i, arr) {
        let enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        let previousEnemyTileIndex = enemyTileIndex;
        if (enemyTileIndex < gridSize) {
            return;
        } else {
            enemyTile.classList.remove('enemyTile');
            enemyTileIndex = enemyTileIndex - gridSize;
        }
        enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        enemyTile.classList.add('enemyTile');
        renderEnemySprite(enemyTileIndex, previousEnemyTileIndex);

        if (levels[levelIndex].type === 'boss') {
            bossTileIndex = enemyTileIndex;
        } else {
            arr[i] = enemyTileIndex;
        }
    }

    function moveEnemyDown(enemyTileIndex, i, arr) {
        let enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        let previousEnemyTileIndex = enemyTileIndex;
        if (enemyTileIndex >= gridArea - gridSize) {
            return;
        } else {
            enemyTile.classList.remove('enemyTile');
            enemyTileIndex = enemyTileIndex + gridSize;
        }
        enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        enemyTile.classList.add('enemyTile');
        renderEnemySprite(enemyTileIndex, previousEnemyTileIndex);

        if (levels[levelIndex].type === 'boss') {
            bossTileIndex = enemyTileIndex;
        } else {
            arr[i] = enemyTileIndex;
        }
    }

    // Enemy movement alogorithm -- needs work!
    function decideEnemyMove(enemyTileIndex, i, arr) {
        if (stairsOn) {
            return;
        }

        let currentEnemyTile = document.querySelector(`#tile${enemyTileIndex}`),
            leftEnemyTile = (enemyTileIndex === 0 || enemyTileIndex % gridSize === 0) ? undefined : document.querySelector(`#tile${enemyTileIndex - 1}`),
            rightEnemyTile = (enemyTileIndex === gridArea - 1 || (enemyTileIndex + 1) % gridSize === 0) ? undefined : document.querySelector(`#tile${enemyTileIndex + 1}`),
            upEnemyTile = (enemyTileIndex < gridSize) ? undefined : document.querySelector(`#tile${enemyTileIndex - gridSize}`),
            downEnemyTile = (enemyTileIndex >= gridArea - gridSize) ? undefined : document.querySelector(`#tile${enemyTileIndex + gridSize}`),
            blockedTop = currentEnemyTile.classList.contains('wall-top') || (upEnemyTile && upEnemyTile.classList.contains('locked-tile')) || (upEnemyTile && upEnemyTile.classList.contains('enemy')),
            blockedBottom = currentEnemyTile.classList.contains('wall-bottom') || (downEnemyTile && downEnemyTile.classList.contains('locked-tile')) || (downEnemyTile && downEnemyTile.classList.contains('enemy')),
            blockedLeft = currentEnemyTile.classList.contains('wall-left') || (leftEnemyTile && leftEnemyTile.classList.contains('locked-tile')) || (leftEnemyTile && leftEnemyTile.classList.contains('enemy')),
            blockedRight = currentEnemyTile.classList.contains('wall-right') || (rightEnemyTile && rightEnemyTile.classList.contains('locked-tile')) || (rightEnemyTile && rightEnemyTile.classList.contains('enemy'));

        if (activeTileIndex < enemyTileIndex) {
            if ((activeTileIndex + gridSize < enemyTileIndex) && !blockedTop) {
                moveEnemyUp(enemyTileIndex, i, arr);
            } else if (!blockedLeft) {
                moveEnemyLeft(enemyTileIndex, i, arr);
            } else if (!blockedRight) {
                moveEnemyRight(enemyTileIndex, i, arr);
            } else {
                moveEnemyDown(enemyTileIndex, i, arr);
            }
        } else if (activeTileIndex > enemyTileIndex) {
            if ((activeTileIndex - gridSize > enemyTileIndex) && !blockedBottom) {
                moveEnemyDown(enemyTileIndex, i, arr);
            } else if (!blockedRight) {
                moveEnemyRight(enemyTileIndex, i, arr);
            } else if (!blockedLeft) {
                moveEnemyLeft(enemyTileIndex, i, arr);
            } else {
                moveEnemyUp(enemyTileIndex, i, arr);
            }
        }

        if (levels[levelIndex].type === 'boss') {
            enemyTileIndex = bossTileIndex;
        } else {
            enemyTileIndex = arr[i];
        }

        if (activeTileIndex === enemyTileIndex) {
            if (hasRing) {
                resetEnemyPosition(enemyTileIndex, i, arr);
                useRing();
            } else {
                decreaseLife();
                resetEnemyPosition(enemyTileIndex, i, arr);
            }
        }
    }

    let hasRing = false;

    function getRing() {
        score = score + 200 * scoreMultiplier;
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('ring-pickup');
        if (hasRing === false) {
            let ring = document.createElement('object');
            ring.setAttribute('data', `./img/map-icons/ring.svg`);
            ring.setAttribute('type', 'image/svg+xml');
            ring.setAttribute('class', 'key');
            ringDisplay.appendChild(ring);
            
            let root = document.querySelector(':root');
            root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero-shield.svg');
            
            hasRing = true;
        }
    }

    function useRing() {
        ringDisplay.removeChild(ringDisplay.firstChild);
        let root = document.querySelector(':root');
        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
        hasRing = false;
        playSoundEffect('boss-defeated');
        // TODO remove ring and/or player graphic
        // play ring sound
    }

    function decideFinalBossMove(tileIndex) {
        // Final boss moves randomly
        let num = rollDice(4);
        if (num === 1) {
            (tileIndex % gridSize > 1) ? moveFinalBossLeft() : moveFinalBossRight();
        } else if (num === 2) {
            (tileIndex % gridSize < 8) ? moveFinalBossRight() : moveFinalBossLeft();
        } else if (num === 3) {
            (tileIndex - gridSize * 2 > 0) ? moveFinalBossUp() : moveFinalBossDown();
        } else if (num === 4) {
            (tileIndex + gridSize * 2 < gridArea) ? moveFinalBossDown() : moveFinalBossUp();
        }

        checkFinalBossDamage();
    }

    function checkFinalBossDamage() {
        for (let i = 0; i < finalBossTileIndices.length; i++) {
            if (activeTileIndex === finalBossTileIndices[i]) {
                decreaseLife();
                let previousActiveTileIndex = activeTileIndex;
                activeTile.classList.remove('activeTile');
                activeTileIndex = 0;
                activeTile = document.querySelector(`#tile${activeTileIndex}`);
                activeTile.classList.add('activeTile');
                renderHeroSprite(activeTileIndex, previousActiveTileIndex);
                return;
            }
        }
    }

    function moveFinalBossUp(tileIndex) {
        clearFinalBossTiles();
        finalBossTileIndex = finalBossTileIndex - gridSize;
        finalBossTileIndices.forEach(function (tileIndex, i, arr) {
            tileIndex = tileIndex - gridSize;
            arr[i] = tileIndex;
        });
        renderFinalBoss(finalBossTileIndices);
    }

    function moveFinalBossDown(tileIndex) {
        clearFinalBossTiles();
        finalBossTileIndex = finalBossTileIndex + gridSize;
        finalBossTileIndices.forEach(function (tileIndex, i, arr) {
            tileIndex = tileIndex + gridSize;
            arr[i] = tileIndex;
        });
        renderFinalBoss(finalBossTileIndices);
    }

    function moveFinalBossLeft(tileIndex) {
        clearFinalBossTiles();
        finalBossTileIndex--;
        finalBossTileIndices.forEach(function (tileIndex, i, arr) {
            tileIndex--;
            arr[i] = tileIndex;
        });
        renderFinalBoss(finalBossTileIndices);
    }

    function moveFinalBossRight(tileIndex) {
        clearFinalBossTiles();
        finalBossTileIndex++;
        finalBossTileIndices.forEach(function (tileIndex, i, arr) {
            tileIndex++;
            arr[i] = tileIndex;
        });
        renderFinalBoss(finalBossTileIndices);
    }

    function clearFinalBossTiles() {
        finalBossTileIndices.forEach(function (index) {
            let tile = document.getElementById(`tile${index}`);
            if (index === finalBossTileIndex) {
                tile.classList.remove('finalBoss');
            } else if (index === finalBossTileIndex + gridSize) {
                tile.classList.remove('finalBossArmBottom');
            } else if (index === finalBossTileIndex - 1) {
                tile.classList.remove('finalBossArmLeft');
            } else if (index === finalBossTileIndex - gridSize) {
                tile.classList.remove('finalBossArmTop');
            } else {
                tile.classList.remove('finalBossArmRight');
            }
        });
    }

    function renderFinalBoss() {
        finalBossTileIndices.forEach(function (index) {
            let tile = document.getElementById(`tile${index}`);
            if (index === finalBossTileIndex) {
                tile.classList.add('finalBoss');
            } else if (index === finalBossTileIndex + gridSize) {
                tile.classList.add('finalBossArmBottom');
            } else if (index === finalBossTileIndex - 1) {
                tile.classList.add('finalBossArmLeft');
            } else if (index === finalBossTileIndex - gridSize) {
                tile.classList.add('finalBossArmTop');
            } else {
                tile.classList.add('finalBossArmRight');
            }
        });
    }

    function resetEnemyPosition(enemyTileIndex, i, arr) {
        let enemyTile = document.querySelector(`#tile${enemyTileIndex}`)
        let previousEnemyTileIndex = enemyTileIndex;
        enemyTile.classList.remove('enemyTile');

        //TODO : enemy respawn logic
        enemyTileIndex = gridArea - 1;
        enemyTile = document.querySelector(`#tile${enemyTileIndex}`);
        enemyTile.classList.add('enemyTile');
        renderEnemySprite(enemyTileIndex, previousEnemyTileIndex);


        if (levels[levelIndex].type === 'boss') {
            bossTileIndex = enemyTileIndex;
        } else {
            arr[i] = enemyTileIndex;
        }
    }

    function renderEnemySprite(tileIndex, previousTileIndex) {
        let enemySVG = levels[levelIndex].enemy
        let root = document.querySelector(':root');
        root.style.setProperty('--enemySVG', `url(./img/map-icons/${enemySVG}.svg)`);

        let tile = document.getElementById(`tile${tileIndex}`);
        let previousTile = document.getElementById(`tile${previousTileIndex}`);
        tile.classList.add('enemy');
        if (previousTile) previousTile.classList.remove('enemy');

    }

    function drawGrid() {
        while (gameMap.firstChild) {
            gameMap.removeChild(gameMap.lastChild);
        }

        for (let i = 0; i < gridArea; i++) {
            const gameTile = document.createElement('div');
            gameTile.classList = 'gameTile';
            gameTile.setAttribute('id', `tile${i}`)
            gameMap.appendChild(gameTile);
        }

        activeTile = document.querySelector('#tile0');
        activeTile.classList.add('activeTile');
        enemyTiles = [document.querySelector(`#tile${gridArea - 1}`)];
        enemyTiles.forEach(function (enemyTile) {
            enemyTile.classList.add('enemyTile');
        });
    }

    function placeWalls(mapId) {
        // retrieve the map from the map collection which matches the requested map ID
        let map = maps.filter(obj => {
            return obj.id === mapId
        })[0];

        // process each wall in the map
        map.walls.forEach(wall => {

            // vertical walls advance along the Y axis
            if (wall.type === 'vertical') {
                for (let i = wall.startY; i < wall.startY + wall.length; i++) {

                    // find and apply the CSS classes to the borders in between the correct tiles
                    let rightWallTile = document.querySelector(`#tile${(i * gridSize) + wall.startX}`),
                        leftWallTile = document.querySelector(`#tile${(i * gridSize) + wall.startX + 1}`);

                    rightWallTile.classList.add('wall-right');
                    leftWallTile.classList.add('wall-left');
                }
            }

            // horizontal walls advance along the X axis
            else if (wall.type === 'horizontal') {
                for (let i = wall.startX; i < wall.startX + wall.length; i++) {

                    // find and apply the CSS classes to the borders in between the correct tiles
                    let topWallTile = document.querySelector(`#tile${((wall.startY + 1) * gridSize) + i}`),
                        bottomWallTile = document.querySelector(`#tile${(wall.startY * gridSize) + i}`);

                    topWallTile.classList.add('wall-top');
                    bottomWallTile.classList.add('wall-bottom');
                }
            }
        });
    }

    function rollDice(sides) {
        let num = Math.floor(Math.random() * sides) + 1;
        return num
    }

    function generateNotesList(numTiles) {
        notesList[0] = correctAnswer;
        notesList[1] = 'K';

        let num = rollDice(3);
        if (num === 1) {
            notesList[2] = 'H';
        } else {
            notesList[2] = getRandomNote();
        }

        num = rollDice(3);
        if (num === 1) {
            notesList[3] = 'SW';
        } else {
            notesList[3] = getRandomNote();
        }

        // Generate shield ring only on standard levels (not bosses)
        num = rollDice(3);
        if (levels[levelIndex].type === 'level' && num === 1) {
            notesList[4] = 'R';
        } else {
            notesList[4] = getRandomNote();
        }

        for (let i = 5; i < numTiles; i++) {
            notesList[i] = " ";
        }

        // Change the i increment to adjust how populated the map is
        for (let i = 5; i < numTiles; i = i + 7) {
            notesList[i] = getRandomNote();
        }

        notesList = shuffleNotesArray(notesList);
        return notesList;
    }

    function placeRandomLocks(numTiles, lockCount) {
        // First, remove all of the locks
        let locks = document.querySelectorAll(".locked-tile");
        locks.forEach((lock) => {
            lock.classList.remove("locked-tile");
        });

        let randomTile, randomTileIndex;

        for (let i = 0; i < lockCount; i++) {
            // TODO: We could have an endless loop here if lockCount is greater than the number
            // of tiles that actually have notes.
            do {
                let randomTileIndex = Math.floor(Math.random() * numTiles)
                randomTile = document.querySelector(`#tile${randomTileIndex}`);
            } while (randomTile.textContent === ' ' || randomTile.classList.contains('hasHeart') || randomTile.classList.contains('hasKey') || randomTile.classList.contains('locked-tile') || randomTileIndex === activeTileIndex);
            randomTile.classList.add('locked-tile');
        }
    }

    function clearTileClasses() {
        for (let i = 0; i < gridArea; i++) {
            let tile = document.querySelector(`#tile${i}`);
            if (tile.classList.contains('hasKey')) {
                tile.classList.remove('hasKey');
            }

            if (tile.classList.contains('hasHeart')) {
                tile.classList.remove('hasHeart');
            }

            if (tile.classList.contains('hasStopwatch')) {
                tile.classList.remove('hasStopwatch');
            }

            if (tile.classList.contains('hasRing')) {
                tile.classList.remove('hasRing');
            }

            if (tile.classList.contains('correct')) {
                tile.classList.remove('correct');
            }

            if (tile.classList.contains('hintTile')) {
                tile.classList.remove('hintTile');
            }
        }
    }

    function populateMap(numTiles) {
        for (let i = 0; i < numTiles; i++) {
            if (notesList[i] === 'H') {
                let heart = document.createElement('object');
                heart.setAttribute('data', `./img/map-icons/heart.svg`);
                heart.setAttribute('type', 'image/svg+xml');
                heart.setAttribute('class', 'mapHeart');
                document.getElementById(`tile${i}`).innerHTML = '';
                document.getElementById(`tile${i}`).appendChild(heart)
                document.getElementById(`tile${i}`).classList.add('hasHeart');

            } else if (notesList[i] === 'K') {
                let key = document.createElement('object');
                key.setAttribute('data', `./img/map-icons/key.svg`);
                key.setAttribute('type', 'image/svg+xml');
                key.setAttribute('class', 'mapKey');
                document.getElementById(`tile${i}`).innerHTML = '';
                document.getElementById(`tile${i}`).appendChild(key)
                document.getElementById(`tile${i}`).classList.add('hasKey');

            } else if (notesList[i] === 'SW') {
                let stopwatch = document.createElement('object');
                stopwatch.setAttribute('data', `./img/map-icons/stopwatch.svg`);
                stopwatch.setAttribute('type', 'image/svg+xml');
                stopwatch.setAttribute('class', 'stopwatch');
                document.getElementById(`tile${i}`).innerHTML = '';
                document.getElementById(`tile${i}`).appendChild(stopwatch)
                document.getElementById(`tile${i}`).classList.add('hasStopwatch');

            } else if (notesList[i] === 'R') {
                let ring = document.createElement('object');
                ring.setAttribute('data', `./img/map-icons/ring.svg`);
                ring.setAttribute('type', 'image/svg+xml');
                ring.setAttribute('class', 'ring');
                document.getElementById(`tile${i}`).innerHTML = '';
                document.getElementById(`tile${i}`).appendChild(ring)
                document.getElementById(`tile${i}`).classList.add('hasRing');

            } else {
                let tile = document.getElementById(`tile${i}`);
                tile.textContent = notesList[i];
                if (notesList[i] === correctAnswer) {
                    tile.classList.add('correct');
                }
            }
        }

    }

    function renderHeroSprite(tileIndex, previousTileIndex) {
        let tile = document.getElementById(`tile${tileIndex}`);
        let previousTile = document.getElementById(`tile${previousTileIndex}`);
        tile.classList.add('hero');
        if (previousTile) previousTile.classList.remove('hero');
    }

    function removeSprite(tileIndex, spriteClass) {
        document.getElementById(`tile${tileIndex}`).classList.remove(spriteClass);
    }

    function getNextNote(level, currentNoteIndex) {
        if (currentNoteIndex >= level.notes.length - 1) {
            return;
        } else {
            let nextNote = level.notes[currentNoteIndex + 1].letter;
            return nextNote;
        }
    }

    function getNextBossNote() {
        if (chordNoteIndex >= levels[levelIndex].chords[chordIndex].chordNotes.length - 1) {
            if (chordIndex >= levels[levelIndex].chords.length - 1) {
                chordIndex = 0;
                chordNoteIndex = 0;
                let nextBossNote = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex];
                return nextBossNote;
            } else {
                chordIndex++;
                chordNoteIndex = 0;
                let nextBossNote = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex];
                return nextBossNote;
            }
        } else {
            chordNoteIndex++;
            let nextBossNote = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex];
            return nextBossNote;
        }
    }

    function getRandomNote() {
        let randomNote = notesLibrary[Math.floor(Math.random() * 47)].note;
        return randomNote;
    }

    function shuffleNotesArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function increaseScore() {
            consecutiveAnswers++;
        if (!easyModeStatus) {
            multiplierCharge++;

            if (multiplierCharge >= 5) {
                multiplierCharge = 0;
            }

            scoreMultiplier = Math.floor(consecutiveAnswers / 5) + 1;
            if (scoreMultiplier > 10) {
                scoreMultiplier = 10;
            }

            let multiplierPercent = Math.floor(multiplierCharge / 5 * 100);
            let multiplierFill = `${multiplierPercent}%`;
            let root = document.querySelector(':root');
            root.style.setProperty('--multiplierFill', multiplierFill);
        }

        score = score + (100 * scoreMultiplier);
        scoreTotal.textContent = `Score: ${score}`;

        multiplierText.textContent = `${scoreMultiplier}X`;
        noteStreakDiv.textContent = `Note streak: ${consecutiveAnswers}`;

        if (consecutiveAnswers > longestNoteStreak) {
            longestNoteStreak = consecutiveAnswers;
        }
    }

    function decreaseLife() {
        consecutiveAnswers = 0;
        multiplierCharge = 0;
        let root = document.querySelector(':root');
        root.style.setProperty('--multiplierFill', '0%');
        multiplierText.textContent = `1X`;
        noteStreakDiv.textContent = `Note streak: ${consecutiveAnswers}`;

        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero-damage.svg');
        
        setTimeout(function() {
            root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
        }, 300);

        playSoundEffect('hero-damage');
        life--;
        updateLifeBar(life);
        if (life <= 0) {
            displayGameOver();

        }
    }

    function increaseLife() {
        if (life < 5) {
            life++;
        }
        score = score + 200 * scoreMultiplier;
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('heart-pickup');
        updateLifeBar(life);
    }

    function displayGameOver() {
        playBackgroundAudioLoop('game-over');
        gameOverStatus = true;
        // resultDisplay.textContent = 'GAME OVER';
        if (timeLeft <= 0) {
            gameOver.textContent = 'TIME EXPIRED!';
        } else {
            gameOver.textContent = 'GAME OVER';
        }
        gameOverScore.textContent = `Score: ${score} - Note streak: ${longestNoteStreak}`;
        endGameOverlay.style.display = 'block';
        let currentWorld = Math.floor((levels[levelIndex].id - 1) / 10);
        let continueLevel = (currentWorld * 10) + 1;
        let index = levels.findIndex(level => level.id === continueLevel);
        let levelName = levels[index].name;
        continueButton.textContent = `Continue? (Level ${levelName})`;
        // nextLevelButton.style.display = 'none';
        // replayButton.style.display = 'block';
        updateHighScores(score);
        updateHighNoteStreaks(longestNoteStreak);
        saveHighScores();
        
        // Prevent save scumming
        life = 5;
        score = 0;
        scoreMultiplier = 1;
        consecutiveAnswers = 0;
        longestNoteStreak = 0;
        // level index - 1 because if you die on a boss stage, continuing would advance you to the next world
        saveGameData(easyModeStatus,levelIndex - 1, life, score, scoreMultiplier, multiplierCharge, consecutiveAnswers, longestNoteStreak, bossNoteIndices);
    }

    function displayEndingScreen() {
        gameOverStatus = true; // To disable controls
        playBackgroundAudioOnce('ending');
        endingScreen.style.display = 'block';
    }

    function displayWinScreen() {
        gameOverStatus = true; // To disable controls
        playBackgroundAudioLoop('end-credits');
        // resultDisplay.textContent = 'You are a melody master!';
        winText.textContent = 'YOU ARE A MELODY MASTER!';
        winScore.textContent = `Final Score: ${score} - Note streak: ${longestNoteStreak}`;
        winScreen.style.display = 'block';
        // nextLevelButton.style.display = 'none';
        // replayButton.style.display = 'block';
        updateHighScores(score);
        updateHighNoteStreaks(longestNoteStreak);
        saveHighScores();

        // Prevent save scumming
        // localStorage.removeItem('myGameState');
        resetGameState();
        saveGameState();
    }

    function levelComplete(level) {
        // resultDisplay.textContent = 'LEVEL COMPLETE';
        playBackgroundAudioOnce('stage-complete', false);

        showStairs();
    }

    function defeatBoss(bossTileIndex) {
        score = score + (1000 * scoreMultiplier);
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('boss-defeated');
        playBackgroundAudioOnce('stage-complete', false);
        bossDefeated = true;
        drawGrid();
        placeWalls(levels[levelIndex].mapId);
        renderHeroSprite(activeTileIndex);
        let bossNoteImg = levels[levelIndex].bossNoteImg;
        let bossNote = document.createElement('object');
        bossNote.setAttribute('data', `./img/map-icons/${bossNoteImg}.svg`);
        bossNote.setAttribute('type', 'image/svg+xml');
        bossNote.setAttribute('class', 'bossNote');
        document.getElementById(`tile${bossTileIndex}`).innerHTML = '';
        document.getElementById(`tile${bossTileIndex}`).appendChild(bossNote);
        document.getElementById(`tile${bossTileIndex}`).classList.add('hasBossNote');
    }

    let bossNoteIndices = [];

    function getBossNote() {

        score = score + 2000;
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('boss-note-pickup');

        bossDefeated = false;
        let bossNoteImg = levels[levelIndex].bossNoteImg;
        let bossNote = document.createElement('object');
        bossNote.setAttribute('data', `./img/map-icons/${bossNoteImg}.svg`);
        bossNote.setAttribute('type', 'image/svg+xml');
        bossNote.setAttribute('class', 'bossNoteCollect');
        bossNoteDisplay.appendChild(bossNote);
        
        bossNoteIndices.push(levelIndex);

        showStairs();
    }

    // Update the inventory display with all notes player has collected on a saved game.
    function updateBossNoteDisplay() {
        bossNoteDisplay.innerText = '';
        for (let i = 0; i < gameState.bossNoteIndices.length; i++) {
            let levelIndex = bossNoteIndices[i];
            let bossNoteImg = levels[levelIndex].bossNoteImg;
            let bossNote = document.createElement('object');
            bossNote.setAttribute('data', `./img/map-icons/${bossNoteImg}.svg`);
            bossNote.setAttribute('type', 'image/svg+xml');
            bossNote.setAttribute('class', 'bossNoteCollect');
            bossNoteDisplay.appendChild(bossNote);
        }
    }

    function showStairs() {
        // reset the board without letters
        drawGrid();
        placeWalls(levels[levelIndex].mapId);
        renderHeroSprite(activeTileIndex);
        stairsOn = true;
        stairsTileIndex = gridArea / 2 + Math.floor(gridSize / 2);
        let stairsTile;

        if (stairsTileIndex === activeTileIndex) {
            stairsTileIndex--;
            stairsTile = document.getElementById(`tile${stairsTileIndex}`);
            // Show stairs going up if final boss stage
            if (levelIndex === levels.length - 1) {
                stairsTile.classList.add('stairsUpTile');
            } else {
                stairsTile.classList.add('stairsTile');
            }
        } else {
            stairsTile = document.getElementById(`tile${stairsTileIndex}`);
            // Conditions for telporter to appear instead of stairs
            if (levelIndex === levels.length - 1) {
                stairsTile.classList.add('stairsUpTile');
            } else {
                stairsTile.classList.add('stairsTile');
            }
        }
    }

    function goToNextLevel() {
        stairsOn = false;
        
        // Update progress of the current game and save to local storage
        saveGameData(easyModeStatus,levelIndex, life, score, scoreMultiplier, multiplierCharge, consecutiveAnswers, longestNoteStreak, bossNoteIndices);

        levelIndex++;

        if (levelIndex >= levels.length) {
            displayEndingScreen();
        } else if (levels[levelIndex].type === 'finalBoss') {
            levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
            // levelNameDisplay.textContent = 'FINAL BOSS!';
            loadFinalBossStage();
            playSoundEffect('stairs');

        } else if (levels[levelIndex].type === 'boss') {
            levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
            //levelNameDisplay.textContent = 'BOSS STAGE!';
            loadBossStage();
            playSoundEffect('stairs');

        } else {
            levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
            // levelNameDisplay.textContent = `${levels[levelIndex].name}`
            startNewLevel(levels[levelIndex]);
            playSoundEffect('stairs');
        }
    }

    function createTrebleStaffNote(note, octave) {
        let fullNote = `${note}${octave}`;
        let noteIndex = notesLibrary.map(function (e) {
            return e.noteRef;
        }).indexOf(fullNote);

        let svgNoteName = notesLibrary[noteIndex].svgName;

        const svgStaffNote = document.createElement('object');
        svgStaffNote.setAttribute('data', `./img/staff-notes/${svgNoteName}.svg`);
        svgStaffNote.setAttribute('type', 'image/svg+xml');
        svgStaffNote.setAttribute('class', 'svgNote');
        return svgStaffNote;
    }

    // TODO: combine this function with the above one
    function updateStaffDiv(note, octave) {
        staffDiv.innerHTML = '';
        staffDiv.appendChild(createTrebleStaffNote(note, octave));
    }

    function updateLifeBar(life) {
        heartsDiv.textContent = '';
        lifeDisplay.textContent = 'LIFE:';

        for (let i = 0; i < life; i++) {
            let heart = document.createElement('object');
            heart.setAttribute('data', `./img/map-icons/heart.svg`);
            heart.setAttribute('type', 'image/svg+xml');
            heart.setAttribute('class', 'heart');
            heartsDiv.appendChild(heart);
        }
        lifeDisplay.appendChild(heartsDiv);
    }

    function getKey() {
        score = score + 200 * scoreMultiplier;
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('item-pickup');
        if (haveKey === false) {
            let key = document.createElement('object');
            key.setAttribute('data', `./img/map-icons/key.svg`);
            key.setAttribute('type', 'image/svg+xml');
            key.setAttribute('class', 'key');
            keyDisplay.appendChild(key);
            haveKey = true;
        }
    }

    function getStopwatch() {
        score = score + 500 * scoreMultiplier;
        scoreTotal.textContent = `Score: ${score}`;

        playSoundEffect('item-pickup');
        if (timeLeft + 10 > levels[levelIndex].time) {
            timeLeft = levels[levelIndex].time;
        } else {
            timeLeft = timeLeft + 10;
        }
    }

    function chargeSpell(note) {
        spellCharge++;
        let spellChargePercent = Math.floor(spellCharge / spellChargeMax * 100);
        let spellChargeFill = `${spellChargePercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', spellChargeFill);

        spellChargeNotes.push(note);
        if (spellCharge === 1) {
            spellChargedText.textContent = `${correctAnswer}`;
        } else {
            spellChargedText.textContent = spellChargedText.textContent.concat(` ${correctAnswer}`);
        }

        if (spellCharge === spellChargeMax) {
            spellBarFill.classList.add('blink');
            let chordName;
            
            if (finalSpellStatus) {
                chordName = levels[levelIndex].finalChordName;
            } else {
                chordName = levels[levelIndex].chords[chordIndex].name;
            }
            
            const chordNameText = document.createElement('div');
            chordNameText.textContent = `${chordName} chord charged!`;
            spellChargedText.appendChild(chordNameText);
        }

    }

    function castSpell() {
        playSoundEffect('spell-blast');
        spellCharge = 0;
        spellBarFill.classList.remove('blink');
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', '0%');
        spellChargedText.textContent = '';

        spellChargeNotes.forEach(function (note) {
            let now = Tone.now();
            playNote(note, 1, now);
        });

        spellChargeNotes = [];

        let spellCastTiles = [];

        // 1 left
        if (activeTileIndex % gridSize !== 0) {
            let tile = document.getElementById(`tile${activeTileIndex - 1}`);
            spellCastTiles.push(tile);
        }
        // 2 left
        if (activeTileIndex % gridSize > 1) {
            let tile = document.getElementById(`tile${activeTileIndex - 2}`);
            spellCastTiles.push(tile);
        }
        // 1 right
        if (activeTileIndex < gridArea - 1 && (activeTileIndex + 1) % gridSize !== 0) {
            let tile = document.getElementById(`tile${activeTileIndex + 1}`);
            spellCastTiles.push(tile);
        }
        // 2 right
        if (activeTileIndex < gridArea - 2 && (activeTileIndex + 2) % gridSize > 1) {
            let tile = document.getElementById(`tile${activeTileIndex + 2}`);
            spellCastTiles.push(tile);
        }
        // 1 up
        if (activeTileIndex > gridSize - 1) {
            let tile = document.getElementById(`tile${activeTileIndex - gridSize}`);
            spellCastTiles.push(tile);
        }
        // 2 up
        if (activeTileIndex > (gridSize * 2) - 1) {
            let tile = document.getElementById(`tile${activeTileIndex - (gridSize * 2)}`);
            spellCastTiles.push(tile);
        }
        // 1 down
        if (activeTileIndex < gridArea - gridSize) {
            let tile = document.getElementById(`tile${activeTileIndex + gridSize}`);
            spellCastTiles.push(tile);
        }
        // 2 down
        if (activeTileIndex < gridArea - (gridSize * 2)) {
            let tile = document.getElementById(`tile${activeTileIndex + (gridSize * 2)}`);
            spellCastTiles.push(tile);
        }
        // up-left diagonal
        if (activeTileIndex % gridSize !== 0 && activeTileIndex > gridSize - 1) {
            let tile = document.getElementById(`tile${activeTileIndex - 1 - gridSize}`);
            spellCastTiles.push(tile);
        }
        // up-right diagonal
        if (activeTileIndex < gridArea - 1 && (activeTileIndex + 1) % gridSize !== 0 && activeTileIndex > gridSize - 1) {
            let tile = document.getElementById(`tile${activeTileIndex + 1 - gridSize}`);
            spellCastTiles.push(tile);
        }
        // down-left diagonal
        if (activeTileIndex % gridSize !== 0 && activeTileIndex < gridArea - gridSize) {
            let tile = document.getElementById(`tile${activeTileIndex - 1 + gridSize}`);
            spellCastTiles.push(tile);
        }
        // down-right diagonal
        if (activeTileIndex < gridArea - 1 && (activeTileIndex + 1) % gridSize !== 0 && activeTileIndex < gridArea - gridSize) {
            let tile = document.getElementById(`tile${activeTileIndex + 1 + gridSize}`);
            spellCastTiles.push(tile);
        }

        spellCastTiles.forEach(function (tile) {
            tile.classList.add('spellCast');

        });

        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero-wand.svg');

        if (levels[levelIndex].type === 'boss') {
            let bossTile = document.getElementById(`tile${bossTileIndex}`);
            if (spellCastTiles.includes(bossTile)) {
                setTimeout(function () {
                    spellCastTiles.forEach(function (tile) {
                        tile.classList.remove('spellCast');
                        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
                    });
                    damageBoss();
                }, 200);
            } else {
                setTimeout(function () {
                    spellCastTiles.forEach(function (tile) {
                        tile.classList.remove('spellCast');
                        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
                    });
                }, 200);
            }

        } else {
            setTimeout(function () {
                spellCastTiles.forEach(function (tile) {
                    tile.classList.remove('spellCast');
                    root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
                });
            }, 200);

            for (let i = 0; i < finalBossTileIndices.length; i++) {
                let tile = document.getElementById(`tile${finalBossTileIndices[i]}`);
                if (spellCastTiles.includes(tile)) {
                    damageFinalBoss();
                    return;
                }
            }
        }
    }

    function damageFinalBoss() {
        bossLife--;
        let bossLifePercent = Math.floor(bossLife / maxBossLife * 100);
        let bossLifeFill = `${bossLifePercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', bossLifeFill);

        let hitTileIndex = finalBossTileIndices[0];
        let hitTile = document.getElementById(`tile${hitTileIndex}`);

        if (hitTileIndex === finalBossTileIndex) {
            hitTile.classList.remove('finalBoss');
        } else if (hitTileIndex === finalBossTileIndex + gridSize) {
            hitTile.classList.remove('finalBossArmBottom');
        } else if (hitTileIndex === finalBossTileIndex - 1) {
            hitTile.classList.remove('finalBossArmLeft');
        } else if (hitTileIndex === finalBossTileIndex - gridSize) {
            hitTile.classList.remove('finalBossArmTop');
        } else {
            hitTile.classList.remove('finalBossArmRight');
        }

        finalBossTileIndices.shift();

        if (finalBossTileIndices.length === 1) {
            setupFinalSpell();
        }

        if (finalBossTileIndices.length === 0) {
            showStairs();
        }
    }

    function setupFinalSpell() {
        finalSpellStatus = true;
        spellChargeMax = levels[levelIndex].finalChord.length;
        noteIndex = 0;
        correctAnswer = levels[levelIndex].finalChord[noteIndex].letter;
        correctOctave = levels[levelIndex].finalChord[noteIndex].octave;
        generateNotesList(gridArea);
        clearTileClasses();
        populateMap(gridArea);
        placeRandomLocks(gridArea, 1);
        updateStaffDiv(correctAnswer, correctOctave);
    }

    function chargeFinalSpell(note) {
        let tile = document.getElementById(`tile${finalNotes[spellCharge].tileIndex}`);
        tile.classList.add(finalNotes[spellCharge].color);
        chargeSpell(note);

        if (noteIndex < levels[levelIndex].finalChord.length - 1) {
            noteIndex++;
            correctAnswer = levels[levelIndex].finalChord[noteIndex].letter;
            correctOctave = levels[levelIndex].finalChord[noteIndex].octave;
            generateNotesList(gridArea);
            clearTileClasses();
            populateMap(gridArea);
            placeRandomLocks(gridArea, 1);
            updateStaffDiv(correctAnswer, correctOctave);
            highlightAnswers();

        } else {
            for (let i = 0; i < gridArea; i++) {
                let tile = document.getElementById(`tile${i}`);
                tile.textContent = '';
            }
            clearTileClasses();
            placeRandomLocks(gridArea, 0);
            staffDiv.innerHTML = '';
            staffDiv.textContent = 'MASTER CHORD CHARGED!'
        }
    }

    function finalSpellCast() {
        playSoundEffect('spell-blast');
        spellCharge = 0;
        spellBarFill.classList.remove('blink');
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', '0%');
        spellChargedText.textContent = '';

        spellChargeNotes.forEach(function (note) {
            let now = Tone.now();
            playNote(note, 1, now);
        });

        spellChargeNotes = [];

        let spellCastTiles = [];

        for (let i = 0; i < gridArea; i++) {
            let tile = document.getElementById(`tile${i}`);
            spellCastTiles.push(tile);
        }

        spellCastTiles.forEach(function (tile) {
            tile.classList.add('spellCast');

        });

        setTimeout(function () {
            spellCastTiles.forEach(function (tile) {
                tile.classList.remove('spellCast');
            });
            damageFinalBoss();
        }, 200);

        score = score + (5000 * scoreMultiplier);
        scoreTotal.textContent = `Score: ${score}`;
    }

    // TODO: function to draw an svg line between two tiles.
    // function getTileCenterCoords(tile) {
    //     let rect = tile.getBoundingClientRect();
    //     return {
    //         tileCoordX: rect.left + 0.5 * rect.width,
    //         tileCoordY: rect.top + 0.5 * rect.height
    //     };
    // }

    // function drawLine(tile1, tile2) {
    //     let tile1Coords = getTileCenterCoords(tile1);
    //     let tile2Coords = getTileCenterCoords(tile2);

    //     let x1 = tile1Coords.tileCoordX;
    //     let y1 = tile1Coords.tileCoordY;
    //     let x2 = tile2Coords.tileCoordX;
    //     let y2 = tile2Coords.tileCoordY;

    //     let line = document.createElement('line');
    //     line.setAttribute('x1', x1);
    //     line.setAttribute('y1', y1);
    //     line.setAttribute('x2', x2);
    //     line.setAttribute('y2', y2);
    //     line.setAttribute('stroke', 'red');
    //     line.setAttribute('stroke-width', '5');
    // }

    function damageBoss() {
        bossLife--;
        let bossLifePercent = Math.floor(bossLife / maxBossLife * 100);
        let bossLifeFill = `${bossLifePercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', bossLifeFill);

        let bossTile = document.getElementById(`tile${bossTileIndex}`);
        bossTile.classList.remove('boss');

        if (bossLife <= 0) {
            defeatBoss(bossTileIndex);
        } else {
            setTimeout(function () {
                bossTile.classList.add('boss')
            }, 100);
        }
    }

    function startTimer() {
        timeLeft = levels[levelIndex].time;

        let root = document.querySelector(':root');
        root.style.setProperty('--timerFill', '100%');

        let timer = setInterval(countDown, 250);
        function countDown() {
            if (gameOverStatus) {
                clearInterval(timer);

            } else if (stairsOn || bossDefeated) {
                clearInterval(timer);
            } else if (timeLeft <= 0) {
                clearInterval(timer);
                displayGameOver();
            } else {
                timeLeft = timeLeft - 0.25;

                let timerFillPercent = timeLeft / levels[levelIndex].time * 100;
                let timerFill = `${timerFillPercent}%`;
                let root = document.querySelector(':root');
                root.style.setProperty('--timerFill', timerFill);
            }
        }
    }

    function setTileColor(level) {
        let tileColor = level.tileColor,
            fontColor = level.fontColor,
            dungeonBorder = level.dungeonBorder,
            root = document.querySelector(':root'),
            gameMapContainer = document.querySelector('.gameMapContainer');
        root.style.setProperty('--tileColor', tileColor);
        root.style.setProperty('--fontColor', fontColor);
        gameMapContainer.dataset.dungeonBorder = dungeonBorder;
    }

    function startNewLevel(level) {
        endGameOverlay.style.display = 'none';
        winScreen.style.display = 'none';
        gameOverStatus = false;
        finalSpellStatus = false;
        spellChargeMax = 3;
        spellCharge = 0;
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', '0%');
        root.style.setProperty('--bossLifeFill', '0%');
        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');

        activeTileIndex = 0;
        enemyTileIndices = [];
        let enemyCount = level.enemyCount;

        for (let i = 0; i < enemyCount; i++) {
            let enemyIndex = gridArea - 1 - i * 4;
            enemyTileIndices.push(enemyIndex);
        }

        noteIndex = 0;
        correctAnswer = level.notes[noteIndex].letter;
        let octave = level.notes[noteIndex].octave;
        updateStaffDiv(correctAnswer, octave);
        drawGrid();
        placeWalls(level.mapId);
        setTileColor(level);
        generateNotesList(gridArea);
        populateMap(gridArea);
        placeRandomLocks(gridArea, 1);
        // resultDisplay.textContent = '';
        haveKey = false;
        keyDisplay.innerHTML = '';
        hasRing = false;
        ringDisplay.innerHTML = '';
        scoreTotal.textContent = `Score: ${score}`;
        levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
        updateLifeBar(life);
        bossLife = 3;


        enemyTileIndices.forEach(function (enemyTileIndex) {
            renderEnemySprite(enemyTileIndex);
        });
        renderHeroSprite(activeTileIndex);

        playBackgroundAudioLoop(level.bgMusic);

        if (!easyModeStatus) {
            startTimer();
        }

        //Enable hints
        highlightAnswers();

        updateLevelProgressBar();

    }

    function updateLevelProgressBar() {
        let progressPercent;
        if (levels[levelIndex].type === 'level') {
            progressPercent = Math.floor(noteIndex / levels[levelIndex].notes.length * 100);
        } else {
            progressPercent = 0;
        }
        let levelProgressFill = `${progressPercent}%`;
        let root = document.querySelector(':root');

        if (stairsOn) {
            root.style.setProperty('--levelProgressFill', '100%');
        } else {
            root.style.setProperty('--levelProgressFill', levelProgressFill);
        }
    }

    function loadBossStage() {
        endGameOverlay.style.display = 'none';
        activeTileIndex = 0;
        enemyTileIndices = [];
        bossTileIndex = gridArea - 1;
        noteIndex = 0;
        // let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
        // correctAnswer = randomNote.note;
        // correctOctave = randomNote.octave;

        chordIndex = 0;
        chordNoteIndex = 0;
        correctAnswer = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex].letter;
        correctOctave = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex].octave;

        updateStaffDiv(correctAnswer, correctOctave);
        drawGrid();
        // loadMap(1);
        generateNotesList(gridArea);
        populateMap(gridArea);
        setTileColor(levels[levelIndex]);
        // resultDisplay.textContent = '';

        scoreTotal.textContent = `Score: ${score}`;
        levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
        updateLifeBar(life);

        haveKey = false;
        keyDisplay.innerHTML = '';
        hasRing = false;
        ringDisplay.innerHTML = '';
        renderEnemySprite(bossTileIndex);
        renderHeroSprite(activeTileIndex);

        maxBossLife = levels[levelIndex].bossLife;
        bossLife = levels[levelIndex].bossLife;
        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', '100%');
        root.style.setProperty('--levelProgressFill', '0%');
        spellBarFill.classList.remove('blink');
        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');

        playBackgroundAudioLoop(levels[levelIndex].bgMusic);
        if (!easyModeStatus) {
            startTimer();
        }

        //Enable hints
        highlightAnswers();
    }

    function loadFinalBossStage() {
        endGameOverlay.style.display = 'none';
        gameOverStatus = false;
        activeTileIndex = 0;
        enemyTileIndices = [];
        finalBossTileIndex = Math.floor((gridArea / 2) - (gridSize / 2));
        finalBossTileIndices = [
            finalBossTileIndex + 1,
            finalBossTileIndex - 1,
            finalBossTileIndex + gridSize,
            finalBossTileIndex - gridSize,
            finalBossTileIndex
        ];

        maxBossLife = finalBossTileIndices.length;
        bossLife = maxBossLife;

        spellCharge = 0;
        
        noteIndex = 0;
        // let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
        // correctAnswer = randomNote.note;
        // correctOctave = randomNote.octave;

        chordIndex = 0;
        chordNoteIndex = 0;
        correctAnswer = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex].letter;
        correctOctave = levels[levelIndex].chords[chordIndex].chordNotes[chordNoteIndex].octave;

        updateStaffDiv(correctAnswer, correctOctave);
        drawGrid();
        // loadMap(1);
        generateNotesList(gridArea);
        populateMap(gridArea);
        setTileColor(levels[levelIndex]);
        updateLifeBar(life);
        // resultDisplay.textContent = '';
        haveKey = false;
        keyDisplay.innerHTML = '';
        hasRing = false;
        ringDisplay.innerHTML = '';
        scoreTotal.textContent = `Score: ${score}`;

        // renderEnemySprite(finalBossTileIndex);

        renderFinalBoss();

        renderHeroSprite(activeTileIndex);

        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', '100%');
        root.style.setProperty('--levelProgressFill', '0%');
        root.style.setProperty('--spellChargeFill', '0%');
        root.style.setProperty('--heroSVG', 'url(./img/map-icons/hero.svg');
        spellBarFill.classList.remove('blink');


        playBackgroundAudioLoop(levels[levelIndex].bgMusic);
        if (!easyModeStatus) {
            startTimer();
        }

        //Enable hints
        highlightAnswers();
    }

    function startNewGame() {
        gameOverStatus = false;
        finalSpellStatus = false;
        spellChargeMax = 3;
        endGameOverlay.style.display = 'none';
        winScreen.style.display = 'none';
        activeTileIndex = 0;
        enemyTileIndices = [(gridArea - 1)];
        noteIndex = 0;
        levelIndex = 1;
        correctAnswer = levels[levelIndex].notes[noteIndex].letter;
        let octave = levels[levelIndex].notes[noteIndex].octave;
        updateStaffDiv(correctAnswer, octave);
        drawGrid();
        placeWalls(levels[levelIndex].mapId);
        setTileColor(levels[levelIndex]);
        generateNotesList(gridArea);
        populateMap(gridArea);
        placeRandomLocks(gridArea, 1);
        levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
        // levelNameDisplay.textContent = `${levels[levelIndex].name}`;
        life = 5;
        updateLifeBar(life);
        haveKey = false;
        keyDisplay.innerHTML = '';
        bossNoteDisplay.innerHTML = '';
        score = 0;
        scoreMultiplier = 1;
        scoreTotal.textContent = `Score: ${score}`;
        // resultDisplay.textContent = '';
        bossLife = 3;
        enemyTileIndices.forEach(function (enemyTileIndex) {
            renderEnemySprite(enemyTileIndex);
        });

        renderHeroSprite(activeTileIndex);

        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', '0%');
        root.style.setProperty('--spellChargeFill', '0%');
        root.style.setProperty('--levelProgressFill', '0%');
        spellChargedText.textContent = '';

        playBackgroundAudioLoop(levels[levelIndex].bgMusic);

        if (!easyModeStatus) {
            startTimer();
        }

        //Enable hints
        highlightAnswers();
    }

    function startPracticeMode() {
        stopAllBackgroundAudio();

        gameOverStatus = false;
        // Set level index to practice level
        levelIndex = 0;
        endGameOverlay.style.display = 'none';
        activeTileIndex = 0;
        enemyTileIndices = [];
        let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
        correctAnswer = randomNote.note;
        correctOctave = randomNote.octave;
        updateStaffDiv(correctAnswer, correctOctave);
        drawGrid();
        generateNotesList(gridArea);
        populateMap(gridArea);
        setTileColor(levels[levelIndex]);
        levelDisplay.textContent = `Level ${levels[levelIndex].name}`;
        // levelNameDisplay.textContent = `${levels[levelIndex].name}`;
        life = 3;
        updateLifeBar(life);
        // resultDisplay.textContent = '';
        haveKey = false;
        keyDisplay.innerHTML = '';
        bossNoteDisplay.innerHTML = '';
        renderHeroSprite(activeTileIndex);
        const practiceStaff = document.createElement('img');
        practiceStaff.src = './img/staff-notes/grand-staff-labeled.png';
        practiceStaff.setAttribute('class', 'practiceStaff');
        timerDisplay.innerHTML = '';
        timerDisplay.appendChild(practiceStaff);
        scoreDisplay.innerHTML = '';
        multiplierDiv.innerHTML = '';
        noteStreakDiv.innerHTML = '';
        spellDisplay.innerHTML = '';
        spellBarBorder.innerHTML = '';
        bossDisplay.innerHTML = '';

        const exitPracticeButton = document.createElement('button');
        exitPracticeButton.classList.add('gameButton');
        exitPracticeButton.textContent = 'Exit Practice Mode';
        exitPracticeButton.addEventListener('click', () => {
            window.location.reload();
        });
        leftContent.appendChild(exitPracticeButton);

    }

    function updateScoreDisplays() {
        scoreTotal.textContent = `Score: ${score}`;
        multiplierText.textContent = `${scoreMultiplier}X`;
        noteStreakDiv.textContent = `Note streak: ${consecutiveAnswers}`;
        let multiplierPercent = Math.floor(multiplierCharge / 5 * 100);
        let multiplierFill = `${multiplierPercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--multiplierFill', multiplierFill);

    }

    let hintTimer;

    // Hint feature: highlight correct answers
    function highlightAnswers() {
        stopHintTimer();
        if (easyModeStatus) {
            hintTimer = setTimeout(function() {
                for (let i = 0; i < gridArea; i++) {
                    let tile = document.getElementById(`tile${i}`);
                    if (tile.textContent === correctAnswer) {
                        tile.classList.add('hintTile');
                    }
                }
            }, 8000)
        }
    }

    function stopHintTimer() {
        clearTimeout(hintTimer);
    }


    // Keep mobile landscape gameplay within one viewport; portrait layouts can scroll.
    document.body.classList.add('gameScreenActive');

    // If continuing a saved game, update properties and go to next level
    if (continueGameStatus) {
        
        continueGameStatus = false;
        easyModeStatus = gameState.easyModeStatus;
        // If on the final boss, load that level and not the ending screen
        if (gameState.levelIndex === levels.length - 1) {
            levelIndex = gameState.levelIndex - 1;
        } else {
            levelIndex = gameState.levelIndex;
        }
        life = gameState.life;
        score = gameState.score;
        scoreMultiplier = gameState.multiplier;
        multiplierCharge = gameState.multiplierCharge
        consecutiveAnswers = gameState.consecutiveAnswers;
        longestNoteStreak = gameState.longestNoteStreak;
        bossNoteIndices = gameState.bossNoteIndices;
        updateLifeBar(life);
        updateScoreDisplays();
        updateBossNoteDisplay();
        goToNextLevel();

    // Start a new game in practice or normal mode
    } else if (practiceModeStatus === true) {
        startPracticeMode();
    } else {
        startNewGame();
    }

    var flip = new Konami(function() { 
        let tiles = document.getElementsByClassName('gameTile');
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].classList.remove('wall-top');
            tiles[i].classList.remove('wall-bottom');
            tiles[i].classList.remove('wall-left');
            tiles[i].classList.remove('wall-right');
            tiles[i].classList.add('flip');
        }
        placeWalls(0);
    });
}

// Title and start screen functions
function createStartButtonDiv() {
    const startButtonDiv = document.createElement('div');
    startButtonDiv.classList.add('startButtonDiv');
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'startButton');
    startButton.setAttribute('class', 'gameButton');
    const startButtonText = document.createElement('span');
    startButtonText.textContent = 'Start';
    startButton.addEventListener('click', () => {
        loadNewGameScreen();

    });
    startButton.appendChild(startButtonText);
    startButtonDiv.appendChild(startButton);
    return startButtonDiv;
}

function createCreditsButtonDiv() {
    const startButtonDiv = document.createElement('div');
    startButtonDiv.classList.add('creditsButtonDiv');
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'creditsButton');
    startButton.setAttribute('class', 'gameButton');
    const startButtonText = document.createElement('span');
    startButtonText.textContent = 'Credits';
    startButton.addEventListener('click', () => {
        loadCreditsScreen();
    });
    startButton.appendChild(startButtonText);
    startButtonDiv.appendChild(startButton);
    return startButtonDiv;
}

function createNewGameButtonDiv() {
    const newGameButtonDiv = document.createElement('div');
    newGameButtonDiv.classList.add('newGameButtonDiv');
    const newGameButton = document.createElement('button');
    newGameButton.setAttribute('id', 'newGameButton');
    newGameButton.setAttribute('class', 'gameButton');
    const newGameButtonText = document.createElement('span');
    newGameButtonText.textContent = 'New Game';
    newGameButton.addEventListener('click', () => {
        loadDifficultySettings();
        //loadGameScreen();
    });
    newGameButton.appendChild(newGameButtonText);
    newGameButtonDiv.appendChild(newGameButton);
    return newGameButtonDiv;
}

let continueGameStatus = false;

function createContinueButtonDiv() {
    const continueButtonDiv = document.createElement('div');
    continueButtonDiv.classList.add('newGameButtonDiv');
    const continueButton = document.createElement('button');
    continueButton.setAttribute('id', 'continueButton');
    continueButton.setAttribute('class', 'gameButton');
    const continueButtonText = document.createElement('span');
    continueButtonText.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
        if (localStorage.getItem('myGameState')) {
            loadGameState();
            continueGameStatus = true;
            easyModeStatus = gameState.easyModeStatus;
            loadGameScreen();  
        }
    });
    continueButton.appendChild(continueButtonText);
    continueButtonDiv.appendChild(continueButton);
    
    if (!localStorage.getItem('myGameState')) {
        console.log('No saved game found.');
        // TODO: Disable button  
    }
    return continueButtonDiv;
}

let easyModeStatus = false;

function loadDifficultySettings() {
    const difficultySettingsDiv = document.createElement('div');
    difficultySettingsDiv.classList.add('newGameButtonDiv');
    const difficultyText = document.createElement('div');
    difficultyText.classList.add('difficultyText');
    difficultyText.textContent = 'Choose Difficulty:';
    const normalModeButton = document.createElement('button');
    normalModeButton.classList.add('gameButton');
    normalModeButton.textContent = 'Normal';
    normalModeButton.addEventListener('click', () => {
        loadNameInputScreen();
    });
    

    const easyModeButton = document.createElement('button');
    easyModeButton.classList.add('gameButton');
    easyModeButton.textContent = 'Easy (Hints enabled, no timer, but no score multipliers)';
    easyModeButton.addEventListener('click', () => {
        easyModeStatus = true;      
        loadNameInputScreen();
    });

    difficultySettingsDiv.appendChild(difficultyText);
    difficultySettingsDiv.appendChild(normalModeButton);
    difficultySettingsDiv.appendChild(easyModeButton);

    const content = document.getElementById('content');
    content.textContent = '';
    content.innerHTML = '';
    const newGameScreenContent = document.createElement('div');
    newGameScreenContent.classList.add('newGameScreenContent');
    const titleLogoDiv = createTitleLogoDiv();
    const spacerDiv = createSpacerDiv();
    const footerDiv = createFooterDiv();
    const returnButton = createReturnButton();

    newGameScreenContent.appendChild(titleLogoDiv);
    newGameScreenContent.appendChild(difficultySettingsDiv);
    newGameScreenContent.appendChild(returnButton);
    newGameScreenContent.appendChild(spacerDiv);
    newGameScreenContent.appendChild(footerDiv);

    content.appendChild(newGameScreenContent);
}

function loadNameInputScreen() {
    const nameInputDiv = document.createElement('div');
    nameInputDiv.classList.add('newGameButtonDiv');
    const nameInputText = document.createElement('div');
    nameInputText.classList.add('nameInputText');
    nameInputText.textContent = 'Enter your name:';
    nameInputDiv.appendChild(nameInputText);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('autofocus', true);
    nameInput.setAttribute('maxlength', 15);
    nameInput.setAttribute('autocomplete', 'off');
    nameInputDiv.appendChild(nameInput);

    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'startButton');
    startButton.classList.add('gameButton');
    startButton.textContent = 'Enter the Dungeon!';
    startButton.addEventListener('click', () => {
        resetGameState();
        const nameInput = document.getElementById('nameInput');
        gameState.playerName = nameInput.value;
        saveGameState();
        document.getElementById('startButton').setAttribute('disabled', 'true');
        document.getElementById('returnButton').setAttribute('disabled', 'true');
        nameInput.setAttribute('disabled', 'true');
        playBackgroundAudioOnce('new-game').then(() => {
            loadGameScreen();
        });
        document.getElementById('startButton').setAttribute('disabled', 'false');
        document.getElementById('returnButton').setAttribute('disabled', 'false');
    });

    nameInputDiv.appendChild(startButton);

    const content = document.getElementById('content');
    content.textContent = '';
    content.innerHTML = '';
    const newGameScreenContent = document.createElement('div');
    newGameScreenContent.classList.add('newGameScreenContent');
    const titleLogoDiv = createTitleLogoDiv();
    const spacerDiv = createSpacerDiv();
    const footerDiv = createFooterDiv();
    const returnButton = createReturnButton();

    newGameScreenContent.appendChild(titleLogoDiv);
    newGameScreenContent.appendChild(nameInputDiv);
    newGameScreenContent.appendChild(returnButton);
    newGameScreenContent.appendChild(spacerDiv);
    newGameScreenContent.appendChild(footerDiv);
    
    content.appendChild(newGameScreenContent);

}

function loadCreditsScreen() {
    const creditsDisplayDiv = document.createElement('div');
    creditsDisplayDiv.classList.add('newGameButtonDiv');
    
    const createdByText = document.createElement('div');
    createdByText.classList.add('creditsTitle');
    createdByText.textContent = 'Created By:';

    const dinitrogenText = document.createElement('div');
    dinitrogenText.classList.add('creditsText');
    dinitrogenText.textContent = 'Don Knobloch (dinitrogen)';

    const khandyText = document.createElement('div');
    khandyText.classList.add('creditsText');
    khandyText.textContent = 'Kevin Handy (khandy)';

    const mzeoliText = document.createElement('div');
    mzeoliText.classList.add('creditsText');
    mzeoliText.textContent = 'Matt Zeoli (mzeoli)';


    const specialThanksTitle = document.createElement('div');
    specialThanksTitle.classList.add('creditsTitle');
    specialThanksTitle.textContent = 'Special Thanks:';

    const specialThanksText = document.createElement('div');
    specialThanksText.classList.add('creditsText');
    specialThanksText.textContent = 'Elly K., Daniel Brummel & Ryen Slegr';

    creditsDisplayDiv.appendChild(createdByText);
    creditsDisplayDiv.appendChild(dinitrogenText);
    creditsDisplayDiv.appendChild(khandyText);
    creditsDisplayDiv.appendChild(mzeoliText);
    creditsDisplayDiv.appendChild(specialThanksTitle);
    creditsDisplayDiv.appendChild(specialThanksText);

    const content = document.getElementById('content');
    content.textContent = '';
    content.innerHTML = '';
    const creditsScreenContent = document.createElement('div');
    creditsScreenContent.classList.add('creditsScreenContent');
    const titleLogoDiv = createTitleLogoDiv();
    const spacerDiv = createSpacerDiv();
    const footerDiv = createFooterDiv();
    const returnButton = createReturnButton();

    creditsScreenContent.appendChild(titleLogoDiv);
    creditsScreenContent.appendChild(creditsDisplayDiv);
    creditsScreenContent.appendChild(returnButton);
    creditsScreenContent.appendChild(spacerDiv);
    creditsScreenContent.appendChild(footerDiv);

    content.appendChild(creditsScreenContent);
}

function createPracticeModeButton() {
    const practiceModeButton = document.createElement('button');
    practiceModeButton.classList.add('gameButton');
    practiceModeButton.textContent = 'Practice Mode';
    practiceModeButton.addEventListener('click', () => {
        practiceModeStatus = true;
        loadGameScreen();
    });
    return practiceModeButton;
}

function createHowToPlayButton() {
    const howToPlayButton = document.createElement('button');
    howToPlayButton.classList.add('gameButton');
    howToPlayButton.textContent = 'How to Play';
    howToPlayButton.addEventListener('click', () => {
        loadHowToPlayScreen();
        const returnButton = createReturnButton();
        content.appendChild(returnButton);
        const footerDiv = createFooterDiv();
        content.appendChild(footerDiv);
    });
    return howToPlayButton;
}

function createHighScoresButton() {
    const highScoresButton = document.createElement('button');
    highScoresButton.classList.add('gameButton');
    highScoresButton.textContent = 'High Scores';
    highScoresButton.addEventListener('click', () => {
        loadHighScoresScreen();
        const returnButton = createReturnButton();
        content.appendChild(returnButton);
        const footerDiv = createFooterDiv();
        content.appendChild(footerDiv);
    });
    return highScoresButton;
}


function createReturnButton() {
    const returnButton = document.createElement('button');
    returnButton.classList.add('gameButton');
    returnButton.setAttribute('id', 'returnButton');
    returnButton.textContent = 'Back';
    returnButton.addEventListener('click', () => {
        practiceModeStatus = false;
        loadNewGameScreen();
    });
    return returnButton;
}

function createTitleLogoDiv() {
    const titleLogoDiv = document.createElement('div');
    titleLogoDiv.classList.add('titleLogoDiv');
    const titleLogo = document.createElement('object');
    titleLogo.setAttribute('data', `./img/graphics/logo.svg`);
    titleLogo.setAttribute('type', 'image/svg+xml');
    titleLogo.classList.add('titleLogo');

    titleLogoDiv.appendChild(titleLogo);
    return titleLogoDiv;
}

function createSpacerDiv() {
    const spacerDiv = document.createElement('div');
    spacerDiv.classList.add('spacerDiv');
    return spacerDiv;
}

function createFooterDiv() {
    const footerDiv = document.createElement('div');
    footerDiv.classList.add('footerDiv');
    const footerTextDiv = document.createElement('div');
    footerTextDiv.classList.add('footerTextDiv');
    const footerText = document.createElement('span');
    footerText.classList.add('footerText');
    footerText.innerHTML = '&copy 2021 dinitrogen games';
    footerTextDiv.appendChild(footerText);
    footerDiv.appendChild(footerTextDiv);
    return footerDiv;
}

function loadTitleScreen() {
    const content = document.getElementById('content');
    content.textContent = '';
    const titleScreenContent = document.createElement('div');
    titleScreenContent.classList.add('titleScreenContent');

    const titleLogoDiv = createTitleLogoDiv();
    const startButtonDiv = createStartButtonDiv();
    const spacerDiv = createSpacerDiv();
    const footerDiv = createFooterDiv();

    content.appendChild(titleScreenContent);
    titleScreenContent.appendChild(titleLogoDiv);
    titleScreenContent.appendChild(startButtonDiv);
    titleScreenContent.appendChild(spacerDiv);
    titleScreenContent.appendChild(footerDiv);
}

// Variable to toggle practice mode
let practiceModeStatus = false;

function loadNewGameScreen() {
    playBackgroundAudioLoop('title-screen');
    const content = document.getElementById('content');
    content.textContent = '';
    content.innerHTML = '';
    const newGameScreenContent = document.createElement('div');
    newGameScreenContent.classList.add('newGameScreenContent');

    const titleLogoDiv = createTitleLogoDiv();
    const newGameButtonDiv = createNewGameButtonDiv();
    const continueButtonDiv = createContinueButtonDiv();
    const practiceModeButton = createPracticeModeButton();
    const howToPlayButton = createHowToPlayButton();
    const optionsButton = createHighScoresButton();
    const spacerDiv = createSpacerDiv();
    const footerDiv = createFooterDiv();
    const creditsButtonDiv = createCreditsButtonDiv();

    newGameButtonDiv.appendChild(continueButtonDiv);
    newGameButtonDiv.appendChild(practiceModeButton);
    newGameButtonDiv.appendChild(howToPlayButton);
    newGameButtonDiv.appendChild(optionsButton);
    newGameButtonDiv.appendChild(creditsButtonDiv);

    content.appendChild(newGameScreenContent);
    newGameScreenContent.appendChild(titleLogoDiv);
    newGameScreenContent.appendChild(newGameButtonDiv);
    newGameScreenContent.appendChild(spacerDiv);
    newGameScreenContent.appendChild(footerDiv);
}


loadTitleScreen();
// resizeGameScreen();




// Basic function to resize game contents to fit the window -  but seems to add large top and/or left margins.
function resizeGameScreen() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scaleX = 1;
    let scaleY = 1;
    if (windowHeight < 1200) {
        scaleY = windowHeight / 1200;
        let content = document.getElementById('content');
        content.style.transform = `scale(${scaleY})`;
    }
    if (windowWidth < 1200) {
        scaleX = windowWidth / 1200;
        if (scaleX > scaleY) {
            return;
        } else {
            let content = document.getElementById('content');
            content.style.transform = `scale(${scaleX})`;
        }
    }
}

