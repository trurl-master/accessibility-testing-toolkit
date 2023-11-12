import { render, screen } from '@testing-library/react';
import { byRole } from '../../../test-helpers';
import userEvent from '@testing-library/user-event';

const AdvancedSelect = () => {
  return (
    <label>
      Please choose one or more pets:
      <select name="pets" multiple size={4}>
        <optgroup label="4-legged pets">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster" disabled>
            Hamster
          </option>
        </optgroup>
        <optgroup label="Flying pets">
          <option value="parrot">Parrot</option>
          <option value="macaw">Macaw</option>
          <option value="albatross">Albatross</option>
        </optgroup>
      </select>
    </label>
  );
};

describe('AdvancedSelect pattern', () => {
  it('renders', () => {
    const { container } = render(<AdvancedSelect />);

    expect(container).toHaveA11yTree(
      byRole('generic', {}, [
        {
          children: [
            'Please choose one or more pets:',
            byRole('listbox', { name: 'Please choose one or more pets:' }, [
              byRole('group', { name: '4-legged pets' }, [
                byRole('option', { name: 'Dog' }),
                byRole('option', { name: 'Cat' }),
                byRole('option', { name: 'Hamster' }),
              ]),
              byRole('group', { name: 'Flying pets' }, [
                byRole('option', { name: 'Parrot' }),
                byRole('option', { name: 'Macaw' }),
                byRole('option', { name: 'Albatross' }),
              ]),
            ]),
          ],
        },
      ]),
    );
  });

  it('selects the parrot option, then selects the Macaw', async () => {
    render(<AdvancedSelect />);

    const user = userEvent.setup();

    const listbox = screen.getByRole('listbox', {
      name: 'Please choose one or more pets:',
    });

    await user.selectOptions(listbox, 'parrot');

    expect(listbox).toHaveA11yTree(
      byRole('listbox', { name: 'Please choose one or more pets:' }, [
        byRole('group', { name: '4-legged pets' }, [
          byRole('option', { name: 'Dog' }),
          byRole('option', { name: 'Cat' }),
          byRole('option', { name: 'Hamster' }),
        ]),
        byRole('group', { name: 'Flying pets' }, [
          byRole('option', { name: 'Parrot', selected: true }),
          byRole('option', { name: 'Macaw' }),
          byRole('option', { name: 'Albatross' }),
        ]),
      ]),
    );

    await user.selectOptions(listbox, 'macaw');

    expect(listbox).toHaveA11yTree(
      byRole('listbox', { name: 'Please choose one or more pets:' }, [
        byRole('group', { name: '4-legged pets' }, [
          byRole('option', { name: 'Dog' }),
          byRole('option', { name: 'Cat' }),
          byRole('option', { name: 'Hamster' }),
        ]),
        byRole('group', { name: 'Flying pets' }, [
          byRole('option', { name: 'Parrot', selected: true }),
          byRole('option', { name: 'Macaw', selected: true }),
          byRole('option', { name: 'Albatross' }),
        ]),
      ]),
    );
  });
});
