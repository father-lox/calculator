let display = document.querySelector(".display input[type='text']");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let equal = document.querySelector(".button[special]");
let buttons = document.querySelectorAll(".control-panel .button:not(.button[special])");
let hasEqual = false;
let history = [];

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
        let t = {expression: null, result: null};
        t.expression = display.value;
        display.value = math.evaluate(display.value);
        t.result = display.value;
        history.push(t);
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
