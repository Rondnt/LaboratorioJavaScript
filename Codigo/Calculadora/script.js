let displayValue = '';
let variables = {}; // Objeto para almacenar las variables definidas
let operationsStack = []; // Array para almacenar las operaciones realizadas

function appendValue(value) {
  displayValue += value;
  updateDisplay();
}

function clearDisplay() {
  displayValue = '';
  updateDisplay();
}

function calculateExpression() {
  try {
    const result = customEval(displayValue);
    const operation = `${displayValue} = ${result}`;
    operationsStack.push(operation); // Registrar la operación realizada en la pila
    displayValue = ''; // Limpiar display después de la evaluación
    updateDisplay();
    showOperationsStack();
  } catch (error) {
    displayValue = 'Error';
    updateDisplay();
  }
}

function customEval(expression) {
  // Reemplazar las variables en la expresión con sus valores
  const replacedExpression = replaceVariables(expression);
  // Evaluar la expresión modificada
  return eval(replacedExpression);
}

function replaceVariables(expression) {
  // Expresión regular para encontrar nombres de variables (letras seguidas de números opcionales)
  const variablePattern = /[a-zA-Z]+[0-9]*/g;

  // Reemplazar cada variable en la expresión con su valor definido
  return expression.replace(variablePattern, (match) => {
    const variableName = match.trim();
    if (variables.hasOwnProperty(variableName)) {
      return variables[variableName];
    } else {
      throw new Error(`Variable '${variableName}' no definida`);
    }
  });
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;
}

function showOperationsStack() {
  const operationsList = document.getElementById('operations-list');
  operationsList.innerHTML = ''; // Limpiar lista antes de actualizar

  operationsStack.forEach((operation) => {
    const listItem = document.createElement('li');
    listItem.textContent = operation;
    operationsList.appendChild(listItem);
  });
}

// Función para limpiar la pila de operaciones
function clearOperationsStack() {
  operationsStack = []; // Vaciar la pila de operaciones
  showOperationsStack(); // Actualizar la visualización en el HTML
}

// Función para definir una variable
function defineVariable() {
  const variableName = prompt('Ingrese el nombre de la variable:');
  if (variableName) {
    const variableValue = prompt(`Ingrese el valor para '${variableName}':`);
    if (variableValue !== null) {
      variables[variableName] = parseFloat(variableValue);
      alert(`Variable '${variableName}' definida con valor ${variableValue}`);
    }
  }
}

// Función para agregar una variable al displayValue
function addVariableToDisplay(variableName) {
  displayValue += variableName;
  updateDisplay();
}
