// The TypeScript is transpiled into minified and bundled JavaScript (configure in psst-config.js)

// You can use the ES6 import syntax
import factorial from './factorial';

// Once again, just an example
for (let i = 0; i < 30; ++i) {
  console.log(factorial(i));
}

// If you want other files to be bundled as a separate file, include them in the psst-config.js file
