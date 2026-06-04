(function () {
  "use strict";

  document.body.classList.add("hero-ready");

  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const drawerLinks = drawer ? drawer.querySelectorAll("a") : [];
  const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
  const sections = document.querySelectorAll(
    "#hero, #services, #why-us, #portfolio, #blog-preview, #contact"
  );
  const sectionMap = {
    services: "services",
    work: "portfolio",
    about: "why-us",
    blog: "blog-preview",
    contact: "contact",
  };

  /* 1. Nav scroll */
  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 80);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 2. Mobile drawer */
  function setDrawer(open) {
    if (!drawer || !toggle) return;
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("open"));
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setDrawer(false);
    });
  }

  drawerLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setDrawer(false);
    });
  });

  /* 3. Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* 4. Counter animation */
  const whyUs = document.getElementById("why-us");
  const counters = document.querySelectorAll("[data-target]");

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const val = target * easeOutQuart(p);
      el.textContent =
        (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) +
        suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (whyUs && counters.length && "IntersectionObserver" in window) {
    let counted = false;
    const counterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            counters.forEach(animateCounter);
            counterObs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    counterObs.observe(whyUs);
  }

  /* 5. Active nav link */
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const activeObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              const href = link.getAttribute("href");
              const active = href === "#" + id;
              link.classList.toggle("active", active);
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: "-20% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      activeObs.observe(section);
    });
  }

  /* Demo forms */
  function wireDemoForm(formId, noticeId) {
    const form = document.getElementById(formId);
    const notice = document.getElementById(noticeId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (notice) {
        notice.textContent = "Demo only — form not connected.";
        notice.setAttribute("role", "status");
      }
    });
  }

  wireDemoForm("contact-form", "form-notice");
  wireDemoForm("footer-newsletter-form", "footer-newsletter-notice");

  /* Prevent demo-link hash jump if any anchor slips through */
  document.querySelectorAll(".demo-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  /* Featured service / process cards — highlight on hover */
  function wireFeaturedCards(selector, defaultIndex) {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;
    const parent = cards[0].parentElement;
    const def = defaultIndex != null ? defaultIndex : Math.min(1, cards.length - 1);

    function setDefault() {
      cards.forEach(function (c) {
        c.classList.remove("is-featured");
      });
      cards[def].classList.add("is-featured");
    }

    cards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        cards.forEach(function (c) {
          c.classList.remove("is-featured");
        });
        card.classList.add("is-featured");
      });
    });

    if (parent) {
      parent.addEventListener("mouseleave", setDefault);
    }
    setDefault();
  }

  wireFeaturedCards(".service-card", 1);
  wireFeaturedCards(".process-step", 1);
})();
