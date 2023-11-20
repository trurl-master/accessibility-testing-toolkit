import { render } from '@testing-library/react';
import { byRole } from '..';

describe('', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <table>
        <caption>Superheros and sidekicks</caption>
        <colgroup>
          <col />
          <col span={2} />
          <col span={2} />
        </colgroup>
        <tbody>
          <tr>
            <td></td>
            <th scope="col">Batman</th>
            <th scope="col">Robin</th>
            <th scope="col">The Flash</th>
            <th scope="col">Kid Flash</th>
          </tr>
          <tr>
            <th scope="row">Skill</th>
            <td>Smarts</td>
            <td>Dex, acrobat</td>
            <td>Super speed</td>
            <td>Super speed</td>
          </tr>
        </tbody>
      </table>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('table', [
        byRole('caption', ['Superheros and sidekicks']),
        byRole('rowgroup', [
          byRole('row', [
            byRole('cell'),
            byRole('columnheader', ['Batman']),
            byRole('columnheader', ['Robin']),
            byRole('columnheader', ['The Flash']),
            byRole('columnheader', ['Kid Flash']),
          ]),
          byRole('row', [
            byRole('rowheader', ['Skill']),
            byRole('cell', ['Smarts']),
            byRole('cell', ['Dex, acrobat']),
            byRole('cell', ['Super speed']),
            byRole('cell', ['Super speed']),
          ]),
        ]),
      ])
    );
  });
});
