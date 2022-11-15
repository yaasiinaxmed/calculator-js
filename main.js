let button = document.querySelectorAll("button");
let resInput = document.querySelector("#res-input");
let opInput = document.querySelector("#ope-input");
let historyIcon = document.querySelector(".history-icon");
let historyPage = document.querySelector(".history-page");
let historyOperations = document.querySelector(".history-operation");

let valueOne = 0;
let valueTwo = 0;
let operation = "";
let option2 = false;

let allOperation = (JSON.parse(localStorage.getItem("operations")) || []);


showHistory();

historyIcon.addEventListener("click", () => {
    historyPage.classList.toggle("active");

    let historyElement = document.querySelectorAll(".history-element");
    

    historyElement.forEach( he => {
        he.addEventListener("click", (e) => {

            opInput.value = e.target.parentElement.children[0].value;
            resInput.value = e.target.parentElement.children[1].value;

        })
    })

    showHistory();
})

document.querySelector(".bi-trash3-fill").addEventListener("click", () => {
    clearHistory();
    showHistory();
})

button.forEach( btn => {
    btn.addEventListener("click", (e) => {
       
    if (btn.classList.contains("clear-all") || btn.classList.contains("clear")) {

        if (btn.classList.contains("clear")){
            if (resInput.value > 0) {
                clearInput(resInput);
            } else{
                clearInput(opInput);
            }
        } else {
            clearAll(opInput,resInput);
        }

    } else if (btn.classList.contains("operation")){

        if(btn.value != "=") {
            option2 = true;
            valueOne = opInput.value;
            operation = btn.value;
        }else {
            if (option2) {

                let sum = `${valueOne} ${operation} ${valueTwo}`;
                resInput.value = `${eval(sum)}`;

                let currentOperation = {
                    val1 : valueOne,
                    op : operation,
                    val2 : valueTwo,
                }

                allOperation.push(currentOperation);
                localStorage.setItem("operations", JSON.stringify(allOperation));
               
                valueOne = 0;
                valueTwo = 0;
                operation = "";
            }
        }

    } else {

        if (option2){
            valueTwo == 0 ? valueTwo = btn.value : valueTwo += btn.value;
            opInput.value = `${valueOne} ${operation} ${valueTwo}`
        }else {
            opInput.value == 0 ? opInput.value = btn.value : opInput.value += btn.value;

            valueOne += btn.value;
        }

    }

    })
})

function clearInput(input) {
    let currentResult = input.value.split("");

    let last = currentResult.pop();

    if(currentResult.length > 0) {
        input.value = currentResult.join("");
    }else{
        input.value = 0;
        option2 = false;
        valueOne = 0;
        valueTwo = 0;
        operation = "";
    }

}

function clearAll(re,op) {
    re.value = 0;
    op.value = 0;
    option2 = false;
    valueOne = 0;
    valueTwo = 0;
    operation = "";
}

function showHistory() {
    let ops = "";
    
    if (allOperation.length > 0) {
        allOperation.forEach( op => {

            let current = `${(op.val1)} ${(op.op)} ${(op.val2)}`;

            ops += `<div class="history-element">
              <input type="text" class="calc-his" value="${op.val1} ${op.op} ${op.val2} =" disabled>
              <input type="text" class="calc-his" value="${eval(current)}" disabled>
            </div><hr>`;

        });


    } else {
        ops = "<h5>Wax Kuma jira Historyga </h5>"
    }

    historyOperations.innerHTML = ops;

}

function clearHistory() {
    localStorage.clear();
    allOperation = [];
}