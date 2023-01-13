// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 30;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    // this.position = '?'; пока еще не уверенна как правильно прописывать позицию для врага
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
