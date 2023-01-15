// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Rule = require('./keyboard')
const Boomerang = require('./game-models/Boomerang')
const sound = require('play-sound')((opts = {}));

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength, position}) {
    this.trackLength = trackLength;
    this.hero = new Hero({position: position, boomerang: new Boomerang()}); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy(trackLength);
    this.view = new View();
    this.rule = new Rule(this.hero)
    this.track = [];
    this.regenerateTrack();
  }

  async regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin

  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }

    if (this.hero.boomerang.position === this.enemy.position || this.hero.boomerang.position -1 === this.enemy.position ) {
      this.enemy.die(this.trackLength)
      this.hero.boomerang.moveLeft()
      this.hero.boomerang.active = false
    } else if (this.hero.boomerang.active) {
      this.hero.boomerang.moveRight()
    } else this.hero.boomerang.moveLeft()

    if (this.hero.position >=  this.hero.boomerang.position && this.hero.boomerang.active === false) {
      this.hero.boomerang.position = -1
    }
  }

  play() {
    this.rule.runInteractiveConsole()
    sound.play('src/sounds/mortal_kombat_fight.mp3', err => {
      if (err) console.log(err);
    });
    setInterval(() => {
      // Let's play!
      this.enemy.moveLeft()
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 100);
  }
}

module.exports = Game;
