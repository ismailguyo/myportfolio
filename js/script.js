/* =========================================================
   GUYO BORU — PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const mobileNavLinks =
    document.querySelectorAll(".mobile-nav-link");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section");

const projectsGrid =
    document.getElementById("projectsGrid");

const projectsEmpty =
    document.getElementById("projectsEmpty");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   02. LUCIDE ICONS
========================================================= */

function initializeIcons() {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


/* =========================================================
   03. MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    mobileMenu.classList.add("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add(
        "menu-open"
    );

    menuToggle.innerHTML = `
        <i data-lucide="x"></i>
    `;

    initializeIcons();

}


function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuToggle.innerHTML = `
        <i data-lucide="menu"></i>
    `;

    initializeIcons();

}


function toggleMobileMenu() {

    if (!mobileMenu) return;

    const isOpen =
        mobileMenu.classList.contains("open");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* =========================================================
   04. CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

mobileNavLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* =========================================================
   05. CLOSE MOBILE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    }
);


/* =========================================================
   06. HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    {
        passive: true
    }
);

handleHeaderScroll();


/* =========================================================
   07. ACTIVE NAVIGATION
========================================================= */

if (sections.length > 0) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionId =
                        entry.target.getAttribute(
                            "id"
                        );


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        const linkTarget =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            linkTarget ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                root: null,
                threshold: 0.25,
                rootMargin:
                    "-20% 0px -55% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(
            section
        );

    });

}


/* =========================================================
   08. SCROLL REVEAL
========================================================= */

function prepareRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-story, " +
            ".about-highlights, " +
            ".service-card, " +
            ".skill-category, " +
            ".projects-empty, " +
            ".contact-card"
        );


    if (revealElements.length === 0) {
        return;
    }


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal"
        );

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

}


/* =========================================================
   09. PROJECT DATA
========================================================= */

/*
    ADD YOUR PROJECTS HERE.

    You can add as many projects as you want.

    Example:

    {
        title: "Business Website",

        description:
            "A modern responsive website created for a local business.",

        image:
            "images/projects/business-website.jpg",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        liveUrl:
            "https://example.com",

        githubUrl:
            "https://github.com/username/project"
    }


    IMPORTANT:

    - liveUrl can be empty if there is no live website.
    - githubUrl can be empty if the code is private.
    - image should point to your project screenshot.
*/


const projects = [

    /*
    {
        title:
            "Example Business Website",

        description:
            "A modern responsive website designed to help a small business establish a professional online presence.",

        image:
            "images/projects/business-website.jpg",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        liveUrl:
            "https://example.com",

        githubUrl:
            "https://github.com/username/project"
    }
    */

];


/* =========================================================
   10. CREATE PROJECT CARD
========================================================= */

function createProjectCard(project) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "project-card";


    /* -----------------------------------------------------
       TECHNOLOGY TAGS
    ----------------------------------------------------- */

    const technologyTags =
        Array.isArray(
            project.technologies
        )
            ? project.technologies
                .map(
                    (technology) => `
                        <span>
                            ${technology}
                        </span>
                    `
                )
                .join("")
            : "";


    /* -----------------------------------------------------
       LIVE PROJECT BUTTON
    ----------------------------------------------------- */

    const liveButton =
        project.liveUrl
            ? `
                <a
                    href="${project.liveUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-button project-button-primary"
                >

                    <span>
                        View Live Project
                    </span>

                    <i
                        data-lucide="arrow-up-right"
                    ></i>

                </a>
            `
            : "";


    /* -----------------------------------------------------
       GITHUB BUTTON
    ----------------------------------------------------- */

    const githubButton =
        project.githubUrl
            ? `
                <a
                    href="${project.githubUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-button project-button-secondary"
                >

                    <i
                        data-lucide="github"
                    ></i>

                    <span>
                        View Code
                    </span>

                </a>
            `
            : "";


    /* -----------------------------------------------------
       IMAGE OVERLAY BUTTON
    ----------------------------------------------------- */

    const liveOverlay =
        project.liveUrl
            ? `
                <a
                    href="${project.liveUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-view-button"
                    aria-label="View ${project.title} live"
                >

                    <i
                        data-lucide="external-link"
                    ></i>

                </a>
            `
            : "";


    /* -----------------------------------------------------
       PROJECT IMAGE
    ----------------------------------------------------- */

    const projectImage =
        project.image
            ? `
                <img
                    src="${project.image}"
                    alt="${project.title} project screenshot"
                    class="project-image"
                    loading="lazy"
                >
            `
            : `
                <div
                    class="project-image project-image-placeholder"
                    role="img"
                    aria-label="${project.title} project preview"
                >

                    <i
                        data-lucide="image"
                    ></i>

                    <span>
                        Project Preview
                    </span>

                </div>
            `;


    /* -----------------------------------------------------
       CARD HTML
    ----------------------------------------------------- */

    article.innerHTML = `

        <div class="project-image-wrapper">

            ${projectImage}

            <div class="project-image-overlay">

                ${liveOverlay}

            </div>

        </div>


        <div class="project-content">

            <div class="project-top">

                <h3>
                    ${project.title}
                </h3>

            </div>


            <p>
                ${project.description}
            </p>


            <div class="project-technologies">

                ${technologyTags}

            </div>


            <div class="project-actions">

                ${liveButton}

                ${githubButton}

            </div>

        </div>

    `;


    return article;

}


