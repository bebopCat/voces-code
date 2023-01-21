import {LitElement, html, css} from 'lit';

export class VideoContainer extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 0;
            margin 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-image: url('../assets/images/fondo-video.jpg');
            z-index: 1000;
            transition: all .5s ease-in-out;
            align-items: center;
            overflow: scroll;
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        .load-block {
            display: flex;
            position: absolute;
            background-color: rgba(0,0,0,0.6);
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
        iframe {
        }
        p {
            color: white;
            font-family: openSansMedium;
            font-size: 2rem;
        }
    `;

    // Se establacen propíedades cuyo valor vienen
    // del elemento padre <cards-element<
    static properties = {
        mover: {type: Boolean},
        videoSrc: {},
        videobSrc: {}
    }

    constructor() {
        super();
        this.mover = false;
    }
        
    // Rederiza, estableciando las rutas de los videos con los datos bindeados desde <cards-element>.
    // mediante el @ load y Cuando el src del iframe ha cargado ejecuta la función this.ifameLoaded.
    render() {
        return html`
        <div class="load-block">
            <img src="../assets/images/loader-puff.svg">
        </div>
        <p>En estudio:</p>
        <iframe
            @load=${this.iframeLoaded}
            loading="lazy" 
            width="100%" height="315" 
            src="${this.mover ? this.videobSrc : null}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <p>Su vóz:</p>
        <iframe
            loading="lazy" 
            width="100%" height="315" 
            src="${this.mover ? this.videoSrc : null}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        `;
    }

    // Si dentro de las propiedades que cambiaron esta
    // this.mover se ejecuta la función this.move()
    updated(changedProperties) {
        if (changedProperties.has('mover')) {
            this.move();
        }
    }

    iframeLoaded() {
        if (this.mover) {
            // cuando el src del iframe ha cargado da una
            // decima de segundo para quitar el loader. 
            setTimeout(() => {
                let loadBlock = this.shadowRoot.querySelector('.load-block');
                loadBlock.style.display = 'none';
            }, 100);
        }
    }

    move() {
        if (this.mover) {
            if (window.matchMedia("(min-width: 600px)").matches) {
                console.log(this.getBoundingClientRect().width)
                // La pantalla tiene mas de 720px de ancho
                setTimeout(() => {
                    console.log(this.getBoundingClientRect().width)
                    // Traslada <video-container> una vez su tamaño hacia la derecha.
                    this.style.transform = `translate(25vw, 0px)`;
                    this.style.width = `50vw`;
                }, 500);
            } else {
                setTimeout(() => {
                    // Traslada <video-container> una vez su tamaño hacia la derecha.
                    this.style.transform = `translate(0px, 15vh)`;
                    this.style.height = `50vh`;
                }, 500);
                // La pantalla tiene menos de 720px de ancho
            }
            
        } else {
            if (window.matchMedia("(min-width: 600px)").matches) {
                // La pantalla tiene mas de 720px de ancho
                setTimeout(() => {
                    // Traslada <video-container> a su posición original.
                    this.style.transform = `translate(0px, 0px)`;
                    this.style.width = `100%`;
                    this.style.transition = `all .3s ease-in-out`;
                }, 200);
            } else {
                // La pantalla tiene menos de 720px de ancho
                setTimeout(() => {
                    // Traslada <video-container> a su posición original.
                    this.style.transform = `translate(0px, 0px)`;
                    this.style.height = `100%`;
                }, 200);
            }
            
        }
    }
}

// crea el componente <video-container> en base a la clase VideoContainer.
customElements.define('video-container', VideoContainer);