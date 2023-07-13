const outputScreen = document.querySelector(".output-screen");
const inputN = document.querySelector(".input-container");
const inputS = document.querySelector(".operation-container");
const inputfcn = document.querySelector(".other-operation-container");
const outputbtn = document.querySelector(".equal");

// this calculator doesn't work on expresions
// therefor three variable are enough for calculation
// num1, operand & num2.

var num1 = "";
var operand = "";
var num2 = "";
var soln = "";
var sympresent = false;     //needed in some edge cases to check if operand is already defined. can be optimised to not required.

var lastbtn = "digits";     //stores the last event occured(i.e which button was pressed).
var currbtn = "";           //curr button pressed.

inputN.addEventListener("click", addinput);
inputS.addEventListener("click", addinput);
inputfcn.addEventListener("click", addinput);
outputbtn.addEventListener("click", addinput);


//digits = {0,1,2,3,4,5,6,7,8,9}.
//symbols = {-,+,*,/,^,%}.
// other button = AC(to clear space), sqr(for squaring), Back(for deleting last digit), dot, equal(for answer).

function addinput(event) {

    currbtn = event.target.classList[0];
    console.log(currbtn);

    // if-else case for each type of button pressed
    //and every time we will be checking which btn was pressed earlier for further manipulations.
    if (currbtn === "digits") {
        if (lastbtn === "digits" || lastbtn === "dot" || lastbtn == "Back" || lastbtn == "clear") {
            outputScreen.innerText += event.target.innerText;
        }
        else if (lastbtn == "square" || lastbtn == "equal") {
            reset();
            outputScreen.innerText = event.target.innerText;
            sympresent = false;
        }
        else if (lastbtn == "symbols") {    //ist num is only fixed when we start putting num2, before that there is a chance that clear btn was presed.
            num1 = parseFloat(outputScreen.innerText);
            outputScreen.innerText = event.target.innerText;    //remove num1 and rewrite with num2.
            sympresent = true;
        }

        lastbtn = "digits";
    }

    else if (currbtn === "dot") {
        let temp = outputScreen.innerText.toString();
        if (lastbtn === "digits")
            if (temp.length == 0)
                outputScreen.innerText = 0 + ".";
            else {
                parseFloat(temp);
                if (temp % 1 === 0)
                    outputScreen.innerText += ".";
            }
        else if (lastbtn == "equal" || lastbtn == "square") {
            reset();
            outputScreen.innerText = 0 + ".";

        }
        else {
            outputScreen.innerText = 0 + ".";
        }
        lastbtn = "dot";
    }

    else if (currbtn == "symbols") {
        if (lastbtn == "equal" || lastbtn == "square") {
            num1 = soln;
            operand = event.target.innerText;
            sympresent = false;
        }
        if (sympresent) solve();
        operand = event.target.innerText;
        num1 = parseFloat(outputScreen.innerText);
        lastbtn = "symbols";
        sympresent = true;
    }

    else if (currbtn == "clear") {  //all clear button.
        reset();
        lastbtn = "clear";
    }

    else if (currbtn == "square") {     //note: my sqr button directly print answer , no need for "=" button.
        if (outputScreen.innerText.toString().length != 0) {
            let num = parseFloat(outputScreen.innerText);
            outputScreen.innerText = num * num;
            num1 = outputScreen.innerText;      //extra
        }
        lastbtn = "square";
    }

    else if (currbtn === "Back") {
        let string = outputScreen.innerText.toString();
        outputScreen.innerText = string.substr(0, string.length - 1);
        if (lastbtn === "symbols") {
            num1 = "";
        }
        else if (lastbtn == "square" || lastbtn == "equal") {
            reset();    //as current display is output. -> so work as AC.
        }
        lastbtn = "Back";
    }

    else if (currbtn === "equal") {
        let num = outputScreen.innerText.toString();
        if (num.length == 0) {
            outputScreen.innerText = "0";   //if nothing on the screen.
            soln = 0;
        }
        else
            solve();
        lastbtn = "equal";
    }
    //
}

function solve() {

    if (lastbtn == "equal") {
        num1 = soln;
        if (num2 != "") {
            console.log("triggred");
            soln = calculate();
        }
        console.log(num1 + " " + num2);
        outputScreen.innerText = soln;
    }
    else
        if (!sympresent || lastbtn == "symbols") {
            soln = outputScreen.innerText;
        }
        else {
            num2 = parseFloat(outputScreen.innerText);
            console.log(num1 + " " + num2);
            soln = calculate();
            outputScreen.innerText = soln;
            num1 = soln;
        }
}

function calculate() {
    //note: I'm always storing num1,num2 as float other than while reseting.
    if (operand == "+")
        return num1 + num2;
    else if (operand == "-")
        return num1 - num2;
    else if (operand == "*")
        return num1 * num2;
    else if (operand == "/")
        return num1 / num2;
    else if (operand == "^")
        return Math.pow(num1, num2);
    else if (operand == "%") {
        return num1 % num2;     //note: it's modulo not percentage calculator.
    }
}

function reset() {
    outputScreen.innerText = "";
    lastbtn = "digits";
    sympresent = false;
    num1 = "";
    num2 = "";
    operand = "";
}
