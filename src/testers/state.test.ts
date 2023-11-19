import { stateTester } from './state';

const definedReceived = {
  busy: true,
  checked: true,
  current: 'page',
  disabled: true,
  expanded: true,
  pressed: true,
  selected: true,
};

describe('stateTester', () => {
  it('returns true when expected is undefined', () => {
    const received = {
      ...definedReceived,
    };

    const expected = undefined;

    expect(stateTester(received, expected)).toBe(true);
  });

  it('returns true when expected is empty', () => {
    const received = {
      ...definedReceived,
    };

    const expected = {};

    expect(stateTester(received, expected)).toBe(true);
  });

  it('returns true when expected is a subset of received, and it matches', () => {
    const received = {
      ...definedReceived,
    };

    expect(
      stateTester(received, {
        busy: true,
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        checked: true,
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        current: 'page',
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        disabled: true,
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        expanded: true,
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        pressed: true,
      })
    ).toBe(true);

    expect(
      stateTester(received, {
        selected: true,
      })
    ).toBe(true);
  });

  it('returns false when expected is a subset of received, and it does not match', () => {
    const received = {
      ...definedReceived,
    };

    expect(
      stateTester(received, {
        busy: false,
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        checked: false,
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        current: 'foo',
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        disabled: false,
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        expanded: false,
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        pressed: false,
      })
    ).toBe(false);

    expect(
      stateTester(received, {
        selected: false,
      })
    ).toBe(false);
  });
});
