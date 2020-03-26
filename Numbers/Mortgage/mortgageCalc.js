let amount = 0;
let i = 0;
let payments = 0;
let monthlyPmt = 0;

// Define a number format for pretty output
let paymentFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

let calcMortgage = () => {
    amount = document.getElementById("amount").value;
    i = document.getElementById("rate").value / 1200; // Divide by 100 for the decimal and divide by 12 for the monthly interest value i
    payments = document.getElementById("term").value * 12; // Assuming monthly payments - num of years * 12 months in a year

    monthlyPmt = amount * ((i * ((1 + i)**payments)) / (((1 + i)**payments) - 1));

    document.getElementById("result").innerHTML = "<h3>Result: " + paymentFormat.format(monthlyPmt) + " per month</h3>" +
        "<br><button onclick='visualizeMortgage()'>Visualize</button>"; // Create a button for the user to visualize the payment and run the visualizeMortgage function below
    document.getElementById("visualize").innerHTML = ""; // Clear the visualize element if its been used before
}

let visualizeMortgage = () => {
    let table = "<br>";
    let currentAmount = amount;
    let currentInterest = 0;

    for (j = 0; j < payments; j++) {
        currentInterest = currentAmount * i;
        currentPrinciple = monthlyPmt - currentInterest;
        currentAmount = currentAmount - currentPrinciple;
        table += "Month " + (j + 1) + "   | Current Interest Pmt: " + paymentFormat.format(currentInterest) + "   | Current Principle Pmt: " + paymentFormat.format(currentPrinciple) + 
            "   | Ending Principle: " + paymentFormat.format(Math.abs(currentAmount)) + "<br>"; // Ammend table with calculated payments
        // The absolute value function is used on currentAmount above due to minor inaccuracy of the payment calculation - it was initially returning -$0.00 on the last payment
    }

    document.getElementById("visualize").innerHTML = table;
}