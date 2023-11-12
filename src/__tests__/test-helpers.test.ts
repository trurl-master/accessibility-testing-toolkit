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

  it('returns an object with role, name/description/state, and children', () => {
    expect(
      byRole('button', {
        name: 'Click me',
        description: 'Click me to submit the form',
        expanded: true,
        checked: true,
      }),
    ).toEqual({
      role: 'button',
      name: 'Click me',
      description: 'Click me to submit the form',
      state: {
        expanded: true,
        checked: true,
      },
    });
  });
});
