// Calculator function to take in data from the user and return the calculated value

function divideBy() 
{ 
  num1 = document.getElementById("firstNumber").value;
  num2 = document.getElementById("secondNumber").value;
  document.getElementById("result").innerHTML = Math.round(num1 / num2);
}