// Наш герой.

const c = require("ansi-colors");

class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🤠';
    this.position = position;
    this.boomerang = boomerang
    this.score = 0;
    this.record = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправ
    this.position += 1;
  }

  attack() {
    if (this.position > this.boomerang.position){
      this.boomerang.fly(this.position);
    }

  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    console.log(c.bold.red(`Твой результат: ${this.score}`));
    process.exit();
  }
}

module.exports = Hero;
