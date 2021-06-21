//creating a calculator html structure using Javascript DOM.

var container = document.createElement('div');
container.setAttribute('class','container');
document.body.appendChild(container);

var block = document.createElement('div');
block.setAttribute('id','calculator');
block.setAttribute('class', 'calculator-wrapper col-md-8 offset-md-2');
container.appendChild(block);

//for calculator display screen

var calDisplay = document.createElement('div');
calDisplay.setAttribute('id', 'calculator-display-screen');
calDisplay.setAttribute('class','calculator-screen-wrapper');

//for calculator keys

var calKeys = document.createElement('div');
calKeys.setAttribute('id','calculator-keys');
calKeys.setAttribute('class','keys-wrapper');

//for appending calculator display screen div and calculator keys Div to Main div i.e., calculator
block.append(calDisplay,calKeys);

//display screen value
var displayValue = document.createElement('input');
displayValue.type = 'text';
displayValue.value = 0;
displayValue.id = 'display-value-screen';
displayValue.setAttribute("disabled",true);

//paragraph to display message if any other key except number is pressed.
var keyErrorMsg = document.createElement('p');
keyErrorMsg.setAttribute('class','msg-wrapper');

//Appending paragraph and display screen to calculator screen.
calDisplay.append(displayValue,keyErrorMsg);


//creating calculator keys or buttons.

//keys or buttons in first row
var buttonSeven = document.createElement('button');
buttonSeven.innerText= "7";

var buttonEight = document.createElement('button');
buttonEight.innerText= "8";

var buttonNine = document.createElement('button');
buttonNine.innerText= "9";

var buttonModulus = document.createElement('button');
buttonModulus.setAttribute('data-action','modulo');
buttonModulus.setAttribute('class','operator-key');
buttonModulus.innerText= "%";

//keys or buttons in second row
var buttonFour = document.createElement('button');
buttonFour.innerText= "4";

var buttonFive = document.createElement('button');
buttonFive.innerText= "5";

var buttonSix = document.createElement('button');
buttonSix.innerText= "6";

var buttonDivision = document.createElement('button');
buttonDivision.setAttribute('data-action','divide');
buttonDivision.setAttribute('class','operator-key');
buttonDivision.innerText= "/";

//keys or buttons in third row
var buttonOne = document.createElement('button');
buttonOne.innerText= "1";

var buttonTwo = document.createElement('button');
buttonTwo.innerText= "2";

var buttonThree = document.createElement('button');
buttonThree.innerText= "3";

var buttonMultiply = document.createElement('button');
buttonMultiply.setAttribute('data-action','multiply');
buttonMultiply.setAttribute('class','operator-key');
buttonMultiply.innerText= "x";

//keys or buttons in fourth row
var buttonZero = document.createElement('button');
buttonZero.innerText= "0";

var buttonDecimal = document.createElement('button');
buttonDecimal.setAttribute('data-action','decimal');
buttonDecimal.innerText= ".";

var buttonAC = document.createElement('button');
buttonAC.setAttribute('data-action','clear');
buttonAC.innerText= "AC";

var buttonMinus = document.createElement('button');
buttonMinus.setAttribute('data-action','subtract');
buttonMinus.setAttribute('class','operator-key');
buttonMinus.innerText= "-";

//keys or buttons in fifth row
var buttonEqual = document.createElement('button');
buttonEqual.setAttribute('data-action','equate');
buttonEqual.setAttribute('class','equate-key');
buttonEqual.innerText= "=";

var buttonPlus = document.createElement('button');
buttonPlus.setAttribute('data-action','add');
buttonPlus.setAttribute('class','operator-key');
buttonPlus.innerText= "+";


//Appending the calculator keys or buttons.

calKeys.append(buttonSeven,buttonEight,buttonNine,buttonModulus,
               buttonFour,buttonFive,buttonSix,buttonDivision,
               buttonOne,buttonTwo,buttonThree,buttonMultiply,
               buttonZero,buttonDecimal,buttonAC,buttonMinus,
               buttonEqual,buttonPlus
);

// calculator html structure using DOM ends here.


// Performing calculator operation using Javascript.

//Calculator performing simple maths function.
const calculate = (a,operation,b) => {

    var num1 = parseFloat(a);
    var num2 = parseFloat(b);

    if(operation === 'add'){
        return num1 + num2;
    }

    if(operation === 'subtract'){
        return num1 - num2;
    }

    if(operation === 'multiply'){
        return num1 * num2;
    }

    if(operation === 'divide'){
        return num1/num2;
    }

    if(operation === 'modulo'){
        return num1%num2;
    }

    return solution;
}

