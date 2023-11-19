import { renderProperties } from './render-properties';

describe('renderProperties', () => {
  it('should render correct string', () => {
    const tree = {
      a: 'value1',
      b: true,
      c: {
        d: 'subvalue1',
        e: 123,
      },
      f: /\d+/g,
      g: (content: string) => content.includes('match'),
      h: undefined,
    };

    expect(renderProperties(tree)).toBe(
      'a="value1" b=true c.d="subvalue1" c.e=123 f=/\\d+/g g=Function'
    );
  });
});
