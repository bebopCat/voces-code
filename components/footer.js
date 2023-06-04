import {LitElement, html, css} from 'lit';

export class FooterComponent extends LitElement {
    static styles = css`
        :host {
            position: fixed;
            bottom: 2vw;
            left: 4vw;
        }
        p {
            color: gold;
            font-family: OpenSansMedium;
        }
        span {
            font-family: providence;
        }
    `;

    render() {
        return html`
            <p class="pie"><span class="logo">Bebopcat<span> dev</p>
        `;
    }
}

// crea el componente <page-title> en base a la clase PageTitle.
customElements.define('footer-component', FooterComponent);