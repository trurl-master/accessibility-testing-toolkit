import { render } from '@testing-library/react';
import { byRole } from '../test-helpers';

describe('table', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('table', [
          byRole('rowgroup', [
            byRole('row', [
              byRole('columnheader', 'Header 1'),
              byRole('columnheader', 'Header 2'),
              byRole('columnheader', 'Header 3'),
            ]),
          ]),
          byRole('rowgroup', [
            byRole('row', [
              byRole('cell', 'Cell 1'),
              byRole('cell', 'Cell 2'),
              byRole('cell', 'Cell 3'),
            ]),
          ]),
        ]),
      ]),
    );
  });
});
