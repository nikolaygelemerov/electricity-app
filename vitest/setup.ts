import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Extends Vitest expect method with methods from react-testing-library
expect.extend(matchers);

// Clears the JSDom after each "it" statement
afterEach(() => {
  cleanup();
});
