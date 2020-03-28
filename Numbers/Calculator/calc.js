let eval = ''; // Will be used to determine the appropriate expression to use
let result = 0; // Will keep track of input after a non-number button has been pressed
let isDecimal = false;

// Each button passes in its respective value to this handler function
let handleButton = input => {
    if (input === '=') {
        if (eval !== '') {
            switch (eval) {
                case '+':
                    document.getElementById("entry").value = Number(result) + Number(document.getElementById("entry").value);
                    break;
                case '-':
                    document.getElementById("entry").value = Number(result) - Number(document.getElementById("entry").value);
                    break;
                case '*':
                    document.getElementById("entry").value = Number(result) * Number(document.getElementById("entry").value);
                    break;
                case '/':
                    document.getElementById("entry").value = Number(result) / Number(document.getElementById("entry").value);
                    break;
            }

            result = 0;
            eval = '';
            if (Number(document.getElementById("entry").value) % 1 === 0)
                isDecimal = false;
            else
                isDecimal = true;
        }
    }
    else if (input === 'Clear') {
        document.getElementById("entry").value = "";
        eval = '';
        result = 0;
        isDecimal = false;
    }
    else if (input === '+' || input === '-' || input === '*' || input === '/') {
        if (eval === '') {
            eval = input;
            result = document.getElementById("entry").value;
            document.getElementById("entry").value = "";
            isDecimal = false;
        }
    }
    else if (input === '.') {
        if (!isDecimal) { // Ensures that there can only be 1 decimal in the number
            if (document.getElementById("entry").value === '') {
                document.getElementById("entry").value = '0' + input;
                isDecimal = true;
            }
            else {
                document.getElementById("entry").value = document.getElementById("entry").value + input;
                isDecimal = true;
            }
            
        }
    }
    else {
        document.getElementById("entry").value = document.getElementById("entry").value + input;
    }
}

// This function will handle keyboard events and if the key is valid, will run the handleButton function above
let handleKey = () => {
    let key = event.key;
    if (
        key === '1' ||
        key === '2' ||
        key === '3' ||
        key === '4' ||
        key === '5' ||
        key === '6' ||
        key === '7' ||
        key === '8' ||
        key === '9' ||
        key === '0' ||
        key === '.' ||
        key === '+' ||
        key === '-' ||
        key === '*' ||
        key === '/'
    )
        handleButton(key);
    else if (key === 'Enter')
        handleButton('=');
    else if (key === 'c' || key === 'C')
        handleButton('Clear');
}