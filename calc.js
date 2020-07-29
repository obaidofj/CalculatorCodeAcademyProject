const calculator = {
  displayValue: "",
  firstOperand: null,
  waitingForOther: false,
  multiOp: false,
  operator: null,
  equal: false,
  fromConvert: false,
  prevOperator: false,
  inputDec: false,
};

function add(number1, number2) {
  return parseFloat((number1 + number2).toFixed(4));
}

function subtract(number1, number2) {
  return parseFloat((number1 - number2).toFixed(4));
}

function multiply(number1, number2) {
  return parseFloat((number1 * number2).toFixed(4));
}

function divide(number1, number2) {
  if (number2 == 0) {
    return "Can't Divide by Zero.";
  }
  return parseFloat((number1 / number2).toFixed(4));
  //console.log(number1 + "/" + number2, number1 / number2);
}

function operate(operator, number1, number2) {
  if (operator == "*") {
    return multiply(number1, number2);
  } else if (operator == "÷") {
    return divide(number1, number2);
  } else if (operator == "+") {
    return add(number1, number2);
  } else if (operator == "-") {
    return subtract(number1, number2);
  }
}

const keys = document.querySelectorAll(".n");

for (i = 0; i < keys.length; i++) {
  keys[i].onclick = function (event) {
    const { target } = event;

    if (!target.matches("button")) {
      //alert("not match");
      return;
    }

    if (target.classList.contains("opera")) {
      handelOperator(target.value);
      updateDisplay();
      restParg();
      return;
    }

    if (target.classList.contains("dec")) {
      inputDecimal(target.value);
      updateDisplay();
      calculator.prevOperator = false;
      return;
    }

    if (target.classList.contains("AC")) {
      resetCalculator();
      updateDisplay();
      return;
    }
    //console.log(target);
    inputDigit(parseFloat(target.value));
    //console.log(calculator);
    //alert(target.value);
    updateDisplay();
  };
}

function inputDigit(digit) {
  const { displayValue } = calculator;
  //alert(displayValue);
  calculator.prevOperator = false;
  if (calculator.waitingForOther == true && calculator.inputDec == false) {
    calculator.displayValue = "";
    //alert("ff");
    //calculator.waitingForOther = false;
  } //else {
  if (calculator.multiOp == true || calculator.equal == true) {
    //alert(calculator.displayValue);
    if (calculator.displayValue.toString().includes(".")) {
      calculator.displayValue += digit;
      calculator.inputDec = false;
    } else {
      calculator.displayValue = digit;
    }
    //updateDisplay();
    calculator.multiOp = false;
    calculator.equal = false;
    //alert("dis");
    restParg();
    return;
  } else {
    calculator.displayValue =
      displayValue === "" ? digit : displayValue + digit;
    //console.log(calculator);
    calculator.inputDec = false;
    //alert("rr");
    restParg();
  }
  //alert(calculator.prevOperator);
}

function updateDisplay() {
  const display = document.querySelector("#dis");
  if (
    //keybord error
    calculator.displayValue == "NaN" ||
    calculator.displayValue == "undefined"
  ) {
    //alert(calculator.displayValue);
    return;
  }
  display.value = calculator.displayValue;
}

updateDisplay();

function setDisplay(txt) {
  const display = document.querySelector("#dis");
  display.value = txt;
}

function inputDecimal(dot) {
  if (calculator.prevOperato || calculator.equal || calculator.prevOperator) {
    calculator.displayValue = "";
    updateDisplay();
  }
  if (!calculator.displayValue.toString().includes(dot)) {
    calculator.displayValue += dot;
    calculator.inputDec = true;
    alert(calculator.displayValue);
    updateDisplay();
  }
  //alert(calculator.displayValue);
}

