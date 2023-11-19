import { render, screen } from '@testing-library/react';
import { ModalDialog } from './ModalDialog';
import { byRole } from '../../helpers/by-role';

describe('ModalDialog pattern', () => {
  it('renders dialog1', () => {
    render(<ModalDialog />);

    const dialog = screen.getByRole('dialog', { name: 'Add Delivery Address' });

    expect(dialog).toHaveA11yTree(
      byRole('dialog', 'Add Delivery Address', [
        byRole('heading', 'Add Delivery Address'),
        byRole('LabelText', ['Street:', byRole('textbox', 'Street:')]),
        byRole('LabelText', ['City:', byRole('textbox', 'City:')]),
        byRole('LabelText', ['State:', byRole('textbox', 'State:')]),
        byRole('LabelText', ['Zip:', byRole('textbox', 'Zip:')]),
        byRole('LabelText', ['Special instructions:']),
        byRole('textbox', 'Special instructions:'),
        'For example, gate code or other information to help the driver find you',
        byRole('button', 'Verify Address'),
        byRole('button', 'Add'),
        byRole('button', 'Cancel'),
      ])
    );
  });

  it('renders dialog2', () => {
    render(<ModalDialog />);

    const dialog = screen.getByRole('dialog', { name: 'Verification Result' });

    expect(dialog).toHaveA11yTree(
      byRole(
        'dialog',
        {
          name: 'Verification Result',
          description: /This is just a demonstration/,
        },
        [
          byRole('heading', 'Verification Result'),
          byRole('paragraph', [/This is just a demonstration/]),
          byRole('paragraph'),
          byRole('list'),
          byRole('paragraph'),
          byRole('list'),
          byRole('paragraph'),
          byRole('list'),
          byRole('paragraph'),
          byRole('link', 'link to help'),
          byRole('button', 'accepting an alternative form'),
          byRole('button', 'Close'),
        ]
      )
    );
  });

  it('renders dialog3', () => {
    render(<ModalDialog />);

    const dialog = screen.getByRole('dialog', {
      name: 'Address Added',
      description: /^The address you provided/,
    });

    expect(dialog).toHaveA11yTree(
      byRole('dialog', [
        byRole('heading', 'Address Added'),
        byRole('paragraph', [
          /^The address you provided/,
          byRole('link', 'your profile.'),
        ]),
        byRole('button', 'OK'),
      ])
    );
  });

  it('renders dialog4', () => {
    render(<ModalDialog />);

    const dialog = screen.getByRole('dialog', {
      name: 'End of the Road!',
    });

    expect(dialog).toHaveA11yTree(
      byRole(
        'dialog',
        {
          name: 'End of the Road!',
          description: /You activated a fake link or button that goes nowhere!/,
        },
        [
          byRole('heading', 'End of the Road!'),
          byRole('paragraph', [/^You activated/]),
          byRole('button', 'Close'),
        ]
      )
    );
  });
});
