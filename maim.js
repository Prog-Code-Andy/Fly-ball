function Ball(x, y, rad, color){
    this.X = x;
    this.Y = y;
    this.radius = rad;
    this.color = color;
    this.dx = ~~(Math.random() * 3 + 1) * (Math.random() > 0.5 ? -1 : 1);
    this.dy = ~~(Math.random() * 3 + 1) * (Math.random() > 0.5 ? -1 : 1);


    //Поддержка передачи радиуса
    if(!this.radius){
        this.radius = ~~(Math.random()*160 + 40);
    }
    
    //ЕСЛИ КООРДИНАТЫ НЕ ПЕРЕДАНЫ РАЗМЕЩАЕТ ШАРИК СЛУЧАЙНО В ПРЕДЕЛАХ ЭКРАНА
    if(!this.X){
        let availableInnerWidth = window.innerWidth;
        this.X = Math.abs((~~(Math.random() * availableInnerWidth)) - this.radius);
    }
    if(!this.Y){
        let availableInnerHeight = window.innerHeight;
        this.Y = Math.abs((~~(Math.random() * availableInnerHeight)) - this.radius);
    }

    // Если не передан цвет выбирает случайно любой Через RGB
    if(!this.color){
        this.color = `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)})`;
    }


    this.div = document.createElement('div');
    this.div.className = "ball";
    this.div.id = Math.floor(Math.random()*1000);
    this.div.style.backgroundColor = this.color;
    this.div.style.width = this.radius + 'px';
    this.div.style.height = this.radius + 'px';
    this.div.style.left = this.X +'px';
    this.div.style.top = this.Y + 'px';
    document.querySelector('body').appendChild(this.div);

    this.update = function () {
        if (this.X <= 0 || this.X + this.radius >= window.innerWidth) this.dx *= -1;
        if (this.Y <= 0 || this.Y + this.radius >= window.innerHeight) this.dy *= -1;

        this.X += this.dx;
        this.Y += this.dy;
        this.div.style.left = this.X +'px';
        this.div.style.top = this.Y + 'px';
    };

    this.isCollision = function (other) {
        // проверка на столкновение шарика this с шариком other
        let x1 = this.X + this.radius/2;
        let y1 = this.Y + this.radius/2;
        let x2 = other.X + other.radius/2;
        let y2 = other.Y + other.radius/2;

        let dx = Math.abs(x1 - x2);
        let dy = Math.abs(y1 - y2);
        return Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2)) <= this.radius/2 + other.radius/2;
    }
}

function DrowBoom() {

}

let balls = [   new Ball(),
                new Ball(),
                new Ball(),
                new Ball()
];

function drowBoom(ballH, ball) {
    let x1 = ballH.X + ballH.radius/2;
    let y1 = ballH.Y + ballH.radius/2;
    let x2 = ball.X + ball.radius/2;
    let y2 = ball.Y + ball.radius/2;
    let x = (x1 + x2)/2;
    let y = (y1 + y2)/2;
    let bomb = document.createElement("div");
    bomb.className = "firework";
    bomb.id = "firework1";
    for (let i = 0; i < 11; i++) {
        let bodyBomb = document.createElement("div");
        bodyBomb.className = "explosion";
        bomb.appendChild(bodyBomb);
    }
    bomb.style.top = y + "px";
    bomb.style.left = x + "px";
    document.querySelector('body').appendChild(bomb);
}

function del(ball, actBomb) {
    setTimeout(()=>{
        ball.div.remove();
    }, 300);
    if(actBomb){
        setTimeout(()=>{
            document.getElementById("firework1").remove();
        }, 400);
    }
}

function tick() {
     for (let j = 0; j < balls.length ; j++) {
         balls[j].update();
         for (let i = j + 1; i < balls.length; i++) {
             if (balls[j].isCollision(balls[i])){
                 drowBoom(balls[j], balls[i]);
                 del(balls[j]);
                 balls.splice(j, 1);
                 del(balls[i-1], true);
                 balls.splice(i - 1, 1);
                 j--;
                 break;
             }
         }
     }
    setTimeout(tick, 30);
 }

 function check(){
    console.log(balls);
 }


document.addEventListener("click", ()=>{balls.push(new Ball()), check()});
tick();


