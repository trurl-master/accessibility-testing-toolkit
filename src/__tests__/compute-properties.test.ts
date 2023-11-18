import { computeRoles } from '../tree/compute-properties';

describe('computeRoles', () => {
  it('should return the role attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('role', 'button');

    expect(
      computeRoles(element, {
        isNonLandmarkSubtree: false,
      })
    ).toEqual(['button']);
  });

  it('should return the implicit role', () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'https://www.example.com');

    expect(
      computeRoles(element, {
        isNonLandmarkSubtree: false,
      })
    ).toEqual(['link']);
  });

  it('should return the implicit role for non-landmark roles', () => {
    const element = document.createElement('header');

    expect(
      computeRoles(element, {
        isNonLandmarkSubtree: true,
      })
    ).toEqual(['HeaderAsNonLandmark']);
  });

  it('should return virtual roles', () => {
    const element = document.createElement('label');

    expect(
      computeRoles(element, {
        isNonLandmarkSubtree: false,
      })
    ).toEqual(['LabelText']);
  });
});
