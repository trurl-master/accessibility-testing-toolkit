import { render } from '@testing-library/react';
import { byRole } from '..';

describe('a', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <>
        <p>You can reach Michael at:</p>
        <ul>
          <li>
            <a href="https://example.com">Website</a>
          </li>
          <li>
            <a href="mailto:m.bluth@example.com">Email</a>
          </li>
          <li>
            <a href="tel:+123456789">Phone</a>
          </li>
        </ul>
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('paragraph', ['You can reach Michael at:']),
        byRole('list', [
          byRole('listitem', [byRole('link', ['Website'])]),
          byRole('listitem', [byRole('link', ['Email'])]),
          byRole('listitem', [byRole('link', ['Phone'])]),
        ]),
      ])
    );
  });
});
