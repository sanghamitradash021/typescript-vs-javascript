// js-version/advanced-problems.js
// ============================================================
// ADVANCED JAVASCRIPT PROBLEMS
// These examples show real-world bugs that JavaScript can't
// catch but TypeScript would prevent
// ============================================================

console.log("");
console.log("=".repeat(60));
console.log("ADVANCED JAVASCRIPT PROBLEMS");
console.log("These bugs are silent and dangerous!");
console.log("=".repeat(60));
console.log("");

// ============================================================
// PROBLEM 1: No Generic Type Safety
// ============================================================
console.log("PROBLEM 1: No Generic Safety");

function firstElement(arr) {
  return arr[0];
}

// These all "work" but you have no idea what type you get back
const first1 = firstElement([1, 2, 3]);        // number? string? object?
const first2 = firstElement(["a", "b", "c"]);
const first3 = firstElement([{id: 1}, {id: 2}]);
const first4 = firstElement("not an array");   // This even "works"! Returns "n"
const first5 = firstElement(null);             // Crashes!

console.log("  firstElement([1,2,3]) =", first1);
console.log("  firstElement('not an array') =", first4, "(unexpected!)");
console.log("  No way to know what type is returned!");
console.log("");


// ============================================================
// PROBLEM 2: No Enums - Using Magic Strings
// ============================================================
console.log("PROBLEM 2: Magic Strings Instead of Enums");

const order = {
  id: 1001,
  customerName: "Alice",
  status: "shiped",  // Typo! Should be "shipped"
  total: 59.99
};

function getOrderStatusMessage(order) {
  switch (order.status) {
    case "pending":
      return "Your order is waiting to be processed";
    case "processing":
      return "Your order is being prepared";
    case "shipped":  // Correct spelling
      return "Your order is on the way!";
    case "delivered":
      return "Your order has been delivered";
    case "cancelled":
      return "Your order was cancelled";
    default:
      return "Unknown status";  // Typo falls here silently!
  }
}

console.log("  Order status:", order.status);
console.log("  Message:", getOrderStatusMessage(order));
console.log("  Bug! 'shiped' typo not caught, shows 'Unknown status'");
console.log("");


// ============================================================
// PROBLEM 3: No Discriminated Union Safety
// ============================================================
console.log("PROBLEM 3: No Union Type Safety");

// API response could be success or error
function handleUserResponse(response) {
  // In JS, we might forget to check success first
  console.log("  Welcome, " + response.data.name + "!");  // Crashes on error!
}

const errorResponse = {
  success: false,
  error: "User not found",
  code: 404
};

console.log("  Attempting to handle error response...");
try {
  handleUserResponse(errorResponse);
} catch (e) {
  console.log("  RUNTIME CRASH:", e.message);
  console.log("  TypeScript would force us to check 'success' first!");
}
console.log("");


// ============================================================
// PROBLEM 4: No Type Guards
// ============================================================
console.log("PROBLEM 4: No Type Guard Safety");

function makeSound(pet) {
  // In JS, we might call the wrong method
  pet.bark();  // What if it's a cat?
}

const cat = {
  type: "cat",
  meow: () => console.log("Meow!")
};

console.log("  Attempting to make cat bark...");
try {
  makeSound(cat);
} catch (e) {
  console.log("  RUNTIME CRASH:", e.message);
  console.log("  TypeScript would catch this at compile time!");
}
console.log("");


// ============================================================
// PROBLEM 5: No Utility Type Safety
// ============================================================
console.log("PROBLEM 5: No Property Access Safety");

const fullUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password: "secret123",  // Sensitive!
  createdAt: new Date()
};

// In JS, nothing prevents us from exposing the password
function displayUser(user) {
  // Accidentally exposing sensitive data!
  console.log("  User:", JSON.stringify(user));
}

displayUser(fullUser);  // Oops! Password is visible!
console.log("  Bug! Password was exposed - TypeScript's Omit<> would prevent this");
console.log("");


// ============================================================
// PROBLEM 6: Async Type Confusion
// ============================================================
console.log("PROBLEM 6: Async Return Type Confusion");

async function fetchData() {
  // Simulating API response
  return { data: { items: [1, 2, 3] } };
}

// Common mistake: forgetting await or accessing wrong property
async function processData() {
  const result = fetchData();  // Forgot await!
  console.log("  Result without await:", result);
  console.log("  It's a Promise, not the actual data!");

  // This would crash or return undefined
  // console.log(result.data.items);  // undefined!
}

processData();
console.log("");


// ============================================================
// PROBLEM 7: Interface Implementation Not Enforced
// ============================================================
console.log("PROBLEM 7: No Interface Enforcement");

// Supposed to have getById, getAll, create, update, delete
const userRepository = {
  getById: (id) => ({ id, name: "User" }),
  getAll: () => [],
  // Forgot to implement: create, update, delete!
};

function saveUser(repo, userData) {
  return repo.create(userData);  // create doesn't exist!
}

console.log("  Attempting to create user...");
try {
  saveUser(userRepository, { name: "Bob" });
} catch (e) {
  console.log("  RUNTIME CRASH:", e.message);
  console.log("  TypeScript's 'implements' would catch missing methods!");
}
console.log("");


// ============================================================
// PROBLEM 8: Object Shape Not Validated
// ============================================================
console.log("PROBLEM 8: Object Shape Not Validated");

function createProduct(product) {
  // Expecting: id, name, price
  console.log("  Created:", product.name, "for $" + product.price.toFixed(2));
}

// Missing price - but JS doesn't warn us!
const badProduct = {
  id: 1,
  name: "Laptop"
  // No price!
};

console.log("  Attempting to create product without price...");
try {
  createProduct(badProduct);
} catch (e) {
  console.log("  RUNTIME CRASH:", e.message);
  console.log("  TypeScript would require all properties!");
}
console.log("");


// ============================================================
// PROBLEM 9: Array Method Type Safety
// ============================================================
console.log("PROBLEM 9: Array Method Type Confusion");

const numbers = [1, 2, 3, 4, 5];

// Easy to pass wrong callback signature
const doubled = numbers.map((n, i, arr) => {
  // Accidentally using index instead of value
  return i * 2;  // Returns [0, 2, 4, 6, 8] not [2, 4, 6, 8, 10]!
});

console.log("  Original:", numbers);
console.log("  'Doubled':", doubled, "(wrong - used index!)");
console.log("  Expected: [2, 4, 6, 8, 10]");
console.log("");


// ============================================================
// PROBLEM 10: Optional Chaining False Confidence
// ============================================================
console.log("PROBLEM 10: Deep Property Access");

const config = {
  database: {
    // host is missing!
    port: 5432
  }
};

// This silently returns undefined instead of erroring
const host = config.database.host;
const connectionString = `postgres://${host}:${config.database.port}`;

console.log("  Connection string:", connectionString);
console.log("  Bug! Host is undefined but no error thrown");
console.log("  TypeScript would require host to be defined");
console.log("");


console.log("=".repeat(60));
console.log("ALL 10 PROBLEMS ABOVE WOULD BE CAUGHT BY TYPESCRIPT!");
console.log("=".repeat(60));
