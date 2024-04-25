// Obtenemos el contexto del canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Definimos las partes del cuerpo del ahorcado
const parts = [
  // Cabeza
  drawHead,
  // Cuerpo
  drawBody,
  // Brazos
  () => drawArm('left'),
  () => drawArm('right'),
  // Piernas
  () => drawLeg('left'),
  () => drawLeg('right')
];

let wrongGuesses = 0;

// Función para dibujar la cabeza
function drawHead() {
  ctx.beginPath();
  ctx.arc(150, 70, 20, 0, Math.PI * 2);
  ctx.stroke();
}

// Función para dibujar el cuerpo
function drawBody() {
  ctx.moveTo(150, 90);
  ctx.lineTo(150, 150);
  ctx.stroke();
}

// Función para dibujar los brazos
function drawArm(side) {
  ctx.moveTo(150, 100);
  if (side === 'left') {
    ctx.lineTo(120, 120);
  } else {
    ctx.lineTo(180, 120);
  }
  ctx.stroke();
}

// Función para dibujar las piernas
function drawLeg(side) {
  ctx.moveTo(150, 150);
  if (side === 'left') {
    ctx.lineTo(130, 180);
  } else {
    ctx.lineTo(170, 180);
  }
  ctx.stroke();
}

// Función para manejar cada click (cada intento incorrecto)
function handleClick() {
  if (wrongGuesses < parts.length) {
    // Dibujar la siguiente parte del ahorcado
    parts[wrongGuesses]();
    wrongGuesses++;
  }
}

// Agregar evento de click al canvas
canvas.addEventListener('click', handleClick);

// Dibujar el palo del ahorcado y la soga
drawHangingPole();
drawRope();

// Función para dibujar el palo del ahorcado
// Función para dibujar el palo del ahorcado
function drawHangingPole() {
  ctx.beginPath();
  ctx.moveTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.lineTo(145, 45);
  ctx.moveTo(150, 40);
  ctx.lineTo(155, 45);
  ctx.moveTo(25, 150); // Esta línea conecta al palo del ahorcado
  ctx.lineTo(25, 20);
  // Líneas horizontales adicionales para completar el palo del ahorcado
  ctx.moveTo(25, 150);
  ctx.lineTo(60, 150);
  ctx.moveTo(25, 20);
  ctx.lineTo(150, 20);
  ctx.stroke();
}



// Función para dibujar la soga
function drawRope() {
  ctx.moveTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.stroke();
}
