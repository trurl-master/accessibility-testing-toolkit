import { render } from '@testing-library/react';
import { byRole } from '..';

describe('a', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <canvas width="120" height="120">
        An alternative text describing what your canvas displays.
      </canvas>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('Canvas', [
        'An alternative text describing what your canvas displays.',
      ])
    );
  });
});