//identifying the calculator key type i.e., number or operator or decimal or equal to.
const getKeyType = key => {
    const keyAction = key.dataset.action
    if (!keyAction) return 'number'
    if (keyAction === 'add' || keyAction === 'subtract' || keyAction === 'multiply' || keyAction === 'divide' || keyAction === 'modulo') return 'operator'
    // For everything else, return the action
    return keyAction;
}

//creating the display screen value.
const createResultString = (key,displayingValue, calculatorState) => {

    const keyValues = key.innerText; // value of key clicked.
    const keyType = getKeyType(key); // type of key clicked(number, decimal, operator, clear, equate)
    const leftValue = calculatorState.leftValue; // first number
    const modValue = calculatorState.modValue; // second number
    const previousKey = calculatorState.previousKeyType; // previous key or button clicked.
    const operator = calculatorState.operatorValue;  // operator clicked.

    //if key clicked is number key update the screen value.
    if(keyType === 'number'){
        return displayingValue === '0' || previousKey === 'operator' || 
        previousKey === 'equate'? keyValues : displayingValue + keyValues;
    }

    //if key is the decimal.
    if(keyType === 'decimal') {
        if (!displayingValue.includes('.')) return displayingValue + '.'
        if (previousKey === 'operator' || previousKey === 'equate') return '0.'
        return displayingValue;
    }

    //if any operator is clicked.
    if(keyType === 'operator'){
        return leftValue && operator && previousKey !== 'operator'
        && previousKey !== 'equate' ? calculate(leftValue, operator,displayingValue) : displayingValue;
    }

    // if clear key is clicked.
    if(keyType === 'clear') return '0';

    // if equate key is clicked.
    if(keyType === 'equate'){
        return leftValue? previousKey === 'equate' ? calculate(leftValue, operator, modValue) : calculate(leftValue, operator, displayingValue) : displayingValue;
    }

}

const calculatorStateUpdate = (key, calculator, calculatedValue, displayingValue) => {
    const keyType = getKeyType(key);

    const leftValue = calculator.dataset.leftValue;
    const modValue = calculator.dataset.modValue;
    const previousKey = calculator.dataset.previousKeyType;
    const operator = calculator.dataset.operatorValue;

    calculator.dataset.previousKeyType = keyType;

    if(keyType === 'operator'){
        calculator.dataset.operatorValue = key.dataset.action;
        calculator.dataset.leftValue = leftValue && operator && previousKey !== 'operator' && previousKey !== 'equate' ? calculatedValue: displayingValue;
    }

    if(keyType === 'clear'){
        calculator.dataset.leftValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operatorValue = '';
        calculator.dataset.previousKeyType = '';
    }

    if(keyType === 'equate'){
        calculator.dataset.modValue = leftValue && previousKey === 'equate' ? modValue : displayingValue;
    }
}

const updateVisualState = (key,calculator) => {
    const keyType = getKeyType(key);
}


const calculator = document.querySelector('#calculator-display-screen');
const displayScreen = document.querySelector('#display-value-screen');
const keys = document.querySelector('#calculator-keys');
const msg = document.querySelector('.msg-wrapper');

//Allowed keys
const keyPressedNum = ['0','1','2','3','4','5','6','7','8','9'];


//function which listens to the click of keys in calculator
keys.addEventListener('click', e => {

    if(!e.target.matches('button')) return

    const key = e.target;
    const displayingValue = displayScreen.value;

    const result = createResultString(key, displayingValue, calculator.dataset)

    displayScreen.value = result;

    calculatorStateUpdate(key, calculator, result, displayingValue)
    updateVisualState(key, calculator)

})

//function which handles the keypress.
const onKeyUp = ((event,displayingValue) => {
    let keyName = event.key;

    //condition checking if key pressed is number key.
    if(keyPressedNum.includes(keyName)) {
        
        //if calculator display shows zero or without any number.
        if(displayScreen.value=='0' || (calculator.dataset.previousKeyType ==='operator' || calculator.previousKeyType ==='equate')){
            displayScreen.value = keyName;
            calculator.dataset.previousKeyType = 'number';
        }
        else{
            displayScreen.value = displayScreen.value + keyName;
            calculator.dataset.previousKeyType = 'number';
        }
    }

    //condition which handles if the key pressed is not a number key.
    else{
        setTimeout(() => {
            msg.innerHTML="";
        },3000);
        msg.innerHTML="Only Number Key is allowed"; //displays the message if key pressed is not a number key
    }

});

//function which listens to the keypressed in keyBoard.
document.addEventListener('keyup', (event) => {
    const displayingValue = displayScreen.value;
    const keyPress = onKeyUp(event,displayingValue);
});