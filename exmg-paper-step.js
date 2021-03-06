import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-styles/paper-styles.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import './exmg-paper-stepper-icons.js';

/**
  * `<exmg-paper-step>` Item for exmg-paper stepper element

  *  ### Styling
  *
  * `<exmg-paper-step>` provides the following custom properties and mixins
  *  for styling:
  *
  *  Custom property | Description | Default
  *  ----------------|-------------|----------
  *  `--exmg-paper-step` | Mixing for item |`{}`
  *  `--exmg-paper-step-hover` | Mixing for item hover | `{}`
  *  `--exmg-paper-step-circle` |  Mixing for circle  | `{}`
  *  `--exmg-paper-step-finished-circle` | Mixing for finished circle | `{}`
  *  `--exmg-paper-step-selected-circle` | Mixing for selected circle | `{}`
  *  `--exmg-paper-step-label` | Mixing for label | `{}`
  *  `--exmg-paper-step-selected-label` | Mixing for selected label | `{}`
  *
  *
  * @customElement
  * @polymer
  * @memberof Exmg
  * @group Exmg Paper Elements
  * @demo demo/index.html
  */

class PaperStepElement extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          cursor: pointer;
          @apply --layout-flex;
        }
        .container {
          text-align: center;
          width: 100%;
          position: relative;
          padding: 24px 0;
          @apply --exmg-paper-step;
        }
        .container:hover {
          background: var(--paper-grey-100);
          @apply --exmg-paper-step-hover;
        }
        paper-ripple {
          color: var(--primary-color);
        }
        .circleWrapper {
          @apply --layout-flex;
          @apply --layout;
          @apply --layout-center;
          width: 100%;
        }
        .circleWrapper::after, .circleWrapper::before {
          content: '';
          height: 1px;
          min-width: 16px;
          background: var(--paper-grey-400);
          @apply --layout-flex;
        }
        .circle {
          @apply --layout;
          @apply --layout-center;
          @apply --layout-center-justified;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-sizing: border-box;
          background: black;
          font-size: 12px;
          opacity: .38;
          color: white;
          margin: 0 8px;
          font-weight: 300;
          @apply --exmg-paper-step-circle;
        }
        .circle iron-icon {
          display: none;
        }
        :host([finished]) .circle {
          opacity: 1;
          background: var(--primary-color);
          color: white;
          @apply --exmg-paper-step-finished-circle;
        }
        :host([finished]) .circle > span {
          display: none;
        }
        :host([finished]) .circle iron-icon {
          width: 16px;
          height: 16px;
          display: block;
          fill: white;
        }
        :host(.iron-selected) .circle {
          background: var(--primary-color);
          color: white;
          opacity: 1;
          @apply --exmg-paper-step-selected-circle;
        }
        .label {
          margin-top: 12px;
          color: black;
          opacity: .87;
          @apply --exmg-paper-step-label;
        }
        :host(.iron-selected) .label {
          @apply --exmg-paper-step-selected-label;
        }
        :host(:first-of-type) .circleWrapper::before  {
          visibility: hidden;
        }
        :host(:last-of-type) .circleWrapper::after  {
          visibility: hidden;
        }
      </style>
      <div class="container" on-tap="_handleTap">
        <paper-ripple></paper-ripple>
        <div class="circleWrapper">
          <div class="circle">
            <iron-icon icon="exmg-paper-stepper-icons:check"></iron-icon>
            <span>[[index]]</span>
          </div>
        </div>
        <div class="label">[[label]]
      </div>
    </div>
  `;
  }

  static get is() {
    return 'exmg-paper-step';
  }
  static get properties() {
    return {
      index: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
      },
      label: {
        type: String,
        value: ''
      },
      finished: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
      }
    };
  }
  setIndex(index) {
    this.set('index', index);
  }
  _handleTap(e) {
    this.select();
  }
  setFinished(finished) {
    if (this.finished !== finished) {
      this.set('finished', finished);
    }
  }
  select() {
    this.dispatchEvent(new CustomEvent('selected', {bubbles: true, composed: true, detail: {index: this.index, item: this}}));
  }
}

window.customElements.define(PaperStepElement.is, PaperStepElement);
