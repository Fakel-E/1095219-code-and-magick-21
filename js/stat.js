'use strict';

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10
};

const TEXT_GAP = 20;

const Bar = {
  X: 150,
  Y: 250,
  GAP: 50,
  WIDTH: 40,
  HEIGHT: 150,
};

// функция рисовки облака
const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

// функция вывода поздравления
const renderText = function (ctx, x, y) {
  ctx.fillStyle = `#000`;
  ctx.font = `bold 16px PT Mono`;
  ctx.fillText(`Ура, вы победили!`, x + TEXT_GAP, y + TEXT_GAP * 2);
  ctx.fillText(`Список результатов:`, x + TEXT_GAP, y + TEXT_GAP * 3);
};

// функиция поиска максимального элемента
const getMaxElement = function (arr) {
  const maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// функиция вызова рандомных чисел для цвета столбцов
const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, players, times) {
  // рисуем тень облака
  renderCloud(ctx, Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, `rgba (0, 0, 0, 0.7)`);
  // рисуем основное облако
  renderCloud(ctx, Cloud.X, Cloud.Y, `#fff`);
  // выводим поздравление
  renderText(ctx, Cloud.X, Cloud.Y);

  ctx.fillStyle = `#000`;

  // берём максимальный элемент, для расчёта высоты столбца
  const maxTime = getMaxElement(times);

  // рисуем колонки результатов
  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = players[i] === `Вы` ? `rgba(255, 0, 0, 1)` : `hsl(240, ${getRandomInRange(10, 100)}%, 50%)`;

    ctx.fillRect(Bar.X + (Bar.WIDTH + Bar.GAP) * i, Bar.Y, Bar.WIDTH, -(Bar.HEIGHT * times[i]) / maxTime);
    ctx.fillText(players[i], Bar.X + (Bar.WIDTH + Bar.GAP) * i, Cloud.HEIGHT + Cloud.Y / 2);
    ctx.fillText(Math.round(times[i]), Bar.X + (Bar.WIDTH + Bar.GAP) * i, (Cloud.HEIGHT + Cloud.Y / 2) - (Bar.HEIGHT * times[i] / maxTime) - TEXT_GAP * 2);
  }
};
