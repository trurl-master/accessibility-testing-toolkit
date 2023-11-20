import { render } from '@testing-library/react';
import { byRole } from '..';

describe('abbr', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio controls src="/media/cc0-audio/t-rex-roar.mp3">
          <a href="/media/cc0-audio/t-rex-roar.mp3">Download audio</a>
        </audio>
      </figure>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('figure', [
        byRole('Figcaption', ['Listen to the T-Rex:']),
        byRole('Audio', [byRole('link', ['Download audio'])]),
      ])
    );
  });
});