function resetCalculator() {
  calculator.displayValue = "";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function handelOperator(opertr) {
  const { firstOperand, displayValue, operator, fromConvert } = calculator;
  const input = parseFloat(displayValue);
  var result = "";
  const display = document.querySelector("#dis");
  if (
    //keybord error
    input == "NaN" ||
    input == "undefined"
  ) {
    return;
  }
  if (
    fromConvert == true ||
    (firstOperand === null && (display.value == "" || isNaN(display.value)))
  ) {
    resetCalculator();
    //alert("rrr");
    //console.log(display.value);
    calculator.fromConvert = false;
    return;
  }
  if (firstOperand === null && !isNaN(input)) {
    calculator.firstOperand = input;
    calculator.displayValue = "";
  } else if (
    (firstOperand != null && (display.value == "" || isNaN(display.value))) ||
    calculator.prevOperator
  ) {
    calculator.operator = opertr;
    return;
  } else if ((operator && !calculator.prevOperator) || !calculator.equal) {
    result = operate(operator, firstOperand, input);
    //alert("hi");
    // --F result = result.toFixed(4);
    //if (result == "NaN") result = "";
    if (
      //keybord error
      result == "NaN" ||
      result == "undefined"
    ) {
      return;
    }

    calculator.displayValue = result;
    calculator.firstOperand = result;
    calculator.multiOp = true;
    calculator.prevOperator = true;
  }

  calculator.waitingForOther = true;
  calculator.operator = opertr;
  //console.log(calculator);
}

const equl = document.querySelector("#eq");
const disply = document.querySelector("#dis");

equl.addEventListener("click", (event) => {
  const { target } = event;
  const { firstOperand, displayValue, operator } = calculator;
  ///calculator.prevOperator = true;
  //alert(disply.value);
  //console.log(calculator);
  const display = document.querySelector("#dis");
  //alert(calculator.prevOperator);
  if (
    operator != null &&
    display.value != "" &&
    !isNaN(display.value) &&
    !calculator.prevOperator
  ) {
    var val = operate(operator, firstOperand, parseFloat(disply.value));
    if (
      //keybord error
      val == "NaN" ||
      val == "undefined"
    ) {
      return;
    }
    calculator.displayValue = val;
    // --F calculator.displayValue = parseFloat(calculator.displayValue).toFixed(4);
  } else {
    return;
  }

  calculator.firstOperand = calculator.displayValue;
  calculator.waitingForOther = false;
  calculator.operator = null;
  calculator.equal = true;
  //console.log(calculator);
  updateDisplay();
});

document.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 107:
      //alert("key");
      const el = document.getElementById("opA");

      //console.log("firs:", calculator);
      el.focus();
      //el.classList.toggle("n2:active");
      el.click();
      //console.log("second:", calculator);
      e.stopPropagation();
      return false;
      break;

    case 109:
      //alert("key");
      const el2 = document.getElementById("opS");
      el2.focus();
      el2.click();
      e.stopPropagation();
      return false;
      break;
    case 106:
      //alert("key");
      const el3 = document.getElementById("opM");
      el3.focus();
      el3.click();
      e.stopPropagation();
      return false;
      break;
    case 111:
      //alert("key");
      const el4 = document.getElementById("opD");
      el4.focus();
      el4.click();
      e.stopPropagation();
      return false;
      break;
    case 48:
    case 96:
      //alert("key");
      const elb0 = document.getElementById("bn0");
      elb0.focus();
      elb0.click();
      e.stopPropagation();
      return false;
      break;
    case 49:
    case 97:
      //alert("key");
      const elb1 = document.getElementById("bn1");
      elb1.focus();
      elb1.click();
      e.stopPropagation();
      return false;
      break;
    case 50:
    case 98:
      //alert("key");
      const elb2 = document.getElementById("bn2");
      elb2.focus();
      elb2.click();
      e.stopPropagation();
      return false;
      break;
    case 51:
    case 99:
      //alert("key");
      const elb3 = document.getElementById("bn3");
      elb3.focus();
      elb3.click();
      e.stopPropagation();
      return false;
      break;
    case 52:
    case 100:
      //alert("key");
      const elb4 = document.getElementById("bn4");
      elb4.focus();
      elb4.click();
      e.stopPropagation();
      return false;
      break;
    case 53:
    case 101:
      //alert("key");
      const elb5 = document.getElementById("bn5");
      elb5.focus();
      elb5.click();
      e.stopPropagation();
      return false;
      break;
    case 54:
    case 102:
      //alert("key");
      const elb6 = document.getElementById("bn6");
      elb6.focus();
      elb6.click();
      e.stopPropagation();
      return false;
      break;
    case 55:
    case 103:
      //alert("key");
      const elb7 = document.getElementById("bn7");
      elb7.focus();
      elb7.click();
      e.stopPropagation();
      return false;
      break;
    case 56:
    case 104:
      //alert("key");
      const elb8 = document.getElementById("bn8");
      elb8.focus();
      elb8.click();
      e.stopPropagation();
      return false;
      break;
    case 57:
    case 105:
      //alert("key");
      const elb9 = document.getElementById("bn9");
      elb9.focus();
      //elb9.classList.add("active");
      elb9.click();
      e.stopPropagation();
      return false;
      break;
    case 190:
    case 110:
      //alert("key");
      const eldot = document.getElementById("dot");
      eldot.focus();
      eldot.click();
      e.stopPropagation();
      return false;
      break;
    case 46:
      //alert("key");
      const elclear = document.getElementById("clear");
      elclear.focus();
      elclear.click();
      e.stopPropagation();
      return false;
      break;
    case 187:
    case 13:
      //alert("key");
      const eleq = document.getElementById("eq");
      eleq.focus();
      eleq.click();
      e.stopPropagation();
      return false;
      break;
  }
});

