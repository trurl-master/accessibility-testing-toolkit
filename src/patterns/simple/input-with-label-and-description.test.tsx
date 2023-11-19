import { render } from '@testing-library/react';
import { byRole } from '../../helpers/by-role';

describe('InputWithLabelAndDescription', () => {
  it('renders', () => {
    const { container } = render(
      <div className="dialog_form_item">
        <label htmlFor="special_instructions">
          <span className="label_text">Special instructions:</span>
        </label>
        <input
          id="special_instructions"
          type="text"
          aria-describedby="special_instructions_desc"
          className="wide_input"
        />
        <div className="label_info" id="special_instructions_desc">
          For example, gate code or other information to help the driver find
          you
        </div>
      </div>
    );

    expect(container).toHaveA11yTree(
      byRole('generic', [
        byRole('LabelText', ['Special instructions:']),
        byRole('textbox', 'Special instructions:'),
        'For example, gate code or other information to help the driver find you',
      ])
    );
  });
});
