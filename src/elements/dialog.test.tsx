import { render, screen } from '@testing-library/react';
import { byRole } from '../helpers/by-role';

describe('dialog', () => {
  it('renders correct structure', () => {
    render(
      <div
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title">Confirmation</h2>
        <label>
          <span id="dialog-description">
            Are you sure you want to proceed with this action?
          </span>
          <input type="checkbox" />
        </label>
        <p>This cannot be undone.</p>
        <div>
          <button>Accept</button>
          <button>Cancel</button>
        </div>
      </div>
    );

    // Define the expected accessibility tree using byRole
    const expectedTree = byRole(
      'dialog',
      {
        name: 'Confirmation',
        description: 'Are you sure you want to proceed with this action?',
      },
      [
        byRole('heading', { name: 'Confirmation', level: 2 }),
        byRole('LabelText', [
          'Are you sure you want to proceed with this action?',
          byRole(
            'checkbox',
            'Are you sure you want to proceed with this action?'
          ),
        ]),
        byRole('paragraph', ['This cannot be undone.']),
        byRole('button', 'Accept'),
        byRole('button', 'Cancel'),
      ]
    );

    // Get the dialog element using a chosen query method, such as getByRole from Testing Library
    const dialogElement = screen.getByRole('dialog');

    // Perform the assertion
    expect(dialogElement).toHaveA11yTree(expectedTree);
  });
});
