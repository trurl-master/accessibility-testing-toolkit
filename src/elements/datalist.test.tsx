import { render } from '@testing-library/react';
import { byRole } from '..';

describe('datalist', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <>
        <label htmlFor="ice-cream-choice">Choose a flavor:</label>
        <input
          list="ice-cream-flavors"
          id="ice-cream-choice"
          name="ice-cream-choice"
        />
        <datalist id="ice-cream-flavors">
          <option value="Chocolate"></option>
          <option value="Coconut"></option>
          <option value="Mint"></option>
          <option value="Strawberry"></option>
          <option value="Vanilla"></option>
        </datalist>
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('LabelText', ['Choose a flavor:']),
        byRole('combobox', { name: 'Choose a flavor:' }),
        // datalist has display: none by default
      ])
    );
  });
});
