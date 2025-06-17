const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

// Populate currency dropdowns
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CNY", "BRL", "ZAR"];
currencies.forEach(currency => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.text = option2.text = currency;
  fromCurrency.add(option1);
  toCurrency.add(option2);
});

// Set default values
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Function to convert currency
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (amount === "" || isNaN(amount)) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.innerText = "Error fetching exchange rate.";
    console.error("Error:", error);
  }
}
