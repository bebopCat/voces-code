import {LitElement, html, css} from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {styleMap} from 'lit/directives/style-map.js';

export class InfoContainer extends LitElement {
    static styles = css`
        :host {
            display: block;
            position: absolute;
            top: 0;
            margin 0;
            width: 100%;
            height: 100%;
            background-color: #1f2124;
            z-index: 999;
            transition: all .5s ease-in-out;
            overflow: scroll;
            font-family: sans-serif;
            padding: 30px;
            box-sizing: border-box;
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        h1 {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50px;
            left: 0;
            text-align: center;
            font-family: openSansMedium;
            font-size: 1.5rem;
            color: white;
            width: 100%;
            box-sizing: border-box;
        }
        h4 {
            color: gold;
            font-size: .7rem;
            font-family: openSansMedium;
        }
        p {
            color: gainsboro;
            font-size: 5vmin;
            -moz-hyphens:auto;
            -ms-hyphens:auto;
            -webkit-hyphens:auto;
            -o-hyphens:auto;
            hyphens:auto;
            word-wrap:break-word;
            box-sizing: border-box;
            font-family: LouisGeorgeCafe-Medium;
        }
    `;
    
    // Define propiedades cuyo valor viene del elemento padre <cards-element>
    static properties = {
        infoData: {state: true},
        mover: {type: Boolean},
    }

    constructor() {
        super();
        this.mover = false;
    }

    firstUpdated() {
        // Manejamos estilos de la vista escritorio de lso textos ya que al usar
        // unsafeHHTML no los podemos asignar con styleMap().
        let textArr = this.renderRoot.querySelectorAll('p');
        if (window.innerWidth > 1000) {
            textArr.forEach((text) => {
                text.style.fontSize = '3vmin';
            })
        }
    }
    // unsafeHTML() representa una cadena de texto como HTML.
    render() {
        const titleStyles = {
            display: window.matchMedia("(min-width: 600px)").matches ? 'block' : 'none',
        }
        const subtitleStyles = {
            marginTop: window.matchMedia("(min-width: 600px)").matches ? '120px' : '3px',
            fontSize: window.matchMedia("(min-width: 600px)").matches ? '3vmin' : '8vw',
            textAlign: window.matchMedia("(min-width: 600px)").matches ? 'left' : 'center'
        }
        const textStyles = {
            fontSize: window.matchMedia("(min-width: 600px)").matches ? '3vmin' : '5vmin',
        }

        return html`
            <article>
                <h1 style="${styleMap(titleStyles)}">${this.infoData.nombre}</h1>
                <h4 style="${styleMap(subtitleStyles)}">Banda: ${this.infoData.banda}</h4>
                <p>${this.infoData.genero}</p>
            </article>
            <article style="${styleMap(textStyles)}">
                ${unsafeHTML(this.infoData.biografia)}
            </article>
        `;
    }

    // Si dentro de las propiedades que cambiaron esta
    // this.mover se ejecuta la función this.move()
    updated(changedProperties) {
        if (changedProperties.has('mover')) {
            this.move();
        }
    }

    move() {
        if (this.mover) {
            if (window.matchMedia("(min-width: 600px)").matches) {
                // La pantalla tiene mas de 720px de ancho
                setTimeout(() => {
                    // Mueve hacia la derecha <info-container> tres veces su ancho.
                    this.style.transform = `translate(75vw, 0px)`;
                    this.style.width = `25vw`;
                }, 700);
            } else {
                // La pantalla tiene menos de 720px de ancho
                setTimeout(() => {
                    // Mueve hacia la derecha <info-container> tres veces su ancho.
                    this.style.transform = `translate(0px, 60vh)`;
                    this.style.height = `40vh`;
                }, 700);
            }

        } else {
            if (window.matchMedia("(min-width: 600px)").matches) {
                // La pantalla tiene mas de 720px de ancho
                // Mueve hacia la derecha <info-container> hasta
                // quedar a 0px de su lugar original.
                this.style.transform = `translate(0px, 0px)`;
                this.style.width = `100%`;
            } else {
                // La pantalla tiene menos de 720px de ancho
                this.style.transform = `translate(0px, 0px)`;
                this.style.height = `100%`;
            }
        }
    }
}

// crea el componente <info-container> en base a la clase InfoContainer.
customElements.define('info-container', InfoContainer);