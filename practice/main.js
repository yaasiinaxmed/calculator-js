const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");

buttons.forEach( btn => {
    btn.addEventListener("click", () => {
       if(btn.classList.contains("clear")) {
            clearItem(input);
       } else {
           clearAll(input);
       }
    })
})

function clearItem() {
    let item = input.value.split("");
    
    item.pop();

    if (item.length > 0) {
        input.value = item.join("");
    } else {
        input.value = item.join("");
    }

}

function clearAll() {

    if(input.value === "") {
        input.style.border = '1px solid red';
    } else {
        input.value = "";
        input.style.border = '1px solid green';
    }

}