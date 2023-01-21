import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import './VideoContainer.js';
import './InfoContainer.js';
import { getMapStyles } from '../dinamicStyles/dinamicStyles.js';

// Define estilos.
export class CardsElement extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
            height: 450px;
            background: lightgray;
            width: 100%
        }
        .movible {
            display: inline-block;
            position: relative;
            height: 100%;
            width: 100%;
            transition: all .5s ease-in-out;
            overflow: hidden;
            box-sizing: border-box;
        }
        .sombra {
            background-color: rgba(19,30,33,0.4);
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            transition: all .5s ease-in-out;
            z-index: 1002;
        }
        .sombra:hover {
            background-color: rgba(19,30,33,0.0);
        }
        .bordes {
            position: absolute;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(119, 136, 153,0);
            z-index: 1001;
            transition: all .5s ease-in-out;
            cursor: pointer;
        }
        .sombra:hover .bordes {
            border: 10px solid rgba(47, 79, 79,0.3);
        }
        .img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1001;
            transition: all .5s ease-in-out;
        }
        .titulo {
            position: absolute;
            text-transform: uppercase;
            font-family: openSansMedium;
            font-weight: 400;
            font-size: 1.2vw;
            padding: 10px;
            padding-left: 25px;
            box-sizing: border-box;
            top: 61%;
            color: #ffffff;
            width: 100%;
            right: -100%;
            transition: all .5s ease-in-out;
            z-index: 1002;
        }
        .sombra:hover .titulo {
            background-color: teal;
            right: 0;
        }
        .subtitulo {
            position: absolute;
            font-family: openSansMedium;
            font-weight: 100;
            font-size: 1vw;
            text-align: right;
            padding: 5px;
            padding-right: 25px;
            box-sizing: border-box;
            top: 69%;
            color: #ffffff;
            width: 100%;
            right: 100%;
            transition: all .5s ease-in-out;
            z-index: 1002;
        }
        .sombra:hover .subtitulo {
            background-color: lightseagreen;
            right: 0;
        }
        button {
            transition: all .3s ease-in-out;
            position: absolute;
            opacity: 0;
            border: none;
            box-sizing: border-box;
            padding: 10px;
            cursor: pointer;
        }
    `

    // Define propiedades, el valor de this.data viene del elemeto pádre <cards-container>
    static properties = {
        data: {state: true},
        wWidth: {state: true},
        active: {type: Boolean},
        stylesActive: {type: Boolean},
        styles: {type: Object},
        bounding: {},
        elements: {type: Array},
        nodesString: {type: Array},
    }

    // Inicializa propiedades.
    constructor() {
        super();
        this.active = false;
        this.newStylesActive = false;
        this.styles = {};
        this.elements = [];
        this.nodesString = ['.titulo', '.subtitulo', '.movible', '.img', '.sombra', '.bordes', '.backButton'];
    }

    // Devuelve nodos del DOM interno.
    firstUpdated() {
        this.nodesString.forEach((el, i) => this.elements[i] = this.renderRoot.querySelector(el));
        
        // reescribe estilos en caso de necesitarse.
        this.getStyles()
    }

    // Agrega un listener de click.
    createRenderRoot() {
        const root = super.createRenderRoot();
        
        root.addEventListener('click', (e) => this.move(e));
        window.addEventListener('resize', () => {
            
            if(this.active) {

                // Ejecuta click en el backButton para renderizar depues de un cambio
                // de orientación de dispositivo en caso de estar algúna tarjeta activa.
                let $buttonHover = this.renderRoot.querySelector('.backButton');
                $buttonHover.click();
            }
            this.getStyles();
            
        });
        return root;
    }

    render() {
        // styleMap establece estilos en base al objeto que se le pase, en este caso el objeto
        // viene como respuesta de ejecutar la función getStyles a la que se le pasa en nombre
        // del elemento, el ancho de la pantalla y el valor de la propiedad this.styleActive.

        // Se establece el evento @click al elemento .sombra ejecutando la función move().
        // Se bindean en los elementos HTML los datos que vienen desde el componente padre.
        // Se bindean datos hacia los componentes <video-container> e <info-container>.
        return html`
            <div class="movible" style=${this.styles.movible}>
                <div class="sombra" style=${this.styles.sombra}>
                    <div class="bordes" style=${this.styles.bordes}></div>
                    <div class="titulo" style=${this.styles.titulo}>${this.data.nombre}</div>
                    <div class="subtitulo" style=${this.styles.subtitulo}>${this.data.rango}</div>
                    <button class="backButton" style=${this.styles.backButton}>
                        <img src="./assets/images/backArrow.svg">
                    </button>
                </div>
                <img class="img" src="./assets/images/${this.data.imagen}" style=${this.styles.img}>
                <video-container .mover=${this.active} .videoSrc=${this.data.video} .videobSrc=${this.data.videoB}></video-container>
                <info-container .mover=${this.active} .infoData=${this.data}></info-container>
            </div>
        `;
    }

    move(e) {

        console.log(`innerWidth ${innerWidth}`)
            console.log(`outherWidth ${outerWidth}`)
            console.log(window)
        if (e.target.matches('.bordes') && this.active === false) {
            // Cambia la propiedad newStylesActive a true.
            this.changeNewStylesActive();

            // Cambia la propiedad active a true.
            this.changeActive();

            // Ejecuta getMapStyles dentro de styleMap() para almacenar en la
            // propiedad this.styles un array con mapas de estilos para los elementos
            // y llama a requestUpdate() para renderizar.
            this.getStyles();

            // Maneja el hover del botón.
            let $buttonHover = this.renderRoot.querySelector('.backButton');
                $buttonHover.onmouseover = () => $buttonHover.style.setProperty('background-color','royalblue');
                $buttonHover.onmouseout = () => $buttonHover.style.setProperty('background-color', 'teal');
            
            // envia el estado true de this.active para activar un elemento
            // de bloqueo en la pantalla para evitar el click.
            this.dispatchEvent(new CustomEvent('bloqueo', {
                bubbles: true,
                composed: true,
                detail: this.active
            }));

            // Bloquea el scroll.
            document.getElementsByTagName("html")[0].style.overflow = "hidden";

        } else if ((e.target.matches('.backButton') || e.target.matches('.backButton img')) && this.active === true) {
            console.log('back-button')

            // Cambia la propiedad newStylesActive a true.
            this.changeNewStylesActive();

            // Cambia la propiedad active a true.
            this.changeActive();

            // Ejecuta getMapStyles dentro de styleMap() para almacenar en la
            // propiedad this.styles un array con mapas de estilos para los elementos
            // y llama a requestUpdate() para renderizar.
            setTimeout(() => {
                this.getStyles();
            }, 500);

            // Habilita scroll
            document.getElementsByTagName("html")[0].style.overflow = "auto";

            // Se crea y diuspara el evento 'bloqueo' para enviar el estado
            // de la propiedad active que generara un elemento de bloqueo
            // en la pantalla para evitar el click.
            this.dispatchEvent(new CustomEvent('bloqueo', {
                bubbles: true,
                composed: true,
                detail: this.active
            }));

        }
        
    }


    getStyles() {
        this.windowWidth = window.innerWidth;
        // Recorre el array
        this.nodesString.forEach((el, i) => {
            // Elimina el "." del string
            let boundingMovible = el === '.movible' ? this.elements[i].getBoundingClientRect() : null;
            let element = el.split('.')[1];

            // guardo el nodo ".sombra".
            let shadowElement = el === '.sombra' ? this.elements[i] : null;

            // guarda en la proipiedad styles el mapa de los estilos
            this.styles[element] = styleMap(getMapStyles(
                element,
                innerWidth,
                this.newStylesActive,
                boundingMovible,
                shadowElement
            ));
        });
        // Llama a actualizar el componente.
        this.requestUpdate();
    }

    // cambia el estado de this.active.
    changeActive() {
        this.active = !this.active;
    }
    // cambia el estado de this.styleActive.
    changeNewStylesActive() {
        this.newStylesActive = !this.newStylesActive;
    }

}

// crea el componente <cards-element> en base a la clase CardsElement.
customElements.define('cards-element', CardsElement);