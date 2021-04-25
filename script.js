let display = document.querySelector(".display input[type='text']");
let clear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let equal = document.querySelector(".button[special]");
let buttons = document.querySelectorAll(".control-panel .button:not(.button[special])");

function backspaceButtonLogic() {
    let string = display.value;
    if (display.selectionStart > 0 && display.selectionStart == display.selectionEnd) {
        string = string.slice(0, display.selectionStart - 1) + string.slice(display.selectionStart, string.length);
        let cursorPosition = display.selectionStart - 1;
        display.value = string;
        
        if (cursorPosition == 0) {
            display.selectionStart = display.value.length;
        }
        else {
            display.selectionStart = display.selectionEnd = cursorPosition;
        }
    }
    else if (display.selectionStart != display.selectionEnd) {;
        display.setRangeText("");
    }
}

function clearButtonLogic() {
    display.value = "";
}

function select() {
    if (display.selectionEnd != display.selectionStart) {
        evt.target.setRangeText("ну возможно это работает");
    }
}

clear.addEventListener("click", clearButtonLogic);

backspace.addEventListener("click", backspaceButtonLogic);

equal.addEventListener("click", function() {
    display.value = math.evaluate(display.value);
});

buttons.forEach((button) => {
    button.addEventListener("click", function(evt) {
        display.value += evt.target.getAttribute("data-operation");
    });
    if (button.hasAttribute("function")) {
        button.addEventListener("click", select);
    }
});
