import { render } from '@testing-library/react';
import { byRole } from '..';

describe('list elements (ul/ol/menu)', () => {
  it('renders list items with listitem role when descendant of ul', () => {
    const { container } = render(
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('list', [
        byRole('listitem', ['Item 1']),
        byRole('listitem', ['Item 2']),
      ])
    );
  });

  it('renders list items with generic role when not descendant of ul', () => {
    const { container } = render(
      <div>
        <li>Item 1</li>
        <li>Item 2</li>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', ['Item 1', 'Item 2'])
    );
  });
});
