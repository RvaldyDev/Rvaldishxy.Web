document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Menu Mobile
    const menuToggle = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (!menuToggle || !navLinks) return; // Guard clause

    // Mengaktifkan/menonaktifkan menu saat tombol diklik
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Update accessibility
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Menutup menu mobile setelah link navigasi diklik
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Only on mobile
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', true);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) &&
            !navLinks.contains(e.target) &&
            navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });

    // Close menu when window resizes to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });

    // 2. Scroll-Triggered Animation
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-scroll').forEach(el => {
        observer.observe(el);
    });

    // 3. Typing Effect for Hero Name
    const element = document.getElementById('element');
    const text = 'Sanziya Rivaldi';
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting) {
            element.innerHTML = text.substring(0, index + 1);
            index++;
            if (index === text.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000); // Pause before deleting
            } else {
                setTimeout(typeWriter, 150); // Typing speed
            }
        } else {
            element.innerHTML = text.substring(0, index - 1);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(typeWriter, 500); // Pause before retyping
            } else {
                setTimeout(typeWriter, 100); // Deleting speed
            }
        }
    }

    typeWriter();

    // 4. Dynamic Background Animation
    let time = 0;
    function animateBackground() {
        time += 0.01;
        const root = document.documentElement;
        const gx = 75 + 25 * Math.sin(time);
        const gy = 10 + 20 * Math.cos(time * 0.5);
        const gx2 = 20 + 30 * Math.sin(time * 0.7);
        const gy2 = 85 + 15 * Math.cos(time * 0.3);
        const hue = (time * 10) % 360;

        root.style.setProperty('--gx', `${gx}%`);
        root.style.setProperty('--gy', `${gy}%`);
        root.style.setProperty('--gx2', `${gx2}%`);
        root.style.setProperty('--gy2', `${gy2}%`);
        root.style.setProperty('--hue', `${hue}deg`);

        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    // 5. Enhanced Cursor Glow Effect with Trail
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('click', () => {
        cursor.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
        }, 100);
    });

    // 6. Smooth Scrolling for Navigation Links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 7. Parallax Effect for Hero Image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // 8. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show after scrolling 300px
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Skill Item Hover Sound Effect (Optional, if audio is desired)
    // Note: Add audio files if needed
    // const hoverSound = new Audio('path/to/hover-sound.mp3');
    // document.querySelectorAll('.skill-item').forEach(item => {
    //     item.addEventListener('mouseenter', () => hoverSound.play());
    // });
});

