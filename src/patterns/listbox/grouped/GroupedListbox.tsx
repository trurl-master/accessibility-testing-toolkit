import { useEffect } from 'react';
import { AriaListbox } from './ariaListbox';

export const GroupedListbox = () => {
  useEffect(() => {
    new AriaListbox(document.getElementById('ss_elem_list'));
  }, []);

  return (
    <div className="listbox-area">
      <div>
        <span id="ss_elem" className="listbox-label">
          Choose your animal sidekick
        </span>
        <div
          id="ss_elem_list"
          tabIndex={0}
          role="listbox"
          aria-labelledby="ss_elem"
        >
          <ul role="group" aria-labelledby="cat1">
            <li role="presentation" id="cat1">
              Land
            </li>
            <li id="ss_elem_1" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Cat
            </li>
            <li id="ss_elem_2" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Dog
            </li>
            <li id="ss_elem_3" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Tiger
            </li>
            <li id="ss_elem_4" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Reindeer
            </li>
            <li id="ss_elem_5" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Raccoon
            </li>
          </ul>
          <ul role="group" aria-labelledby="cat2">
            <li role="presentation" id="cat2">
              <span className="checkmark" aria-hidden="true"></span>
              Water
            </li>
            <li id="ss_elem_6" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Dolphin
            </li>
            <li id="ss_elem_7" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Flounder
            </li>
            <li id="ss_elem_8" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Eel
            </li>
          </ul>
          <ul role="group" aria-labelledby="cat3">
            <li role="presentation" id="cat3">
              Air
            </li>
            <li id="ss_elem_9" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Falcon
            </li>
            <li id="ss_elem_10" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Winged Horse
            </li>
            <li id="ss_elem_11" role="option">
              <span className="checkmark" aria-hidden="true"></span>
              Owl
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
