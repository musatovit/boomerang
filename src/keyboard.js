// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

class Rule {
  constructor(hero) {
    this.hero = hero
    this.keyboard = {
      q: () => console.log('q'),
      w: () => console.log('w'),
      z: () => console.log('e'),
      a: () => this.hero.moveLeft(),
      d: () => this.hero.moveRight(),
      space: () => this.hero.attack(),
    };
  }


  runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (key.name in this.keyboard) {
          this.keyboard[key.name]();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
  }

}


module.exports = Rule
