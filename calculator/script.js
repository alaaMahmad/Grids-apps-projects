// Alaa Ahmad
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator-keys');

    
    const calculate = (expression) => {
      
        const parts = expression.split(' ');
        const firstOperand = parseFloat(parts[0]); /*parseFloat built-in function converts string into a float number*/
        const operator = parts[1];
        const secondOperand = parseFloat(parts[2]);

       
        if (parts.length !== 3 || isNaN(firstOperand) || isNaN(secondOperand)) {
            return 'the expression must be like this "number1" "operator" "number2" ';
        }

        try {
            if (operator === '+') return firstOperand + secondOperand;
            if (operator === '-') return firstOperand - secondOperand;
            if (operator === '*') return firstOperand * secondOperand;
            if (operator === '/') {
                if (secondOperand === 0) {
                    throw new Error('Division by zero');
                }
                return firstOperand / secondOperand;
            }
        } catch (error) {
            return error; //Error when division by zero error
        }
    };

    keys.addEventListener('click', (event) => {
        if (!event.target.matches('button'))
             return;

        const key = event.target;
        const action = key.value;
        let displayContent = display.textContent;

        if (!isNaN(action) || action === '.') { // If the key is a number or decimal
            if (displayContent === '0' || displayContent === 'Error') {
                display.textContent = action;
            } else {
                display.textContent += action;
            }
        }

        if (action === '+' || action === '-' || action === '*' || action === '/') {
             
            display.textContent += ` ${action} `;
        }

        if (action === '=') {
            const result = calculate(displayContent);
            display.textContent = result;
        }

        if (action === 'clear') {
            display.textContent = '0';
        }
    });
});