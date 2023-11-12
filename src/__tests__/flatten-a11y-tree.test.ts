import { flattenA11yTree } from '../flatten-a11y-tree';
import { containerAttributeValues, defaultState } from '../helpers';
import { StaticText } from '../leafs';

describe('flattenA11yTree', () => {
  it('should not remove the root container', () => {
    const staticText = new StaticText('text');

    const tree = {
      ...containerAttributeValues,
      state: defaultState,
      children: [staticText],
    };

    expect(flattenA11yTree(tree)).toEqual(tree);
  });

  it('should remove all containers except the root container', () => {
    const staticText = new StaticText('text');

    const tree = {
      ...containerAttributeValues,
      state: defaultState,
      children: [
        {
          ...containerAttributeValues,
          state: defaultState,
          children: [staticText],
        },
      ],
    };

    expect(flattenA11yTree(tree)).toEqual({
      ...containerAttributeValues,
      state: defaultState,
      children: [staticText],
    });
  });

  it('should keep button nodes with static text children untouched', () => {
    const staticText = new StaticText('text');

    const tree = {
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      children: [staticText],
    };

    expect(flattenA11yTree(tree)).toEqual({
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      children: [staticText],
    });
  });

  it('should flatten contents of a node with a role', () => {
    const staticText = new StaticText('text');

    const tree = {
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      children: [
        {
          ...containerAttributeValues,
          state: defaultState,
          children: [staticText],
        },
      ],
    };

    expect(flattenA11yTree(tree)).toEqual({
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      children: [staticText],
    });
  });

  it('should flatten container inside a virtual role', () => {
    const staticText = new StaticText('text');

    const tree = {
      role: 'LabelText',
      name: '',
      description: '',
      state: defaultState,
      children: [
        {
          ...containerAttributeValues,
          state: defaultState,
          children: [staticText],
        },
      ],
    };

    expect(flattenA11yTree(tree)).toEqual({
      role: 'LabelText',
      name: '',
      description: '',
      state: defaultState,
      children: [staticText],
    });
  });

  it('flattens multiple levels of containers', () => {
    const staticText = new StaticText('text');

    const tree = {
      ...containerAttributeValues,
      state: defaultState,
      children: [
        {
          ...containerAttributeValues,
          state: defaultState,
          children: [
            {
              ...containerAttributeValues,
              state: defaultState,
              children: [staticText],
            },
          ],
        },
      ],
    };

    expect(flattenA11yTree(tree)).toEqual({
      ...containerAttributeValues,
      state: defaultState,
      children: [staticText],
    });
  });
});
