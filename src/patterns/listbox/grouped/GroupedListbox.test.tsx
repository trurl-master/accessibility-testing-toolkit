import { render, screen, within } from '@testing-library/react';
// import { byRole, byText } from '../../../test-helpers';
// import userEvent from '@testing-library/user-event';
import { GroupedListbox } from './GroupedListbox';
// import { getAccessibleTree, getPrettyTree } from '../../../accessibility-tree';
import { byRole } from '../../../test-helpers';
import userEvent from '@testing-library/user-event';

Element.prototype.scrollIntoView = jest.fn();

// const mySelect = asPattern(
//   byRole('listbox', { name: 'Choose your animal sidekick' }, [
//     byRole('group', { name: expect.any(String) }, [
//       byRole('presentation', {}, [expect.any(String)])
//         .is({ count: 'one' })
//         .as('groupLabel'),
//       byRole('option', { name: expect.any(String) })
//         .is({ count: 'multiple' })
//         .as('option'),
//     ]).as('group'),
//   ]).as('listbox'),
// );

// // we should have 3 groups
// expect(mySelect.with('group').getElements()).toHaveLength(3);

// // we should have 5 options in the first group, called 'Land'
// // the options are 'Cat', 'Dog', 'Tiger', 'Reindeer', 'Raccoon'
// const firstGroup = mySelect.get('group', 0);
// expect(firstGroup.get('groupLabel').getNames()).toEqual(['Land']);
// expect(firstGroup.get('option').getNames()).toEqual([
//   'Cat',
//   'Dog',
//   'Tiger',
//   'Reindeer',
//   'Raccoon',
// ]);

// // click the Tiger option
// const user = userEvent.setup();

// user.click(firstGroup.get('option', 'Tiger'));

// // we should have 1 option selected
// expect(mySelect.getValue()).toEqual(['Tiger']);

describe('GroupedListbox pattern', () => {
  it('renders', () => {
    render(<GroupedListbox />);

    const listbox = screen.getByRole('listbox', {
      name: 'Choose your animal sidekick',
    });

    // const tree = getAccessibleTree(listbox);

    // if (tree) {
    //   console.log(getPrettyTree(tree));
    // }

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
      ]),
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
      ]),
    );
  });
});
