// Наш герой.

class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.boomerang = boomerang
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
    process.exit();
  }
}

module.exports = Hero;
