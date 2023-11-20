import { render } from '@testing-library/react';
import { byRole } from '..';

describe('audio', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <aside>
        <p>The Rough-skinned Newt defends itself with a deadly neurotoxin.</p>
      </aside>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('complementary', [
        byRole('paragraph', [
          'The Rough-skinned Newt defends itself with a deadly neurotoxin.',
        ]),
      ])
    );
  });
});
