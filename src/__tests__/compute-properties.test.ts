import { computeRoles } from '../compute-properties';

describe('computeRoles', () => {
  it('should return the role attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('role', 'button');

    expect(computeRoles(element, false)).toEqual(['button']);
  });

  it('should return the implicit role', () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'https://www.example.com');

    expect(computeRoles(element, false)).toEqual(['link']);
  });

  it('should return the implicit role for non-landmark roles', () => {
    const element = document.createElement('header');

    expect(computeRoles(element, true)).toEqual(['HeaderAsNonLandmark']);
  });

  it('should return virtual roles', () => {
    const element = document.createElement('label');

    expect(computeRoles(element, false)).toEqual(['LabelText']);
  });
});
