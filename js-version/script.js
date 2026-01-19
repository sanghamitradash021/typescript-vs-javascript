// js-version/script.js
// ============================================================
// JAVASCRIPT VERSION - Errors only visible at RUNTIME (Console)
// Open Developer Tools (F12) > Console tab to see the errors
// ============================================================

console.log("=".repeat(60));
console.log("JAVASCRIPT VERSION LOADED");
console.log("Errors will appear HERE in the console at RUNTIME");
console.log("=".repeat(60));

const form = document.getElementById('dataForm');
const dataTableBody = document.querySelector('#dataTable tbody');

// No type checking - submittedData can hold anything
let submittedData = [];

// ============================================================
// ERROR 1: Type Coercion Bug - String + Number
// JavaScript has NO WAY to catch this before runtime!
// ============================================================
function calculateTotal(price, quantity) {
  return price + quantity;
}

// This bug silently produces wrong results - no error shown!
const result = calculateTotal("100", 5);  // Returns "1005" instead of 105
console.log("ERROR 1 - Type Coercion Bug:");
console.log("  calculateTotal('100', 5) =", result);
console.log("  Expected: 105, Got: '1005' (string concatenation!)");
console.log("");

// ============================================================
// ERROR 2: Accessing property on null/undefined
// JavaScript only crashes at RUNTIME when this line executes
// ============================================================
function getUserEmail(user) {
  return user.email;  // Will crash if user is null/undefined
}

console.log("ERROR 2 - Null/Undefined Access:");
try {
  const email = getUserEmail(null);
  console.log("  User email:", email);
} catch (e) {
  console.error("  RUNTIME ERROR:", e.message);
  console.log("  This error was NOT caught until the code ran!");
}
console.log("");

// ============================================================
// ERROR 3: Misspelled property name
// JavaScript has no way to know 'emial' is wrong until runtime
// ============================================================
const userProfile = {
  name: "John",
  email: "john@example.com",
  age: 30
};

console.log("ERROR 3 - Misspelled Property:");
console.log("  userProfile.emial =", userProfile.emial);  // undefined - typo!
console.log("  Expected: 'john@example.com', Got: undefined (typo: 'emial' vs 'email')");
console.log("");

// ============================================================
// ERROR 4: Wrong number of arguments
// JavaScript silently ignores extra/missing arguments
// ============================================================
function greetUser(firstName, lastName) {
  return `Hello, ${firstName} ${lastName}!`;
}

console.log("ERROR 4 - Wrong Number of Arguments:");
console.log("  greetUser('Alice') =", greetUser("Alice"));  // Missing lastName
console.log("  Expected: 'Hello, Alice Smith!', Got: 'Hello, Alice undefined!'");
console.log("");

// ============================================================
// ERROR 5: Calling a method that doesn't exist
// ============================================================
console.log("ERROR 5 - Non-existent Method:");
try {
  const numbers = [1, 2, 3];
  numbers.flattern();  // Typo: should be 'flat', not 'flattern'
} catch (e) {
  console.error("  RUNTIME ERROR:", e.message);
  console.log("  Method 'flattern' doesn't exist - only discovered at runtime!");
}
console.log("");

console.log("=".repeat(60));
console.log("ALL ABOVE ERRORS COULD HAVE BEEN CAUGHT BY TYPESCRIPT!");
console.log("=".repeat(60));

// Form handling 
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');

  const name = nameInput.value;
  const age = ageInput.value;  // Still a string! But JS doesn't warn us

  submittedData.push({ name: name, age: age });
  renderTable();

  nameInput.value = '';
  ageInput.value = '';
});

function renderTable() {
  dataTableBody.innerHTML = '';
  submittedData.forEach(data => {
    const row = dataTableBody.insertRow();
    const nameCell = row.insertCell();
    const ageCell = row.insertCell();
    const typeCell = row.insertCell();

    nameCell.textContent = data.name;
    ageCell.textContent = data.age;
    typeCell.textContent = typeof data.age;  // Shows "string" - a bug!
    typeCell.style.color = typeof data.age === 'string' ? '#ff6b6b' : '#69db7c';
  });
}

renderTable();