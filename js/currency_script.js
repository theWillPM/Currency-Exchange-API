/** 
* @name: JavaScript Essentials Class Activity 
* @Course Code: SODV1201 
* @class: Software Development Diploma program. 
* @author: Willian Pereira Munhoz. 
*/ 

let currencyTable = document.getElementById("converter-table");
let fromCurrency = document.getElementById("from-currency");
let toCurrency = document.getElementById("to-currency");
let userInputAmount = document.getElementById("user-input-currency-amount");
let result = document.getElementById("convertion-result");


// Initializing global array variables to receive values from getData function.
let currencyRatios = [];
let currencyNames = [];

// data Accomodates the json object from getData.
let data;

// getData is used to fetch currency exchange data from the API and parse into a JSON.
async function getData() {

    // This fetches data using my personal API key. As this is an academic environment, I will not worry about hiding the key. 
    let response = await fetch(`https://v6.exchangerate-api.com/v6/4e55bdd6c6676cc469062ae7/latest/USD`)
    data = await response.json();
    console.log(data.conversion_rates);
    console.log(Object.keys(data.conversion_rates).length);

    //Organize the json object into two arrays: One with the currency 3-letters names and the other with the exchange ratio.
    Object.keys(data.conversion_rates).forEach(currency => {
        currencyNames.push(currency);
        currencyRatios.push(data.conversion_rates[currency]);
    });
}

// Creates table elements with the exact amoung of entries from json object. One column for currency names and another for currency ratio.
async function createTableElements() {
    for (let i = 0; i< currencyNames.length; i++) {

    var newRow = currencyTable.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = currencyNames[i];
    cell2.innerHTML = currencyRatios[i].toFixed(2);

    // Here I was having a little bit of trouble. For some reason I couldn't add newOption to multiple select elements (only the last one gets the added option). The workaround was to create another function. There must be a better solution here (Imagine having to create thousands of functions if we had thousands of "select" elements!)
    var newOption = document.createElement("option");
    newOption.text = currencyNames[i];
    toCurrency.add(newOption);
    }
}

// I added this extra function to add elements to the from currency select element. (There must be a better way!)
function sortCurrencySelector() {
    for (let i = 0; i< currencyNames.length; i++) {
    var newOption = document.createElement("option");
    newOption.text = currencyNames[i];
    fromCurrency.add(newOption);
    }
}

//This is the solution I came up with to solve the .add to multiple-select-elements problem. It waits for the data promise to be solved and then creates the tables with the available currencies as well as adding them to the currency-selection lists. Function call at the end of this script (Did it this way so I could implement a button to manually update).
function updatePage() {
    getData()
    .then((data) => {
        createTableElements();
        sortCurrencySelector();
    });
}

// Display results based on rates from the API (fromRate and toRate)
function displayResults() {

    // Displays alert box when currency input is < 0. (A better solution would be to not allow negative values to be typed)
    if (userInputAmount.value < 0) {
        alert ("Please enter a valid amount. Currency values cannot be negative.");
        userInputAmount.value = "";
        return;
    }

    //Finds indexes of selected currencies, matches with their respective ratios and calculates conversion result based on (toRatio/fromRatio)*amount.
    let from = fromCurrency.value;
    let to = toCurrency.value;

    let fromIndex = currencyNames.findIndex(element => element == from);
    let toIndex = currencyNames.findIndex(element => element == to);

    let fromRatio = currencyRatios[fromIndex];
    let toRatio = currencyRatios[toIndex];

    let resultingRatio = toRatio/fromRatio;

    let convertedValue = userInputAmount.value * resultingRatio;

    result.innerHTML = convertedValue.toFixed(2);
}

// Reset input field, both selectors, result and focuses on the input field.
function resetInput() {
    result.innerHTML = "";
    fromCurrency.value = "USD";
    toCurrency.value = "USD";
    userInputAmount.value = "";
    userInputAmount.focus();
}

// Updates the page when script loads.
updatePage();