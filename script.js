/* =====================================================
   RadiantRoots — site interactions
   Pure vanilla JS, no design changes — just wires up the
   markup/classes that already exist in the HTML/CSS.
   ===================================================== */
(function () {
  "use strict";

  /* ---------- Toast helper (used by login.html social buttons) ---------- */
  window.rrToast = function (message) {
    var toast = document.querySelector(".rr-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "rr-toast";
      toast.innerHTML = '<span class="dot"></span><span class="msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector(".msg").textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  };

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Mobile nav toggle ---------- */
    var navToggle = document.querySelector(".nav-toggle");
    var navWrap = document.querySelector(".nav-wrap");
    var navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("nav-links-open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.classList.toggle("open", isOpen);

        if (isOpen) {
          navLinks.style.display = "flex";
          navLinks.style.flexDirection = "column";
          navLinks.style.position = "absolute";
          navLinks.style.top = navWrap.offsetHeight + "px";
          navLinks.style.left = "0";
          navLinks.style.right = "0";
          navLinks.style.background = "#FBF9F4";
          navLinks.style.padding = "1.2rem var(--container-pad, 1.5rem)";
          navLinks.style.borderBottom = "1px solid rgba(15,30,58,0.10)";
          navLinks.style.gap = "1.1rem";
        } else {
          navLinks.removeAttribute("style");
        }
      });

      // Close mobile menu when a link is tapped
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          if (navLinks.classList.contains("nav-links-open")) {
            navLinks.classList.remove("nav-links-open");
            navLinks.removeAttribute("style");
            navToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      revealEls.forEach(function (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity .7s ease, transform .7s ease";
      });

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        revealEls.forEach(function (el) {
          io.observe(el);
        });
      } else {
        revealEls.forEach(function (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
    }

    /* ---------- Auth tabs (login.html) ---------- */
    var authTabs = document.querySelectorAll(".auth-tabs button");
    if (authTabs.length) {
      authTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          authTabs.forEach(function (t) {
            t.classList.remove("active");
          });
          tab.classList.add("active");

          document.querySelectorAll(".auth-panel").forEach(function (panel) {
            panel.classList.remove("active");
          });
          var target = document.getElementById(tab.dataset.target);
          if (target) target.classList.add("active");
        });
      });
    }

    /* ---------- Password show/hide toggles ---------- */
    document.querySelectorAll(".pw-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.querySelector(btn.dataset.for);
        if (!input) return;
        var isPw = input.type === "password";
        input.type = isPw ? "text" : "password";
        btn.textContent = isPw ? "Hide" : "Show";
      });
    });

    /* ---------- Login form (demo only, no backend) ---------- */
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var alertBox = document.getElementById("loginAlert");
        if (alertBox) {
          alertBox.textContent = "You're logged in! (demo only — no account was created)";
          alertBox.classList.add("show");
        }
        loginForm.reset();
      });
    }

    /* ---------- Signup form (demo only, no backend) ---------- */
    var signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var alertBox = document.getElementById("signupAlert");
        if (alertBox) {
          alertBox.textContent = "Welcome to RadiantRoots! (demo only — no account was created)";
          alertBox.classList.add("show");
        }
        signupForm.reset();
      });
    }

    /* ---------- Contact form (demo only, no backend) ---------- */
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = document.getElementById("contactStatus");
        if (status) {
          status.textContent = "Thanks! Your message has been sent — we'll reply within one business day.";
          status.classList.add("success");
        }
        contactForm.reset();
      });
    }

    /* ---------- Newsletter form (footer, demo only) ---------- */
    var newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        window.rrToast("Thanks for subscribing to RadiantRoots!");
        newsletterForm.reset();
      });
    }
  });
})();
