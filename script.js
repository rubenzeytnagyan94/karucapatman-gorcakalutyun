

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    nav.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});


/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* ================= COUNTER ANIMATION ================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const sectionPosition =
        statsSection.getBoundingClientRect().top;

    const screenPosition =
        window.innerHeight - 100;


    if (sectionPosition < screenPosition) {

        counterStarted = true;

        counters.forEach((counter) => {

            const target =
                Number(counter.getAttribute("data-target"));

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(target / 100)
            );

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;

                    return;
                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .project-card, .service-card, .contact-info, .contact-form"
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        phone === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Խնդրում ենք լրացնել բոլոր դաշտերը։";

        return;

    }


    formMessage.textContent =
        "Շնորհակալություն։ Ձեր հարցումն ուղարկվել է։";


    contactForm.reset();

});


/* ================= SMOOTH LINKS ================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId === ""
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ================= PROJECT HOVER ================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.zIndex = "2";

    });

    card.addEventListener("mouseleave", () => {

        card.style.zIndex = "1";

    });

});


/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    startCounters();

});

