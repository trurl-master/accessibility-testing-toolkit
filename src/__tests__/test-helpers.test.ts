import { byRole } from '../test-helpers';

describe('byRole', () => {
  it('returns an object with only role', () => {
    expect(byRole('button')).toEqual({
      role: 'button',
    });
  });

  it('returns an object with role and name', () => {
    expect(byRole('button', 'Click me')).toEqual({
      role: 'button',
      name: 'Click me',
    });
  });

  it('returns an object with role and children', () => {
    expect(byRole('button', ['Click me'])).toEqual({
      role: 'button',
      children: ['Click me'],
    });
  });

  it('returns an object with role, name, and children', () => {
    expect(byRole('button', 'Click me', ['Click me'])).toEqual({
      role: 'button',
      name: 'Click me',
      children: ['Click me'],
    });
  });

  it('returns an object with role and name/description/state', () => {
    expect(
      byRole('button', {
        name: 'Click me',
        description: 'Click me to submit the form',
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
        level: 2,
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: '50',
        },
      })
    ).toEqual({
      role: 'button',
      name: 'Click me',
      description: 'Click me to submit the form',
      state: {
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
      },
      queries: {
        level: 2,
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: '50',
        },
      },
    });
  });

  it('returns an object with role, name/description/state, and children', () => {
    expect(
      byRole(
        'button',
        {
          name: 'Click me',
          description: 'Click me to submit the form',
          busy: true,
          checked: true,
          current: 'page',
          disabled: true,
          expanded: true,
          pressed: true,
          selected: true,
          level: 2,
          value: {
            min: 0,
            max: 100,
            now: 50,
            text: '50',
          },
        },
        ['Click me']
      )
    ).toEqual({
      role: 'button',
      name: 'Click me',
      description: 'Click me to submit the form',
      state: {
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
      },
      queries: {
        level: 2,
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: '50',
        },
      },
      children: ['Click me'],
    });
  });
});
