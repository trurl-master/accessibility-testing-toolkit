import { render } from '@testing-library/react';
import { byRole } from '..';

describe('abbr', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <article>
        <h1>Weather forecast for Seattle</h1>
        <article>
          <h2>03 March 2018</h2>
          <p>Rain.</p>
        </article>
        <article>
          <h2>04 March 2018</h2>
          <p>Periods of rain.</p>
        </article>
        <article>
          <h2>05 March 2018</h2>
          <p>Heavy rain.</p>
        </article>
      </article>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('article', [
        byRole('heading', 'Weather forecast for Seattle'),
        byRole('article', [
          byRole('heading', '03 March 2018'),
          byRole('paragraph', ['Rain.']),
        ]),
        byRole('article', [
          byRole('heading', '04 March 2018'),
          byRole('paragraph', ['Periods of rain.']),
        ]),
        byRole('article', [
          byRole('heading', '05 March 2018'),
          byRole('paragraph', ['Heavy rain.']),
        ]),
      ])
    );
  });
});
