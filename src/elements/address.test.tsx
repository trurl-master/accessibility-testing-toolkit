import { render } from '@testing-library/react';
import { byRole } from '..';

describe('address', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <address>
        <a href="mailto:jim@example.com">jim@example.com</a>
        <br />
        <a href="tel:+14155550132">+1 (415) 555‑0132</a>
      </address>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('group', [
        byRole('link', ['jim@example.com']),
        byRole('LineBreak'),
        byRole('link', ['+1 (415) 555‑0132']),
      ])
    );
  });
});
