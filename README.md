# TypeScript vs JavaScript Demo

An interactive demonstration showing the practical differences between TypeScript and JavaScript - specifically how TypeScript catches bugs at compile time that JavaScript only reveals at runtime.

## Quick Start

```bash
# Install dependencies
npm install

# Run the main comparison page
npm run dev

# Or run individual versions:
npm run dev-js   # JavaScript version only
npm run dev-ts   # TypeScript version only
```

Then open `http://localhost:5173` in your browser.

## What This Demo Shows

### The Core Difference

| JavaScript | TypeScript |
|------------|------------|
| Errors appear at **runtime** | Errors appear at **compile time** |
| Bugs discovered when code runs | Bugs discovered while writing code |
| No type checking | Full static type analysis |
| Silent failures common | Explicit error messages |

### Error Examples Demonstrated

**Basic Errors (5 types):**
1. **Type Coercion** - `"100" + 5` returns `"1005"` instead of `105`
2. **Null/Undefined Access** - Crashes when accessing properties on null
3. **Misspelled Properties** - `user.emial` silently returns `undefined`
4. **Missing Arguments** - `greetUser("Alice")` shows `"Hello, Alice undefined!"`
5. **Non-existent Methods** - `array.flattern()` crashes at runtime

**Advanced Problems (10 types):**
- No generic type safety
- Magic strings instead of enums
- No discriminated union safety
- Missing type guards
- No utility type protection
- Async/await type confusion
- No interface enforcement
- Object shape not validated
- Array method callback confusion
- Deep property access failures

### TypeScript Features Showcased

- Static type annotations
- Interfaces and type aliases
- Union types and null safety
- Generics
- Enums
- Discriminated unions
- Utility types (`Partial`, `Pick`, `Omit`, `Readonly`)
- Type guards
- Async/await with proper typing
- Mapped types

## Project Structure

```
typescript-vs-javascript-demo/
├── index.html                  # Main comparison landing page
├── package.json
├── vite.config.js              # Vite config for JS version
├── vite.config.ts              # Vite config for TS version
├── js-version/                 # Pure JavaScript examples
│   ├── index.html              # JS demo page
│   ├── script.js               # Basic JS errors
│   ├── advanced-problems.js    # Advanced JS problems
│   └── style.css
└── ts-version/                 # TypeScript examples
    ├── index.html              # TS demo page
    ├── style.css
    ├── tsconfig.json
    └── src/
        ├── script.ts           # Working TS code
        ├── errors-demo.ts      # Intentional errors (for IDE demo)
        └── advanced-examples.ts # Advanced TS features
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the main comparison page |
| `npm run dev-js` | Start JavaScript version only |
| `npm run dev-ts` | Start TypeScript version only |
| `npm run check-ts` | Run TypeScript compiler check |
| `npm run check-errors-demo` | See compile errors in errors-demo.ts |
| `npm run build` | Build for production |

## How to See TypeScript Errors

1. **In VS Code**: Open `ts-version/src/errors-demo.ts` - you'll see red squiggly lines under the errors. Hover to see error messages.

2. **In Terminal**: Run `npm run check-errors-demo` to see compiler output.

## Learning Path

1. **Start with the landing page** (`npm run dev`) - Overview of differences
2. **Open the JavaScript demo** - Press F12 to see console errors
3. **Open the TypeScript demo** - Notice the clean console
4. **Open `errors-demo.ts` in VS Code** - See compile-time error detection
5. **Explore `advanced-examples.ts`** - Learn advanced TypeScript features

## Key Takeaways

- **JavaScript**: Flexible but error-prone. Bugs hide until runtime.
- **TypeScript**: Strict but safe. Bugs caught during development.
- **When to use TypeScript**: Large projects, team collaboration, complex logic
- **When JavaScript is fine**: Small scripts, quick prototypes, learning basics

## Tech Stack

- [Vite](https://vitejs.dev/) - Fast build tool
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- Vanilla JS/TS - No frameworks, pure language comparison

## License

MIT
