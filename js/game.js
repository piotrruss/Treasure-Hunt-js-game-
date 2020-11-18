class Game {
  constructor(board, hero, coin, score, enemy){
    this.board = board;
    this.hero = hero;
    this.enemy = enemy;
    this.coin = coin;
    this.score = score;
    this.index = (x,y) => (x + (y * 10));
  }

  addHoles(){
    for(let i=0;i<7;i++){
      const board = document.querySelectorAll('#board div');
      let random100 = 5+Math.ceil(Math.random()*94);
      board[random100].style.backgroundImage="none";
      board[random100].classList.add('hole');
    }
  }

  showHero() {
    let divIndex = this.index(this.hero.x,this.hero.y);
    this.board[ divIndex ].classList.add('hero');
  }

  showEnemy() {
    let divIndex = this.index(this.enemy.x,this.enemy.y);
    this.board[ divIndex ].classList.add('enemy');
  }

  showCoin() {
    const random = () => (Math.floor(Math.random() * 10));
    this.coin.x=random();
    this.coin.y=random();
    let divIndex = this.index(this.coin.x,this.coin.y);
    if (this.board[ divIndex ].classList.contains('hole')){
        this.showCoin();
    }else{
        this.board[ divIndex ].classList.add('coin');
    }
  }

  startGame() {
    const startNr = document.querySelector('#start span');
    const self = this;
    setTimeout(() => {
      startNr.innerText = '2';
      setTimeout(() => {
        startNr.innerText = '1';
        setTimeout(() => {
          startNr.innerText = '0';
          document.querySelector('#start').classList.add('invisible');
          setTimeout(() => {
            this.intervalID = setInterval(() => {
              self.moveHero();
              self.moveEnemy();
            }, 250)
          }, 200);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  moveHero(){
    let heroDiv = document.querySelector('div.hero');
    if(this.hero.direction === "right") {
      if(this.hero.x==9){
        this.gameOver();
        heroDiv.classList.add('heroRight');
        setTimeout(()=>{heroDiv.classList.add('heroDieRight')},200);
      }else{this.hero.x += 1;}
      this.hideVisibleHero();
      this.showHero();
    } else if (this.hero.direction === "down") {
      if(this.hero.y==0){
        this.gameOver();
        heroDiv.classList.add('heroDown');
        setTimeout(()=>{heroDiv.classList.add('heroDieDown')},200);
      }else{this.hero.y -= 1;}
      this.hideVisibleHero();
      this.showHero();
    } else if (this.hero.direction === "left") {
      if(this.hero.x==0){
        this.gameOver();
        heroDiv.classList.add('heroLeft');
        setTimeout(()=>{heroDiv.classList.add('heroDieLeft')},200);
      }else{this.hero.x -= 1;}
      this.hideVisibleHero();
      this.showHero();
    }else{
      if(this.hero.y==9){
        this.gameOver();
        heroDiv.classList.add('heroUp');
        setTimeout(()=>{heroDiv.classList.add('heroDieUp')},200);
      }else{this.hero.y += 1;}
      this.hideVisibleHero();
      this.showHero();
    }
    this.checkCoinCollision();
    heroDiv = document.querySelector('div.hero');
    if(heroDiv.classList.contains('hole')){
        this.gameOver();
        setTimeout(()=>{heroDiv.classList.add('heroDie')},200);
    }
  }

  moveEnemy() {
    let random = Math.random();
    if (this.enemy.direction === "right") {
      if (this.enemy.x == 9) {
        if(this.hero.y>this.enemy.y){
          this.enemy.direction="up";
          this.enemy.y += 1;
        }else if(this.hero.y<this.enemy.y){
          this.enemy.direction="down";
          this.enemy.y -= 1;
        }else{
          this.enemy.direction="left";
          this.enemy.x -= 1;
        }
      } else {
        if(random<0.2&&this.enemy.y<9){
          this.enemy.direction="up";
          this.enemy.y += 1;
        }else if(random>=0.2&&random<0.4&&this.enemy.y>0){
          this.enemy.direction="down";
          this.enemy.y -= 1;
        }else{this.enemy.x += 1;}
      }
      this.hideVisibleEnemy();
      this.showEnemy();
    } else if (this.enemy.direction === "left") {
      if (this.enemy.x == 0) {
        if(this.hero.y>this.enemy.y){
          this.enemy.direction="up";
          this.enemy.y += 1;
        }else if(this.hero.y<this.enemy.y){
          this.enemy.direction="down";
          this.enemy.y -= 1;
        }else{
          this.enemy.direction="right";
          this.enemy.x += 1;
        }
      } else {
        if(random<0.2&&this.enemy.y<9){
          this.enemy.direction="up";
          this.enemy.y += 1;
        }else if(random>=0.2&&random<0.6&&this.enemy.y>0){
          this.enemy.direction="down";
          this.enemy.y -= 1;
        }else{this.enemy.x -= 1;}
      }
      this.hideVisibleEnemy();
      this.showEnemy();
    } else if (this.enemy.direction === "up") {
      if (this.enemy.y == 9) {
        if(this.hero.x>this.enemy.x){
          this.enemy.direction="right";
          this.enemy.x += 1;
        }else if(this.hero.x<this.enemy.x){
          this.enemy.direction="left";
          this.enemy.x -= 1;
        }else{
          this.enemy.direction="down";
          this.enemy.y -= 1;
        }
      } else {
        if(random<0.2&&this.enemy.x<9){
          this.enemy.direction="right";
          this.enemy.x += 1;
        }else if(random>=0.2&&random<0.4&&this.enemy.x>0){
          this.enemy.direction="left";
          this.enemy.x -= 1;
        }else{this.enemy.y += 1;}
      }
      this.hideVisibleEnemy();
      this.showEnemy();
    }else{
      if (this.enemy.y == 0) {
        if(this.hero.x>this.enemy.x){
          this.enemy.direction="right";
          this.enemy.x += 1;
        }else if(this.hero.x<this.enemy.x){
          this.enemy.direction="left";
          this.enemy.x -= 1;
        }else{
          this.enemy.direction="up";
          this.enemy.y += 1;
        }
      } else {
        if(random<0.2&&this.enemy.x<9){
          this.enemy.direction="right";
          this.enemy.x += 1;
        }else if(random>=0.2&&random<0.4&&this.enemy.x>0){
          this.enemy.direction="left";
          this.enemy.x -= 1;
        }else{this.enemy.y -= 1;}
      }
      this.hideVisibleEnemy();
      this.showEnemy();
    }

    if(this.hero.x==this.enemy.x&&this.hero.y==this.enemy.y){
        this.gameOver();
    }
  }

  hideVisibleHero(){
    (document.querySelector('div.hero').classList.remove('hero'));
  }

  hideVisibleEnemy(){
    (document.querySelector('div.enemy').classList.remove('enemy'));
  }

  turnHero(event) {
    event.preventDefault();
    switch (event.which) {
      case 37:
        this.hero.direction = 'left';
        break;
      case 38:
        this.hero.direction = 'down';
        break;
      case 39:
        this.hero.direction = 'right';
        break;
      case 40:
        this.hero.direction = 'up';
        break;
    }

  }

  checkCoinCollision(){
    if(this.hero.x==this.coin.x&&this.hero.y==this.coin.y){
      document.querySelector('.coin').classList.remove('coin');
      this.score+=1;
      document.querySelector('#score strong').innerHTML=this.score;
      this.showCoin();
    }
  }

  gameOver(){
    clearInterval(this.intervalID);
    setTimeout(()=>(document.getElementById('over').classList.remove('invisible')),1000);
    setTimeout(()=>{
      document.getElementById('scoreOver').innerText="Your score: "+document.querySelector('#score strong').innerText;
      document.getElementById('scoreOver').classList.remove('invisible');
    },2000);
    setTimeout(()=>(document.getElementById('restart').classList.remove('invisible')),3000);
  }
}
export {Game}
