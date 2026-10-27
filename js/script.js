document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");

  /* LOADER */
  const hideLoader = () => {
    if (loader) loader.classList.add("hidden");
  };

  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1400);


  /* MOBILE NAV */
  const closeMenu = () => {
    if (!menuToggle || !nav) return;

    menuToggle.classList.remove("open");
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !nav) return;

    menuToggle.classList.add("open");
    nav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* SCROLL REVEAL */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });

  } else {
    revealItems.forEach(item => {
      item.classList.add("visible");
    });
  }


  /* ACTIVE NAV */
  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");

          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* SMOOTH ANCHOR OFFSET */
  navLinks.forEach(link => {

    link.addEventListener("click", event => {

      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const header = document.querySelector(".header");
      const offset = header ? header.offsetHeight + 18 : 90;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });

    });

  });


  /* CURSOR EFFECT — DESKTOP ONLY */
  const finePointer =
    window.matchMedia &&
    window.matchMedia("(pointer:fine)").matches;

  if (finePointer) {

    const cursor = document.createElement("div");

    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", event => {
      cursor.style.transform =
        `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    });

    const hoverTargets = document.querySelectorAll(
      "a,button,.capability,.solution,.project,.method-step"
    );

    hoverTargets.forEach(target => {

      target.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });

      target.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });

    });

  }

});
