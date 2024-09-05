class Calculator {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.screenElement.value = this.currentOperand;
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelectorAll('.calculator-keys button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            if (button.value === '=') {
                calculator.compute();
            } else {
                calculator.chooseOperation(button.value);
            }
        } else if (button.classList.contains('all-clear')) {
            calculator.clear();
        } else {
            calculator.appendNumber(button.value);
        }
    });
});