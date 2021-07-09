const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let calcOutput = document.querySelector("#calc-output");

function AddEventsToBtns()
{
    let btns = document.querySelectorAll(".btn");
    //console.log(btns);

    for(i = 0; i < btns.length; i++)
    {
        btns[i].addEventListener('click', ButtonClicked )
    }

}

function sizeCalculator() {

    let btnGrid = document.getElementById("button-grid");

    btnGrid.style.height = "50vh";
    btnGrid.style.width = "80vw";
}

sizeCalculator();
AddEventsToBtns();


let workingOnCalculation = false;
let workingOnInput1 = true;
let input1 = "";
let input2 = "";
let inputResult = "";
let calcOperator = null;

function ClearCalculator()
{
    calcOutput.textContent = "";
}

function Display(toDisp)
{
    calcOutput.textContent = toDisp;
}

function ResetCalculator()
{
    let workingOnInput1 = true;
    input1 = "";
    input2 = "";
    calcOperator = null;
    workingOnCalculation = false;

    ClearCalculator();
}


//When a number is pressed, add it to the current input string
function NumberPressed(pressedNum)
{
    //console.log("Pressed Number: " + pressedNum);

    if(workingOnInput1)
    {
        input1 += pressedNum;
        calcOutput.textContent = input1;
    }
    else
    {
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

    //if there is no current operator
    //then set to that operator and switch inputs
    if(calcOperator == null)
    {
        calcOperator = pressedOp;
        if(workingOnCalculation)
        {
            EqualPressed(false);
            return;
        }


        //toggle input we're handling
        workingOnInput1 = !workingOnInput1;
    }
    else{
        //if there already is an operator pressed, then just switch it to the latest one
        calcOperator = pressedOp;
        if(workingOnCalculation)
        {
            EqualPressed(false);
            return;
        }
    }

    ClearCalculator();
}

function EqualPressed(equalOrOperator)
{
    if(input1 != "" && input2 != "" && calcOperator != null)
    {
        let n1 = Number(input1);
        let n2 = Number(input2);

        console.log(`${n1} ${calcOperator} ${n2}`);

        switch (calcOperator)
        {
            case "div":
                {
                    inputResult = (n1 / n2).toString();
                    Display(inputResult);
                    break;

                }
            case "mul":
                {
                    inputResult = (n1 * n2).toString();
                    Display(inputResult);
                    break;

                }
            case "plus":
                {
                    inputResult = (n1 + n2).toString();
                    Display(inputResult);
                    break;

                }
            case "minus":
                {
                    inputResult = (n1 - n2).toString();
                    Display(inputResult);
                    break;

                }
        }

        workingOnCalculation = true;
        workingOnInput1 = false;
        input1 = inputResult.toString();
        input2 = "";

        if(equalOrOperator)
        {
            calcOperator = null;
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

    }
}

