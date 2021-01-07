const data = {
  USD: {
    EUR: 0.82,
    GBP: 0.74,
    TRY: 7.64
  },
  EUR: {
    USD: 1.23,
    GBP: 0.91,
    TRY: 9.32
  },
  GBP: {
    USD: 1.35,
    EUR: 1.10,
    TRY: 10.27
  },
  TRY: {
    USD: 0.13,
    EUR: 0.11,
    GBP: 0.097
  }
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);
// selecting "from and to" buttons to check if they are clicked:
const fromTargetButtons = document.querySelectorAll("input[name='currency_from']");
const toTargetButtons = document.querySelectorAll("input[name='currency_to']");

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function() {
  const isFromTargetSelected = checkButtons(fromTargetButtons);
  const isToTargetSelected = checkButtons(toTargetButtons);

  const currencyResult = document.querySelector("#currency-result"); // where the result will be written to.
  if (isFromTargetSelected && isToTargetSelected) {
    // kimden ceviriyourz
    const fromTarget = document.querySelector("input[name='currency_from']:checked").value;
    // kime ceviriyoruz
    const toTarget = document.querySelector("input[name='currency_to']:checked").value;
    // amountu alalim
    const amount = document.querySelector("input[name='amount']").value;
    // check if the currencies are the same:
    if (fromTarget === toTarget) {
      currencyResult.innerHTML = "Please select different currencies."
      currencyResult.classList.add("warning");
      return false;
    }
    //  Amount must be a number:
    if (isNaN(amount)) {

      currencyResult.innerHTML = "Please enter a valid amount!"
      currencyResult.classList.add("warning");
      return false;
    }
    //Calculate the result and display it:
    const currentCurrencyObject = data[fromTarget];
    const resultForOne = currentCurrencyObject[toTarget];
    const result = amount * resultForOne;
    const fixedResult = result.toFixed(2);
    currencyResult.classList.remove("warning");
    currencyResult.innerHTML = amount + " " + fromTarget + " = " + fixedResult + " " + toTarget;
  } else if (!isFromTargetSelected) {
    currencyResult.innerHTML = "Please select a currency to exchange from.";
    currencyResult.classList.add("warning");
  } else if (!isToTargetSelected) {
    currencyResult.innerHTML = "Please select a currency to exchange to.";
    currencyResult.classList.add("warning");
  }

});

// function to check if at least one of the buttons is selected.
function checkButtons(buttons) {
  return [...buttons].some(button => button.checked);
}
