import '../scss/main.scss';
import {Hero} from "./hero";
import {Enemy} from "./enemy";
import {Coin} from "./coin";
import {Game} from "./game";

document.addEventListener("DOMContentLoaded", function() {
  const random = () => (Math.floor(Math.random() * 10));
  const board = document.querySelectorAll('#board div');
  const title = document.getElementById('title');
  const begin = document.getElementById('begin');
  const start = document.getElementById('start');

  let hero = new Hero(0,0,"right");
  let enemy = new Enemy(9,9,"left");
  let coin = new Coin(random(), random());
  let score = 0;
  let game = new Game(board, hero, coin, score, enemy);

  begin.addEventListener('click',()=>{
    title.classList.add('invisible');
    start.classList.remove('invisible');
    game.addHoles();
    game.showCoin();
    game.showHero();
    game.showEnemy();
    game.startGame();
  });

  document.addEventListener('keydown', function(event){
      game.turnHero(event);
  });
});
