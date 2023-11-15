import { render, screen, within } from '@testing-library/react';
import { GroupedListbox } from './GroupedListbox';
import { byRole } from '../../../test-helpers';
import userEvent from '@testing-library/user-event';

Element.prototype.scrollIntoView = jest.fn();

describe('GroupedListbox pattern', () => {
  it('renders', () => {
    render(<GroupedListbox />);

    const listbox = screen.getByRole('listbox', {
      name: 'Choose your animal sidekick',
    });

    expect(listbox).toHaveA11yTree(
      byRole('listbox', { name: 'Choose your animal sidekick' }, [
        byRole('group', { name: 'Land' }, [
          byRole('presentation', {}, ['Land']),
          byRole('option', { name: 'Cat' }),
          byRole('option', { name: 'Dog' }),
          byRole('option', { name: 'Tiger' }),
          byRole('option', { name: 'Reindeer' }),
          byRole('option', { name: 'Raccoon' }),
        ]),
        byRole('group', { name: 'Water' }, [
          byRole('presentation', {}, ['Water']),
          byRole('option', { name: 'Dolphin' }),
          byRole('option', { name: 'Flounder' }),
          byRole('option', { name: 'Eel' }),
        ]),
        byRole('group', { name: 'Air' }, [
          byRole('presentation', {}, ['Air']),
          byRole('option', { name: 'Falcon' }),
          byRole('option', { name: 'Winged Horse' }),
          byRole('option', { name: 'Owl' }),
        ]),
      ])
    );
  });

  it('selects the dog option', async () => {
    render(<GroupedListbox />);

    const listbox = screen.getByRole('listbox', {
      name: 'Choose your animal sidekick',
    });

    const user = userEvent.setup();

    await user.click(within(listbox).getByRole('option', { name: 'Dog' }));

    expect(listbox).toHaveA11yTree(
      byRole('listbox', { name: 'Choose your animal sidekick' }, [
        byRole('group', { name: 'Land' }, [
          byRole('presentation', {}, ['Land']),
          byRole('option', { name: 'Cat' }),
          byRole('option', { name: 'Dog', selected: true }),
          byRole('option', { name: 'Tiger' }),
          byRole('option', { name: 'Reindeer' }),
          byRole('option', { name: 'Raccoon' }),
        ]),
        byRole('group', { name: 'Water' }, [
          byRole('presentation', {}, ['Water']),
          byRole('option', { name: 'Dolphin' }),
          byRole('option', { name: 'Flounder' }),
          byRole('option', { name: 'Eel' }),
        ]),
        byRole('group', { name: 'Air' }, [
          byRole('presentation', {}, ['Air']),
          byRole('option', { name: 'Falcon' }),
          byRole('option', { name: 'Winged Horse' }),
          byRole('option', { name: 'Owl' }),
        ]),
      ])
    );
  });
});
