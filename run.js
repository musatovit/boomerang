// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
//const db = require('./db/models');
//const { Sequelize } = require('sequelize');

const game = new Game({
    trackLength: 30,
    position: 3
});

// Запуск игры.
game.play();
