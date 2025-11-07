// web-frontend/transitions.js

// Diese Funktion wird nach jedem Seitenwechsel aufgerufen
function pageEnterAnimation() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        // Wir setzen die Animation zurück, damit sie erneut ausgelöst werden kann
        el.classList.remove('is-visible');
        
        // Benutze den IntersectionObserver, um Elemente einzublenden, wenn sie in den Viewport scrollen
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                el.classList.add('is-visible');
                observer.unobserve(el);
            }
        });
        observer.observe(el);
    });
    // Scrollt nach dem Laden der neuen Seite ganz nach oben
    window.scrollTo(0, 0);
}

// Initialisiere Barba.js
barba.init({
    // Definiere die Animationen
    transitions: [{
        name: 'fade-transition',
        // Bevor die neue Seite erscheint
        async leave(data) {
            await gsap.to(data.current.container, {
                opacity: 0,
                duration: 0.4
            });
            data.current.container.remove();
        },
        // Nachdem die neue Seite im DOM ist
        async enter(data) {
            // GSAP ist eine Animationsbibliothek, die wir per CDN laden
            gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.4
            });
            // Rufe unsere Helferfunktion auf, um die .reveal-Animationen zu starten
            pageEnterAnimation();
        }
    }],
    // Wichtig: Verhindert, dass Barba bei Anker-Links (#) auslöst
    prevent: ({ el }) => el.hasAttribute('data-barba-prevent'),
});

// Starte die Animationen auf der ersten Seite, die geladen wird
pageEnterAnimation();