// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Clase Ball (Pelota)
/*class Ball {
constructor(x, y, radius, speedX, speedY) {
this.x = x;
this.y = y;
this.radius = radius;
this.speedX = speedX;
this.speedY = speedY;
}
draw() {
ctx.beginPath();
ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
ctx.fillStyle = 'white';
ctx.fill();
ctx.closePath();
}
move() {
this.x += this.speedX;
this.y += this.speedY;
// Colisión con la parte superior e inferior
if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
this.speedY = -this.speedY;
}
}
reset() {
this.x = canvas.width / 2;
this.y = canvas.height / 2;
this.speedX = -this.speedX; // Cambia dirección al resetear
}
}*/
class Ball {
    constructor(x, y, radius, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Colisión con la parte superior e inferior
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX = -this.speedX; // Cambia dirección al resetear
    }
}

// Clase Paddle (Paleta)
class Paddle {
    constructor(x, y, width, height, isPlayerControlled = false, color = 'white') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isPlayerControlled = isPlayerControlled;
        this.speed = 5;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(direction) {
        if (direction === 'up' && this.y > 0) {
            this.y -= this.speed;
        } else if (direction === 'down' && this.y + this.height < canvas.height) {
            this.y += this.speed;
        }
    }

    // Movimiento de la paleta automática (IA)
    autoMove(ball) {
        if (ball.y < this.y + this.height / 2) {
            this.y -= this.speed;
        } else if (ball.y > this.y + this.height / 2) {
            this.y += this.speed;
        }

        // Limitar el movimiento dentro del canvas
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }
}


// Clase Game (Controla el juego)
/*class Game {
    constructor() {
    this.ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4);
    this.paddle1 = new Paddle(0, canvas.height / 2 - 50, 10, 100, true); // Controlado por el 
    jugador
    this.paddle2 = new Paddle(canvas.width - 10, canvas.height / 2 - 50, 10, 100); // Controlado por la computadora
    this.keys = {}; // Para capturar las teclas
    }
    draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball.draw();
    this.paddle1.draw();
    this.paddle2.draw();
    }
    update() {
    this.ball.move();
    // Movimiento de la paleta 1 (Jugador) controlado por teclas
    if (this.keys['ArrowUp']) {
    this.paddle1.move('up');
    }
    if (this.keys['ArrowDown']) {
    this.paddle1.move('down');
    }
    // Movimiento de la paleta 2 (Controlada por IA)
    this.paddle2.autoMove(this.ball);
    // Colisiones con las paletas
    if (this.ball.x - this.ball.radius <= this.paddle1.x + this.paddle1.width &&
    this.ball.y >= this.paddle1.y && this.ball.y <= this.paddle1.y + this.paddle1.height) {
    this.ball.speedX = -this.ball.speedX;
    }
    if (this.ball.x + this.ball.radius >= this.paddle2.x &&
    this.ball.y >= this.paddle2.y && this.ball.y <= this.paddle2.y + this.paddle2.height) {
    this.ball.speedX = -this.ball.speedX;
    }
    // Detectar cuando la pelota sale de los bordes (punto marcado)
    if (this.ball.x - this.ball.radius <= 0 || this.ball.x + this.ball.radius >= canvas.width) {
    this.ball.reset();
    }
    }
    // Captura de teclas para el control de la paleta
    handleInput() {
        window.addEventListener('keydown', (event) => {
        this.keys[event.key] = true;
        });
        window.addEventListener('keyup', (event) => {
        this.keys[event.key] = false;
        });
        }
        run() {
        this.handleInput();
        const gameLoop = () => {
        this.update();
        this.draw();
        requestAnimationFrame(gameLoop);
        };
        gameLoop();
        }
        }*/
        class Game {
            constructor() {
                // Crear varias pelotas con diferentes tamaños, velocidades y colores pastel
                this.balls = [
                    new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4, '#0da296'), 
                    new Ball(canvas.width / 3, canvas.height / 3, 15, -3, 3, '#562987'), 
                    new Ball(canvas.width / 4, canvas.height / 4, 20, 2, -2, '#f1e8e5'), 
                    new Ball(canvas.width / 5, canvas.height / 2, 25, -4, -4, '#e1d62d'), 
                    new Ball(canvas.width / 6, canvas.height / 3, 30, 5, 3, '#fc5e27') 
                ];
                
                // Paleta izquierda (verde manzana) el doble de alta
                this.paddle1 = new Paddle(0, canvas.height / 2 - 100, 11, 200, true, '#62e54c'); 
                // Paleta derecha (roja)
                this.paddle2 = new Paddle(canvas.width - 10, canvas.height / 2 - 50, 12, 100, false, '#b9512a'); 
                this.keys = {}; // Para capturar las teclas
            }
        
            draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Dibujar cada pelota
                this.balls.forEach(ball => ball.draw());
                this.paddle1.draw();
                this.paddle2.draw();
            }
        
            update() {
                // Mover cada pelota
                this.balls.forEach(ball => ball.move());
        
                // Movimiento de la paleta 1 (Jugador) controlado por teclas
                if (this.keys['ArrowUp']) {
                    this.paddle1.move('up');
                }
                if (this.keys['ArrowDown']) {
                    this.paddle1.move('down');
                }
        
                // Limitar el movimiento dentro del canvas para la paleta 1
                if (this.paddle1.y < 0) {
                    this.paddle1.y = 0;
                } else if (this.paddle1.y + this.paddle1.height > canvas.height) {
                    this.paddle1.y = canvas.height - this.paddle1.height;
                }
        
                // Movimiento de la paleta 2 (Controlada por IA)
                this.paddle2.autoMove(this.balls[0]); // La IA sigue la primera pelota
        
                // Colisiones con las paletas para cada pelota
                this.balls.forEach(ball => {
                    // Colisión con la paleta 1
                    if (ball.x - ball.radius <= this.paddle1.x + this.paddle1.width &&
                        ball.y >= this.paddle1.y && ball.y <= this.paddle1.y + this.paddle1.height) {
                        ball.speedX = -ball.speedX;
                    }
                    // Colisión con la paleta 2
                    if (ball.x + ball.radius >= this.paddle2.x &&
                        ball.y >= this.paddle2.y && ball.y <= this.paddle2.y + this.paddle2.height) {
                        ball.speedX = -ball.speedX;
                    }
                    // Detectar cuando la pelota sale de los bordes (punto marcado)
                    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
                        ball.reset();
                    }
                });
            }
        
            // Captura de teclas para el control de la paleta
            handleInput() {
                window.addEventListener('keydown', (event) => {
                    this.keys[event.key] = true;
                });
                window.addEventListener('keyup', (event) => {
                    this.keys[event.key] = false;
                });
            }
        
            run() {
                this.handleInput();
                const gameLoop = () => {
                    this.update();
                    this.draw();
                    requestAnimationFrame(gameLoop);
                };
                gameLoop();
            }
        }



// Crear instancia del juego y ejecutarlo
const game = new Game();
game.run();