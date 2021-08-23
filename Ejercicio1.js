const bts = document.querySelectorAll(".botones button");
const r = document.querySelector("#resultado");

for (i = 0; i < bts.length; i++) {
  bts[i].onclick = e => num(e.target.value);
}

function num(value) {
  switch (value) {
    case "=":
      result();
      break;
    case "ac":
      clear();
      break;
    default:
      calc(value);
      break;
  }
}

function calc(value) {
  if (
    (r.value === "0" && (Number.isInteger(Number(value)) || value == "-")) ||
    (r.value == Number.POSITIVE_INFINITY ||
      r.value == Number.NEGATIVE_INFINITY ||
      r.value == "NaN")
  ) {
    r.value = value;
  } else {
    if (!isValidLastNumber() && !Number.isInteger(Number(value))) return;
    else r.value += value;
  }
}

function isValidLastNumber() {
  return Number.isInteger(Number(r.value[r.value.length - 1]));
}
function result() {
  if (isValidLastNumber()) r.value = new Function("return " + r.value)();
}
function clear() {
  document.querySelector("#resultado").value = 0;
}
