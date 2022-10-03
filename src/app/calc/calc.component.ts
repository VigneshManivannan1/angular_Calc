import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements OnInit {
  constructor() {}
  public valueOutput = 0;
  ngOnInit() {
    const calculator = {
      displayValue: '0',
      firstValue: null,
      waitingForsecondValue: false,
      operator: null,
    };

    function updateDisplay() {
      const display: any = document.querySelector('.screen-calc');
      display.value = calculator.displayValue;
    }

    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstValue = null;
      calculator.waitingForsecondValue = false;
      calculator.operator = null;
    }

    updateDisplay();

    const keys: any = document.querySelector('.btn-calc');
    keys.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.matches('button')) {
        return;
      }

      if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
      }

      if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
      }

      if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
      }

      inputDigit(target.value);
      updateDisplay();
      return;
    });

    function inputDigit(digit) {
      const { displayValue, waitingForsecondValue } = calculator;

      if (waitingForsecondValue === true) {
        calculator.displayValue = digit;
        calculator.waitingForsecondValue = false;
      } else {
        calculator.displayValue =
          displayValue === '0' ? digit : displayValue + digit;
      }
    }

    function inputDecimal(dot) {
      if (calculator.waitingForsecondValue === true) {
        return;
      }
      if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
      }
    }
    const performCalculation = {
      '/': (firstValue, secondValue) => firstValue / secondValue,
      '*': (firstValue, secondValue) => firstValue * secondValue,
      '+': (firstValue, secondValue) => firstValue + secondValue,
      '-': (firstValue, secondValue) => firstValue - secondValue,
      '=': (firstValue, secondValue) => secondValue,
    };

    function handleOperator(nextOperator) {
      const { firstValue, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);

      if (operator && calculator.waitingForsecondValue) {
        calculator.operator = nextOperator;
        return;
      }

      if (firstValue == null) {
        calculator.firstValue = inputValue;
      } else if (operator) {
        const currentValue = firstValue || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstValue = result;
      }
      calculator.waitingForsecondValue = true;
      calculator.operator = nextOperator;
    }
  }
}
