const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
let expr = '';

function updateDisplay() {
  expressionEl.textContent = expr || '0';
  try {
    const safe = expr.replace(/×/g, '*').replace(/÷/g, '/');
    const val = safe ? eval(safe) : 0;
    resultEl.textContent = isFinite(val) ? val : 'Err';
  } catch {
    resultEl.textContent = 'Err';
  }
}

function append(value) {
  expr += value;
  updateDisplay();
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      expr = '';
      break;
    case 'delete':
      expr = expr.slice(0, -1);
      break;
    case 'equals':
      try {
        expr = String(eval(expr.replace(/×/g, '*').replace(/÷/g, '/')));
      } catch {
        expr = '';
      }
      break;
    case 'percent':
      try {
        expr = String(eval(expr) / 100);
      } catch {
        expr = '';
      }
      break;
    case 'plusminus':
      try {
        expr = String(-eval(expr));
      } catch {
        expr = '';
      }
      break;
  }
  updateDisplay();
}

document.querySelectorAll('.key').forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const operator = button.dataset.operator;
    const action = button.dataset.action;

    if (number) append(number);
    else if (operator) append(operator);
    else if (action) handleAction(action);
  });
});

window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') append(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) append(e.key);
  else if (e.key === 'Enter') {
    e.preventDefault();
    handleAction('equals');
  } else if (e.key === 'Backspace') handleAction('delete');
  else if (e.key.toLowerCase() === 'c') handleAction('clear');
});

updateDisplay();
