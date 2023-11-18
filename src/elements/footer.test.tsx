import { render } from '@testing-library/react';
import { byRole } from '..';

describe('footer element', () => {
  it('renders correct structure, when landmark', () => {
    const { container } = render(
      <footer>
        <p>Contact us: contact@example.com</p>
      </footer>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('contentinfo', [
        byRole('paragraph', ['Contact us: contact@example.com']),
      ])
    );
  });

  it('renders correct structure, when not landmark', () => {
    const { container } = render(
      <section>
        <footer>Footer</footer>
      </section>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('FooterAsNonLandmark', ['Footer'])])
    );
  });

  it('renders correct structure, when non landmark passed as an option', () => {
    const { container } = render(<footer>Footer</footer>);

    expect(container.firstChild).toHaveA11yTree(
      byRole('FooterAsNonLandmark', ['Footer']),
      {
        isNonLandmarkSubtree: true,
      }
    );
  });
});
