import { render } from '@testing-library/react';
import { byRole } from '..';

describe('Matching properties', () => {
  describe('Simple properties', () => {
    it('passes when roles match', () => {
      const { container } = render(<a href="/">Valid link</a>);

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('link', { name: 'Valid link' })])
      );
    });

    it("when roles don't match", () => {
      const { container } = render(<a>invalid link</a>);

      expect(container).not.toHaveA11yTree(
        byRole('generic', [byRole('link', { name: 'invalid link' })])
      );
    });

    it('passes when names match', () => {
      const { container } = render(<a href="/">Valid link</a>);

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('link', { name: 'Valid link' })])
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('link', { name: /Valid/ })])
      );
    });

    it("when names don't match", () => {
      const { container } = render(<a href="/">Valid link</a>);

      expect(container).not.toHaveA11yTree(
        byRole('generic', [byRole('link', { name: 'Invalid label' })])
      );

      expect(container).not.toHaveA11yTree(
        byRole('generic', [byRole('link', { name: /Valid label/ })])
      );
    });

    it('passes when descriptions match', () => {
      const { container } = render(
        <img src="image.png" aria-description="Valid description" />
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('img', { description: 'Valid description' })])
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('img', { description: /Valid/ })])
      );
    });

    it("when descriptions don't match", () => {
      const { container } = render(
        <img src="image.png" aria-description="Valid description" />
      );

      expect(container).not.toHaveA11yTree(
        byRole('generic', [
          byRole('img', { description: 'Invalid description' }),
        ])
      );

      expect(container).not.toHaveA11yTree(
        byRole('generic', [byRole('img', { description: /Invalid/ })])
      );
    });
  });

  describe('State properties', () => {
    describe('busy', () => {
      it('passes when busy match', () => {
        const { container } = render(
          <button aria-busy="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid button', busy: true }),
          ])
        );
      });

      it("when busy don't match", () => {
        const { container } = render(
          <button aria-busy="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid button', busy: true }),
          ])
        );
      });
    });

    describe('checked', () => {
      it('passes when checked match', () => {
        const { container } = render(<input type="checkbox" defaultChecked />);

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('checkbox', { checked: true })])
        );
      });

      it("when checked don't match", () => {
        const { container } = render(<input type="checkbox" />);

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('checkbox', { checked: true })])
        );
      });

      it('passes when mixed checked match', () => {
        const { container } = render(<input type="checkbox" />);

        // set indeterminate
        const checkbox = container.querySelector('input');

        if (checkbox) {
          checkbox.indeterminate = true;
        }

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('checkbox', { checked: undefined })])
        );
      });

      it("when mixed checked don't match", () => {
        const { container } = render(<input type="checkbox" />);

        // set indeterminate
        const checkbox = container.querySelector('input');

        if (checkbox) {
          checkbox.indeterminate = true;
        }

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('checkbox', { checked: true })])
        );
      });

      it('passes when aria-checked match', () => {
        const { container } = render(
          <button aria-checked="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('button', { checked: true })])
        );
      });

      it("when aria-checked don't match", () => {
        const { container } = render(
          <button aria-checked="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('button', { checked: true })])
        );
      });
    });

    describe('current', () => {
      it('passes when current match, as boolean', () => {
        const { container } = render(
          <button aria-current="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('button', { current: true })])
        );
      });

      it("when current don't match, as boolean", () => {
        const { container } = render(
          <button aria-current="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('button', { current: true })])
        );
      });

      it('passes when aria-current match, as string', () => {
        const { container } = render(
          <button aria-current="page">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('button', { current: 'page' })])
        );
      });

      it("when aria-current don't match, as string", () => {
        const { container } = render(
          <button aria-current="step">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('button', { current: 'page' })])
        );
      });
    });

    describe('disabled', () => {
      it('passes when disabled match', () => {
        const { container } = render(<button disabled>Valid button</button>);

        expect(container).toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid button', disabled: true }),
          ])
        );
      });

      it("when disabled don't match", () => {
        const { container } = render(<button>Valid button</button>);

        expect(container).not.toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid buttonn', disabled: true }),
          ])
        );
      });
    });

    describe('expanded', () => {
      it('passes when native expanded match', () => {
        const { container } = render(
          <details open>
            <summary>Valid details</summary>
            Content
          </details>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [
            byRole('group', { expanded: true }, [
              { name: 'Valid details' },
              'Content',
            ]),
          ])
        );
      });

      it("when native expanded don't match", () => {
        const { container } = render(
          <details>
            <summary>Valid details</summary>
            Content
          </details>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [
            byRole('group', [
              byRole('button', { name: 'Valid details', expanded: true }),
            ]),
          ])
        );
      });

      it('passes when aria-expanded match', () => {
        const { container } = render(
          <button aria-expanded="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid button', expanded: true }),
          ])
        );
      });

      it("when aria-expanded don't match", () => {
        const { container } = render(
          <button aria-expanded="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [
            byRole('button', { name: 'Valid button', expanded: true }),
          ])
        );
      });
    });

    describe('pressed', () => {
      it('passes when pressed match', () => {
        const { container } = render(
          <button aria-pressed="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('button', { pressed: true })])
        );
      });

      it("when pressed don't match", () => {
        const { container } = render(
          <button aria-pressed="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('button', { pressed: true })])
        );
      });
    });

    describe('selected', () => {
      it('passes when selected match, native selected', () => {
        const { container } = render(
          <select defaultValue="first">
            <option value="first">Selected option</option>
            <option value="second">Non-selected option</option>
          </select>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [
            byRole('combobox', [
              byRole('option', { selected: true }),
              byRole('option', { selected: false }),
            ]),
          ])
        );
      });

      it("when selected don't match, native selected", () => {
        const { container } = render(
          <select defaultValue="second">
            <option value="first">Selected option</option>
            <option value="second">Non-selected option</option>
          </select>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [
            byRole('combobox', [
              byRole('option', { selected: true }),
              byRole('option', { selected: false }),
            ]),
          ])
        );
      });

      it('passes when selected match, aria-selected', () => {
        const { container } = render(
          <button aria-selected="true">Valid button</button>
        );

        expect(container).toHaveA11yTree(
          byRole('generic', [byRole('button', { selected: true })])
        );
      });

      it("when selected don't match, aria-selected", () => {
        const { container } = render(
          <button aria-selected="false">Valid button</button>
        );

        expect(container).not.toHaveA11yTree(
          byRole('generic', [byRole('button', { selected: true })])
        );
      });
    });
  });

  describe('Query properties', () => {
    test('query by heading level', () => {
      const { container } = render(
        <div>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [
          byRole('heading', { level: 1 }),
          byRole('heading', { level: 2 }),
          byRole('heading', { level: 3 }),
          byRole('heading', { level: 4 }),
          byRole('heading', { level: 5 }),
          byRole('heading', { level: 6 }),
        ])
      );
    });

    test('value properties', () => {
      const { container } = render(
        <section>
          <button
            role="spinbutton"
            aria-valuenow={5}
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuetext="medium"
          >
            Volume
          </button>
          <button
            role="spinbutton"
            aria-valuenow={3}
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuetext="medium"
          >
            Pitch
          </button>
        </section>
      );

      expect(container).toHaveA11yTree(
        byRole('generic', [
          byRole(
            'spinbutton',
            {
              value: {
                now: 5,
                min: 0,
                max: 10,
                text: 'medium',
              },
            },
            ['Volume']
          ),
          byRole(
            'spinbutton',
            {
              value: {
                now: 3,
                min: 0,
                max: 10,
                text: 'medium',
              },
            },
            ['Pitch']
          ),
        ])
      );
    });
  });

  describe('Children', () => {
    it('passes when children match', () => {
      const { container } = render(<button>Valid button</button>);

      expect(container).toHaveA11yTree(
        byRole('generic', [byRole('button', { name: 'Valid button' })])
      );
    });

    it("doesn't pass when children don't match", () => {
      const { container } = render(<button>Invalid button</button>);

      expect(container).not.toHaveA11yTree(
        byRole('generic', [byRole('button', { name: 'Valid button' })])
      );
    });

    describe('Composition', () => {
      describe('One child', () => {
        describe('Pass', () => {
          it('string match', () => {
            const { container } = render(<div>Text</div>);

            expect(container).toHaveA11yTree(byRole('generic', ['Text']));
          });

          it('regexp match', () => {
            const { container } = render(<div>Text</div>);

            expect(container).toHaveA11yTree(byRole('generic', [/Text/]));
          });

          it('role match', () => {
            const { container } = render(
              <div>
                <button>Valid button</button>
              </div>
            );

            expect(container).toHaveA11yTree(
              byRole('generic', [byRole('button', 'Valid button')])
            );
          });
        });

        describe('Miss received', () => {
          it('string match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', ['Valid button'])
            );
          });

          it('regexp match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', [/Valid button/])
            );
          });

          it('role match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', [byRole('button', 'Valid button')])
            );
          });
        });

        describe('Miss expected', () => {
          it('string match', () => {
            const { container } = render(<div>Valid button</div>);

            expect(container).not.toHaveA11yTree(byRole('generic', []));
          });

          it('regexp match', () => {
            const { container } = render(<div>Valid button</div>);

            expect(container).not.toHaveA11yTree(byRole('generic', [/^$/]));
          });

          it('role match', () => {
            const { container } = render(<button>Valid button</button>);

            expect(container).not.toHaveA11yTree(byRole('generic', []));
          });
        });

        describe('Wrong node', () => {
          it('passes when no child text passed', () => {
            const { container } = render(<p>Text</p>);

            expect(container).toHaveA11yTree(
              byRole('generic', [byRole('paragraph')])
            );
          });

          it('fails when mixed children, and missed expected', () => {
            const { container } = render(
              <p>
                text
                <a href="#">link text</a>
              </p>
            );

            expect(container).not.toHaveA11yTree(
              byRole('generic', [byRole('paragraph', ['text'])])
            );

            expect(container).toHaveA11yTree(
              byRole('generic', [
                byRole('paragraph', ['text', byRole('link', ['link text'])]),
              ])
            );
          });
        });
      });

      describe('Multiple children', () => {
        describe('Pass', () => {
          it('string match', () => {
            const { container } = render(
              <div>
                <div>Text 1</div>
                <div>Text 2</div>
              </div>
            );

            expect(container).toHaveA11yTree(
              byRole('generic', ['Text 1', 'Text 2'])
            );
          });

          it('regexp match', () => {
            const { container } = render(
              <div>
                <div>Text 1</div>
                <div>Text 2</div>
              </div>
            );

            expect(container).toHaveA11yTree(
              byRole('generic', [/Text 1/, /Text 2/])
            );
          });

          it('role match', () => {
            const { container } = render(
              <div>
                <button>Text 1</button>
                <button>Text 2</button>
              </div>
            );

            expect(container).toHaveA11yTree(
              byRole('generic', [
                byRole('button', 'Text 1'),
                byRole('button', 'Text 2'),
              ])
            );
          });
        });

        describe('Miss received', () => {
          it('string match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', ['Text 1', 'Text 2'])
            );
          });

          it('regexp match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', [/Text 1/, /Text 2/])
            );
          });

          it('role match', () => {
            const { container } = render(<div></div>);

            expect(container).not.toHaveA11yTree(
              byRole('generic', [
                byRole('button', 'Text 1'),
                byRole('button', 'Text 2'),
              ])
            );
          });
        });

        describe('Miss expected', () => {
          it('string match, all miss', () => {
            const { container } = render(
              <div>
                <div>Text 1</div>
                <div>Text 2</div>
              </div>
            );

            expect(container).not.toHaveA11yTree(byRole('generic', []));
          });

          it('string match, 1 miss', () => {
            const { container } = render(
              <div>
                <div>Text 1</div>
                <div>Text 2</div>
              </div>
            );

            expect(container).not.toHaveA11yTree(byRole('generic', ['Text 1']));
          });

          it('role match, all miss', () => {
            const { container } = render(
              <div>
                <button>Text 1</button>
                <button>Text 2</button>
              </div>
            );

            expect(container).not.toHaveA11yTree(byRole('generic', []));
          });

          it('role match, 1 miss', () => {
            const { container } = render(
              <div>
                <button>Text 1</button>
                <button>Text 2</button>
              </div>
            );

            expect(container).not.toHaveA11yTree(
              byRole('generic', [byRole('button', 'Text 1')])
            );
          });
        });
      });
    });
  });
});
