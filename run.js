// Основной файл.
// Запускает игру.
const Game = require('./src/Game');

const game = new Game({
    trackLength: 30,
    position: 0
});

// Запуск игры.
game.play();
