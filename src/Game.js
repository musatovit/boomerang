// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');
const Rule = require('./keyboard')
const Boomerang = require('./game-models/Boomerang')
const sound = require('play-sound')((opts = {}));


//const { Sequelize, sequelize, user } = require('../db/models');
//const db = require('../db/models');

// (async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log('Connection successfully.');
//   } catch (error) {
//     console.error(error);
//   }
// })();


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

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin

  }

  // async name() {
  //   const res = await db.user.findOrCreate({
  //     where: { name: `${process.argv[2]}` },
  //     defaults: { score: this.hero.score },
  //   });
  //   return res;
  // }
  //
  // async update() {
  //   const result = await db.user.update(
  //     { score: this.hero.score },
  //     { where: { name: `${process.argv[2]}` } },
  //   );
  //   return result;
  // }



  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.skin = '💀'
      this.hero.die();
    }

    if (this.hero.boomerang.position === this.enemy.position || this.hero.boomerang.position -1 === this.enemy.position ) {
      this.enemy.skin = '💀'
      this.enemy.die(this.trackLength)
      this.hero.score += 1
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
      this.view.render(this.track, this.hero);
    }, 75);
  }
}

module.exports = Game;
