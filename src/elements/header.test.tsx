import { render } from '@testing-library/react';
import { byRole } from '..';

describe('header element', () => {
  it('renders correct structure, when landmark', () => {
    const { container } = render(
      <header>
        <p>Contact us: contact@example.com</p>
      </header>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('banner', [
        byRole('paragraph', ['Contact us: contact@example.com']),
      ])
    );
  });

  it('renders correct structure, when not landmark', () => {
    const { container } = render(
      <section>
        <header>header</header>
      </section>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('HeaderAsNonLandmark', ['header'])])
    );
  });

  it('renders correct structure, when non landmark passed as an option', () => {
    const { container } = render(<header>header</header>);

    expect(container.firstChild).toHaveA11yTree(
      byRole('HeaderAsNonLandmark', ['header']),
      {
        isNonLandmarkSubtree: true,
      }
    );
  });
});
