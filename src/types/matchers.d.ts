import type { A11yTreeNodeMatch, A11yTreeNodeContext } from './types';

type MatcherOptions = A11yTreeNodeContext;

type PruneOptions = {
  containerNodes?: string[] | ((element: HTMLElement) => boolean);
};

// Custom matcher result type
interface MatcherResult {
  message: () => string;
  pass: boolean;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * @description
       * Asserts that the accessibility tree for an element matches the expected structure.
       * An accessibility tree represents how a user agent (such as a screen reader) processes and communicates
       * accessibility information from the DOM. Use this matcher to check whether the pertinent accessibility
       * properties and relationships are correctly established, ensuring an accessible experience for users
       * of assistive technologies.
       *
       * The expected structure is defined by the `A11yTreeNodeMatch` interface, which can accommodate various
       * properties like role, name, description, state, and children.
       *
       * The second parameter allows for optional configuration settings
       *
       * @example
       * // Example with byRole hierarchy:
       * <nav aria-label="Main navigation">
       *   <ul>
       *     <li><a href="/home">Home</a></li>
       *     <li><a href="/about">About</a></li>
       *   </ul>
       *   <button disabled>Click me</button>
       * </nav>
       *
       * expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveA11yTree(
       *   byRole('navigation', [
       *     byRole('list', [
       *       byRole('listitem', [
       *         byRole('link', { name: 'Home' }),
       *       ]),
       *       byRole('listitem', [
       *         byRole('link', { name: 'About' }),
       *       ]),
       *     ]),
       *     byRole('button', { name: 'Click me', disabled: true }),
       *   ])
       * );
       *
       * @see
       * - [W3C Accessibility Tree](https://www.w3.org/TR/wai-aria/#accessibility_tree)
       * - [ARIA in HTML](https://www.w3.org/TR/html-aria/)
       */
      toHaveA11yTree(match?: A11yTreeNodeMatch, options?: MatcherOptions): R;
    }
  }
}

export { MatcherOptions }; // Required if in a module to modify the global scope
