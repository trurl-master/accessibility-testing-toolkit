import { render } from '@testing-library/react';
import { byRole } from '..';

describe('', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <>
        <p>New Products:</p>
        <ul>
          <li>
            <data value="398">Mini Ketchup</data>
          </li>
          <li>
            <data value="399">Jumbo Ketchup</data>
          </li>
          <li>
            <data value="400">Mega Jumbo Ketchup</data>
          </li>
        </ul>
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('paragraph', ['New Products:']),
        byRole('list', [
          byRole('listitem', ['Mini Ketchup']),
          byRole('listitem', ['Jumbo Ketchup']),
          byRole('listitem', ['Mega Jumbo Ketchup']),
        ]),
      ])
    );
  });
});
