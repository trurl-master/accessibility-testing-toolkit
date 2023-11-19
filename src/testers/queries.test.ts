import { queriesTester } from './queries';

const definedQueries = {
  level: 1,
  value: {
    min: 0,
    max: 100,
    now: 50,
    text: '50%',
  },
};

describe('queriesTester', () => {
  it('returns true if expected is undefined', () => {
    expect(queriesTester(definedQueries, undefined)).toBe(true);
  });

  describe('level', () => {
    it('returns true if expected level is undefined', () => {
      expect(
        queriesTester(definedQueries, {
          level: undefined,
        })
      ).toBe(true);
    });

    it('returns true if expected level is defined and matches', () => {
      expect(
        queriesTester(definedQueries, {
          level: 1,
        })
      ).toBe(true);
    });

    it('returns false if expected level is defined and does not match', () => {
      expect(
        queriesTester(definedQueries, {
          level: 2,
        })
      ).toBe(false);
    });
  });

  describe('value', () => {
    it('returns true if expected value is undefined', () => {
      expect(
        queriesTester(definedQueries, {
          value: undefined,
        })
      ).toBe(true);
    });

    describe('value.min', () => {
      it('returns true if expected value.min is undefined', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              min: undefined,
            },
          })
        ).toBe(true);
      });

      it('returns true if expected value.min is defined and matches', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              min: 0,
            },
          })
        ).toBe(true);
      });

      it('returns false if expected value.min is defined and does not match', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              min: 1,
            },
          })
        ).toBe(false);
      });
    });

    describe('value.max', () => {
      it('returns true if expected value.max is undefined', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              max: undefined,
            },
          })
        ).toBe(true);
      });

      it('returns true if expected value.max is defined and matches', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              max: 100,
            },
          })
        ).toBe(true);
      });

      it('returns false if expected value.max is defined and does not match', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              max: 101,
            },
          })
        ).toBe(false);
      });
    });

    describe('value.now', () => {
      it('returns true if expected value.now is undefined', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              now: undefined,
            },
          })
        ).toBe(true);
      });

      it('returns true if expected value.now is defined and matches', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              now: 50,
            },
          })
        ).toBe(true);
      });

      it('returns false if expected value.now is defined and does not match', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              now: 51,
            },
          })
        ).toBe(false);
      });
    });

    describe('value.text', () => {
      it('returns true if expected value.text is undefined', () => {
        expect(
          queriesTester(definedQueries, {
            value: {
              text: undefined,
            },
          })
        ).toBe(true);
      });

      describe('returns true if expected value.text is defined and matches', () => {
        it('string', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: '50%',
              },
            })
          ).toBe(true);
        });

        it('number', () => {
          expect(
            queriesTester(
              {
                ...definedQueries,
                value: {
                  ...definedQueries.value,
                  text: '50',
                },
              },
              {
                value: {
                  text: 50,
                },
              }
            )
          ).toBe(true);
        });

        it('RegExp', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: /50%/,
              },
            })
          ).toBe(true);
        });

        it('function', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: (text) => text === '50%',
              },
            })
          ).toBe(true);
        });
      });

      describe('returns true if expected value.text is defined and does not match', () => {
        it('string', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: '51%',
              },
            })
          ).toBe(false);
        });

        it('number', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: 51,
              },
            })
          ).toBe(false);
        });

        it('RegExp', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: /51%/,
              },
            })
          ).toBe(false);
        });

        it('function', () => {
          expect(
            queriesTester(definedQueries, {
              value: {
                text: (text) => text === '51%',
              },
            })
          ).toBe(false);
        });
      });
    });
  });
});
