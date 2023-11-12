import { render, screen } from '@testing-library/react';
import { byRole } from '../../../test-helpers';
import userEvent from '@testing-library/user-event';

const BasicSelect = () => {
  return (
    <>
      <label htmlFor="select1">Label</label>
      <select name="choice" id="select1" defaultValue="second">
        <option value="first">First Value</option>
        <option value="second">Second Value</option>
        <option value="third">Third Value</option>
      </select>
    </>
  );
};

describe('BasicSelect pattern', () => {
  it('renders', () => {
    const { container } = render(<BasicSelect />);

    expect(container).toHaveA11yTree(
      byRole('generic', {}, [
        byRole('LabelText', ['Label']),
        byRole('combobox', { name: 'Label' }, [
          byRole('option', { name: 'First Value' }),
          byRole('option', { name: 'Second Value', selected: true }),
          byRole('option', { name: 'Third Value' }),
        ]),
      ]),
    );
  });

  it('selects the first option', async () => {
    render(<BasicSelect />);

    const user = userEvent.setup();

    const combobox = screen.getByRole('combobox', { name: 'Label' });

    await user.selectOptions(combobox, 'first');

    expect(combobox).toHaveA11yTree(
      byRole('combobox', { name: 'Label' }, [
        byRole('option', { name: 'First Value', selected: true }),
        byRole('option', { name: 'Second Value' }),
        byRole('option', { name: 'Third Value' }),
      ]),
    );
  });
});
