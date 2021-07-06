let display = document.querySelector(".display input[type='text']");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let equal = document.querySelector(".button[special]");
let buttons = document.querySelectorAll(".control-panel .button:not([special])");
let history = document.querySelector(".history");
let hasEqual = false;

clear.addEventListener("click", clearButtonLogic);

backspace.addEventListener("click", backspaceButtonLogic);

equal.addEventListener("click", function() {
    try {
        let expression = display.value;
        display.value = math.round(math.evaluate(display.value), 3);
        let result = display.value;
        history.prepend(createExceptionItem(expression, result));

        hasEqual = true;
    }
    catch (exception) {
        alert(exception.message);
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", function(evt) {
        if (hasEqual) {
            display.value = evt.target.getAttribute("data-operation");
            hasEqual = false;
        }
        else {
            display.value += evt.target.getAttribute("data-operation");
        }
        
    });
});

function HistoryValueSetToDisplay(evt) {
    display.value = evt.target.textContent;
}

function createExceptionItem(expression, result) {
    let historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = (`<span class="expression">${expression}</span>
    <span class="result">${result}</span>`);

    console.log(historyItem.children);
    
    for(let i = 0; i < historyItem.children.length; i++)
    {
        historyItem.children[i].addEventListener("click", HistoryValueSetToDisplay);
    }

    return historyItem;
}

function backspaceButtonLogic() {
    display.value = display.value.slice(0, display.value.length - 1);
}

function clearButtonLogic() {
    display.value = "";
}