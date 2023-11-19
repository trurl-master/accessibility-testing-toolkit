import { A11yTreeNode } from '..';
import { getDefaultState, getDefaultQueries } from '../helpers';
import { nodeTester } from './node';

describe('nodeTester', () => {
  const received: A11yTreeNode = {
    element: document.createElement('div'),
    role: 'generic',
    name: 'name',
    description: 'description',
    state: getDefaultState(),
    queries: getDefaultQueries(),
    children: [],
  };

  it('should return true if expected properties are undefined', () => {
    expect(nodeTester(received, {})).toBe(true);
  });

  describe('role', () => {
    it('should return true if expected role is the same as received role', () => {
      expect(
        nodeTester(received, {
          role: 'generic',
        })
      ).toBe(true);
    });

    it('should return false if expected role is different from received role', () => {
      expect(
        nodeTester(received, {
          role: 'link',
        })
      ).toBe(false);
    });
  });

  describe('name', () => {
    it('should return true if expected name is the same as received name', () => {
      expect(
        nodeTester(received, {
          name: 'name',
        })
      ).toBe(true);
    });

    it('should return false if expected name is different from received name', () => {
      expect(
        nodeTester(received, {
          name: 'different name',
        })
      ).toBe(false);
    });
  });

  describe('description', () => {
    it('should return true if expected description is the same as received description', () => {
      expect(
        nodeTester(received, {
          description: 'description',
        })
      ).toBe(true);
    });

    it('should return false if expected description is different from received description', () => {
      expect(
        nodeTester(received, {
          description: 'different description',
        })
      ).toBe(false);
    });
  });

  describe('state', () => {
    it('should return true if expected state is the same as received state', () => {
      expect(
        nodeTester(received, {
          state: getDefaultState(),
        })
      ).toBe(true);
    });

    it('should return false if expected state is different from received state', () => {
      expect(
        nodeTester(received, {
          state: {
            ...getDefaultState(),
            checked: true,
          },
        })
      ).toBe(false);
    });
  });

  describe('queries', () => {
    it('should return true if expected queries is the same as received queries', () => {
      expect(
        nodeTester(received, {
          queries: getDefaultQueries(),
        })
      ).toBe(true);
    });

    it('should return false if expected queries is different from received queries', () => {
      expect(
        nodeTester(received, {
          queries: {
            ...getDefaultQueries(),
            level: 2,
          },
        })
      ).toBe(false);
    });
  });

  describe('children', () => {
    it('should return true if expected children is the same as received children', () => {
      expect(
        nodeTester(received, {
          children: [],
        })
      ).toBe(true);
    });

    it('should return false if expected children is different from received children', () => {
      expect(
        nodeTester(received, {
          children: [
            {
              role: 'generic',
              name: 'name',
              description: 'description',
              state: getDefaultState(),
              queries: getDefaultQueries(),
              children: [],
            },
          ],
        })
      ).toBe(false);
    });
  });
});
