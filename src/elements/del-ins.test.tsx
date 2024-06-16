import { render } from '@testing-library/react';
import { byRole } from '..';

describe('del-ins', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <blockquote>
        There is <del>nothing</del> <ins>no code</ins> either good or bad, but
        <del>thinking</del> <ins>running it</ins> makes it so.
      </blockquote>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('blockquote', [
        'There is ',
        byRole('deletion', ['nothing']),
        ' ',
        byRole('insertion', ['no code']),
        ' either good or bad, but',
        byRole('deletion', ['thinking']),
        ' ',
        byRole('insertion', ['running it']),
        ' makes it so.',
      ])
    );
  });
});
