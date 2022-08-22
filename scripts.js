const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
    addDigit(digit) {
        console.log(digit);
        // aqui ve se o numero foi digitado
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
          return;
        }
    
        this.currentOperation = digit;
        this.updateScreen();
      }
    
      // aqui faz a conta
      processOperation(operation) {
        // se o valor n for vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
          // aqui muda a operação
          if (this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
          }
          return;
        }
    
        //aqui são as formulas
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;
    
        switch (operation) {
          case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
          case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
          case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
          case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
          case "DEL":
            this.processDelOperator();
            break;
          case "CE":
            this.processClearCurrentOperator();
            break;
          case "C":
            this.processClearOperator();
            break;
          case "=":
            this.processEqualOperator();
            break;
          default:
            return;
        }
      }
    
      // muda o valor de cada conta
      updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
      ) {
        if (operationValue === null) {
       
          this.currentOperationText.innerText += this.currentOperation;
        } else {
          // aqui ver se o numero ofi0
          if (previous === 0) {
            operationValue = current;
          }
          
          this.previousOperationText.innerText = `${operationValue} ${operation}`;
          this.currentOperationText.innerText = "";
        }
      }
    
      // aqui muda o calculo
      changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];
    
        if (!mathOperations.includes(operation)) {
          return;
        }
    
        this.previousOperationText.innerText =
          this.previousOperationText.innerText.slice(0, -1) + operation;
      }
    
      // apaga um numero
      processDelOperator() {
        this.currentOperationText.innerText =
          this.currentOperationText.innerText.slice(0, -1);
      }
    
      // aqui é pra da o resultado
      processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
      }
    
      
      processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
      }
    
      // realiza io calculo assim
      processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];
    
        this.processOperation(operation);
      }
    }
    
    const calc = new Calculator(previousOperationText, currentOperationText);
    
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
    
        if (+value >= 0 || value === ".") {
          console.log(value);
          calc.addDigit(value);
        } else {
          calc.processOperation(value);
        }
      });
    });