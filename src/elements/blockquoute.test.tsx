import { render } from '@testing-library/react';
import { byRole } from '..';

describe('blockquote', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <blockquote cite="https://www.huxley.net/bnw/four.html">
        <p>
          Words can be like X-rays, if you use them properly—they’ll go through
          anything. You read and you’re pierced.
        </p>
        <footer>
          —Aldous Huxley, <cite>Brave New World</cite>
        </footer>
      </blockquote>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('blockquote', [
        byRole('paragraph', [
          'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.',
        ]),
        byRole('contentinfo', ['—Aldous Huxley, ', 'Brave New World']),
      ])
    );
  });
});
