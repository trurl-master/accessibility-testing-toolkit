import { render, screen } from '@testing-library/react';
import { byRole } from '../../test-helpers';

const WithLabalAndDescription = () => {
  return (
    <div
      role="dialog"
      aria-labelledby="label"
      aria-describedby="description"
      aria-modal="true"
    >
      <h2 id="label">Title</h2>
      <div id="description">
        <p tabIndex={-1} id="dialog2_para1">
          Description
        </p>
      </div>
      <div>
        <button type="button">Submit</button>
        <button type="button">Close</button>
      </div>
    </div>
  );
};

describe('Basic', () => {
  it('strings', () => {
    render(<WithLabalAndDescription />);

    const dialog = screen.getByRole('dialog', {
      name: 'Title',
      description: 'Description',
    });

    expect(dialog).toHaveA11yTree(
      byRole(
        'dialog',
        {
          name: 'Title',
          description: 'Description',
        },
        [
          byRole('heading', 'Title'),
          byRole('paragraph', ['Description']),
          byRole('button', 'Submit'),
          byRole('button', 'Close'),
        ],
      ),
    );
  });

  it('regexps', () => {
    render(<WithLabalAndDescription />);

    const dialog = screen.getByRole('dialog', {
      name: 'Title',
      description: 'Description',
    });

    expect(dialog).toHaveA11yTree(
      byRole(
        'dialog',
        {
          name: /Titl/,
          description: /Descrip/,
        },
        [
          byRole('heading', /Tit/),
          byRole('paragraph', [/Descript/]),
          byRole('button', /Sub/),
          byRole('button', /Clo/),
        ],
      ),
    );
  });

  test('miss', () => {
    render(<WithLabalAndDescription />);

    const dialog = screen.getByRole('dialog', {
      name: 'Title',
      description: 'Description',
    });

    expect(dialog).not.toHaveA11yTree(
      byRole(
        'dialog',
        {
          name: 'Title',
          description: 'Description',
        },
        [/sdaasd/],
      ),
    );
  });
});
