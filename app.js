// Make Calculator class
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  // Append numbers to the display
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();

  }

  // Update display when user pressing a button
  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }

  }

  // Declare which operation User choose +,-,*,/
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // The actual Math depend on which operation User choose
  compute() {
    let computation;
    let current = parseFloat(this.currentOperand);
    let prev = parseFloat(this.previousOperand);
    if (isNaN(current) || isNaN(prev)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current
        break;

      case '-':
        computation = prev - current
        break;

      case '/':
        computation = prev / current
        break;

      case '*':
        computation = prev * current
        break;

      default:
        return;
    }

    // Declaring the current operand to be a result of the Math depend on User operation choice
    this.currentOperand = computation
    this.previousOperand = ''
    this.operation = undefined

  }

  // Adding comas automatically while user entering numbers
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // Clear everyhing from display
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // Delete last integer
  delete() {
    if (this.currentOperand !== '') {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } else {
      this.currentOperand = '';
    }
  }
}


const btnNumber = document.querySelectorAll('[data-number]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const clearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equals]');
const operationBtn = document.querySelectorAll('[data-operation]');

// Using CAlculator class and saving in calculator variable
const calculator = new Calculator(previousOperandText, currentOperandText);

// Selecting all the number buttons and calling appendNumber and updateDisplay Function
btnNumber.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

// Selection Delete button, calling delete and updateDisplay function
deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

// Selection AC button, calling clear and updateDisplay function
clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

// Selecting operation button and calling chooseOperation function
operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// Selecting eqial button and calling compute function
equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay()
})
