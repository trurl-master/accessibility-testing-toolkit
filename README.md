# accessibility-testing-toolkit

## Installation

You can install `accessibility-testing-toolkit` as a development dependency in your project using your preferred package manager:

With `npm`:

```bash
npm install --save-dev accessibility-testing-toolkit
```

With `Yarn`:

```bash
yarn add --dev accessibility-testing-toolkit
```

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
      // containers are ignored, so we don't need to specify the div
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

Container nodes in the DOM, such as non-semantic `<div>` and `<span>` elements, can clutter the accessibility tree and obscure meaningful hierarchy in tests. The Accessibility Testing Toolkit automatically prunes these nodes (_except for the root node_), simplifying test assertions by focusing on semantically significant elements. This approach reduces test fragility against markup changes and enhances clarity, allowing developers to concentrate on the core accessibility features of their components. By ignoring container nodes, the toolkit promotes a development workflow that prioritizes user experience over structural implementation details.

#### Calculating roles

The toolkit follows standardized role definitions, with some customizations to provide more specific roles for certain elements, similar to the approach used by Google Chrome

Specifically, the toolkit applies the following custom roles:

- `abbr`: Mapped to `Abbr`
- `audio`: Mapped to `Audio`
- `canvas`: Mapped to `Canvas`
- `details`: Mapped to `Details`
- `dd`: Mapped to `DescriptionListDetails`
- `dl`: Mapped to `DescriptionList`
- `dt`: Mapped to `DescriptionListTerm`
- `embed`: Mapped to `EmbeddedObject`
- `figcaption`: Mapped to `Figcaption`
- `object`: Mapped to `PluginObject`
- `label`: Mapped to `LabelText`
- `br`: Mapped to `LineBreak`
- `summary`: Mapped to `DisclosureTriangle`
- `video`: Mapped to `Video`

This list is _work in progress_ and will be expanded in the future.

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

- `name` (`TextMatcher`) - Matches the accessible name. Accepts strings, numbers, regex, or functions.
- `description` (`TextMatcher`) - Matches additional descriptive text.
- `busy` (`boolean`) - Indicates if the element is busy.
- `checked` (`boolean`) - Represents the checked state of checkboxes or radios.
- `current` (`string | boolean`) - Denotes the current status within a set (e.g. "page").
- `disabled` (`boolean`) - States if the element is disabled.
- `expanded` (`boolean`) - Reflects the expandable state of associated content.
- `pressed` (`boolean`) - Indicates the pressed state of toggle buttons.
- `selected` (`boolean`) - Signifies the selection state of selectable elements.
- `level` (`number`) - Applies to elements within a hierarchy (like heading levels).
- `value.min` (`number`) - Specifies the minimum value for the element.
- `value.max` (`number`) - Specifies the maximum value for the element.
- `value.now` (`number`) - Indicates the current value within the element's range.
- `value.text` (`TextMatcher`) - Provides a textual representation of the element's value.

#### `TextMatcher`

The `TextMatcher` type is used for matching text content and can take several forms:

- `string`: Direct comparison with text content.
- `number`: Matches text content with the number converted to a string.
- `RegExp`: Tests text content against the regular expression.
- `TextMatcherFunction`: A function that returns true if the content matches criteria; it takes the text content and the associated HTML element as arguments.

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
