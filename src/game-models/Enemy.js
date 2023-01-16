const player = require('play-sound')(opts = {})

class Enemy {
  constructor(trackLength) {
    this.generateSkin();
    this.position = trackLength;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    this.position -= 1
  }


  die(trackLength) {
    player.play('src/sounds/kill.wav',err => {
      if (err) console.log(err)
    })
    this.position = trackLength;
    this.generateSkin();
    console.log('🎉Enemy is dead!🎊');
  }
}

module.exports = Enemy;
