const display = document.querySelector(".calculator__display");
const queryValue = document.querySelector(".calculator__query-value");

function clickSound() {
  const sound = new Audio("./assets/click_sound.mp3");
  sound.volume = 0.1;
  sound.play();
}

function firstIsZero(value) {
  if (display.textContent === "0" && !isNaN(value) && value !== "0") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function appendToDisplay(value) {
  if (display.textContent === "Erro" || display.textContent === "Indefinite") {
    clearAll();
  }
  firstIsZero(value);
}

function clearEntry() {
  display.textContent = display.textContent.slice(0, -1);
}

function clearAll() {
  display.textContent = "";
  queryValue.textContent = "";
}

function calculate() {
  try {
    const total = Function("return " + display.textContent)();
    console.log(total);
    if (!isFinite(total)) {
      display.textContent = "Indefinite";
      return;
    }
    queryValue.textContent = `${display.textContent} = ${total}`;
    display.textContent = total;
  } catch (err) {
    display.textContent = "Erro";
  }
}

document.querySelector(".buttons").addEventListener("click", (event) => {
  const btn = event.target;
  const type = btn.dataset;

  if (!btn.classList.contains("buttons__key")) return;

  clickSound();

  if (type.number) return appendToDisplay(type.number);
  if (type.operator) return appendToDisplay(type.operator);
  if (type.decimal) return appendToDisplay(type.decimal);
  if (type.action === "clear-entry") return clearEntry();
  if (type.action === "clear") return clearAll();
  if (type.equal) return calculate();
});
