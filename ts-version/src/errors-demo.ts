

// ============================================================
// ERROR 1: Type Coercion Bug - String + Number
// TypeScript catches this IMMEDIATELY - see the red line below!
// ============================================================
function calculateTotalDemo(price: number, quantity: number): number {
  return price + quantity;
}

// TypeScript ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
const resultDemo = calculateTotalDemo("100", 5);
//                                  


// ============================================================
// ERROR 2: Accessing property on null/undefined
// TypeScript catches this IMMEDIATELY!
// ============================================================
interface UserDemo {
  email: string;
  name: string;
}

function getUserEmailDemo(user: UserDemo): string {
  return user.email;
}

// TypeScript ERROR: Argument of type 'null' is not assignable to parameter of type 'UserDemo'
const emailDemo = getUserEmailDemo(null);
//                                 ^^^^ RED SQUIGGLY LINE HERE!


// ============================================================
// ERROR 3: Misspelled property name
// TypeScript catches this IMMEDIATELY!
// ============================================================
interface UserProfileDemo {
  name: string;
  email: string;
  age: number;
}

const userProfileDemo: UserProfileDemo = {
  name: "John",
  email: "john@example.com",
  age: 30
};

// TypeScript ERROR: Property 'emial' does not exist on type 'UserProfileDemo'. Did you mean 'email'?
console.log(userProfileDemo.emial);
//                          


// ============================================================
// ERROR 4: Wrong number of arguments
// TypeScript catches this IMMEDIATELY!
// ============================================================
function greetUserDemo(firstName: string, lastName: string): string {
  return `Hello, ${firstName} ${lastName}!`;
}

// TypeScript ERROR: Expected 2 arguments, but got 1
const greetingDemo = greetUserDemo("Alice");
//                 


// ============================================================
// ERROR 5: Calling a method that doesn't exist
// TypeScript catches this IMMEDIATELY!
// ============================================================
const numbers: number[] = [1, 2, 3];

// TypeScript ERROR: Property 'flattern' does not exist on type 'number[]'. Did you mean 'flat'?
numbers.flattern();
//      


// ============================================================
// BONUS ERROR 6: Assigning wrong type to a variable
// ============================================================
let age: number = 25;

// TypeScript ERROR: Type 'string' is not assignable to type 'number'
age = "twenty-five";


// ============================================================
// BONUS ERROR 7: Missing required property in object
// ============================================================
interface Product {
  id: number;
  name: string;
  price: number;
}

// TypeScript ERROR: Property 'price' is missing in type '{ id: number; name: string; }'
const product: Product = {
  id: 1,
  name: "Laptop"
  // Missing 'price' - TypeScript catches this!
};


// ============================================================
// SUMMARY:
// All 7 errors above are caught by TypeScript BEFORE you run
// the code. In JavaScript, you would only discover these
// errors when the code executes (some silently produce wrong
// results, others crash at runtime).
//
// This is why TypeScript is preferred for larger projects:
// - Catch bugs during development, not in production
// - Better IDE support (autocomplete, refactoring)
// - Self-documenting code through types
// ============================================================
