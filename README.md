# accessibility-testing-toolkit

## Installation

### Installing with npm

To install the package in your project, run the following command in your terminal:

```bash
npm install --save-dev accessibility-testing-toolkit
```

This will add the toolkit to your project's devDependencies in your package.json file.

### Installing with Yarn

If you prefer to use Yarn, you can install the toolkit by running:

```bash
yarn add --dev accessibility-testing-toolkit
```

This will achieve the same result as using npm but with Yarn's package management system.

## Usage

Import `accessibility-testing-toolkit` in your project once. The best place is to do it in your test setup file:

```js
// In your own jest-setup.js
import 'accessibility-testing-toolkit';

// In jest.config.js add
setupFilesAfterEnv: ['<rootDir>/jest-setup.js'];
```

## Custom matchers

### `toHaveA11yTree`

#### Description

The `toHaveA11yTree` matcher allows you to assert that a given HTML element's accessibility tree conforms to the expected structure. This powerful tool helps ensure that elements are presented correctly to assistive technologies, verifying that roles, states, and properties are set as intended.

Accessible names, descriptions, and hierarchies can be validated against predefined expectations, making this matcher an essential part of accessibility testing for web applications.

#### Syntax

```js
expect(elementOrTree).toHaveA11yTree(expectedAccessibilityStructure, options?);
```

#### Parameters

- `elementOrTree`: The `HTMLElement` to test or an `A11yTreeNode` object representing the accessibility tree (e.g., the output of `getAccessibilityTree`).
- `expectedAccessibilityStructure`: An object that represents the expected accessibility tree.
- `options` (optional): An object to configure the matching behavior.
- `options.isNonLandmarkSubtree` (optional): A boolean that indicates whether the element is a non-landmark subtree. This is used to determine which roles to apply to `<header>` and `<footer>` elements. If manually set to `true`, the tree will be treated as a non-landmark, and the role will be set to `HeaderAsNonLandmark` or `FooterAsNonLandmark` instead of `banner` or `contentinfo`. By default (`false`), the appropriate role will be inferred from the tree structure.

The `toHaveA11yTree` matcher provides a clean and descriptive way to assert that an element's accessibility tree matches an expected structure. This allows developers to ensure that elements are semantically correct and accessible to assistive technology users.

#### Example

This example demonstrates how to use the `toHaveA11yTree` matcher, along with the `byRole` helper, to validate an accessible dialog with a name, a description, a checkbox, a paragraph, and two buttons: "Accept" and "Cancel".

```javascript
import { byRole } from 'accessibility-testing-toolkit';

test('accessible dialog has the correct accessibility tree', () => {
  render(
    <div
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <h2 id="dialog-title">Confirmation</h2>
      <label>
        <span id="dialog-description">
          Are you sure you want to proceed with this action?
        </span>
        <input type="checkbox" />
      </label>
      <p>This cannot be undone.</p>
      <div>
        <button>Accept</button>
        <button>Cancel</button>
      </div>
    </div>
  );

  // Define the expected accessibility tree using byRole
  const expectedTree = byRole(
    'dialog',
    {
      name: 'Confirmation',
      description: 'Are you sure you want to proceed with this action?',
    },
    [
      byRole('heading', { name: 'Confirmation', level: 2 }),
      byRole('LabelText', [
        'Are you sure you want to proceed with this action?',
        byRole(
          'checkbox',
          'Are you sure you want to proceed with this action?'
        ),
      ]),
      byRole('paragraph', ['This cannot be undone.']),
      // containers are ignored
      byRole('button', 'Accept'),
      byRole('button', 'Cancel'),
    ]
  );

  // Get the dialog element using a chosen query method, such as getByRole from Testing Library
  const dialogElement = screen.getByRole('dialog');

  // Perform the assertion
  expect(dialogElement).toHaveA11yTree(expectedTree);
});
```

#### Pruning Container Nodes

Container nodes in the DOM, such as non-semantic `<div>` and `<span>` elements, can clutter the accessibility tree and obscure meaningful hierarchy in tests. The Accessibility Testing Toolkit automatically prunes these nodes, simplifying test assertions by focusing on semantically significant elements. This approach reduces test fragility against markup changes and enhances clarity, allowing developers to concentrate on the core accessibility features of their components. By ignoring container nodes, the toolkit promotes a development workflow that prioritizes user experience over structural implementation details.

