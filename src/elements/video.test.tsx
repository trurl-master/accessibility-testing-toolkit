import { render } from '@testing-library/react';
import { byRole } from '..';

describe('a', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <video controls width="250">
        <source src="/media/cc0-videos/flower.webm" type="video/webm" />
        <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
        Download the
        <a href="/media/cc0-videos/flower.webm">WEBM</a>
        or
        <a href="/media/cc0-videos/flower.mp4">MP4</a>
        video.
      </video>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('Video', [
        'Download the',
        byRole('link', 'WEBM'),
        'or',
        byRole('link', 'MP4'),
        'video.',
      ])
    );
  });
});
