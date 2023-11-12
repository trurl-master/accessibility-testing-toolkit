import { render, screen } from '@testing-library/react';
import { byRole } from '..';

describe('Various', () => {
  it('should ignore container nodes when calculating a11y tree', () => {
    render(
      <div data-testid="container">
        <header>
          <h1>Heading</h1>
          <p>Paragraph</p>
        </header>
        <main>
          <button>Button 1</button>
          <div>
            <div>
              <div>
                <nav aria-label="Primary navigation">
                  <a href="http://whatever.com">link</a>
                  <a>invalid link</a>
                </nav>
              </div>
            </div>
          </div>
          <button>Button 2</button>
          <div>A text</div>
          <div aria-hidden="true">
            <img src="http://whatever.com" alt="whatever" />
            <section aria-label="whatever">
              <div>whatever</div>
            </section>
          </div>
          <section aria-label="gallery" aria-description="Gallery description">
            <ul>
              <li>
                <img src="http://whatever.com" alt="whatever1" />
              </li>
              <li>
                <img src="http://whatever.com" alt="whatever2" />
              </li>
            </ul>
          </section>
        </main>
        <footer>
          <p>Footer</p>
          <div>
            <nav>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>,
    );

    const container = screen.getByTestId('container');

    expect(container).toHaveA11yTree(
      byRole('generic', {}, [
        byRole('banner', {}, [
          byRole('heading', {}, ['Heading']),
          byRole('paragraph', {}, ['Paragraph']),
        ]),
        byRole('main', {}, [
          byRole('button', {}, ['Button 1']),
          byRole('navigation', { name: 'Primary navigation' }, [
            byRole('link', {}, ['link']),
            'invalid link',
          ]),
          byRole('button', {}, ['Button 2']),
          'A text',
          // hidden container is ignored
          byRole(
            'region',
            { name: 'gallery', description: 'Gallery description' },
            [
              byRole('list', {}, [
                byRole('listitem', {}, [byRole('img', { name: 'whatever1' })]),
                byRole('listitem', {}, [byRole('img', { name: 'whatever2' })]),
              ]),
            ],
          ),
        ]),
        byRole('contentinfo', {}, [
          byRole('paragraph', {}, ['Footer']),
          byRole('navigation', {}, [
            byRole('list', {}, [
              byRole('listitem', {}, ['Item 1']),
              byRole('listitem', {}, ['Item 2']),
            ]),
          ]),
        ]),
      ]),
    );
  });
});
