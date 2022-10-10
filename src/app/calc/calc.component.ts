import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements OnInit {
  constructor() { }
  //calculator property
  public calculator = {
    displayValue: '0',
    firstValue: null,
    waitingForsecondValue: false,
    operator: null,
  };
  nextOperator: any;
  ngOnInit() {
  }

  //this funciton will triggered whenver number button is clicked
  numClick(val) {
    const { displayValue, waitingForsecondValue } = this.calculator;

    if (waitingForsecondValue === true) {
      this.calculator.displayValue = val;
      this.calculator.waitingForsecondValue = false;
    } else {
      this.calculator.displayValue =
        displayValue === '0' ? val : displayValue + val.toString();
    }
  }

  //function will get operator details and the first value and second value and return the output
  performCalc(operator, firstVal, SecondVal) {
    if (operator == 'div') {
      return firstVal / SecondVal;
    }
    if (operator == 'mul') {
      return firstVal * SecondVal;
    }
    if (operator == 'sub') {
      return firstVal - SecondVal;
    }
    if (operator == 'add') {
      return firstVal + SecondVal;
    }
  }

  //this function will map the operator 
  operatorClick(val) {
    this.nextOperator
    const { firstValue, displayValue, operator } = this.calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && this.calculator.waitingForsecondValue) {
      this.calculator.operator = val;
      return;
    }

    if (firstValue == null) {
      this.calculator.firstValue = inputValue;
    } else if (operator) {
      const currentValue = firstValue || 0;
      const result = this.performCalc(operator, currentValue, inputValue);
      this.calculator.displayValue = String(result);
      this.calculator.firstValue = result;
    }
    this.calculator.waitingForsecondValue = true;
    this.calculator.operator = val;
  }

  //this function will add the decimal 
  decimalFunc() {
    if (this.calculator.waitingForsecondValue === true) {
      return;
    }
    if (!this.calculator.displayValue.includes('.')) {
      this.calculator.displayValue += '.';
    }
  }

  //this function returns final value and display the output in UI
  finalValue() {
    const { firstValue, displayValue, operator } = this.calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && this.calculator.waitingForsecondValue) {
      this.calculator.operator = this.nextOperator;
      return;
    }

    if (firstValue == null) {
      this.calculator.firstValue = inputValue;
    } else if (operator) {
      const currentValue = firstValue || 0;
      const result = this.performCalc(operator, currentValue, inputValue);
      this.calculator.displayValue = String(result);
      this.calculator.firstValue = result;
    }
    this.calculator.waitingForsecondValue = true;
    this.calculator.operator = this.nextOperator;
  }

  //reset function will clear all the values
  reset() {
    this.calculator.displayValue = '0';
    this.calculator.firstValue = null;
    this.calculator.waitingForsecondValue = false;
    this.calculator.operator = null;
  }
}
