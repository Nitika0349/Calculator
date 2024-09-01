const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.number) appendNumber(button.dataset.number);
    if (button.dataset.action) handleAction(button.dataset.action);
  });
});

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    resetDisplay();
  }
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = '';
  shouldResetDisplay = false;
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      clearDisplay();
      break;
    case 'delete':
      deleteNumber();
      break;
    case 'decimal':
      appendDecimal();
      break;
    case 'percent':
      convertPercent();
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      setOperation(action);
      break;
    case 'equals':
      evaluate();
      break;
  }
}

function clearDisplay() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

function appendDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function convertPercent() {
  display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function setOperation(operation) {
  if (currentOperation !== null) evaluate();
  firstOperand = display.textContent;
  currentOperation = operation;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetDisplay) return;
  if (currentOperation === 'divide' && display.textContent === '0') {
    alert("Cannot divide by zero!");
    return;
  }
  secondOperand = display.textContent;
  display.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
}

function operate(operation, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return a / b;
    default:
      return null;
  }
}

function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}
