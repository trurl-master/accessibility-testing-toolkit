import { render } from '@testing-library/react';
import { byRole } from '..';

describe('abbr', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <p>
        <bdi>Evil Steven</bdi>
        <bdo dir="ltr">אה, אני אוהב להיות ליד חוף הים</bdo>
      </p>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('paragraph', ['Evil Steven', 'אה, אני אוהב להיות ליד חוף הים'])
    );
  });
});
