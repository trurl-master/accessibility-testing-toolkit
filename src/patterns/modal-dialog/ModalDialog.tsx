export const ModalDialog = () => {
  return (
    <>
      <button type="button">Add Delivery Address</button>
      <div id="dialog_layer" className="dialogs">
        <div
          role="dialog"
          id="dialog1"
          aria-labelledby="dialog1_label"
          aria-modal="true"
          className="hidden"
        >
          <h2 id="dialog1_label" className="dialog_label">
            Add Delivery Address
          </h2>
          <div className="dialog_form">
            <div className="dialog_form_item">
              <label>
                <span className="label_text">Street:</span>
                <input type="text" className="wide_input" />
              </label>
            </div>
            <div className="dialog_form_item">
              <label>
                <span className="label_text">City:</span>
                <input type="text" className="city_input" />
              </label>
            </div>
            <div className="dialog_form_item">
              <label>
                <span className="label_text">State:</span>
                <input type="text" className="state_input" />
              </label>
            </div>
            <div className="dialog_form_item">
              <label>
                <span className="label_text">Zip:</span>
                <input type="text" className="zip_input" />
              </label>
            </div>
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
                For example, gate code or other information to help the driver
                find you
              </div>
            </div>
          </div>
          <div className="dialog_form_actions">
            <button type="button">Verify Address</button>
            <button type="button">Add</button>
            <button type="button">Cancel</button>
          </div>
        </div>
        <div
          id="dialog2"
          role="dialog"
          aria-labelledby="dialog2_label"
          aria-describedby="dialog2_desc"
          aria-modal="true"
          className="hidden"
        >
          <h2 id="dialog2_label" className="dialog_label">
            Verification Result
          </h2>
          <div id="dialog2_desc" className="dialog_desc">
            <p tabIndex={-1} id="dialog2_para1">
              This is just a demonstration. If it were a real application, it
              would provide a message telling whether the entered address is
              valid.
            </p>
            <p>
              For demonstration purposes, this dialog has a lot of text. It
              demonstrates a scenario where:
            </p>
            <ul>
              <li>
                The first interactive element, the help link, is at the bottom
                of the dialog.
              </li>
              <li>
                If focus is placed on the first interactive element when the
                dialog opens, the validation message may not be visible.
              </li>
              <li>
                If the validation message is visible and the focus is on the
                help link, then the focus may not be visible.
              </li>
              <li>
                When the dialog opens, it is important that both:
                <ul>
                  <li>
                    The beginning of the text is visible so users do not have to
                    scroll back to start reading.
                  </li>
                  <li>The keyboard focus always remains visible.</li>
                </ul>
              </li>
            </ul>
            <p>There are several ways to resolve this issue:</p>
            <ul>
              <li>
                Place an interactive element at the top of the dialog, e.g., a
                button or link.
              </li>
              <li>
                Make a static element focusable, e.g., the dialog title or the
                first block of text.
              </li>
            </ul>
            <p>
              Please
              <em>DO NOT</em>
              make the element with role dialog focusable!
            </p>
            <ul>
              <li>
                The larger a focusable element is, the more difficult it is to
                visually identify the location of focus, especially for users
                with a narrow field of view.
              </li>
              <li>
                The dialog has a visual border, so creating a clear visual
                indicator of focus when the entire dialog has focus is not very
                feasible.
              </li>
              <li>
                Screen readers read the label and content of focusable elements.
                The dialog contains its label and a lot of content! If a dialog
                like this one has focus, the actual focus is difficult to
                comprehend.
              </li>
            </ul>
            <p>
              In this dialog, the first paragraph has
              <code>
                tabindex=
                <q>-1</q>
              </code>
              . The first paragraph is also contained inside the element that
              provides the dialog description, i.e., the element that is
              referenced by
              <code>aria-describedby</code>. With some screen readers, this may
              have one negative but relatively insignificant side effect when
              the dialog opens -- the first paragraph may be announced twice.
              Nonetheless, making the first paragraph focusable and setting the
              initial focus on it is the most broadly accessible option.
            </p>
          </div>
          <div className="dialog_form_actions">
            <a href="#">link to help</a>
            <button type="button">accepting an alternative form</button>
            <button type="button">Close</button>
          </div>
        </div>
        <div
          id="dialog3"
          role="dialog"
          aria-labelledby="dialog3_label"
          aria-describedby="dialog3_desc"
          aria-modal="true"
          className="hidden"
        >
          <h2 id="dialog3_label" className="dialog_label">
            Address Added
          </h2>
          <p id="dialog3_desc" className="dialog_desc">
            The address you provided has been added to your list of delivery
            addresses. It is ready for immediate use. If you wish to remove it,
            you can do so from
            <a href="#">your profile.</a>
          </p>
          <div className="dialog_form_actions">
            <button type="button" id="dialog3_close_btn">
              OK
            </button>
          </div>
        </div>
        <div
          id="dialog4"
          role="dialog"
          aria-labelledby="dialog4_label"
          aria-describedby="dialog4_desc"
          className="hidden"
          aria-modal="true"
        >
          <h2 id="dialog4_label" className="dialog_label">
            End of the Road!
          </h2>
          <p id="dialog4_desc" className="dialog_desc">
            You activated a fake link or button that goes nowhere! The link or
            button is present for demonstration purposes only.
          </p>
          <div className="dialog_form_actions">
            <button type="button" id="dialog4_close_btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
