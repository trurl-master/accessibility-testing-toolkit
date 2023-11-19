import { render } from '@testing-library/react';
import { byRole } from '..';

describe('abbr', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <p>
        You can use <abbr>CSS</abbr> (Cascading Style Sheets) to style your
        <abbr>HTML</abbr> (HyperText Markup Language). Using style sheets, you
        can keep your <abbr>CSS</abbr> presentation layer and <abbr>HTML</abbr>
        content layer separate. This is called "separation of concerns."
      </p>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('paragraph', [
        'You can use ',
        byRole('Abbr', ['CSS']),
        ' (Cascading Style Sheets) to style your',
        byRole('Abbr', ['HTML']),
        ' (HyperText Markup Language). Using style sheets, you can keep your ',
        byRole('Abbr', ['CSS']),
        ' presentation layer and ',
        byRole('Abbr', ['HTML']),
        'content layer separate. This is called "separation of concerns."',
      ])
    );
  });
});
