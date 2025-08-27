import '@testing-library/jest-dom';
// import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers); // Extend Vitest's expect with Jest-DOM matchers

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});
