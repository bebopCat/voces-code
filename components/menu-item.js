import {LitElement, html, css} from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

class MenuItem extends LitElement {

    static styles = css`
        :host {
            position: fixed;
            top: 0px;
            right: 0;
            z-index: 1003;
            box-sizing: border-box;
        }
        :host * {
            box-sizing: border-box;
        }
        #menu-container {
            position: absolute;
            right: 20px;
            display: flex;
            box-sizing: border-box;
            padding: 0 15px;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            width: 80px;
            transition: all .2s ease-out .3s;
            box-sizing: border-box;
        }

        .hamburger {
            position: fixed;
            bottom: 3vh;
            width: 80px;
            height: 80px;
            padding: 15px 15px;
            display: inline-block;
            cursor: pointer;
            transition-property: opacity, filter;
            transition-duration: 0.15s;
            transition-timing-function: linear;
            font: inherit;
            color: inherit;
            text-transform: none;
            background-color: rgb(3, 6, 15);
            border-radius: 50%;
            border: 0;
            margin: 0;
            overflow: visible;
            opacity: 0.7;
            box-sizing: border-box;
        }
        .hamburger:hover {
            opacity: 0.7;
        }
        .hamburger.is-active:hover {
            opacity: 0.7;
        }
        .hamburger.is-active .hamburger-inner,
        .hamburger.is-active .hamburger-inner::before,
        .hamburger.is-active .hamburger-inner::after {
                background-color: gold;
        }
        .hamburger-box {
            width: 40px;
            height: 24px;
            display: inline-block;
            position: relative;
        }
        .hamburger-inner {
            display: block;
            top: 50%;
            margin-top: -2px;
        }
        .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
            width: 40px;
            height: 4px;
            background-color: gold;
            border-radius: 4px;
            position: absolute;
            transition-property: transform;
            transition-duration: 0.15s;
            transition-timing-function: ease;
        }
        .hamburger-inner::before, .hamburger-inner::after {
            content: "";
            display: block;
        }
        .hamburger-inner::before {
            top: -10px;
        }
        .hamburger-inner::after {
            bottom: -10px;
        }
        .hamburger--collapse .hamburger-inner {
            top: auto;
            bottom: 0;
            transition-duration: 0.13s;
            transition-delay: 0.13s;
            transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        .hamburger--collapse .hamburger-inner::after {
            top: -20px;
            transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), opacity 0.1s linear;
        }
        .hamburger--collapse .hamburger-inner::before {
            transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        .hamburger--collapse.is-active .hamburger-inner {
            transform: translate3d(0, -10px, 0) rotate(-45deg);
            transition-delay: 0.22s;
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .hamburger--collapse.is-active .hamburger-inner::after {
            top: 0;
            opacity: 0;
            transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333), opacity 0.1s 0.22s linear;
        }
        .hamburger--collapse.is-active .hamburger-inner::before {
            top: 0;
            transform: rotate(-90deg);
            transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333), transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .menu-lateral {
            position: absolute;
            top: 0px;
            margin: 0;
            padding: 15px 0px 30px 0px;
            box-sizing: border-box;
            width: 70vw;
            height: 100vh;
            background-color: rgb(3, 6, 15);
            opacity: 0.7;
            transition: all ease-in-out .5s;
            overflow: scroll;
        }
        .item-menu {
            display: flex;
            align-items: center;
            justify-content: center;
            list-style: none;
            color: rgb(204, 204, 204);
            font-family: renogare;
            font-size: 5vmin;
            padding-top: 5px;
            padding-bottom: 5px;
            text-align: center;
            box-sizing: border-box;
        }
        .is-active-panel {
            transform: translate(-70vw, 0);
        }
        .bloqueo {
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .4);
            z-index: 20;
            display: block;
        }
        .is-active-block {
            display: block;
        }
        .img-lateral {
            width: 7vw;
            height: auto;
            margin-right: 10px;
            box-sizing: border-box;
        }
    `;

    // Retorna un objeto con los datos.
    fetchData = async () => {
        const response = await fetch('../assets/data.json');
        const json = await response.json();
        return json.cantantes;
    }
    

    static properties = {
        data: {state: true},
        menuScroll: {},
        itemMenuScroll: {},
        buttonNode: {},
        panelNode: {},
        activeButton: {},
        active: {},
        desktopMode: {},
        fetchData: {}
    }

    constructor() {
        super();
        this.activeButton = false;
        this.active = false;
        this.data = [];

        this.fetchData()
        .then((res) => {
            this.data = res;
        })
        if (window.innerWidth > 1000) {
            document.querySelector('menu-item').style.display = 'none';
        }
    }

    
    render() {
        
            
        return html`
            <ul class="menu-lateral">
                ${this.data.map((singer) => html`
                    <li class="item-menu"><span id="${singer.id}" class="text-lateral" @click=${this.itemClick}>${singer.nombre}</span></li>
                `)}
            </ul>
            <div id="menu-container" class="menu-item_container">
                <button class="hamburger hamburger--collapse" type="button" @click=${this.hamburgueClick}>
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        `
    }

    firstUpdated() {
        this.buttonNode = this.renderRoot.querySelector('.hamburger');
        this.panelNode = this.renderRoot.querySelector('.menu-lateral');
    }

    

    hamburgueClick() {
        const root = super.createRenderRoot();

        this.buttonNode.classList.toggle('is-active');
        this.panelNode.classList.toggle('is-active-panel');
        this.active = !this.active;

        // Manejamos el z-index para situal el elemento sobre la capa de bloqueo.
        this.active ? root.host.style.zIndex = 3000 : root.host.style.zIndex = 1003;

        // Bloquea el scroll.
        document.getElementsByTagName("html")[0].style.overflow = "hidden";

        this.dispatchEvent(new CustomEvent('bloqueo', {
            bubbles: true,
            composed: true,
            detail: this.active,
        }));
    }

    itemClick(e) {
        const root = super.createRenderRoot();
        this.active = !this.active;
        // Manejamos el z-index para situal el elemento sobre la capa de bloqueo.
        this.active ? root.host.style.zIndex = 3000 : root.host.style.zIndex = 1003;

        // Habilita el scroll.
        document.getElementsByTagName("html")[0].style.overflow = "scroll";

        // Se transforma el boton del menu lateral.
        this.buttonNode.classList.toggle('is-active');
        
        // Se oculta el panel de menu lateral.
        this.panelNode.classList.remove('is-active-panel');

        // Se hacen los calculos para mover el scroll a la posicion deseada.
        let $node = document.querySelector('cards-container').renderRoot.children[`${e.target.id}`];
        let nodeTop = $node.getBoundingClientRect().top;
        let nodeHeight = $node.getBoundingClientRect().height;
        let scrollCross = window.pageYOffset;
        let scrollear = scrollCross + nodeTop + nodeHeight;
        window.scroll(0, scrollear);

        // Se desactiva la pantalla de bloqueo.
        this.dispatchEvent(new CustomEvent('bloqueo', {
            bubbles: true,
            composed: true,
            detail: this.active,
        }));
    }

    
}

customElements.define('menu-item', MenuItem);