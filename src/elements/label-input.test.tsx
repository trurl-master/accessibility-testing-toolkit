import { render } from '@testing-library/react';
import { byRole } from '..';

describe('label + input element', () => {
  test('input inside label', () => {
    const { container } = render(
      <label>
        Email:
        <input type="email" name="email" />
      </label>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('LabelText', ['Email:', byRole('textbox', 'Email:')])
    );
  });

  test('input outside label', () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" />
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('LabelText', ['Email:']),
        byRole('textbox', 'Email:'),
      ])
    );
  });
});
