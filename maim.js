function Ball(x, y, rad, color){
    this.X = x;
    this.Y = y;
    this.radius = rad;
    this.color = color;
    this.dx = ~~(Math.random() * 3 + 1) * (Math.random() > 0.5 ? -1 : 1);
    this.dy = ~~(Math.random() * 3 + 1) * (Math.random() > 0.5 ? -1 : 1);

    //Поддержка передачи радиуса
    if(!this.radius){
        this.radius = ~~(Math.random()*200 + 10);
        console.log(this.radius);
    }
    
    //ЕСЛИ КООРДИНАТЫ НЕ ПЕРЕДАНЫ РАЗМЕЩАЕТ ШАРИК СЛУЧАЙНО В ПРЕДЕЛАХ ЭКРАНА
    if(!this.X){
        let availableInnerWidth = window.innerWidth;
        console.log(availableInnerWidth);
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
    this.div.style.backgroundColor = this.color;
    this.div.style.width = this.radius + 'px';
    this.div.style.height = this.radius + 'px';
    this.div.style.left = this.X +'px';
    this.div.style.top = this.Y + 'px';
    document.querySelector('body').appendChild(this.div);

    this.update = function () {
        // Разобрать условие this.X + 2 * this.radius - почему * 2 - радиус пруга в px передаем и умножаем на 2 
        //if (this.X <= 0 || this.X + 2 * this.radius >= window.innerWidth) this.dx *= -1;
        //if (this.Y <= 0 || this.Y + 2 * this.radius >= window.innerHeight) this.dy *= -1;
        if (this.X <= 0 || this.X + this.radius >= window.innerWidth) this.dx *= -1;
        if (this.Y <= 0 || this.Y + this.radius >= window.innerHeight) this.dy *= -1;

        this.X += this.dx;
        this.Y += this.dy;
        this.div.style.left = this.X +'px';
        this.div.style.top = this.Y + 'px';
    };

    this.isCollision = function (other) {
        // проверка на столкновение шарика this с шариком other
        console.log(this.X + "_ ** _" + this.Y )
        console.log(other.X + "_ ** _" + other.Y )
        var way = Math.abs((other.radius + this.radius) - Math.sqrt(Math.pow(this.Y + other.X, 2) + Math.pow(this.X + other.Y, 2)));
        console.log(way + " растояние ");
        return false;
    }
}

let balls = [   new Ball(),
                new Ball()
                /* new Ball(),
                new Ball() */
];



function tick() {
     for (let j = 0; j < balls.length ; j++) {
         balls[j].update();
         for (let i = 0; i < balls.length; i++) {
            balls[0].isCollision(balls[1]);
         }
     }
    /* setTimeout(tick, 30); */
 }

 function check(){
    console.log(balls);
 }


document.addEventListener("click", ()=>{balls.push(new Ball()), check()});
tick();