### `byRole` Helper

The `byRole` helper function is a convenience utility for defining the expected structure of an accessibility tree node that corresponds to a particular element. It simplifies the creation of expected node objects by allowing the specification of roles, names, accessible descriptions, state, and child elements.

#### Syntax

The `byRole` helper can be invoked with different combinations of arguments to construct an `A11yTreeNodeMatch` object:

```ts
byRole(role, properties);
byRole(role, properties, children);
byRole(role, children);
byRole(role, name);
byRole(role, name, children);
byRole(role);
```

#### Parameters

`role`: A string representing the ARIA role of the element.
`properties`: An object containing accessible name, description, state, and queries that match custom properties.
`children`: An array of A11yTreeNodeMatch objects or text matchers that represent the expected child nodes.
`name`: A string or regular expression to match the accessible name.

The properties object includes accessible name, description, and state properties—conforming to A11yTreeNodeMatch—but omits role and children, which are handled by the helper function itself.

byRole builds an accessibility tree node object with the specified role and any additional details you need to assert against.

#### Properties

##### `name`

- Type: `TextMatcher`
- Description: The accessible name property is essential for assistive technologies to identify elements. It can be a string, number, regular expression, or a custom function to match the element's name.

##### `description`

- Type: `TextMatcher`
- Description: Provides additional descriptive text for the element, which can be matched against a string, number, regular expression, or custom function.

##### `busy`

- Type: `boolean`
- Description: Indicates whether the element, such as a region or application, is currently "busy" and may not be interacted with.

##### `checked`

- Type: `boolean`
- Description: Represents the checked state of input elements like checkboxes or radio buttons.

##### `current`

- Type: `string | boolean`
- Description: Denotes an element's current status within a set, helping assistive technologies understand context, such as "page" or "step."

##### `disabled`

- Type: `boolean`
- Description: States whether the element is disabled, making it inoperable or non-editable.

##### `expanded`

- Type: `boolean`
- Description: Reflects the expandable state of an element's associated content, such as a collapsible list.

##### `pressed`

- Type: `boolean`
  Description: Indicates the pressed state of toggle buttons, providing a binary state similar to checked.

##### `selected`

- Type: `boolean`
- Description: Applicable to elements that can be selected, such as options in a list; signifies the selection state.

##### `level`

- Type: `number`
- Description: Applies to elements that exist in a hierarchy, such as heading levels in a document structure.

##### `value.min`

- Type: `number`
- Description: Specifies the minimum acceptable value for the element.

##### `value.max`

- Type: number
- Description: Specifies the maximum acceptable value for the element.

##### `value.now`

- Type: `number`
- Description: Indicates the current value within the range of the element.

##### `value.text`

- Type: `TextMatcher`
- Description: Provides a textual representation of the element's value, allowing matching via string, number, regular expression, or function.

#### Examples

```ts
// Define matchers with role and properties
const buttonNode = byRole('button', {
  name: 'Submit',
  disabled: false,
});

const messageInput = byRole('textbox', {
  name: 'Message',
  description: 'Enter your message here',
});

// Define matchers with role, properties, and children
const preferenceGroup = byRole('group', { name: 'Preferences' }, [
  byRole('checkbox', 'Newsletter'),
  byRole('checkbox', 'Promotions'),
]);

// Define matchers with role and children
const navigation = byRole('navigation', [
  byRole('link', 'Home'),
  byRole('link', 'About'),
]);

// Define matchers with role and name
const buttonNode = byRole('button', /Submit/);
const buttonNode = byRole('button', 'Submit');

// Define matchers with role, name, and children
const navigation = byRole('navigation', 'Main navigation', [
  byRole('link', 'Home'),
  byRole('link', 'About'),
]);

// Define matchers with role only
const buttonNode = byRole('button');
```

The `byRole` helper abstracts away the repetitive task of creating node objects, promoting cleaner and more maintainable tests. Its signatures cater to a wide array of scenarios, from a simple button to more complex constructs like navigational elements with children.