/* =========================================================
   11. RENDER PROJECTS
========================================================= */

function renderProjects() {

    if (!projectsGrid) {
        return;
    }


    /* -----------------------------------------------------
       NO PROJECTS YET
    ----------------------------------------------------- */

    if (
        !Array.isArray(projects) ||
        projects.length === 0
    ) {

        projectsGrid.innerHTML = "";


        if (projectsEmpty) {

            projectsEmpty.style.display =
                "flex";

        }


        initializeIcons();

        return;

    }


    /* -----------------------------------------------------
       PROJECTS EXIST
    ----------------------------------------------------- */

    if (projectsEmpty) {

        projectsEmpty.style.display =
            "none";

    }


    projectsGrid.innerHTML = "";


    projects.forEach((project) => {

        const projectCard =
            createProjectCard(
                project
            );


        projectsGrid.appendChild(
            projectCard
        );

    });


    initializeIcons();


    /* -----------------------------------------------------
       PROJECT CARD REVEAL
    ----------------------------------------------------- */

    const projectCards =
        projectsGrid.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card, index) => {

            card.classList.add(
                "reveal"
            );


            card.style.transitionDelay =
                `${index * 80}ms`;

        }
    );


    /* -----------------------------------------------------
       OBSERVE PROJECT CARDS
    ----------------------------------------------------- */

    if (projectCards.length === 0) {
        return;
    }


    requestAnimationFrame(() => {

        const projectObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        projectCards.forEach(
            (card) => {

                projectObserver.observe(
                    card
                );

            }
        );

    });

}


/* =========================================================
   12. CURRENT YEAR
========================================================= */

function setCurrentYear() {

    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   13. SMOOTH ANCHOR LINKS
========================================================= */

function enableSmoothLinks() {

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   14. IMAGE FALLBACK
========================================================= */

function enableImageFallback() {

    document.addEventListener(
        "error",
        (event) => {

            const image =
                event.target;


            if (
                !image ||
                image.tagName !== "IMG"
            ) {
                return;
            }


            image.classList.add(
                "image-error"
            );


            /*
                Remove the broken source so
                the browser doesn't repeatedly
                request the same missing image.
            */

            image.removeAttribute(
                "src"
            );

        },
        true
    );

}


/* =========================================================
   15. EXTERNAL PROJECT LINK SAFETY
========================================================= */

/*
    Prevent empty project links from becoming
    broken "#" links.

    This also makes the project system safer
    when you forget to add a URL.
*/

function validateProjectLinks() {

    if (!projectsGrid) {
        return;
    }


    const projectLinks =
        projectsGrid.querySelectorAll(
            "a"
        );


    projectLinks.forEach((link) => {

        const href =
            link.getAttribute(
                "href"
            );


        if (
            !href ||
            href === "#" ||
            href.trim() === ""
        ) {

            link.remove();

        }

    });

}


/* =========================================================
   16. INITIALIZE PORTFOLIO
========================================================= */

function initializePortfolio() {

    initializeIcons();

    renderProjects();

    validateProjectLinks();

    setCurrentYear();

    prepareRevealAnimations();

    enableSmoothLinks();

    enableImageFallback();

}


/* =========================================================
   17. START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePortfolio
    );

} else {

    initializePortfolio();

}