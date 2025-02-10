// Write a program that takes a user’s input and prints the numbers from one to the number the user entered. 
// However, for multiples of three print Fizz instead of the number and for the multiples of five print Buzz. 
// For numbers which are multiples of both three and five print FizzBuzz.


// // user input
let userInput = prompt("Please enter a positive number");

//print numbers from one to the number the user entered
function printNumbers(userInput) {
    for (let i=1; i <= userInput; i++) {

        //print buzz multiples of three
        if (i%3 == 0 && i%5 !== 0) {
            console.log("Fizz");
        }
        //find multiples of five and print buzz
        else if (i%5 == 0 && i%3 !== 0) {
            console.log("Buzz");
        }
        //On multiples of three and five print FizzBuzz
        else if (i%3 == 0 && i%5 == 0){
            console.log("FizzBuzz");
        }
        else {
            console.log(i);
        }
    }
}

printNumbers(userInput);
