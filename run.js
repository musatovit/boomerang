// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const {user} = require('./DB/modesls')

// Инициализация игры с настройками.




const game = new Game({
  trackLength: 30,
});


// Запуск игры.
game.play();
