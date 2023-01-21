import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

export class TopeComponent extends LitElement {
    static styles = css`
        .tope {
            width: 100%;
        }
    `;

    render() {
        const styles = { 
            height: window.matchMedia("(min-width: 600px)").matches ? '96px' : '50px',
        }
        return html`
            <div class="tope" style=${styleMap(styles)}></div>
        `;
    }
}

// crea el componente <page-title> en base a la clase PageTitle.
customElements.define('tope-component', TopeComponent);