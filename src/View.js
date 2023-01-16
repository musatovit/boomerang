// Сделаем отдельный класс для отображения игры в консоли.
const c = require('ansi-colors');

class View {
  render(track, hero) {
    const yourTeamName = 'Dima, Pasha, Kirill, Ira';

    // Тут всё рисуем.
    console.clear();
    console.log(`Твой счет : ${hero.score}`);
    if (process.argv[2]) {
      console.log(`Имя игрока: ${process.argv[2]}`);
    }
    console.log('🌲'.repeat(track.length));
    console.log('\n');
    console.log(track.join(''));
    console.log('\n');
    console.log('🌳'.repeat(track.length));
    console.log('\n');
    console.log(c.bold.yellow(`Created by "${yourTeamName}" with love`));
  }
}

module.exports = View;
