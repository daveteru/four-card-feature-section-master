let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandTextElement = document.querySelector('.current-operand');
const previousOperandTextElement = document.querySelector('.previous-operand');

function updateDisplay(animateResult = false) {
    if (animateResult) {
        currentOperandTextElement.innerHTML = '';
        const chars = currentOperand.toString().split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
            span.style.animationDelay = `${index * 0.05}s`;
            currentOperandTextElement.appendChild(span);
        });
    } else {
        currentOperandTextElement.innerText = currentOperand;
        currentOperandTextElement.classList.remove('animate-pop');
        void currentOperandTextElement.offsetWidth; // Trigger reflow to restart animation
        currentOperandTextElement.classList.add('animate-pop');
    }

    if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay(true);
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updateDisplay();
}
