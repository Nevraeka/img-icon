(function (document, window) {

  const customElementsExist = !!window.customElements;

  if (!document.getElementById('#wc-polyfill') && !customElementsExist) {
    const script = document.createElement('script');
    script.id = 'wc-polyfill';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-sd-ce.js';
    document.head.appendChild(script);
  }

  function loadComponent() {
    if (!customElementsExist) {
      setTimeout(loadComponent, 0);
    } else {
      if (!!!window.customElements.get('img-icon')) {
        window.customElements.define('img-icon',
          class ImgIcon extends HTMLElement {
            static get observedAttributes() { return ['fill', 'key', 'shape']; }

            static get shapes() { return Object.keys(config()); }

            constructor() {
              super();
              this._root = null;
              this._state = {
                fill: 0,
                key: '',
                shape: 'star'
              };
            }

            connectedCallback() {
              if (this._root === null) {
                if (!!this.attachShadow) {
                  this._root = this.attachShadow({ mode: "open" });
                } else {
                  this._root = this;
                }
              }
              render(this);
            }

            attributeChangedCallback(name, oldValue, newValue) {
              if (newValue === oldValue) { return };
              if (name === 'key') { this._state.key = newValue; }
              if (name === 'shape') { this._state.shape = newValue; }
              if (name === 'fill') { this._state.fill = parseInt(newValue, 10); }
              render(this);
            }
          }
        );
      }


      function render(component) {
        const gradientId = `gradient-${component._state.key ? component._state.key : (Math.random() * 1001 / 2)}`;
        const fill = component._state.fill;
        const fillType = fill > 0 && fill < 100 ? 'gradient' : (fill >= 100 ? 'foreground-color' : 'background-color');

        if (!!component._root) {
          component._root.innerHTML =  `
          <style>
            :host {
              overflow: hidden;
              display: inline-block;
              margin: 0;
              width: 24px;
              height: 24px;
              padding: 0;
              outline-color: rgba(255,255,255,0);
            }

            .icon {
              height: 1.4em;
              width: 1.4em;
              stroke: none;
            }

            .background-stop-color {
              stop-color: var(--img-icon--base-color, #e0e0e0);
            }

            .background-color { 
              fill: var(--img-icon--base-color, #E0E0E0);
            }

            .foreground-color {
              fill: currentColor;
              fill: var(--img-icon--color, currentColor);
            }

            .foreground-stop-color {
              stop=color: #fff;
              stop-color: var(--img-icon--color, #fff);
            }

            .gradient {
              fill: url(#${gradientId});
            }
          </style>
          <svg class="${fillType} icon" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="${gradientId}">
              <stop class="foreground-stop-color" offset="${fill}%" />
              <stop class="background-stop-color" offset="${100 - fill}%" />
            </linearGradient>
            </defs>
            <g>
              <path d="${config()[component._state.shape]}" />
            </g>
          </svg>`;
        }
      }

      function config() {
        return {
          addPhoto: 'M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z',
          alertCircle: 'M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
          arrowDropDown: 'M7 10l5 5 5-5z',
          arrowDropUp: 'M7 14l5-5 5 5z',
          bell: 'M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z',
          chevronUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
          chevronDown: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z',
          chevronLeft: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z',
          chevronRight: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z',
          checkmark: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
          clock: 'M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z',
          close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
          creditCard: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z',
          directions: 'M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5Z',
          dropArrowDown: 'M7 10l5 5 5-5z',
          dropArrowUp: 'M7 14l5-5 5 5z',
          earth: 'M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
          email: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
          emailOutline: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z',
          fileCSV: 'M 6 2 C 4.898438 2 4 2.898438 4 4 L 4 8 C 2.894531 8 2 8.894531 2 10 L 2 15 C 2 16.105469 2.894531 17 4 17 L 4 20 C 4 21.101563 4.898438 22 6 22 L 18 22 C 19.101563 22 20 21.101563 20 20 L 20 4 C 20 2.898438 19.101563 2 18 2 Z M 6 4 L 18 4 L 18 10 C 18 8.894531 17.105469 8 16 8 L 6 8 Z M 5.71875 10.03125 C 7.203125 10.03125 7.367188 11.199219 7.40625 11.75 L 6.40625 11.75 C 6.40625 11.34375 6.382813 10.84375 5.71875 10.84375 C 5.457031 10.84375 4.96875 10.8125 4.96875 12.09375 L 4.96875 12.9375 C 4.96875 13.863281 5.148438 14.1875 5.6875 14.1875 C 6.257813 14.1875 6.40625 13.832031 6.40625 13.3125 L 7.40625 13.3125 C 7.382813 13.867188 7.167969 15 5.6875 15 C 3.988281 15 3.96875 13.273438 3.96875 12.9375 L 3.96875 12.09375 C 3.96875 11.246094 4.28125 10.03125 5.71875 10.03125 Z M 9.8125 10.03125 C 11.269531 10.03125 11.34375 11.3125 11.34375 11.53125 L 10.34375 11.53125 C 10.34375 11.429688 10.3125 10.8125 9.78125 10.8125 C 9.25 10.8125 9.21875 11.296875 9.21875 11.375 C 9.214844 12.21875 11.34375 12 11.34375 13.65625 C 11.34375 13.871094 11.28125 15 9.8125 15 C 8.207031 15 8.125 13.679688 8.125 13.40625 L 9.125 13.40625 C 9.125 13.550781 9.054688 14.21875 9.8125 14.21875 C 9.90625 14.21875 10.34375 14.167969 10.34375 13.65625 C 10.34375 12.585938 8.25 13.03125 8.25 11.375 C 8.25 11.175781 8.414063 10.03125 9.8125 10.03125 Z M 12.03125 10.09375 L 13.125 10.09375 L 13.9375 13.59375 L 14.78125 10.09375 L 15.875 10.09375 L 14.46875 14.9375 L 13.4375 14.9375 Z M 18 15 L 18 20 L 6 20 L 6 17 L 16 17 C 17.105469 17 18 16.105469 18 15 Z ',
          heart: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z',
          heartOutline: 'M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z',
          helpCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
          helpCircleOutline: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z',
          infoCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
          infoCircleOutline: 'M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z',
          lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
          location: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
          menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
          money: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
          pencil: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
          plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
          phone: 'M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z',
          print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
          search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
          star: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
          starHalf: 'M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
          starOutline: 'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
          shieldCheckmark: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z',
          trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
          triangleArrowDown: 'M7 10l5 5 5-5z',
          triangleArrowUp: 'M7 14l5-5 5 5z',
          userCircle: 'M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,5 C13.66,5 15,6.34 15,8 C15,9.66 13.66,11 12,11 C10.34,11 9,9.66 9,8 C9,6.34 10.34,5 12,5 Z M12,19.2 C9.5,19.2 7.29,17.92 6,15.98 C6.03,13.99 10,12.9 12,12.9 C13.99,12.9 17.97,13.99 18,15.98 C16.71,17.92 14.5,19.2 12,19.2 Z'
        };
      }
    }
  }
  loadComponent();

})(document, window);
