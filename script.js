let display = document.querySelector(".display input[type='text']");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let equal = document.querySelector(".button[special]");
let buttons = document.querySelectorAll(".control-panel .button:not(.button[special])");
let history = document.querySelector(".history");
let hasEqual = false;

function HistoryValueSetToDisplay(evt) {
    display.value = evt.target.textContent;
}

function addToBuffer(evt) {
    
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
    // .forEach(function(item) {
    //     item.addEventListener("click", HistoryValueSetToDisplay);
    // });
    

    // let expressionItem = document.createElement("span");
    // expressionItem.classList.add("expression"), expressionItem.textContent = expression;
    // let resultItem = document.createElement("span");
    // resultItem.classList.add("result"), resultItem.textContent = result;
    
    // historyItem.appendChild(expressionItem);
    // historyItem.appendChild(resultItem);
    
    return historyItem;
}

function backspaceButtonLogic() {
    // let string = display.value;
    // if (display.selectionStart > 0 && display.selectionStart == display.selectionEnd) {
    //     string = string.slice(0, display.selectionStart - 1) + string.slice(display.selectionStart, string.length);
    //     let cursorPosition = display.selectionStart - 1;
    //     display.value = string;
        
    //     if (cursorPosition == 0) {
    //         display.selectionStart = display.value.length;
    //     }
    //     else {
    //         display.selectionStart = display.selectionEnd = cursorPosition;
    //     }
    // }
    // else if (display.selectionStart != display.selectionEnd) {;
    //     display.setRangeText("");
    // }

    display.value = display.value.slice(0, display.value.length - 1);
}

function clearButtonLogic() {
    display.value = "";
}

clear.addEventListener("click", clearButtonLogic);

backspace.addEventListener("click", backspaceButtonLogic);

equal.addEventListener("click", function() {
    try {
        let expression = display.value;
        display.value = math.evaluate(display.value);
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