var simulateClick = function (elem) {
  // Create our event (with options)
  var evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
};

const oneDolar = 3.41466;
const oneEuro = 3.9999;

function getDis() {
  const display = document.querySelector("#dis");
  return parseFloat(display.value);
}

function convertNIStoDolar() {
  return getDis() / oneDolar;
}

function convertDolarToNIS() {
  return getDis() * oneDolar;
}

function convertNIStoEuro() {
  return getDis() / oneEuro;
}

function convertEuroToNIS() {
  return getDis() * oneEuro;
}

const shTD = document.querySelector("#shToD");

shTD.addEventListener("click", (event) => {
  if (!isNaN(getDis())) {
    //console.log(getDis());
    calculator.fromConvert = true;
    const resP1 = document.querySelector("#resP1");
    resP1.innerHTML = "in Sheql =";
    const resP2 = document.querySelector("#resP2");
    resP2.innerHTML = "" + convertNIStoDolar().toFixed(4) + " in Dolar";
    calculator.equal = true;
  }
});

const DtoSh = document.querySelector("#DtoSh");

DtoSh.addEventListener("click", (event) => {
  if (!isNaN(getDis())) {
    calculator.fromConvert = true;
    const resP1 = document.querySelector("#resP1");
    resP1.innerHTML = "in Dollar =";
    const resP2 = document.querySelector("#resP2");
    resP2.innerHTML = "" + convertDolarToNIS().toFixed(4) + " in Sheql";
    calculator.equal = true;
  }
});

const shToE = document.querySelector("#shToE");

shToE.addEventListener("click", (event) => {
  if (!isNaN(getDis())) {
    calculator.fromConvert = true;
    const resP1 = document.querySelector("#resP1");
    resP1.innerHTML = "in Sheql =";
    const resP2 = document.querySelector("#resP2");
    resP2.innerHTML = "" + convertNIStoEuro().toFixed(4) + " in Euro";
    calculator.equal = true;
  }
});

const EtoSh = document.querySelector("#EtoSh");

EtoSh.addEventListener("click", (event) => {
  if (!isNaN(getDis())) {
    calculator.fromConvert = true;
    const resP1 = document.querySelector("#resP1");
    resP1.innerHTML = "in Euro =";
    const resP2 = document.querySelector("#resP2");
    resP2.innerHTML = "" + convertEuroToNIS().toFixed(4) + " in Sheql";
    calculator.equal = true;
  }
});

function restParg() {
  const resP1 = document.querySelector("#resP1");
  resP1.innerHTML = "";
  const resP2 = document.querySelector("#resP2");
  resP2.innerHTML = "";
}
