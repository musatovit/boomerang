// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.
const {User} = require('../DB/models');

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

  async givi() {
    try {
      const user = await User.create({ name: this.name, scores: this.count });
      console.clear();
    } catch (error) {
      console.log(error);
    }
  }

  async addResult() {
    try {
      const result = await User.findAll();
      const filter = result.filter((el) => el.name === this.name);
      if (filter.length > 0) {
        const scores = await User.findOne({
          where: {
            name: this.name,
          },
        });
        scores.scores = this.count;
        await scores.save();
        console.clear();
        console.log('name: ', scores.nickname);
        console.log('scores: ', scores.scores);
      } else {
        await this.givi();
        const finalResult = await User.findOne({
          where: {
            name: this.name,
          },
        });
        console.clear();
        console.log('name: ', finalResult.nickname);
        console.log('scores: ', finalResult.scores);
        console.log('try again!');
      }
    } catch (error) {
      console.log(error);
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
