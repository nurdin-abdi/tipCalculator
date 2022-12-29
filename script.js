const bill = document.querySelector("#bill-input");
const people = document.querySelector("#no-of-people");
const tips = document.querySelectorAll(".tips");
const tipPerPerson = document.querySelector(".tip-amount");
const totalPerPerson = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset-btn");
const tipCustom = document.querySelector(".btncustom");

bill.addEventListener("input", billInputFun);
people.addEventListener("input", peopleInputFun);
tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
resetBtn.addEventListener("click", reset);
tipCustom.addEventListener("input", tipInputFun);

bill.value = "0.0";
people.value = "1";
tipPerPerson.innerHTML = "KSh" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "KSh" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
  billValue = parseFloat(bill.value);
  calculateTip();
}

function tipInputFun() {
  tipValue = parseFloat(tipCustom.value / 100);

  tips.forEach(function (val) {
    val.classList.remove("active-tip");
  });
  calculateTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(people.value);

  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "thick solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calculateTip();
  }
}

function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    tipPerPerson.innerHTML = "KSh" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "KSh" + total.toFixed(2);
  }
}

function reset() {
  bill.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tipCustom.value = "";
}