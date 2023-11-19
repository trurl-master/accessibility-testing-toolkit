import { render } from '@testing-library/react';
import { byRole } from '../helpers/by-role';

describe('h element', () => {
  test('implicit roles', () => {
    const { container } = render(
      <header>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </header>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('banner', [
        byRole('heading', { name: 'Heading 1', level: 1 }),
        byRole('heading', { name: 'Heading 2', level: 2 }),
        byRole('heading', { name: 'Heading 3', level: 3 }),
        byRole('heading', { name: 'Heading 4', level: 4 }),
        byRole('heading', { name: 'Heading 5', level: 5 }),
        byRole('heading', { name: 'Heading 6', level: 6 }),
      ])
    );
  });

  test('explicit roles', () => {
    const { container } = render(
      <header>
        <div role="heading" aria-level={1}>
          Heading 1
        </div>
        <div role="heading" aria-level={2}>
          Heading 2
        </div>
        <div role="heading" aria-level={3}>
          Heading 3
        </div>
        <div role="heading" aria-level={4}>
          Heading 4
        </div>
        <div role="heading" aria-level={5}>
          Heading 5
        </div>
        <div role="heading" aria-level={6}>
          Heading 6
        </div>
      </header>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('banner', [
        byRole('heading', { name: 'Heading 1', level: 1 }),
        byRole('heading', { name: 'Heading 2', level: 2 }),
        byRole('heading', { name: 'Heading 3', level: 3 }),
        byRole('heading', { name: 'Heading 4', level: 4 }),
        byRole('heading', { name: 'Heading 5', level: 5 }),
        byRole('heading', { name: 'Heading 6', level: 6 }),
      ])
    );
  });
});
