import { render } from '@testing-library/react';
import { byRole } from '..';

describe('map-area', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <>
        <map name="infographic">
          <area
            shape="poly"
            coords="129,0,260,95,129,138"
            href="https://developer.mozilla.org/docs/Web/HTTP"
            target="_blank"
            alt="HTTP"
          />
          <area
            shape="poly"
            coords="260,96,209,249,130,138"
            href="https://developer.mozilla.org/docs/Web/HTML"
            target="_blank"
            alt="HTML"
          />
          <area
            shape="poly"
            coords="209,249,49,249,130,139"
            href="https://developer.mozilla.org/docs/Web/JavaScript"
            target="_blank"
            alt="JavaScript"
          />
          <area
            shape="poly"
            coords="48,249,0,96,129,138"
            href="https://developer.mozilla.org/docs/Web/API"
            target="_blank"
            alt="Web APIs"
          />
          <area
            shape="poly"
            coords="0,95,128,0,128,137"
            href="https://developer.mozilla.org/docs/Web/CSS"
            target="_blank"
            alt="CSS"
          />
        </map>
        <img
          useMap="#infographic"
          src="/media/examples/mdn-info.png"
          alt="MDN infographic"
        />
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('link', 'HTTP'),
        byRole('link', 'HTML'),
        byRole('link', 'JavaScript'),
        byRole('link', 'Web APIs'),
        byRole('link', 'CSS'),
        byRole('img', 'MDN infographic'),
      ])
    );
  });
});
