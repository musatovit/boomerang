// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.


const { Sequelize, sequelize, user } = require('../db/models');
const DB = require('../DB/models');

(async () => {
  try {
    await DB.sequelize.authenticate();
    console.log('Connection successfully.');
  } catch (error) {
    console.error(error);
  }
})();



class Game {
  constructor({ trackLength, count = 0, name  }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
    this.count= count
    this.name= name;

  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
  }

  async name() {
    const res = await DB.user.findOrCreate({
      where: { name: `${process.argv[2]}` },
      defaults: { user: this.hero.score },
    });
    return res;
  }

  async update() {
    const result = await DB.user.update(
      { score: this.hero.score }, 
      { where: { name: `${process.argv[2]}` } }, 
    );
    return result;
  }



  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.enemy. generateSkin()
      this.view.render(this.track);
      this.keyboard.runInteractiveConsole()
    },1000);
  }
}

module.exports = Game;
