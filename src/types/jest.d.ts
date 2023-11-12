/// <reference types="jest" />

import { type A11yTreeMatchers } from './matchers';

declare global {
  namespace jest {
    interface Matchers<R = void>
      extends A11yTreeMatchers<ReturnType<typeof expect.stringContaining>, R> {}
  }
}
