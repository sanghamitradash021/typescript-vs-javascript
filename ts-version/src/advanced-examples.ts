// ts-version/src/advanced-examples.ts
// ============================================================
// ADVANCED TYPESCRIPT FEATURES
// These examples show powerful TypeScript features that have
// no equivalent in JavaScript
// ============================================================

// ============================================================
// 1. GENERICS - Reusable Type-Safe Functions
// ============================================================

// Generic function that works with any type while preserving type safety
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript infers the return type automatically
const firstNumber = firstElement([1, 2, 3]);        // type: number | undefined
const firstString = firstElement(["a", "b", "c"]);  // type: string | undefined

// Generic function with constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello");     // Works - strings have length
logLength([1, 2, 3]);   // Works - arrays have length
// logLength(123);      // Error! Numbers don't have length property


// ============================================================
// 2. ENUMS - Named Constants
// ============================================================

enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

interface Order {
  id: number;
  customerName: string;
  status: OrderStatus;
  total: number;
}

function getOrderStatusMessage(order: Order): string {
  switch (order.status) {
    case OrderStatus.Pending:
      return "Your order is waiting to be processed";
    case OrderStatus.Processing:
      return "Your order is being prepared";
    case OrderStatus.Shipped:
      return "Your order is on the way!";
    case OrderStatus.Delivered:
      return "Your order has been delivered";
    case OrderStatus.Cancelled:
      return "Your order was cancelled";
    // TypeScript will warn if you miss a case!
  }
}

const myOrder: Order = {
  id: 1001,
  customerName: "Alice",
  status: OrderStatus.Shipped,
  total: 59.99
};

console.log(getOrderStatusMessage(myOrder));


// ============================================================
// 3. DISCRIMINATED UNIONS - Type-Safe State Handling
// ============================================================

// API Response that can be success or error
type ApiResponse<T> =
  | { success: true; data: T; timestamp: Date }
  | { success: false; error: string; code: number };

interface User {
  id: number;
  name: string;
  email: string;
}

function handleUserResponse(response: ApiResponse<User>): void {
  if (response.success) {
    // TypeScript KNOWS data exists here
    console.log(`Welcome, ${response.data.name}!`);
    console.log(`Email: ${response.data.email}`);
    console.log(`Fetched at: ${response.timestamp}`);
  } else {
    // TypeScript KNOWS error and code exist here
    console.error(`Error ${response.code}: ${response.error}`);
  }
}

// Success case
const successResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Alice", email: "alice@example.com" },
  timestamp: new Date()
};

// Error case
const errorResponse: ApiResponse<User> = {
  success: false,
  error: "User not found",
  code: 404
};

handleUserResponse(successResponse);
handleUserResponse(errorResponse);


// ============================================================
// 4. TYPE GUARDS - Runtime Type Checking
// ============================================================

interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

type Pet = Cat | Dog;

function makeSound(pet: Pet): void {
  if (pet.type === "cat") {
    pet.meow();  // TypeScript knows this is a Cat
  } else {
    pet.bark();  // TypeScript knows this is a Dog
  }
}


// ============================================================
// 5. UTILITY TYPES - Built-in Type Transformations
// ============================================================

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Partial - all properties become optional
type UpdateUserInput = Partial<FullUser>;

// Pick - select specific properties
type PublicUser = Pick<FullUser, "id" | "name" | "email">;

// Omit - exclude specific properties
type UserWithoutPassword = Omit<FullUser, "password">;

// Readonly - all properties become readonly
type ImmutableUser = Readonly<FullUser>;

// These are incredibly useful for API design
function updateUser(id: number, updates: UpdateUserInput): void {
  // Can update any combination of fields
  console.log(`Updating user ${id}:`, updates);
}

function displayUser(user: PublicUser): void {
  // Only has access to public fields - no password!
  console.log(`${user.name} (${user.email})`);
}


// ============================================================
// 6. ASYNC/AWAIT WITH TYPES
// ============================================================

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Type-safe async function
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json();
  return posts;
}

// Using the typed async function
async function displayPosts(): Promise<void> {
  const posts = await fetchPosts();

  // TypeScript knows posts is Post[] - full autocomplete!
  posts.forEach(post => {
    console.log(`${post.id}: ${post.title}`);
  });
}


// ============================================================
// 7. CLASS WITH STRICT TYPING
// ============================================================

interface IRepository<T> {
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(item: Omit<T, "id">): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
}

class UserRepository implements IRepository<User> {
  private users: User[] = [];

  async getById(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(item: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...item
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, item: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");

    this.users[index] = { ...this.users[index], ...item };
    return this.users[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}


// ============================================================
// 8. MAPPED TYPES - Transform Object Types
// ============================================================

type Flags<T> = {
  [K in keyof T]: boolean;
};

interface Features {
  darkMode: any;
  notifications: any;
  analytics: any;
}

// Creates: { darkMode: boolean; notifications: boolean; analytics: boolean }
type FeatureFlags = Flags<Features>;

const userFeatures: FeatureFlags = {
  darkMode: true,
  notifications: false,
  analytics: true
};


// ============================================================
// SUMMARY:
// These advanced TypeScript features provide:
// - Reusable, type-safe code with Generics
// - Clear, named constants with Enums
// - Safe state handling with Discriminated Unions
// - Runtime type narrowing with Type Guards
// - Flexible type manipulation with Utility Types
// - Full async/await type safety
// - Object-oriented patterns with typed Classes
// - Powerful type transformations with Mapped Types
//
// None of these safety features exist in JavaScript!
// ============================================================

export {
  firstElement,
  OrderStatus,
  UserRepository,
  type ApiResponse,
  type User,
  type Order,
  type PublicUser
};
