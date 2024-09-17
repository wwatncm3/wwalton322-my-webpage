//Initialzation

//Function to peform calculations
function simpCalculator(){
    //Get Results
    let results = [];
    //Table for Displaying res
    let tableResults = "<h2>Calculations</h2><table border='1'><tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>";

    //while true loop
    while(true) {
        let x_val = prompt("Enter the first number: "); //1st Number Prompt
        if (x_val == null) break;

        let operator_type = prompt("Enter an operator(+, -, *, /): ");//operator selction
        if (operator_type == null) break;

        let y_val = prompt("Enter the second number: "); //2nd Number Prompt
        if (y_val == null) break;

   


        //Input conversion to numbers
        x_val = parseFloat(x_val);
        y_val = parseFloat(y_val);


        //initlaize the results var

        let res;


        // CHeck if inputs are valid

        if (isNaN(x_val) || isNaN(y_val)) {
            res = "Invalid. Try Again";
        } else{
            //switch statements for operators
            switch(operator_type) {
                case'+':
                    res = x_val + y_val; //Addition
                    break;
                case'-':
                    res = x_val - y_val; //Subtraction
                    break;
                case'*':
                    res = x_val * y_val;    //Multiplication
                    break;
                case'/':
                    res = y_val !== 0 ? (x_val/y_val).toFixed(2) : "Cannot divide by 0"; //Division
                    break;
                case '%':
                    res = x_val % y_val; //Modulus
                    break;
                default:
                    res = "Invalid Operator"; //Error Message
                    break;
            }
        }

        //Add Results to tableResults
        tableResults += '<tr><td>' + x_val + '</td><td>' + operator_type + '</td><td>' + y_val + '</td><td>' + res + '</td></tr>';

        //Store valid reuslts for summary calculation
        if(typeof res === 'number') {
            results.push(res);
        }

    }

    //Close tableResults

    tableResults += "</table>";

    //Display Table on html page
    document.getElementById("calculator-results").innerHTML = tableResults;

    //Sumaary Table if valid

    if(results.length > 0) {
        displaySummary(results);
    }
}

//Function to display summary
function displaySummary(results){
    let min = Math.min(...results);
    let max = Math.max(...results);
    let total = results.reduce((sum, val)=> sum +val, 0);
    let avg = total / results.length;

    //Display summary table

    let sumHTML = '<h2>Summary</h2><table border="1"><tr><th>Min</th><th>Max</th><th>Avg</th><th>Total</th></tr><tr><td>' + min + '</td><td>' + max + '</td><td>' + avg.toFixed(2) + '</td><td>' + total + '</td></tr></table>';

    //Append to reuslts div
    document.getElementById("calculator-results").innerHTML += sumHTML;
}


//Start Calc
function startCalculator(){
    let start = confirm("Do you want to start the calculator?");
    if(start){
        simpCalculator();
    }
}
