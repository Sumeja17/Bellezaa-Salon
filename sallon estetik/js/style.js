const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-links");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}


const reveals = document.querySelectorAll('.reveal');

if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(r => observer.observe(r));
}


(function () {
    const nav = document.getElementById('nav');
    if (!nav) return;

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

    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const sc = window.scrollY;
            const t = Math.min(sc * 0.15, 90);
            heroBg.style.transform = `translateY(${t}px) scale(1.02)`;
        }, { passive: true });
    }
})();


(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
        document.querySelectorAll('.is-hidden').forEach(el =>
            el.classList.add('is-visible')
        );

        const heroText = document.getElementById('heroText');
        if (heroText) heroText.classList.add('in-view');
        return;
    }

    const hero = document.getElementById('heroText');
    if (hero) {
        setTimeout(() => hero.classList.add('in-view'), 280);
    }

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('is-hidden');
                entry.target.classList.add('is-visible');
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.is-hidden').forEach(el => io.observe(el));
    document.querySelectorAll('.reveal:not(.is-hidden)').forEach(el => io.observe(el));
})();


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


(function () {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Tab") {
            document.body.classList.add('user-is-tabbing');
        }
    });
})();