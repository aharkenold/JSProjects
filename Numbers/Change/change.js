// Define number format
let paymentFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

let calculateChange = () => {
    const price = document.getElementById("price").value;
    const tendered = document.getElementById("tendered").value;

    let change = tendered - price;

    if (change < 0) {
        document.getElementById("change").innerHTML = "<p>You've underpaid by " + paymentFormat.format(Math.abs(change)) + "</p>";
    }
    else {
        change = Math.round(change * 100); // Convert decimal to whole number and round any remaining decimal value
        result = "<h3>Your change is:</h3>"; // Begin building HTML result

        console.log(change);

        if (change >= 100) {
            let dollars = Math.floor(change / 100);
            change -= dollars*100;
            result += "<br><b>x" + dollars + " dollars</b>      " + "<img src=img/dollar.jpg style='width:300px;height:300px'></img>";
        }
        if (change >= 25) {
            let quarters = Math.floor(change / 25);
            change -= quarters*25;
            result += "<br><b>x" + quarters + " quarters</b>      " + "<img src=img/quarter.jpg style='width:300px;height:300px'></img>";
        }
        if (change >= 10) {
            let dimes = Math.floor(change / 10);
            change -= dimes*10;
            result += "<br><b>x" + dimes + " dimes</b>      " + "<img src=img/dime.png style='width:300px;height:300px'></img>";
        }
        if (change >= 5) {
            let nickel = Math.floor(change / 5);
            change -= nickel*5;
            result += "<br><b>x" + nickel + " nickel</b>      " + "<img src=img/nickel.jpg style='width:300px;height:300px'></img>";
        }
        if (change > 0) { // Remainder will be in pennies
            result += "<br><b>x" + change + " pennies</b>      " + "<img src=img/penny.png style='width:300px;height:300px'></img>";
        }

        document.getElementById("change").innerHTML = result;
    }
};

let clearChange = () => {
    document.getElementById("change").innerHTML = "";
    document.getElementById("price").value = "";
    document.getElementById("tendered").value = "";
}