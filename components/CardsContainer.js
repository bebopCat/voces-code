import {LitElement, html, css} from 'lit';
import { map } from 'lit/directives/map.js';
import {styleMap} from 'lit/directives/style-map.js';
import './CardsElement.js';

export class CardsContainer extends LitElement {

    //Define los estilos.
    static styles = css`
        :host {
            position: relative;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        .bloqueo {
            position: fixed;
            top:0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .4);
            z-index: 1003;
            display: none;
        }
    `;
    
    // Retorna un objeto con los datos.
    fetchData = async () => {
        const response = await fetch('../assets/data.json');
        const json = await response.json();
        return json.cantantes;
    }

    // Se definen propierdades.
    static properties = {
        content: {state: true},
        childState: {type: Boolean}
    }


    constructor() {
        super();

        // Inicializa valor de propiedad.
        this.childState = false;

        // Trae los datos y se almacena en una propiedad.
        this.fetchData()
        .then((res) => {
            this.content = res;
        })

        // Escucha el evento generado en cardsElement trayendo el dato
        // true para la propiedad childState lo que genera un elemento
        // de bloqueo en la pantalla para evitar el click.
        document.addEventListener('bloqueo', (e) => {
            this.childState = e.detail;
        })
    }

    render() {
        // Objeto de estilos dinamicos en base al valor de una propiedad.
        const bloqueoStyles = {
            display: this.childState ? 'block' : 'none' 
        }
        // styleMap establece estilos en base al objeto que se le pase.
        // map mapea los datos generando un html por cada uno y enviando al componente cards-element los datos.
        return html`
            <div class="bloqueo" style=${styleMap(bloqueoStyles)}></div>
            ${map(this.content, (item) => html`<cards-element .data="${item}"></cards-element>`)}
        `;
    }
}

// crea el componente <cards-container> en base a la clase CardsContainer.
customElements.define('cards-container', CardsContainer);