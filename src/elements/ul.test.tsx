import { render, screen } from '@testing-library/react';
import { byRole } from '..';

describe('ul element', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('list', [
        byRole('listitem', ['Item 1']),
        byRole('listitem', ['Item 2']),
      ])
    );
  });

  it('test', () => {
    render(
      <footer>
        <p>Contact us: contact@example.com</p>
      </footer>
    );

    expect(screen.getByRole('contentinfo')).toHaveA11yTree({
      role: 'contentinfo',
      children: [
        {
          role: 'paragraph',
          children: ['Contact us: contact@example.com'],
        },
      ],
    });
  });
});
