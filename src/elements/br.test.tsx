import { render } from '@testing-library/react';
import { byRole } from '..';

describe('br', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <p>
        O’er all the hilltops
        <br />
        Is quiet now,
      </p>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('paragraph', [
        'O’er all the hilltops',
        byRole('LineBreak'),
        'Is quiet now,',
      ])
    );
  });
});
