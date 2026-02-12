const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-links"); // only the nav links

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});


// Scroll reveal logic
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, { threshold: 0.2 });
reveals.forEach(r => observer.observe(r));

(function () {
    const nav = document.getElementById('nav');
    const threshold = 60;
    const setNav = () => {
        if (window.scrollY > threshold) {
            nav.classList.remove('transparent');
            nav.classList.add('solid');
        } else {
            nav.classList.add('transparent');
            nav.classList.remove('solid');
        }
    };
    setNav();
    window.addEventListener('scroll', setNav, { passive: true });

    /* Hero parallax subtle based on scroll position */
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        // small translate to simulate parallax
        const t = Math.min(sc * 0.15, 90);
        heroBg.style.transform = `translateY(${t}px) scale(1.02)`;
    }, { passive: true });
})();

/* IntersectionObserver for reveal animations (scroll reveal) */
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        // make elements visible immediately
        document.querySelectorAll('.is-hidden').forEach(el => el.classList.add('is-visible'));
        document.getElementById('heroText').classList.add('in-view');
        return;
    }

    // Staggered hero text
    const hero = document.getElementById('heroText');
    setTimeout(() => hero.classList.add('in-view'), 280);

    // General reveal observer
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('is-hidden');
                entry.target.classList.add('is-visible');
                // add a class for elements that need 'in-view' (like hero group)
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // target items (any .is-hidden elements)
    document.querySelectorAll('.is-hidden').forEach(el => io.observe(el));

    // Also observe groups that use reveal class
    document.querySelectorAll('.reveal:not(.is-hidden)').forEach(el => {
        // if not explicitly hidden, reveal when scrolled into view
        io.observe(el);
    });

})();

/* Smooth link scrolling */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
})();

/* Micro-interaction: make keyboard users see focus (accessibility) */
(function () {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Tab") document.body.classList.add('user-is-tabbing');
    });
})();


