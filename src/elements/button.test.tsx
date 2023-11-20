import { render } from '@testing-library/react';
import { byRole } from '..';

describe('button', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <button type="button">Add to favorites</button>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('button', ['Add to favorites'])
    );
  });
});
