import { render } from '@testing-library/react';
import { byRole } from '..';

describe('', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <p>
        The <code>push()</code> method adds one or more elements to the end of
        an array and returns the new length of the array.
      </p>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('paragraph', [
        'The ',
        byRole('code', ['push()']),
        ' method adds one or more elements to the end of an array and returns the new length of the array.',
      ])
    );
  });
});
