// Враг.

class Enemy {
  constructor(trackLength) {
    this.generateSkin();
    this.position = trackLength;
  }

  generateSkin() {
    const skins = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟', 
      '🎃', 
      '👹'
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    this.position -= 1
  }


  die(trackLength) {
    this.position = trackLength;
    console.log('🎉Enemy is dead!🎊');
  }
}

module.exports = Enemy;
