function appendNumber(number) {
  const display = document.getElementById("display");
  display.value += number;
}

function appendOperator(operator) {
  const display = document.getElementById("display");
  const lastChar = display.value.slice(-1);

  // Mencegah dua operator berturut-turut
  if (["+", "-", "*", "/"].includes(lastChar)) return;
  display.value += operator;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById("display");
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}
