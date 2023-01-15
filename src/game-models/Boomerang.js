// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = ' ';
    this.position = -1;
    this.active = false
  }

  fly(position) {
    this.active = true
    this.skin = '🌀'
    this.position = position + 1
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }
}

module.exports = Boomerang;
