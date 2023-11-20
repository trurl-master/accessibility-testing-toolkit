import { render } from '@testing-library/react';
import { byRole } from '..';

describe('caption', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <table>
        <caption>He-Man and Skeletor facts</caption>
        <tbody>
          <tr>
            <td> </td>
            <th scope="col">He-Man</th>
            <th scope="col">Skeletor</th>
          </tr>
          <tr>
            <th scope="row">Role</th>
            <td>Hero</td>
            <td>Villain</td>
          </tr>
        </tbody>
      </table>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('table', [
        byRole('caption', ['He-Man and Skeletor facts']),
        byRole('rowgroup', [
          byRole('row', [
            byRole('cell', [' ']),
            byRole('columnheader', 'He-Man'),
            byRole('columnheader', 'Skeletor'),
          ]),
          byRole('row', [
            byRole('rowheader', 'Role'),
            byRole('cell', 'Hero'),
            byRole('cell', 'Villain'),
          ]),
        ]),
      ])
    );
  });
});
