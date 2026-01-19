// ts-version/src/script.ts
// ============================================================
// TYPESCRIPT VERSION - This code COMPILES and RUNS correctly
// because all type errors have been fixed.
//
// See 'errors-demo.ts' for examples of errors that TypeScript
// catches at compile time (with red squiggly lines in IDE).
// ============================================================

console.log("=".repeat(60));
console.log("TYPESCRIPT VERSION LOADED");
console.log("This code compiles WITHOUT errors because types are correct!");
console.log("Open 'errors-demo.ts' to see compile-time errors in the IDE.");
console.log("=".repeat(60));

// Type definition - TypeScript knows exactly what shape our data has
interface FormDataEntry {
  name: string;
  age: number;  // age is guaranteed to be a number, not a string!
}

const form = document.getElementById('dataForm') as HTMLFormElement;
const dataTableBody = document.querySelector('#dataTable tbody') as HTMLTableSectionElement;

// Type-safe array - can only hold FormDataEntry objects
let submittedData: FormDataEntry[] = [];

// ============================================================
// CORRECT VERSION of functions from errors-demo.ts
// ============================================================

// Type-safe function - only accepts numbers
function calculateTotal(price: number, quantity: number): number {
  return price + quantity;  // Always returns a number
}
console.log("calculateTotal(100, 5) =", calculateTotal(100, 5));  // Returns 105 (correct!)

// Type-safe function with proper null handling
interface User {
  email: string;
  name: string;
}

function getUserEmail(user: User | null): string {
  if (user === null) {
    return "No user provided";
  }
  return user.email;
}
console.log("getUserEmail(null) =", getUserEmail(null));  // Handled safely!

// Type-safe object access
interface UserProfile {
  name: string;
  email: string;
  age: number;
}

const userProfile: UserProfile = {
  name: "John",
  email: "john@example.com",
  age: 30
};
console.log("userProfile.email =", userProfile.email);  // 'email' not 'emial' - IDE autocompletes!

// Type-safe function with required arguments
function greetUser(firstName: string, lastName: string): string {
  return `Hello, ${firstName} ${lastName}!`;
}
console.log("greetUser('Alice', 'Smith') =", greetUser("Alice", "Smith"));  // Both args required!

console.log("");
console.log("All the above code compiles and runs correctly.");
console.log("TypeScript prevented the bugs that exist in the JS version!");
console.log("=".repeat(60));

// Form handling with full type safety
form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name') as HTMLInputElement;
  const ageInput = document.getElementById('age') as HTMLInputElement;

  const name: string = nameInput.value;
  const age: number = parseInt(ageInput.value, 10);  // Explicitly convert to number

  if (isNaN(age)) {
    alert("Please enter a valid age.");
    return;
  }

  // Type-checked: this object MUST have 'name' (string) and 'age' (number)
  const newData: FormDataEntry = { name, age };
  submittedData.push(newData);

  renderTable();

  nameInput.value = '';
  ageInput.value = '';
});

function renderTable(): void {
  dataTableBody.innerHTML = '';
  submittedData.forEach((data: FormDataEntry) => {
    const row = dataTableBody.insertRow();
    const nameCell = row.insertCell();
    const ageCell = row.insertCell();
    const typeCell = row.insertCell();

    nameCell.textContent = data.name;
    ageCell.textContent = data.age.toString();
    typeCell.textContent = typeof data.age;  // Shows "number" - correct!
    typeCell.style.color = typeof data.age === 'number' ? '#51cf66' : '#ff6b6b';
  });
}

renderTable();
