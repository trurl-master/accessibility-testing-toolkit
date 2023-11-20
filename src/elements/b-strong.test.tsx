import { render } from '@testing-library/react';
import { byRole } from '..';

describe('abbr', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <p>
        The two most popular science courses offered by the school are
        <b>chemistry</b> (the study of chemicals and the composition of
        substances) and <strong>physics</strong> (the study of the nature and
        properties of matter and energy).
      </p>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('paragraph', [
        'The two most popular science courses offered by the school are',
        'chemistry',
        ' (the study of chemicals and the composition of substances) and ',
        byRole('strong', ['physics']),
        ' (the study of the nature and properties of matter and energy).',
      ])
    );
  });
});
