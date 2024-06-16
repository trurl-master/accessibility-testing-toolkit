import { render } from '@testing-library/react';
import { byRole } from '..';

describe('details', () => {
  it('closed by default, content is hidden', () => {
    const { container } = render(
      <details>
        <summary>Details</summary>
        <p>Something small enough to escape casual notice.</p>
        some simple text
      </details>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('group', { expanded: false }, [
        byRole('DisclosureTriangle', ['Details']),
        // the details element is not expanded by default
        // so the content is not rendered
      ])
    );
  });

  it('open, content is visible', () => {
    const { container } = render(
      <details open>
        <summary>Details</summary>
        Something small enough to escape casual notice.
      </details>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('group', { expanded: true }, [
        byRole('DisclosureTriangle', ['Details']),
        'Something small enough to escape casual notice.',
      ])
    );
  });
});
