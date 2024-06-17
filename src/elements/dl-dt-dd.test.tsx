import { render } from '@testing-library/react';
import { byRole } from '..';

describe('dl-dt-dd', () => {
  it('renders correct structure', () => {
    const { container } = render(
      <>
        <p>Cryptids of Cornwall:</p>

        <dl>
          <dt>Beast of Bodmin</dt>
          <dd>A large feline inhabiting Bodmin Moor.</dd>

          <dt>Morgawr</dt>
          <dd>A sea serpent.</dd>

          <dt>Owlman</dt>
          <dd>A giant owl-like creature.</dd>
        </dl>
      </>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('paragraph', ['Cryptids of Cornwall:']),
        byRole('DescriptionList', [
          byRole('term', ['Beast of Bodmin']),
          byRole('definition', ['A large feline inhabiting Bodmin Moor.']),
          byRole('term', ['Morgawr']),
          byRole('definition', ['A sea serpent.']),
          byRole('term', ['Owlman']),
          byRole('definition', ['A giant owl-like creature.']),
        ]),
      ])
    );
  });
});
