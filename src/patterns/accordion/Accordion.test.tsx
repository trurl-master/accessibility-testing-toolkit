import { render } from '@testing-library/react';
import { Accordion } from './Accordion';
import { byRole } from '../../helpers/by-role';

describe('Accordion', () => {
  it('renders proper tree by default', () => {
    const { container } = render(<Accordion />);

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('heading', 'Personal Information', [
          byRole('button', 'Personal Information'),
        ]),
        byRole('region', 'Personal Information', [
          byRole('group', [
            byRole('paragraph', [
              byRole('LabelText', ['Name', ':']),
              byRole('textbox', 'Name :'),
            ]),
            byRole('paragraph', [
              byRole('LabelText', ['Email', ':']),
              byRole('textbox', 'Email :'),
            ]),
            byRole('paragraph', [
              byRole('LabelText', ['Phone:']),
              byRole('textbox', 'Phone:'),
            ]),
            byRole('paragraph', [
              byRole('LabelText', ['Extension:']),
              byRole('textbox', 'Extension:'),
            ]),
            byRole('paragraph', [
              byRole('LabelText', ['Country:']),
              byRole('textbox', 'Country:'),
            ]),
            byRole('paragraph', [
              byRole('LabelText', ['City/Province:']),
              byRole('textbox', 'City/Province:'),
            ]),
          ]),
        ]),
        byRole('heading', 'Billing Address'),
        byRole('heading', 'Shipping Address'),
      ])
    );
  });
});
