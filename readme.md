# Melody Quest

Melody Quest is a music education/arcade action game with an 8-bit retro style, offering a fun and engaging approach to help students with memorization of musical note placement on the staff and basic musical theory concepts.  Players will explore the depths of a mysterious dungeon, navigating 50+ maze-like levels, dodging enemies, and facing-off against a variety of bosses while collecting notes on a quest to recover the "Pentatonic," a magical relic that provides the source of all music in the world. 

Melody Quest features original pixel art and an original 8-bit-inspired soundtrack of 12+ tracks. The game also features a scoring system that rewards flawless playing with score multiplier bonuses, encouraging replay for high score attempts.

Melody Quest was developed by a small team for the first game jam hosted by [The Odin Project](https://www.theodinproject.com/). The game was programmed all with JavaScript/HTML/CSS, no fancy frameworks or libraries.

## Play the Game

Play the full game here: [Melody Quest](https://dinitrogen.itch.io/melody-quest)

### Instructions

Navigate the main character through each floor of the dungeon before time expires. Select the corresponding letter of the music note displayed on the musical staff to progress. You will lose a life if you select a wrong note, or get hit by an enemy. Useful items will sometimes appear to help you on your adventure. Playing well will increase the score multiplier and maximize your score!

An easy mode is also availble which eliminates the timer and enables a hint system.

### Controls
Arrow keys: Move

Space bar: Select letter / Pickup item / Cast spell

On phones and tablets, use the on-screen arrows to move and the Action button to select a note, pick up an item, or cast a spell.

## Mobile Apps

The Android and iOS apps use Capacitor to package the existing web game.

The Android app opens in landscape for gameplay; the iOS app supports both portrait and landscape.

```bash
npm install
npx cap add android
npx cap add ios
npm run cap:sync
npm run cap:open:android
npm run cap:open:ios
```

Run `npm run cap:sync` after changing the web game to rebuild its local assets and sync both native projects. Android builds require Android Studio and the Android SDK; iOS builds require macOS and Xcode.

#### Build an Android APK without a computer

GitHub Actions builds a debug APK when changes are pushed to `feature/mobile-port`. To start a build from a phone, open the repository on GitHub, go to **Actions** → **Build Android APK** → **Run workflow**, and select `feature/mobile-port`. When the run finishes, open it and download the `melody-quest-debug-apk` artifact. Extract the downloaded ZIP and tap `app-debug.apk` to install it; Android may ask you to allow installs from that browser or file manager.

### Listen to the Soundtrack

Listen to the original soundtrack here: [Melody Quest OST](https://soundcloud.com/dinitrogen-games)