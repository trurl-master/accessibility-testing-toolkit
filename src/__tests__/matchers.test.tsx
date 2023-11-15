import { render } from '@testing-library/react';
import { byRole } from '../test-helpers';

describe('matchers', () => {
  describe('accepts options', () => {
    it('sees the header as banner by default', () => {
      const { container } = render(<header>Header</header>);

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('banner', ['Header'])])
      );
    });

    it('sees the header as HeaderAsNonLandmark, if inside sectioning content', () => {
      const { container } = render(
        <section>
          <div>
            <header>Header</header>
          </div>
        </section>
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('HeaderAsNonLandmark', ['Header'])])
      );
    });

    it('sees the header as HeaderAsNonLandmark, if option passed', () => {
      const { container } = render(<header>Header</header>);

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('HeaderAsNonLandmark', ['Header'])]),
        { isNonLandmarkSubtree: true }
      );
    });
  });
});
