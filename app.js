const display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = '';
let shouldReset = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(value) {
    if (shouldReset) {
        currentInput = value;
        shouldReset = false;
    } else if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator && !shouldReset) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldReset = true;
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current !== 0 ? prev / current : 'Error'; break;
        default: return;
    }
    currentInput = typeof result === 'number' ? String(result) : result;
    operator = null;
    previousInput = '';
    shouldReset = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    shouldReset = false;
    updateDisplay();
}

function handleEquals() {
    if (operator) {
        calculate();
    }
}

// События на кнопки
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.dataset.value;
        if (value === 'clear') {
            clearAll();
        } else if (value === '=') {
            handleEquals();
        } else if (this.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

// Клавиатура
document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        handleNumber(key);
    } else if (key === '.') {
        handleNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
    } else if (key === 'Escape' || key === 'c') {
        clearAll();
    }
});



// ====== Тёмная тема ======
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}
