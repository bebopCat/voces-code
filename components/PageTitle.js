import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

import './footer.js';

export class PageTitle extends LitElement {
    static styles = css`
        :host {
            top: 0px;
            margin: 0px;
            display: block;
            width: 100%;
            text-align: center;
            font-family: OpenSansMedium;
            font-size: 4.5vmin;
            position: fixed;
            z-index: 1003;
            color: #1f2124;
        }
        h1 {
            width: 100%;
            padding: 10px 0 10px 0;
            margin: 0px;
            transition: all .5s ease;
        }
    `;

    // Define una propiedad para el scroll.
    static properties = {
        scroll: {},
        active: { type: String }
    }

    constructor() {
        super();
    }

    // asignamos el valor de scrollY a la propiedad
    // this.scroll cada vez que ocurre un scroll.
    getScroll = window.onscroll = () => {
        this.scroll = window.scrollY;
    }
    getSize = window.onresize = () => {
        console.log(innerWidth);
    }

    render() {
        return html`
            <h1 style=${styleMap(this.getStyles())}>Voces</h1>
            <footer-component></footer-component>
        `;
    }

    getStyles() {
        const styles = {
            // font-size: window.matchMedia("(min-width: 400px)").matches ?  :, 
            backgroundColor: this.scroll > 176 ? 'rgba(0, 0, 0, 0)' : 'gold',
            color: this.scroll > 176 ? 'gold' : 'black',
            padding: this.scroll > 176 ? '0 0 0 0' : '10px 0 10px 0',
            fontSize: this.scroll > 176 ? '12vmin' : null,
        }
        return styles;
    }    
}


// crea el componente <page-title> en base a la clase PageTitle.
customElements.define('page-title', PageTitle);