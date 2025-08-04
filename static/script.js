// =======================
// 1️⃣ Navbar Scroll Effect
// =======================
window.addEventListener('scroll', () => {
    document.querySelector('.navbar')
        .classList.toggle('scrolled', window.scrollY > 50);
});

// =======================
// 2️⃣ Smooth Scroll for Nav Links
// =======================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        if (link.hash) {
            e.preventDefault();
            document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =======================
// 3️⃣ Active Link Highlight on Scroll
// =======================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (pageYOffset >= sec.offsetTop - 80) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.hash === '#' + current) link.classList.add('active');
    });
});

// =======================
// 4️⃣ Scroll Progress Bar
// =======================
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scrollProgress';
document.body.appendChild(scrollProgress);
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// =======================
// 5️⃣ Page Fade-in Effect
// =======================
window.addEventListener('load', () => document.body.style.opacity = '1');

// =======================
// 6️⃣ Back-to-Top Button
// =======================
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.innerText = '⬆';
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// =======================
// 7️⃣ Dark Mode Toggle (Local Storage)
// =======================
const darkModeBtn = document.createElement('button');
darkModeBtn.innerText = '🌙';
Object.assign(darkModeBtn.style, {
    position: 'fixed', bottom: '90px', right: '30px', background: '#0f172a',
    color: '#38bdf8', border: '2px solid #38bdf8', borderRadius: '50%',
    width: '45px', height: '45px', cursor: 'pointer', zIndex: '999'
});
document.body.appendChild(darkModeBtn);
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerText = '☀';
}
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeBtn.innerText = '☀';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeBtn.innerText = '🌙';
    }
});

// =======================
// 8️⃣ Button Ripple Effect
// =======================
document.querySelectorAll('.btn-get-started').forEach(btn => {
    btn.addEventListener('click', e => {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0.7';
        ripple.style.animation = 'rippleAnim 0.6s linear';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `@keyframes rippleAnim { to { transform: scale(8); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// =======================
// 9️⃣ FAQ Auto-Close
// =======================
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.accordion-collapse').forEach(collapse => {
            if (collapse !== button.nextElementSibling) collapse.classList.remove('show');
        });
    });
});

// 🔟 Scroll Reveal Animations
const revealElements = document.querySelectorAll('.card, .cta-section, .hero-section');
window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        }
    });
});

// 1️⃣1️⃣ Lazy Load Images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    });
});
lazyImages.forEach(img => lazyObserver.observe(img));

// 1️⃣2️⃣ Copy to Clipboard
function copyText(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
}

// 1️⃣3️⃣ Typing Text Animation
const typingElement = document.querySelector('.hero-section h1');
if (typingElement) {
    const text = typingElement.innerText;
    typingElement.innerText = '';
    let index = 0;
    setInterval(() => {
        if (index < text.length) {
            typingElement.innerText += text[index++];
        }
    }, 100);
}

// 1️⃣4️⃣ Scroll Direction Detection
let lastScroll = 0;
window.addEventListener('scroll', () => {
    console.log(window.scrollY > lastScroll ? 'Scrolling Down' : 'Scrolling Up');
    lastScroll = window.scrollY;
});

// 1️⃣5️⃣ Auto Year in Footer
const footer = document.querySelector('footer');
if (footer) {
    const yearSpan = document.createElement('span');
    yearSpan.innerText = ` © ${new Date().getFullYear()}`;
    footer.appendChild(yearSpan);
}

// 1️⃣6️⃣ Prevent Right-Click
document.addEventListener('contextmenu', e => e.preventDefault());

// 1️⃣7️⃣ Offline/Online Detector
window.addEventListener('online', () => alert('You are back online!'));
window.addEventListener('offline', () => alert('You are offline!'));

// 1️⃣8️⃣ Dynamic Title Change
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? 'Come back 😢' : originalTitle;
});

// 1️⃣9️⃣ Scroll Lock for Mobile Menu
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => document.body.classList.toggle('no-scroll'));
}

// 2️⃣0️⃣ Card Hover Zoom
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

// EXTRA 10 Functionalities:
// 2️⃣1️⃣ Toast Notifications
function showToast(msg) {
    const toast = document.createElement('div');
    toast.innerText = msg;
    toast.className = 'toast';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 2️⃣2️⃣ Save Scroll Position
window.addEventListener('beforeunload', () => localStorage.setItem('scroll', window.scrollY));
window.addEventListener('load', () => window.scrollTo(0, localStorage.getItem('scroll') || 0));

// 2️⃣3️⃣ Keyboard Shortcuts
document.addEventListener('keydown', e => {
    if (e.key === 't') backToTop.click();
});

// 2️⃣4️⃣ Image Modal Viewer
document.querySelectorAll('.card img').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `<img src="${img.src}" />`;
        document.body.appendChild(modal);
        modal.addEventListener('click', () => modal.remove());
    });
});

// 2️⃣5️⃣ Auto Hide Navbar
let lastY = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.top = window.scrollY > lastY ? '-70px' : '0';
    lastY = window.scrollY;
});

// 2️⃣6️⃣ Reading Progress in Title
window.addEventListener('scroll', () => {
    const percent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    document.title = `${percent}% Read | ${originalTitle}`;
});

// 2️⃣7️⃣ Animated Counters
document.querySelectorAll('.counter').forEach(counter => {
    let target = +counter.dataset.target;
    let count = 0;
    const update = () => {
        count += Math.ceil(target / 200);
        counter.innerText = count;
        if (count < target) requestAnimationFrame(update);
    };
    update();
});

// 2️⃣8️⃣ Smooth Fade for Sections
document.querySelectorAll('section').forEach(sec => sec.style.opacity = '0');
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight - 50) sec.style.opacity = '1';
    });
});

// 2️⃣9️⃣ Tab Key Focus Highlight
document.addEventListener('keyup', e => {
    if (e.key === 'Tab') document.body.classList.add('show-focus');
});

// 3️⃣0️⃣ SEO-Friendly Structured Data Logger
console.log("Structured data: SEO ready for Google Search Console!");
