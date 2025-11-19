# Reaction Racer

Reaction Racer is a fast and minimal browser-based reaction time game built using plain HTML, CSS, and JavaScript.  
The goal is simple: wait for the box to turn green and click as fast as possible. Your best times, averages, and false starts are tracked automatically.

---

## Features

- Pure HTML, CSS, and JavaScript (no frameworks)
- Randomized wait timers for unpredictability
- Clean UI with clear round indicators
- False Start detection with red flash animation
- LocalStorage high score tracking
- Adjustable rounds (1, 3, 5, 10)
- Keyboard support (Space / Enter)
- Works on desktop and mobile

---

## How to Play

1. Click the main box to begin a round.
2. Wait for the box to turn green.
3. As soon as it turns green and says "CLICK!", click the box.
4. Your reaction time is recorded each round.
5. If you click too early, it counts as a False Start.
6. Complete all rounds to see your stats and play again.

---

## Game Stats Displayed

- Current Round
- Total Rounds
- Last Reaction Time
- Best Reaction Time (per session)
- Average Reaction Time
- High Score (your best-ever time, stored in localStorage)

---

## False Start Animation

If the player clicks before the green signal:
- The box flashes red three times
- The round does not advance
- A warning message appears

This improves feedback and game feel while preventing accidental clicks from counting as rounds.

---

## High Score Storage

The game saves your best reaction time in the browser using `localStorage`.

- High Score updates only on valid rounds
- Penalties and false starts do not affect the high score
- Clearing site data resets it

---

## Folder Structure

reaction-racer/
│
├── index.html
├── style.css
├── script.js
└── README.md

### Netlify / Vercel



---

## Screenshot / Preview