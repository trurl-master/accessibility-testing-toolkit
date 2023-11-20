import { render } from '@testing-library/react';
import { byRole } from '../helpers/by-role';
import { configToolkit } from '../config';

describe('inaccessible', () => {
  it('skips subtrees with hidden property', () => {
    const { container } = render(
      <div>
        <div hidden>
          <p>Hidden paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])])
    );
  });

  it('skips subtrees with aria-hidden property', () => {
    const { container } = render(
      <div>
        <div aria-hidden>
          <p>Hidden paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])])
    );
  });

  it("doesn't skipp subtrees with aria-hidden property set to false", () => {
    const { container } = render(
      <div>
        <div aria-hidden="false">
          <p>Not hidden paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [
        byRole('paragraph', ['Not hidden paragraph']),
        byRole('paragraph', ['Visible paragraph']),
      ])
    );
  });

  it('skips subtrees with visibility: hidden', () => {
    const { container } = render(
      <div>
        <div style={{ visibility: 'hidden' }}>
          <p>Invisible paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])])
    );
  });

  it('skips subtrees with display: none', () => {
    const { container } = render(
      <div>
        <div style={{ display: 'none' }}>
          <p>Hidden paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])])
    );
  });

  it('skips subtrees with custom isSubtreeInaccessible function', () => {
    const { container } = render(
      <div>
        <div className="hidden">
          <p>Hidden paragraph</p>
        </div>
        <div className="invisible">
          <p>Invisible paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])]),
      {
        isInaccessibleOptions: {
          isSubtreeInaccessible: (element) =>
            // tailwindcss classes: hidden, invisible
            element.classList.contains('hidden') ||
            element.classList.contains('invisible'),
        },
      }
    );
  });

  it('skips subtrees with custom isSubtreeInaccessible function set globally', () => {
    configToolkit({
      isInaccessibleOptions: {
        isSubtreeInaccessible: (element) =>
          // tailwindcss classes: hidden, invisible
          element.classList.contains('hidden') ||
          element.classList.contains('invisible'),
      },
    });

    const { container } = render(
      <div>
        <div className="hidden">
          <p>Hidden paragraph</p>
        </div>
        <div className="invisible">
          <p>Invisible paragraph</p>
        </div>
        <p>Visible paragraph</p>
      </div>
    );

    expect(container.firstChild).toHaveA11yTree(
      byRole('generic', [byRole('paragraph', ['Visible paragraph'])])
    );

    configToolkit({
      isInaccessibleOptions: {
        isSubtreeInaccessible: undefined,
      },
    });
  });
});
