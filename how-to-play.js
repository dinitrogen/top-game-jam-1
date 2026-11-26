
function loadHowToPlayScreen() {

    const content = document.getElementById('content');
    content.textContent = '';
    const howToPlayScreenContent = document.createElement('div');
    howToPlayScreenContent.classList.add('howToPlayScreenContent');

    const howToPlayHeader = document.createElement('h1');
    howToPlayHeader.textContent = 'HOW TO PLAY';

    const storyHeader = document.createElement('h2');
    storyHeader.textContent = 'STORY';

    const storyText = document.createElement('p');
    storyText.textContent = 'For millenia, the guild of music mages have lived in secret, protecting the "Pentatonic" -- a magical relic that provides the source of all music in the world. Recently, the guild was corruputed by a dark force attemtping to rid the world of music\. The Pentatonic was shattered and its notes were sequestered away in a deep and dangerous dungeon, guarded by the now-twisted wizards who once kept it safe. Years passed, and music slowly disappeared from the world. You are Zemis, the only mage who managed to escape during this evil takeover. Only a faint memory of your musical wisdom remains, but after countless years of searching you have finally located the dungeon where the Pentatonic fragments remain held hostage under the evil being\'s curse. Enter the dungeon, restore your musical memory, and recover the Pentatonic fragments to return music to the world!';

    const controlsHeader = document.createElement('h2');
    controlsHeader.textContent = 'CONTROLS';

    const controlsText = document.createElement('p');
    controlsText.textContent = 'Arrow keys: move'

    const controlsText2 = document.createElement('p');
    controlsText2.textContent = 'Space bar: Select letter / Pickup item / Cast spell'

    const controlsText3 = document.createElement('p');
    controlsText3.textContent = 'On mobile: use the on-screen arrows and Action button'

    const directionsHeader = document.createElement('h2');
    directionsHeader.textContent = 'INSTRUCTIONS';

    const directionsText = document.createElement('p');
    directionsText.textContent = 'Navigate Zemis through each floor of the dungeon before time expires. Select the corresponding letter of the music note displayed on the musical staff to progress. You will lose a life if you select a wrong note, or get hit by an enemy. Useful items will sometimes appear to help you on your adventure. Playing well will increase the score multiplier and maximize your score!';
    
    const howToPlayItemDiv = document.createElement('div');
    howToPlayItemDiv.classList.add('howToPlayItemDiv');

    let heart = document.createElement('object');
    heart.setAttribute('data', `./img/map-icons/heart.svg`);
    heart.setAttribute('type', 'image/svg+xml');
    heart.setAttribute('class', 'mapHeart');

    const heartText = document.createElement('span');
    heartText.textContent = ' : Restore one life';

    let key = document.createElement('object');
    key.setAttribute('data', `./img/map-icons/key.svg`);
    key.setAttribute('type', 'image/svg+xml');
    key.setAttribute('class', 'mapKey');

    const keyText = document.createElement('span');
    keyText.textContent = ' : Unlock a door (orange tile)';

    let stopwatch = document.createElement('object');
    stopwatch.setAttribute('data', `./img/map-icons/stopwatch.svg`);
    stopwatch.setAttribute('type', 'image/svg+xml');
    stopwatch.setAttribute('class', 'stopwatch');

    const stopwatchText = document.createElement('span');
    stopwatchText.textContent = ' : Restore some time';

    let ring = document.createElement('object');
    ring.setAttribute('data', `./img/map-icons/ring.svg`);
    ring.setAttribute('type', 'image/svg+xml');
    ring.setAttribute('class', 'ring');

    const ringText = document.createElement('span');
    ringText.textContent = ' : Protects against one hit or wrong note';

    let bossNote = document.createElement('object');
    bossNote.setAttribute('data', `./img/map-icons/note-blue.svg`);
    bossNote.setAttribute('type', 'image/svg+xml');
    bossNote.setAttribute('class', 'bossNote');

    const bossNoteText = document.createElement('span');
    bossNoteText.textContent = ' : Collect the five Pentatonic shards!';

    const heartDiv = document.createElement('div');
    heartDiv.appendChild(heart);
    heartDiv.appendChild(heartText);
    
    const keyDiv = document.createElement('div');
    keyDiv.appendChild(key);
    keyDiv.appendChild(keyText);

    const stopwatchDiv = document.createElement('div');
    stopwatchDiv.appendChild(stopwatch);
    stopwatchDiv.appendChild(stopwatchText);
    
    const ringDiv = document.createElement('div');
    ringDiv.appendChild(ring);
    ringDiv.appendChild(ringText);

    const bossNoteDiv = document.createElement('div');
    bossNoteDiv.appendChild(bossNote);
    bossNoteDiv.appendChild(bossNoteText);
    
    howToPlayItemDiv.appendChild(heartDiv);
    howToPlayItemDiv.appendChild(keyDiv);
    howToPlayItemDiv.appendChild(stopwatchDiv);
    howToPlayItemDiv.appendChild(ringDiv);
    howToPlayItemDiv.appendChild(bossNoteDiv);
    
    howToPlayScreenContent.appendChild(howToPlayHeader);
    howToPlayScreenContent.appendChild(storyHeader);
    howToPlayScreenContent.appendChild(storyText);
    howToPlayScreenContent.appendChild(controlsHeader);
    howToPlayScreenContent.appendChild(controlsText);
    howToPlayScreenContent.appendChild(controlsText2);
    howToPlayScreenContent.appendChild(controlsText3);
    howToPlayScreenContent.appendChild(directionsHeader);
    howToPlayScreenContent.appendChild(directionsText);
    howToPlayScreenContent.appendChild(howToPlayItemDiv);
    
    content.appendChild(howToPlayScreenContent);
    
}


export { loadHowToPlayScreen };


