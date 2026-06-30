(() => {
  "use strict";

  /* ====================== DISABLE RIGHT-CLICK  ============================================================ */
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  /* ================= DISABLE COMMON DEVTOOLS SHORTCUTS ================================== */
  document.addEventListener("keydown", (e) => {
    const blocked =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "U"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U");

    if (blocked) e.preventDefault();
  });

  /* ======================= DEVTOOLS DETECTION ============================= */
  const devToolsCheck = () => {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      document.body.innerHTML = "";
      window.location.reload();
    }
  };
  setInterval(devToolsCheck, 1000);

  /* ================================= TOGGLE =================================== */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu   = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  /* ============================ CLOSE MENU ON NAV LINK CLICK (mobile) ======================= */
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("show");
    });
  });

  /* ============================================================
     ACTIVE NAV LINK ON SCROLL
  ============================================================ */
  const sections = document.querySelectorAll("section[id]");

  const highlightNavLink = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop    = section.offsetTop - 58;
      const sectionHeight = section.offsetHeight;
      const id            = section.getAttribute("id");
      const link          = document.querySelector(`.nav__menu a[href*="${id}"]`);

      if (!link) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink);

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin:   "top",
      distance: "60px",
      duration: 2000,
      delay:    200,
    });

    sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text");
    sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", { delay: 400 });
    sr.reveal(".home__social-icon", { interval: 200 });
    sr.reveal(".skills__data, .work__img1, .contact__input",  { interval: 200 });
  }

  /* ============================================================
     CONTACT FORM — Formspree
  ============================================================ */
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      const originalText = btn?.textContent ?? "Send";

      if (btn) {
        btn.disabled     = true;
        btn.textContent  = "Sending…";
      }

      try {
        const response = await fetch(form.action, {
          method:  "POST",
          body:    new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          alert("Message sent successfully! I'll get back to you soon.");
          form.reset();
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch {
        alert("Network error. Check your connection and try again.");
      } finally {
        if (btn) {
          btn.disabled    = false;
          btn.textContent = originalText;
        }
      }
    });
  }

})();