import { levels } from './levels.js';
import { notesLibrary } from './note-library.js';
import { maps } from './maps.js';



// Main game screen loader
function loadGameScreen() {

    const levelDisplay = document.createElement('div');
    levelDisplay.setAttribute('id', 'levelDisplay');
    levelDisplay.textContent = 'Level:';
    
    const levelNameDisplay = document.createElement('div');
    levelNameDisplay.setAttribute('id', 'levelNameDisplay');

    const lifeDisplay = document.createElement('div');
    lifeDisplay.setAttribute('id', 'lifeDisplay');
    lifeDisplay.textContent = 'Life: 5';

    const scoreDisplay = document.createElement('div');
    scoreDisplay.setAttribute('id', 'scoreDisplay');
    scoreDisplay.textContent = 'Score: 0';

    const resultDisplay = document.createElement('div');
    resultDisplay.setAttribute('id', 'resultDisplay');
    resultDisplay.textContent = '[result]';

    const keyDisplay = document.createElement('div');
    keyDisplay.setAttribute('id', 'keyDisplay');

    const spellDisplay = document.createElement('div');
    spellDisplay.setAttribute('id', 'spellDisplay');
    spellDisplay.textContent = 'Spell charge:';

    const spellBarBorder = document.createElement('div');
    spellBarBorder.classList.add('spellBarBorder');
    const spellBarEmpty = document.createElement('span');
    spellBarEmpty.classList.add('spellBarEmpty');
    const spellBarFill = document.createElement('span');
    spellBarFill.classList.add('spellBarFill');
    const spellChargedText = document.createElement('div');
    spellChargedText.classList.add('spellChargedText');
    spellBarBorder.appendChild(spellBarEmpty);
    spellBarEmpty.appendChild(spellBarFill);
    spellDisplay.appendChild(spellBarBorder);
    spellDisplay.appendChild(spellChargedText);

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
    timerDisplay.textContent = 'Time:';

    const staffDiv = document.createElement('div');
    staffDiv.setAttribute('class', 'staffDiv');
    
    const gameMap = document.createElement('div');
    gameMap.setAttribute('class', 'gameMap');
    
    const content = document.getElementById('content');
    content.textContent = '';
    content.appendChild(levelDisplay);
    content.appendChild(levelNameDisplay);
    content.appendChild(lifeDisplay);
    content.appendChild(scoreDisplay);
    content.appendChild(resultDisplay);
    content.appendChild(keyDisplay);
    content.appendChild(spellDisplay);
    content.appendChild(bossDisplay);
    content.appendChild(timerDisplay);
    content.appendChild(staffDiv);
    content.appendChild(gameMap);

     
    const endGameOverlay = document.querySelector('#endGameOverlay');
    const gameOver = document.querySelector('#gameOver');
    const replayButton = document.querySelector('#replayButton');
    replayButton.addEventListener('click', () => {
        startNewGame();
        // if (bgMusicTrack) {
        //     bgMusicTrack.stop();
        // }
        playAudioTrack('new-game', false);
    });

    const nextLevelButton = document.querySelector('#nextLevelButton');
    nextLevelButton.addEventListener('click', goToNextLevel);

    console.log(notesLibrary.length);
    let notesList = [];
    let correctAnswer;
    let correctOctave;
    let gridSize = 10; // Also must change in CSS
    let gridArea = gridSize ** 2;
    let activeTileIndex = 0;
    let activeTile;
    
    // let enemyTileIndex = gridArea - 1
    // let enemyTile;
    
    let enemyTileIndices = [];

    let enemyTiles = [];
    
    let score = 0;
    let life = 5;
    let haveKey = false;
    let spellCharge = 0;
    //let bgMusicTrack;
    let gameOverStatus = false;

    let levelIndex = 0;
    let noteIndex = 0;
    let noteDelay = 2;
    correctAnswer = levels[0].notes[noteIndex].letter;



    document.addEventListener('keydown', movePlayer)

    function useKey(tileIndex) {
        let lockedTile = document.querySelector(`#tile${tileIndex}`);
        lockedTile.classList.remove('locked-tile');
        haveKey = false;
        keyDisplay.removeChild(keyDisplay.firstChild);
    }

      
    function movePlayer(event) {
        let previousTileIndex = activeTileIndex,
            leftTile = (activeTileIndex % gridSize === 0) ? undefined : document.querySelector(`#tile${activeTileIndex-1}`),
            rightTile = ((activeTileIndex + 1) % gridSize === 0) ? undefined : document.querySelector(`#tile${activeTileIndex+1}`),
            upTile = (activeTileIndex < gridSize) ? undefined : document.querySelector(`#tile${activeTileIndex - gridSize}`),
            downTile = (activeTileIndex >= gridArea - gridSize) ? undefined : document.querySelector(`#tile${activeTileIndex + gridSize}`);
      
        if (event.code === "ArrowLeft") {
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
        } else if (event.code === "ArrowRight") {
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
        } else if (event.code === "ArrowUp") {
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
        } else if (event.code === "ArrowDown") {
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
        } else if (event.code === "Space") {
            if (stairsOn) {
                return;
            }else if (levels[levelIndex].name === 'boss' && spellCharge >= spellChargeMax) {
                castSpell();
            
            } else if (activeTile.textContent === ' ') {
                return;
            } else if (activeTile.classList.contains('hasHeart')) {
                increaseLife();
                activeTile.classList.remove('hasHeart');
                activeTile.innerHTML = '';
                // activeTile.removeChild(firstChild);
            } else if (activeTile.classList.contains('hasKey')) {
                getKey();
                activeTile.classList.remove('hasKey');
                activeTile.innerHTML = '';
            } else if (activeTile.textContent === correctAnswer) {

                if (levels[levelIndex].name === 'boss') {
                    resultDisplay.textContent = 'Correct!';
                    let note = `${correctAnswer}${correctOctave}`;
                    playNote(note, 1);
                    increaseScore();
                    chargeSpell(note);
                    let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
                    correctAnswer = randomNote.note;
                    correctOctave = randomNote.octave;
                    generateNotesList(gridArea);
                    populateMap(gridArea);
                    placeRandomLocks(gridArea, 1);
                    updateStaffDiv(correctAnswer, correctOctave);

                } else {
                
                    resultDisplay.textContent = 'Correct!';
                    let note = `${correctAnswer}${levels[levelIndex].notes[noteIndex].octave}`;
                    playNote(note, 1);
                    increaseScore();
                    // correctAnswer = getRandomNote();
                    correctAnswer = getNextNote(levels[levelIndex], noteIndex);
                    if (noteIndex >= levels[levelIndex].notes.length - 1) {
                        levelComplete(levels[levelIndex]);
                    } else {
                        noteIndex++;
                        generateNotesList(gridArea);
                        populateMap(gridArea);
                        placeRandomLocks(gridArea, 1);
                        let octave = `${levels[levelIndex].notes[noteIndex].octave}`;
                        updateStaffDiv(correctAnswer, octave);
                    }

                }
            } else {
                activeTile.textContent = 'X';
                resultDisplay.textContent = 'Wrong!';
                decreaseLife();
            }
          
            // Prevent "hero" class from being removed after space is pressed.
            return;
        } else {
            return;
        }
        activeTile = document.querySelector(`#tile${activeTileIndex}`);
        activeTile.classList.add('activeTile');
        renderHeroSprite(activeTileIndex, previousTileIndex);
        
        enemyTileIndices.forEach(function(enemyTileIndex, i, arr) {
            decideEnemyMove(enemyTileIndex, i, arr);

        });
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
        arr[i] = enemyTileIndex;
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
        arr[i] = enemyTileIndex;
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
        arr[i] = enemyTileIndex;
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
        arr[i] = enemyTileIndex;
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
            } else if (!blockedLeft){
                moveEnemyLeft(enemyTileIndex, i, arr);
            } else if (!blockedRight){
                moveEnemyRight(enemyTileIndex, i, arr);
            } else {
                moveEnemyDown(enemyTileIndex, i, arr);
            }
        } else if (activeTileIndex > enemyTileIndex) {
            if ((activeTileIndex - gridSize > enemyTileIndex) && !blockedBottom) {
                moveEnemyDown(enemyTileIndex, i, arr);
            } else if (!blockedRight){
                moveEnemyRight(enemyTileIndex, i, arr);
            } else if (!blockedLeft) {
                moveEnemyLeft(enemyTileIndex, i, arr);
            } else {
                moveEnemyUp(enemyTileIndex, i, arr);
            }
        }
        enemyTileIndex = arr[i];
        if (activeTileIndex === enemyTileIndex) {
            decreaseLife();
            resetEnemyPosition(enemyTileIndex, i, arr);
        }
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
        arr[i] = enemyTileIndex;
    }

    function renderEnemySprite(tileIndex, previousTileIndex) {
        let tile = document.getElementById(`tile${tileIndex}`);
        let previousTile = document.getElementById(`tile${previousTileIndex}`);
        tile.classList.add('enemy');
        if (previousTile) previousTile.classList.remove('enemy');
    }


    function drawGrid() {
        while (gameMap.firstChild) {
            gameMap.removeChild(gameMap.lastChild);
        }

        for  (let i = 0; i < gridArea; i++) {
            const gameTile = document.createElement('div');
            gameTile.classList = 'gameTile';
            gameTile.setAttribute('id',`tile${i}`)
            gameMap.appendChild(gameTile);
        }

        activeTile = document.querySelector('#tile0');
        activeTile.classList.add('activeTile');
        enemyTiles = [document.querySelector(`#tile${gridArea - 1}`)];
        enemyTiles.forEach(function(enemyTile) {
            enemyTile.classList.add('enemyTile');
        });
    }

    function placeWalls(mapId) {
        // retrieve the map from the map collection which matches the requested map ID
        
        // TODO: add mapID as a property to each level object
        let map = maps.filter(obj => {
            return obj.id === mapId
        })[0];

        // process each wall in the map
        map.walls.forEach(wall => {

            // vertical walls advance along the Y axis
            if (wall.type === 'vertical') {
                for (let i=wall.startY; i<wall.startY+wall.length; i++) {

                    // find and apply the CSS classes to the borders in between the correct tiles
                    let rightWallTile = document.querySelector(`#tile${(i * gridSize) + wall.startX}`),
                        leftWallTile = document.querySelector(`#tile${(i * gridSize) + wall.startX + 1}`);
                        
                        rightWallTile.classList.add('wall-right');
                        leftWallTile.classList.add('wall-left');
                }
            }

            // horizontal walls advance along the X axis
            else if (wall.type === 'horizontal') {
                for (let i=wall.startX; i<wall.startX+wall.length; i++) {

                    // find and apply the CSS classes to the borders in between the correct tiles
                    let topWallTile = document.querySelector(`#tile${((wall.startY + 1) * gridSize) + i}`),
                        bottomWallTile = document.querySelector(`#tile${(wall.startY * gridSize) + i}`);
                    
                        topWallTile.classList.add('wall-top');
                        bottomWallTile.classList.add('wall-bottom');
                }
            }
        });
    }


    function generateNotesList(numTiles) {
        notesList[0] = correctAnswer;
        notesList[1] = 'H';
        notesList[2] = 'K';
        
        for (let i = 3; i < numTiles; i++) {
            notesList[i] = " ";
        }
        
        // Change the i increment to adjust how populated the map is
        for (let i = 3; i < numTiles; i = i + 7) {
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

        for (let i=0; i<lockCount; i++) {
            // TODO: We could have an endless loop here if lockCount is greater than the number
            // of tiles that actually have notes.
            do {
                let randomTileIndex = Math.floor(Math.random() * numTiles)
                randomTile = document.querySelector(`#tile${randomTileIndex}`);
            } while (randomTile.textContent === ' ' || randomTile.classList.contains('hasHeart') || randomTile.classList.contains('hasKey') || randomTile.classList.contains('locked-tile') || randomTileIndex === activeTileIndex);
            randomTile.classList.add('locked-tile');
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
          
            } else {
                document.getElementById(`tile${i}`).textContent = notesList[i];
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
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function decreaseLife() {
        life--;
        updateLifeBar(life);
        //lifeDisplay.textContent = `Life: ${life}`;
        if (life <= 0) {
            displayGameOver();
        }
    }

    function increaseLife() {
        if (life < 5) {
            life++;
        }
        updateLifeBar(life);
    }

    function displayGameOver() {
        gameOverStatus = true;
        resultDisplay.textContent = 'GAME OVER';
        gameOver.textContent = 'GAME OVER';
        endGameOverlay.style.display = 'block';
        nextLevelButton.style.display = 'none';
        replayButton.style.display = 'block';
        // TODO Game over screen
    }

    function displayWinScreen() {
        playAudioTrack('end-credits', true, 0);
        resultDisplay.textContent = 'You are a melody master!';
        gameOver.textContent = 'YOU ARE A MELODY MASTER!';
        endGameOverlay.style.display = 'block';
        nextLevelButton.style.display = 'none';
        replayButton.style.display = 'block';
        // TODO Win screen
    }

    function levelComplete(level) {
        resultDisplay.textContent = 'LEVEL COMPLETE';
        // gameOver.textContent = 'LEVEL COMPLETE';
        // endGameOverlay.style.display = 'block';
        // nextLevelButton.style.display = 'block';
        // replayButton.style.display = 'none';
        playMelody(level);
        noteDelay = 2;

        showStairs();
    }

    let stairsOn = false;
    let stairsTileIndex;
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
            stairsTile.classList.add('stairsTile');
        } else {
            stairsTile = document.getElementById(`tile${stairsTileIndex}`);
            stairsTile.classList.add('stairsTile');
        }
    }

    function playNote(note, duration, delay) {
        if (bgMusicTrack) {
            bgMusicTrack.volume.value = -30;
            setTimeout(function() {
                bgMusicTrack.volume.value = -10
            }, (duration * 1000));
        }
        
        const synth = new Tone.Synth().toDestination();
        synth.volume.value = 0;
        synth.triggerAttackRelease(note, duration, delay);
    }


    function playMelody(level) {
        for (let i = 0; i < level.notes.length; i++) {
            let now = Tone.now();
            let note = `${level.notes[i].letter}${level.notes[i].octave}`;
            let duration = level.notes[i].duration;
            playNote(note, duration, now + noteDelay);
            noteDelay = noteDelay + level.notes[i].duration;
        }
    }




    function goToNextLevel() {
        stairsOn = false;
        levelIndex++;
        if (levelIndex >= levels.length) {
            displayWinScreen();
        } else if (levels[levelIndex].name === 'boss') {
            console.log('boss stage');
            levelDisplay.textContent = `Level ${levelIndex + 1}`;
            levelNameDisplay.textContent = 'BOSS STAGE!';
            loadBossStage();
    
        } else {
            levelDisplay.textContent = `Level ${levelIndex + 1}`;
            levelNameDisplay.textContent = `${levels[levelIndex].name}`
            startNewLevel(levels[levelIndex]);
        }
    }

    

    


    function createTrebleStaffNote(note, octave) {
        let fullNote = `${note}${octave}`;
        let noteIndex = notesLibrary.map(function(e) {
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
        lifeDisplay.textContent = 'LIFE: ';
        
        for (let i = 0; i < life; i++) {
            let heart = document.createElement('object');
            heart.setAttribute('data', `./img/map-icons/heart.svg`);
            heart.setAttribute('type', 'image/svg+xml');
            heart.setAttribute('class', 'heart');
            lifeDisplay.appendChild(heart);
        }
    }

    function getKey() {
        if (haveKey === false) {
            let key = document.createElement('object');
            key.setAttribute('data', `./img/map-icons/key.svg`);
            key.setAttribute('type', 'image/svg+xml');
            key.setAttribute('class', 'key');
            keyDisplay.appendChild(key);
            haveKey = true;
        }
    }
    
    let spellChargeMax = 3;
    let spellChargeNotes = [];

    function chargeSpell(note) {
        spellCharge++;
        let spellChargePercent = Math.floor(spellCharge / spellChargeMax * 100);
        let spellChargeFill = `${spellChargePercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', spellChargeFill);

        spellChargeNotes.push(note);
        console.log(spellChargeNotes);
        if (spellCharge === 1) {
            spellChargedText.textContent = `${correctAnswer}`;
        } else {
            spellChargedText.textContent = spellChargedText.textContent.concat(` ${correctAnswer}`);
        }

        if (spellCharge === spellChargeMax) {
            spellBarFill.classList.add('blink');
        }

    }

    function castSpell() {
        console.log('BOOM!');
        spellCharge = 0;
        spellBarFill.classList.remove('blink');
        let root = document.querySelector(':root');
        root.style.setProperty('--spellChargeFill', '0%');
        spellChargedText.textContent = '';
        
        
        spellChargeNotes.forEach(function(note) {
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
        if (activeTileIndex > (gridSize * 2) - 2) {
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
        if (activeTileIndex < gridArea - 1 && (activeTileIndex + 1) % gridSize !== 0 && activeTileIndex > gridSize -1) {
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
        
        spellCastTiles.forEach(function(tile) {
            tile.classList.add('spellCast');

        });

        setTimeout(function() {
            spellCastTiles.forEach(function(tile) {
                tile.classList.remove('spellCast');
            });
        }, 200);

        let bossTile = document.getElementById(`tile${bossTileIndex}`);
        if (spellCastTiles.includes(bossTile)) {
            damageBoss();
            //enemyTile.classList.remove('enemy');
        }

    }

    let bossLife = 3;
    let maxBossLife = 3;

    function damageBoss() { 
        bossLife--;
        let bossLifePercent = Math.floor(bossLife / maxBossLife * 100);
        let bossLifeFill = `${bossLifePercent}%`;
        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', bossLifeFill);

        let bossTile = document.getElementById(`tile${bossTileIndex}`);
        bossTile.classList.remove('boss');
        
        if (bossLife <= 0) { 

            levelComplete(levels[levelIndex]);

        } else {
            setTimeout(function() {
                bossTile.classList.add('boss')
            }, 100);  
        }

    }

    function startTimer() {
        let timeLeft = levels[levelIndex].time;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        let timer = setInterval(countDown, 1000);
        function countDown() {
            if (gameOverStatus) {
                clearInterval(timer);
            
            } else if (stairsOn) {
                clearInterval(timer);
            } else if (timeLeft <= 0) {
                clearInterval(timer);
                displayGameOver();
            } else {
                timeLeft--;
                timerDisplay.textContent = `Time: ${timeLeft}`;
            }
        }
    }


    function startNewLevel(level) {
        endGameOverlay.style.display = 'none';
        activeTileIndex = 0;
        enemyTileIndices = [(gridArea - 1), 9];
        noteIndex = 0;
        correctAnswer = level.notes[noteIndex].letter;
        let octave = level.notes[noteIndex].octave;
        updateStaffDiv(correctAnswer, octave);
        drawGrid();
        placeWalls(levels[levelIndex].mapId);
        generateNotesList(gridArea);
        populateMap(gridArea);
        placeRandomLocks(gridArea, 1);
        resultDisplay.textContent = '';
        haveKey = false;
        keyDisplay.innerHTML = '';
        // resetEnemyPosition();
        bossLife = 3;
        // bossDisplay.textContent = `Enemy life: ${bossLife}`;
        
        enemyTileIndices.forEach(function(enemyTileIndex) {
            renderEnemySprite(enemyTileIndex);
        });
        //renderEnemySprite(enemyTileIndex);
        renderHeroSprite(activeTileIndex);
        
        playAudioTrack('dungeon-a', true, 1.7);
        startTimer();
    }

    function loadBossStage() {
        endGameOverlay.style.display = 'none';
        activeTileIndex = 0;
        bossTileIndex = gridArea - 1;
        noteIndex = 0;
        let randomNote = notesLibrary[Math.floor(Math.random() * 47)];
        correctAnswer = randomNote.note;
        correctOctave = randomNote.octave;
        updateStaffDiv(correctAnswer, correctOctave);
        drawGrid();
        // loadMap(1);
        generateNotesList(gridArea);
        populateMap(gridArea);
        resultDisplay.textContent = '';
        haveKey = false;
        keyDisplay.innerHTML = '';
        //resetEnemyPosition();
        renderEnemySprite(bossTileIndex);
        renderHeroSprite(activeTileIndex);

        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', '100%');
        
        playAudioTrack('boss-theme', true, 0);
        startTimer();
    }


    function startNewGame() {
        gameOverStatus = false;
        endGameOverlay.style.display = 'none';
        activeTileIndex = 0;
        enemyTileIndices = [(gridArea - 1), 9];
        noteIndex = 0;
        levelIndex = 0;
        correctAnswer = levels[0].notes[noteIndex].letter;
        let octave = levels[0].notes[noteIndex].octave;
        updateStaffDiv(correctAnswer, octave);
        drawGrid();
        placeWalls(levels[levelIndex].mapId);
        generateNotesList(gridArea);
        populateMap(gridArea);
        placeRandomLocks(gridArea, 1);
        levelDisplay.textContent = `Level ${levelIndex + 1}`
        levelNameDisplay.textContent = `${levels[levelIndex].name}`;
        life = 5;
        updateLifeBar(life);
        haveKey = false;
        keyDisplay.innerHTML = '';
        // lifeDisplay.textContent = `Life: ${life}`;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        resultDisplay.textContent = '';
        bossLife = 3;
        // bossDisplay.textContent = `Enemy life: ${bossLife}`;
        // resetEnemyPosition();
        enemyTileIndices.forEach(function(enemyTileIndex) {
            renderEnemySprite(enemyTileIndex);
        });
        
        renderHeroSprite(activeTileIndex);

        let root = document.querySelector(':root');
        root.style.setProperty('--bossLifeFill', '0%');
        root.style.setProperty('--spellChargeFill', '0%');
        spellChargedText.textContent = '';
        
        playAudioTrack('new-game', false);
        setTimeout(function() { playAudioTrack('dungeon-a', true, 1.7)}, 5000);
        startTimer();
    }



  startNewGame();

}

// Title and start screen functions
function createStartButton() {
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'startButton');
    startButton.setAttribute('class', 'gameButton');
    const startButtonText = document.createElement('span');
    startButtonText.textContent = 'Start';
    startButton.appendChild(startButtonText);
    return startButton;
}

function createNewGameButton() {
    const newGameButton = document.createElement('button');
    newGameButton.setAttribute('id', 'newGameButton');
    newGameButton.setAttribute('class', 'gameButton');
    const newGameButtonText = document.createElement('span');
    newGameButtonText.textContent = 'Enter the Dungeon';
    newGameButton.appendChild(newGameButtonText);
    return newGameButton;



}

function loadTitleScreen() {
    const content = document.getElementById('content');
    content.textContent = '';
    const startButton = createStartButton();
    startButton.addEventListener('click', () => {
        loadNewGameScreen();
        setTimeout(function() {
            playAudioTrack('title-screen', true, 0)
        }, 750);
    });
    
    content.appendChild(startButton);

    const tempPara = document.createElement('p');
    tempPara.textContent = 'Initial landing page for game. Clicking button will trigger title music.';
    content.appendChild(tempPara);
}


function loadNewGameScreen() {
    const content = document.getElementById('content');
    content.textContent = '';
    const newGameButton = createNewGameButton();
    newGameButton.addEventListener('click', () => {
        loadGameScreen();
    });
    content.appendChild(newGameButton);

    const tempPara = document.createElement('p');
    tempPara.textContent = 'Options, Instructions, etc. will appear on this screen. Title music will also play here.';
    content.appendChild(tempPara);
}

loadTitleScreen();



// TODO : refactor code to move this variable and function back into a local scope.
let bgMusicTrack;

// Plays background music/sounds from .wav files
function playAudioTrack(trackName, loopStatus, loopStartTime) {
    if(bgMusicTrack) {
        bgMusicTrack.stop();
    }
    bgMusicTrack = new Tone.Player(`./music/${trackName}.wav`).toDestination();
    bgMusicTrack.volume.value = -10;
    bgMusicTrack.loopStart = loopStartTime;
    bgMusicTrack.autostart = true;
    bgMusicTrack.loop = loopStatus; // boolean
}





