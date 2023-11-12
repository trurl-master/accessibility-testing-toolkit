import { A11yTreeNodeMatch } from './types';

// Custom matcher result type
interface MatcherResult {
  message: () => string;
  pass: boolean;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveA11yTree(match?: A11yTreeNodeMatch): R;
    }
  }
}

export {}; // Required if in a module to modify the global scope

// import { A11yTreeNodeMatch } from './types';

// declare namespace matchers {
//   interface A11yTreeMatchers<E, R> {
//     /**
//      * @description
//      * This allows to assert that an element has the expected [accessible name](https://w3c.github.io/accname/).
//      * It is useful, for instance, to assert that form elements and buttons are properly labelled.
//      *
//      * You can pass the exact string of the expected accessible name, or you can make a
//      * partial match passing a regular expression, or by using either
//      * [expect.stringContaining](https://jestjs.io/docs/en/expect.html#expectnotstringcontainingstring)
//      * or [expect.stringMatching](https://jestjs.io/docs/en/expect.html#expectstringmatchingstring-regexp).
//      * @example
//      * <img data-testid="img-alt" src="" alt="Test alt" />
//      * <img data-testid="img-empty-alt" src="" alt="" />
//      * <svg data-testid="svg-title"><title>Test title</title></svg>
//      * <button data-testid="button-img-alt"><img src="" alt="Test" /></button>
//      * <p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
//      * <button data-testid="svg-button"><svg><title>Test</title></svg></p>
//      * <div><svg data-testid="svg-without-title"></svg></div>
//      * <input data-testid="input-title" title="test" />
//      *
//      * expect(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
//      * expect(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
//      * expect(getByTestId('svg-title')).toHaveAccessibleName('Test title')
//      * expect(getByTestId('button-img-alt')).toHaveAccessibleName()
//      * expect(getByTestId('img-paragraph')).not.toHaveAccessibleName()
//      * expect(getByTestId('svg-button')).toHaveAccessibleName()
//      * expect(getByTestId('svg-without-title')).not.toHaveAccessibleName()
//      * expect(getByTestId('input-title')).toHaveAccessibleName()
//      * @see
//      * [testing-library/jest-dom#tohaveaccessiblename](https://github.com/testing-library/jest-dom#tohaveaccessiblename)
//      */
//     toHaveA11yTree(match?: A11yTreeNodeMatch): R;
//   }
// }

// // Needs to extend Record<string, any> to be accepted by expect.extend()
// // as it requires a string index signature.
// declare const matchers: matchers.A11yTreeMatchers<never, void> &
//   Record<string, any>;
// export = matchers;
