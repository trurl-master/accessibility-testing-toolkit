import { matchToNode } from '../prepare-diff';
import { getPrettyTree } from './pretty-tree';

describe('pretty-tree', () => {
  it('should render a tree with a single node', () => {
    const tree = matchToNode(undefined, {
      role: 'button',
      name: 'Click me',
      state: {
        pressed: true,
      },
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "button "Click me" pressed=true
      "
    `);
  });

  it('should render a tree with a single node with a description', () => {
    const tree = matchToNode(undefined, {
      role: 'button',
      name: 'Click me',
      description: 'A button that can be clicked',
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "button "Click me"
        description: "A button that can be clicked"
      "
    `);
  });

  it('should render a tree with a single node with a description and state', () => {
    const tree = matchToNode(undefined, {
      role: 'button',
      name: 'Click me',
      description: 'A button that can be clicked',
      state: {
        pressed: true,
      },
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "button "Click me" pressed=true
        description: "A button that can be clicked"
      "
    `);
  });

  it('should render a tree with a single node with a description and state and queries', () => {
    const tree = matchToNode(undefined, {
      role: 'button',
      name: 'Click me',
      description: 'A button that can be clicked',
      state: {
        pressed: true,
      },
      queries: {
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: "I'm a text",
        },
      },
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "button "Click me" pressed=true value.min=0 value.max=100 value.now=50 value.text="I'm a text"
        description: "A button that can be clicked"
      "
    `);
  });

  it('should render a tree with a single node with a description and state and queries and children', () => {
    const tree = matchToNode(undefined, {
      role: 'button',
      name: 'Click me',
      description: 'A button that can be clicked',
      state: {
        pressed: true,
      },
      queries: {
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: "I'm a text",
        },
      },
      children: ['I am a child'],
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "button "Click me" pressed=true value.min=0 value.max=100 value.now=50 value.text="I'm a text"
        description: "A button that can be clicked"
        StaticText "I am a child"
      "
    `);
  });

  it('should render a tree with a single node with multiple different children', () => {
    const tree = matchToNode(undefined, {
      role: 'navigation',
      name: 'Navigation',
      children: [
        {
          role: 'link',
          name: 'Home',
        },
        '--- separator ---',
        {
          role: 'link',
          name: 'About',
        },
        {
          role: 'link',
          name: 'Contact',
        },
      ],
    });

    expect(getPrettyTree(tree)).toMatchInlineSnapshot(`
      "navigation "Navigation"
        link "Home"
        StaticText "--- separator ---"
        link "About"
        link "Contact"
      "
    `);
  });
});
