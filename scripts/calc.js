const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let calcOutput = document.querySelector("#calc-output");
let bufferOutput = document.querySelector("#calc-buffer");

function AddEventsToBtns()
{
    let btns = document.querySelectorAll(".btn");
    //console.log(btns);

    for(let i = 0; i < btns.length; i++)
    {
        btns[i].addEventListener('click', ButtonClicked )
    }
}

/* function sizeCalculator() {

    let btnGrid = document.getElementById("button-grid");

    btnGrid.style.height = "50vh";
    btnGrid.style.width = "80vw";
} */

//sizeCalculator();
AddEventsToBtns();


let workingOnCalculation = false;
let workingOnInput1 = true;
let input1 = "";
let input2 = "";
let inputResult = "";
let calcOperator = null;
let eqPressed = false;

function ClearCalculator()
{
    calcOutput.textContent = "";
    bufferOutput.textContent = "";
}

function Display(toDisp)
{

    //it output is greater than 15 digits display an error
    if(toDisp.length > 15)
    {
        ResetCalculator();
        calcOutput.textContent = "OVERFL0W ERROR"
        return false;
    }

    if(toDisp == "Infinity")
    {
        ResetCalculator();
        calcOutput.textContent = "=("
        return false;
    }


    calcOutput.textContent = toDisp;
    return true;
}

function ResetCalculator()
{
    let workingOnInput1 = true;
    input1 = "";
    input2 = "";
    calcOperator = null;
    workingOnCalculation = false;
    eqPressed = false;

    ClearCalculator();
}


//When a number is pressed, add it to the current input string
function NumberPressed(pressedNum)
{
    //console.log("Pressed Number: " + pressedNum);

    if(calcOperator == null && (input1 != "" || input2 != ""))
    {
        if(eqPressed)
        {
            ResetCalculator();
        }
    }

    if(pressedNum == ".")
    {

        //only one decimal point allowed in a number 
        if(workingOnInput1)
        {
            for(let i = 0; i < input1.length; i++)
            {
                if(input1.charAt(i) == ".") { return; }
            }
        }
        else
        {
            for(let i = 0; i < input2.length; i++)
            {
                if(input2.charAt(i) == ".") { return; }
            }
        }
    }

    if(workingOnInput1)
    {
        //max input for our calculator of 10
        if(input1.length == 10)
        {
            return;
        }
        input1 += pressedNum;
        calcOutput.textContent = input1;
    }
    else
    {
        if(input2.length == 10)
        {
            return;
        }
        input2 += pressedNum;
        calcOutput.textContent = input2;
    }
}

//if a operator is pressed, switch inputs and clear the screen
function OperatorPressed(pressedOp)
{
    //console.log("Operator: " + pressedOp);

    if(input1 != "" && input2 != "")
    {
        workingOnCalculation = true;
    }

    if(input1 == "" && input2 =="")
    {
        return;
    }

    //if there is no current operator
    //then set to that operator and switch inputs
    if(calcOperator == null)
    {
        calcOperator = pressedOp;
        if(workingOnCalculation)
        {
            //bufferOutput.textContent = calcOutput.textContent;
            EqualPressed(false);
            return;
        }


        //toggle input we're handling
        workingOnInput1 = !workingOnInput1;
    }
    else{
        //if there already is an operator pressed, then just switch it to the latest one
        let tempOperator = calcOperator;
        calcOperator = pressedOp;
        if(workingOnCalculation)
        {
            //bufferOutput.textContent = calcOutput.textContent;
            EqualPressed(false, tempOperator);
            return;
        }
    }

    //bufferOutput.textContent = calcOutput.textContent;
    ClearCalculator();
}

function EqualPressed(equalOrOperator, tempOperator)
{
    if(input1 != "" && input2 != "" && calcOperator != null)
    {
        let n1 = Number(input1);
        let n2 = Number(input2);

        if(workingOnInput1)
        {
            let n3 = n2;
            n2 = n1;
            n1 = n3;
        }


        let operator = null;
        if(tempOperator != undefined)
        {
            operator = tempOperator;
        }
        else{
            operator = calcOperator;
        }

        let opSymbol = "";
        let error = false;
        switch (operator)
        {
            case "div":
                {
                    opSymbol = '\u00F7';
                    inputResult = parseFloat((n1 / n2).toFixed(9)).toString();
                    error = !Display(inputResult);
                    break;

                }
            case "mul":
                {
                    opSymbol = '\u00D7';
                    inputResult = parseFloat((n1 * n2).toFixed(9)).toString();
                    error = !Display(inputResult);
                    break;

                }
            case "plus":
                {
                    opSymbol = '\u002B';
                    inputResult = parseFloat((n1 + n2).toFixed(9)).toString();
                    error = !Display(inputResult);
                    break;

                }
            case "minus":
                {
                    opSymbol = '\u2212';
                    inputResult = parseFloat((n1 - n2).toFixed(9)).toString();
                    error = !Display(inputResult);
                    break;

                }
        }

        bufferOutput.textContent = `${n1} ${opSymbol} ${n2}`;
        //console.log(`${n1} ${operator} ${n2}`);

        if(error)
        {
            return;
        }

        workingOnCalculation = true;
        workingOnInput1 = false;
        input1 = inputResult.toString();
        input2 = "";

        if(equalOrOperator)
        {
            calcOperator = null;
            eqPressed = true;
        }
        else
        {
            eqPressed = false;
        }
        
    }

}


function ButtonClicked(e)
{
    //console.log("Click " + e.target.id);
    switch(e.target.id)
    {
        case "btn-c":
            {
                ResetCalculator();
                break;
            }
        case "btn-0":
            {
                NumberPressed("0");
                break;
            }
        case "btn-1":
            {
                NumberPressed("1");
                break;
            }
        case "btn-2":
            {
                NumberPressed("2");
                break;
            }
        case "btn-3":
            {
                NumberPressed("3");
                break;
            }
        case "btn-4":
            {
                NumberPressed("4");
                break;
            }
        case "btn-5":
            {
                NumberPressed("5");
                break;
            }
        case "btn-6":
            {
                NumberPressed("6");
                break;
            }
        case "btn-7":
            {
                NumberPressed("7");
                break;
            }
        case "btn-8":
            {
                NumberPressed("8");
                break;
            }
        case "btn-9":
            {
                NumberPressed("9");
                break;
            }
        case "btn-div":
            {
                OperatorPressed("div");
                break;
            }
        case "btn-mul":
            {
                OperatorPressed("mul");
                break;
            }
        case "btn-plus":
            {
                OperatorPressed("plus");
                break;
            }
        case "btn-minus":
            {
                OperatorPressed("minus");
                break;
            }
        case "btn-equals":
            {
                EqualPressed(true);
                break;
            }
        case "btn-dot":
            {
                NumberPressed(".");
                break;
            }

    }
}

