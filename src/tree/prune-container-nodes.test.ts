import { pruneContainerNodes } from './prune-container-nodes';
import {
  containerAttributeValues,
  defaultQueries,
  defaultState,
} from '../helpers';
import { StaticText } from './leafs';

describe('flattenA11yTree', () => {
  it('should not remove the root container', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('div'),
      ...containerAttributeValues,
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    };

    expect(pruneContainerNodes(tree)).toEqual(tree);
  });

  it('should remove all containers except the root container', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('div'),
      ...containerAttributeValues,
      state: defaultState,
      queries: defaultQueries,
      children: [
        {
          element: document.createElement('div'),
          ...containerAttributeValues,
          state: defaultState,
          queries: defaultQueries,
          children: [staticText],
        },
      ],
    };

    expect(pruneContainerNodes(tree)).toEqual({
      element: document.createElement('div'),
      ...containerAttributeValues,
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    });
  });

  it('should keep button nodes with static text children untouched', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('button'),
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    };

    expect(pruneContainerNodes(tree)).toEqual({
      element: document.createElement('button'),
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    });
  });

  it('should flatten contents of a node with a role', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('button'),
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [
        {
          element: document.createElement('div'),
          ...containerAttributeValues,
          state: defaultState,
          queries: defaultQueries,
          children: [staticText],
        },
      ],
    };

    expect(pruneContainerNodes(tree)).toEqual({
      element: document.createElement('button'),
      role: 'button',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    });
  });

  it('should flatten container inside a virtual role', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('label'),
      role: 'LabelText',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [
        {
          element: document.createElement('div'),
          ...containerAttributeValues,
          state: defaultState,
          queries: defaultQueries,
          children: [staticText],
        },
      ],
    };

    expect(pruneContainerNodes(tree)).toEqual({
      element: document.createElement('label'),
      role: 'LabelText',
      name: '',
      description: '',
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    });
  });

  it('flattens multiple levels of containers', () => {
    const staticText = new StaticText('text');

    const tree = {
      element: document.createElement('div'),
      ...containerAttributeValues,
      state: defaultState,
      queries: defaultQueries,
      children: [
        {
          element: document.createElement('div'),
          ...containerAttributeValues,
          state: defaultState,
          queries: defaultQueries,
          children: [
            {
              element: document.createElement('div'),
              ...containerAttributeValues,
              state: defaultState,
              queries: defaultQueries,
              children: [staticText],
            },
          ],
        },
      ],
    };

    expect(pruneContainerNodes(tree)).toEqual({
      element: document.createElement('div'),
      ...containerAttributeValues,
      state: defaultState,
      queries: defaultQueries,
      children: [staticText],
    });
  });
});
