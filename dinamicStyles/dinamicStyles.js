export function getMapStyles(element, media, neWStylesActive, boundingMovible, shadowElement) {
    const movilBreakpoint = '600';
    const tabletBreakpoint = '1000';

    // -------------------- Titulos -------------------- //
    
    if(element === 'titulo' && media > tabletBreakpoint) {
        const titleStyles = {
            backgroundColor: neWStylesActive ? 'gold' : null,
            right: neWStylesActive ? '0' : null,
            top: neWStylesActive ? '91%' : null,
            fontSize: neWStylesActive ? '2vw' : null,
            textAlign: neWStylesActive ? 'center' : null,
            padding: neWStylesActive ? '10px' : null
        }
        return titleStyles;
    }
    // Vista tablet horizontal.
    if(element === 'titulo' && (media > movilBreakpoint && media < tabletBreakpoint)) {
        const titleStyles = {
            backgroundColor: neWStylesActive ? 'teal' : 'transparent',
            right: '0',
            top: neWStylesActive ? '95%' : '84%',
            fontSize: neWStylesActive ? '2vw' : '2.5vw',
            textAlign: 'center',
            padding: '0',
            color: 'white',
        }
        return titleStyles;
    }
    if(element === 'titulo' && media < movilBreakpoint) {
        const titleStyles = {
            backgroundColor: neWStylesActive ? 'transparent' : '#1f2124',
            top: neWStylesActive ? '35%' : '83%',
            fontSize: neWStylesActive ? '7vw' : '7vw',
            textAlign: 'center',
            padding: '5px 0 0 0',
            color:  'gold',
            fontFamily: neWStylesActive ? 'openSansBold' : 'openSansMedium',
            transition: 'all 1s ease-in-out'
        }
        return titleStyles;
    }

    // -------------------- Subtitulos -------------------- //

    if(element === 'subtitulo' && media > tabletBreakpoint) {
        const subtitleStyles = {
            backgroundColor: neWStylesActive ? 'gold' : null,
            right: neWStylesActive ? '0' : null,
            top: neWStylesActive ? '95%' : null,
            visibility: neWStylesActive ? 'hidden' : null,
            fontSize: neWStylesActive ? '1.4vw' : null,
            textAlign: neWStylesActive ? 'center' : null
        }
        return subtitleStyles;
    }
    if(element === 'subtitulo' && (media > movilBreakpoint && media < tabletBreakpoint)) {
        const subtitleStyles = {
            backgroundColor: 'transparent',
            right: '0',
            top:'90%',
            fontSize: '2vw',
            textAlign: 'center',
            padding: '0',
            color: 'white',
            visibility: neWStylesActive ? 'hidden' : 'visible'
        }
        return subtitleStyles;
    }
    if(element === 'subtitulo' && media < movilBreakpoint) {

        const subtitleStyles = {
            backgroundColor: '#1f2124',
            top: '90%',
            fontSize: '5vw',
            textAlign: 'center',
            padding: '0 0 5px 0',
            color: 'yellow',
            visibility: neWStylesActive ? 'hidden' : 'visible',
            transition: 'all 1s ease-in-out'
        }
        return subtitleStyles;
    }

    // -------------------- Imagenes -------------------- //

    if(element === 'img' && media < movilBreakpoint) {
        const imgStyles = {
            filter: neWStylesActive ? 'grayscale(100%) brightness(50%)' : 'grayscale(0%) brightness(100%)',
            // filter: neWStylesActive ? 'brightness(50%)' : 'brightness(100%)'
        }
        return imgStyles;
    }

    // -------------------- Sombras -------------------- //

    if(element === 'sombra' && media > tabletBreakpoint) {
        const shadowStyles = {
            backgroundColor: neWStylesActive ? 'transparent' : null
        }
        return shadowStyles;
    }
    if(element === 'sombra' && (media > movilBreakpoint && media < tabletBreakpoint)) {
        const shadowStyles = {
            backgroundColor: neWStylesActive ? 'rgba(19,30,33,0)' : 'rgba(19,30,33,0.4)'
        }
        return shadowStyles;
    }
    if(element === 'sombra' && media < movilBreakpoint) {


        let intersectionElement = shadowElement;

        function deleteShadow(entries) {

            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    innerWidth < movilBreakpoint ? entry.target.style.setProperty('background-color','rgba(19,30,33, 0)') : null;
                    entry.target.querySelector('.titulo').style.right = "0px";
                    entry.target.querySelector('.subtitulo').style.right = "0px";
                } else {
                    innerWidth < movilBreakpoint ? entry.target.style.setProperty('background-color','rgba(19,30,33, 0.5)') : null;
                    entry.target.querySelector('.titulo').style.right = "-100%";
                    entry.target.querySelector('.subtitulo').style.right = "100%";

                }
            });
        }

        let options = {
            root: document,
            rootMargin: '0px',
            threshold: 0.75
        }
          
        let observer = new IntersectionObserver(deleteShadow, options);
        observer.observe(intersectionElement);

        const shadowStyles = {
            backgroundColor: neWStylesActive ? 'rgba(19,30,33, 0)' : 'rgba(19,30,33, 0.4)'
        }
        return shadowStyles;
    }

    // -------------------- Bordes -------------------- //

    if(element === 'bordes' && media > tabletBreakpoint) {
        const borderStyles = {
            visibility: neWStylesActive ? 'hidden' : null,
            cursor: neWStylesActive ? 'default' : null,
        }
        return borderStyles;
    }
    if(element === 'bordes' && (media > movilBreakpoint && media < tabletBreakpoint)) {
        const borderStyles = {
            border: '10px solid rgba(119, 136, 153,0)'
        }
        return borderStyles;
    }
    if(element === 'bordes' && media < movilBreakpoint) {
        const borderStyles = {
            border: neWStylesActive ? '10px solid rgba(119, 136, 153,0)' : '10px solid rgba(119, 136, 153,0)'
        }
        return borderStyles;
    }

    // -------------------- Botón volver -------------------- //

    if(element === 'backButton' && media > movilBreakpoint) {
        const buttonStyles = {
            zIndex: neWStylesActive ? '1100' : null,
            opacity: neWStylesActive ? '1' : '0',
            top: neWStylesActive ? '10px' : '10px',
            left: neWStylesActive ? '10px' : '10px',
            borderRadius: neWStylesActive ? '50%' : null,
            backgroundColor: neWStylesActive ? 'gold' : null,

        }
        return buttonStyles;
    }
    if(element === 'backButton' && media < movilBreakpoint) {

        const buttonStyles = {
            zIndex: neWStylesActive ? '1100' : 'null',
            opacity: neWStylesActive ? '.5' : '0',
            left: neWStylesActive ? '10px' : null,
            bottom: neWStylesActive ? '12px' : null,
            backgroundColor: neWStylesActive ? 'gold' : null,
            color: neWStylesActive ? 'white' : null,
            fontSize: neWStylesActive ? '0.5rem' : null,
            borderRadius: neWStylesActive ? '50%' : null,
        }
        return buttonStyles;
    } 

    // -------------------- Caja movible -------------------- //

    let firstWidth = neWStylesActive && boundingMovible ? boundingMovible.width : null;
    let spaceh = neWStylesActive && boundingMovible ? boundingMovible.left : null;
    let spacev = neWStylesActive && boundingMovible ? boundingMovible.top : null;

    if(element === 'movible' && media > movilBreakpoint) {

        const movibleStyles = {
            transform: neWStylesActive ? `translate(${-spaceh}px, ${-spacev}px)`: `translate(0px, 0px)`,
            height: neWStylesActive ? '100vh' : '450px',
            width: neWStylesActive ? '25vw' : firstWidth,
            zIndex: neWStylesActive ? '1003' : '1001',
            overflow: neWStylesActive ? 'visible' : 'hidden',
        }
        return movibleStyles;
    }
    if(element === 'movible' && media < movilBreakpoint) {
        const movibleStyles = {
            transform: neWStylesActive ? `translate(0px, ${-spacev}px)` : null,
            height: neWStylesActive ? '15vh' : null,
            zIndex: neWStylesActive ? '1003' : null,
            overflow: neWStylesActive ? 'visible' : null,
        }
        return movibleStyles;
    } else {
        return {}
    }

}



