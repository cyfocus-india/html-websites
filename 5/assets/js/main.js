(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Icon refresh helper
  const refreshIcons = () => {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
    }
  };

  // Toast Notification System
  let toastContainer = null;
  const showToast = (message, duration = 3000) => {
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      toastContainer.setAttribute("aria-live", "polite");
      body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add("is-active"));
    });

    setTimeout(() => {
      toast.classList.remove("is-active");
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };
  window.northstarToast = showToast;

  // Curtain Entry Animation
  const makeCurtain = () => {
    if (prefersReduced || document.querySelector(".site-curtain")) return;
    const curtain = document.createElement("div");
    curtain.className = "site-curtain";
    curtain.setAttribute("aria-hidden", "true");
    curtain.innerHTML = "<span>Northstar</span>";
    body.prepend(curtain);
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("is-ready")));
    window.setTimeout(() => curtain.remove(), 1050);
  };

  // Navigation & Dropdown Setup
  const setupNavigation = () => {
    const button = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    let backdrop = document.querySelector(".nav-backdrop");

    if (button && nav) {
      if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "nav-backdrop";
        backdrop.setAttribute("aria-hidden", "true");
        body.appendChild(backdrop);
      }

      const closeMenu = () => {
        nav.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
        backdrop.classList.remove("is-active");
        document.querySelectorAll(".nav-item-dropdown").forEach((d) => {
          d.classList.remove("is-open");
          d.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
      };

      const openMenu = () => {
        nav.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        body.classList.add("menu-open");
        backdrop.classList.add("is-active");
      };

      button.addEventListener("click", () => {
        const isOpen = nav.classList.contains("is-open");
        if (isOpen) closeMenu();
        else openMenu();
      });

      backdrop.addEventListener("click", closeMenu);

      nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 1180) closeMenu();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          document.querySelectorAll(".nav-item-dropdown").forEach((d) => {
            d.classList.remove("is-open");
            d.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
          });
        }
      });
    }

    // Dropdown toggles
    document.querySelectorAll(".nav-item-dropdown").forEach((item) => {
      const toggle = item.querySelector(".nav-dropdown-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".nav-item-dropdown").forEach((d) => {
          if (d !== item) {
            d.classList.remove("is-open");
            d.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    // Keyboard navigation for dropdowns
    document.addEventListener("keydown", (e) => {
      const openDropdown = document.querySelector(".nav-item-dropdown.is-open");
      if (!openDropdown) return;
      const links = [...openDropdown.querySelectorAll(".dropdown-link")];
      if (!links.length) return;
      const current = document.activeElement;
      const idx = links.indexOf(current);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        links[idx < links.length - 1 ? idx + 1 : 0]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        links[idx > 0 ? idx - 1 : links.length - 1]?.focus();
      } else if (e.key === "Tab" && !e.shiftKey && idx === links.length - 1) {
        openDropdown.classList.remove("is-open");
        openDropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item-dropdown")) {
        document.querySelectorAll(".nav-item-dropdown").forEach((d) => {
          d.classList.remove("is-open");
          d.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Dynamic Active Page Detection
    try {
      const currentUrl = new URL(window.location.href);
      const currentPath = currentUrl.pathname.replace(/\/$/, "");
      const currentFile = currentPath.split("/").pop() || "index.html";

      let bestMatch = null;
      let bestScore = 0;

      document.querySelectorAll(".nav-link:not(.nav-dropdown-toggle), .dropdown-link").forEach((link) => {
        const linkUrl = new URL(link.href, window.location.href);
        const linkPath = linkUrl.pathname.replace(/\/$/, "");
        const linkFile = linkPath.split("/").pop() || "index.html";

        let score = 0;
        if (linkPath === currentPath) {
          score = 3;
        } else if (linkFile === currentFile && linkFile !== "index.html") {
          score = 2;
        } else if (currentFile === "" && linkFile === "index.html") {
          score = 1;
        }

        link.removeAttribute("aria-current");

        if (score > bestScore) {
          bestScore = score;
          bestMatch = link;
        }
      });

      if (bestMatch) {
        bestMatch.setAttribute("aria-current", "page");
        const parentDropdown = bestMatch.closest(".nav-item-dropdown");
        if (parentDropdown) {
          const dropdownToggle = parentDropdown.querySelector(".nav-dropdown-toggle");
          dropdownToggle?.classList.add("is-active");
        }
      }
    } catch (e) {
      // Fallback
    }
  };

  // Preferences (Theme & RTL)
  const updateThemeButton = () => {
    const theme = root.dataset.theme || "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      button.innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}"></i><span class="sr-only">${theme === "dark" ? "Light mode" : "Dark mode"}</span>`;
    });
    refreshIcons();
  };

  const setupPreferences = () => {
    updateThemeButton();

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("northstar-theme", next); } catch (e) {}
        updateThemeButton();
        showToast(`${next === "dark" ? "Dark" : "Light"} mode enabled`);
      });
    });

    document.querySelectorAll("[data-dir-toggle]").forEach((button) => {
      const sync = () => {
        const rtl = root.dir === "rtl";
        button.setAttribute("aria-label", rtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
        button.setAttribute("aria-pressed", String(rtl));
      };
      sync();
      button.addEventListener("click", () => {
        const nextDir = root.dir === "rtl" ? "ltr" : "rtl";
        root.dir = nextDir;
        try { localStorage.setItem("northstar-dir", nextDir); } catch (e) {}
        sync();
        showToast(`Switched to ${nextDir.toUpperCase()} layout`);
      });
    });
  };

  // Scroll Reveal Animations
  const setupReveal = () => {
    const items = [...document.querySelectorAll("[data-reveal], [data-stagger]")];
    if (!items.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((item) => observer.observe(item));
  };

  // Animated Number Counters
  const animateCounter = (element) => {
    const target = Number(element.dataset.counter || 0);
    const decimals = Number(element.dataset.decimals || 0);
    const suffix = element.dataset.suffix || "";
    const prefix = element.dataset.prefix || "";
    if (prefersReduced) {
      element.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      element.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const setupCounters = () => {
    const counters = [...document.querySelectorAll("[data-counter]")];
    if (!counters.length) return;
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
  };

  // Accordions
  const setupAccordions = () => {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
      });
    });
  };

  // Form Validation
  const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    tel: (value) => !value || /^[+\d\s()-]{7,}$/.test(value),
    password: (value) => value.length >= 8
  };

  const validateField = (input) => {
    const field = input.closest(".field");
    if (!field) return true;
    const value = input.type === "checkbox" ? input.checked : input.value.trim();
    let valid = true;
    if (input.required) valid = input.type === "checkbox" ? value : value.length > 0;
    if (valid && value && validators[input.type]) valid = validators[input.type](value);
    if (valid && input.minLength > 0 && typeof value === "string") valid = value.length >= input.minLength;
    const matchSelector = input.dataset.match;
    if (valid && matchSelector) {
      const other = input.form?.querySelector(matchSelector);
      valid = Boolean(other && value === other.value);
    }
    field.classList.toggle("has-error", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    return valid;
  };

  const setupForms = () => {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
      form.noValidate = true;
      const inputs = [...form.querySelectorAll("input, select, textarea")];
      inputs.forEach((input) => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
          if (input.closest(".field")?.classList.contains("has-error")) validateField(input);
        });
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const valid = inputs
          .filter((input) => !input.disabled && input.type !== "submit")
          .map(validateField)
          .every(Boolean);

        if (!valid) {
          form.querySelector('[aria-invalid="true"]')?.focus();
          showToast("Please check the form for errors.");
          return;
        }

        const status = form.querySelector(".form-status");
        if (status) {
          status.classList.add("is-visible");
          status.setAttribute("role", "status");
        }

        showToast("Request submitted successfully!");

        if (form.dataset.redirect) {
          window.setTimeout(() => {
            location.href = form.dataset.redirect;
          }, 600);
        } else if (form.dataset.reset !== "false") {
          form.reset();
        }
      });
    });
  };

  // Course Finder
  const setupFinder = () => {
    const finder = document.querySelector("[data-course-finder]");
    const output = document.querySelector("[data-finder-output]");
    if (!finder || !output) return;

    finder.addEventListener("submit", (event) => {
      event.preventDefault();
      const grade = finder.elements.grade.value;
      const subject = finder.elements.subject.value;
      const format = finder.elements.format.value;

      const isSubpage = window.location.pathname.includes("/pages/");
      const contactUrl = (isSubpage ? "" : "pages/") + `contact.html?grade=${encodeURIComponent(grade)}&subject=${encodeURIComponent(subject)}&format=${encodeURIComponent(format)}`;

      output.innerHTML = `
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <i data-lucide="sparkles" style="width:24px;height:24px;color:var(--green);flex-shrink:0;"></i>
          <div style="flex:1;min-width:260px;">
            <strong>Recommended:</strong> ${subject} program for ${grade}, conducted in ${format} format. Batches are open with flexible schedules.
          </div>
          <a class="btn btn--green btn--sm" href="${contactUrl}" style="margin-left:auto;">
            <span>Book this course</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      `;
      output.hidden = false;
      output.focus();
      refreshIcons();
      showToast("Found matching courses! Click 'Book this course' to proceed.");
    });
  };

  // URL Parameter Prefill (for contact.html)
  const setupPrefill = () => {
    const params = new URLSearchParams(window.location.search);
    const grade = params.get("grade");
    const subject = params.get("subject");
    const format = params.get("format");

    if (!grade && !subject && !format) return;

    const gradeSelect = document.querySelector("#student-grade");
    const subjectSelect = document.querySelector("#contact-subject");
    const formatSelect = document.querySelector("#format");

    if (gradeSelect && grade) {
      for (const option of gradeSelect.options) {
        if (option.text.toLowerCase().includes(grade.toLowerCase()) || grade.toLowerCase().includes(option.text.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    if (subjectSelect && subject) {
      for (const option of subjectSelect.options) {
        if (option.text.toLowerCase().includes(subject.toLowerCase()) || subject.toLowerCase().includes(option.text.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    if (formatSelect && format) {
      for (const option of formatSelect.options) {
        const cleanFormat = format.toLowerCase().replace(/[^a-z]/g, "");
        const cleanOption = option.text.toLowerCase().replace(/[^a-z]/g, "");
        if (cleanOption.includes(cleanFormat) || cleanFormat.includes(cleanOption.slice(0, 5))) {
          option.selected = true;
          break;
        }
      }
    }

    const form = document.querySelector("form[data-validate]");
    if (form) {
      window.setTimeout(() => {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Course details pre-filled in your booking form!");
      }, 350);
    }
  };

  // Interactive Course Filter (pages/courses.html)
  const setupCourseFilter = () => {
    const filterButtons = document.querySelectorAll("[data-filter-grade]");
    const cards = document.querySelectorAll("[data-course-grade]");
    if (!filterButtons.length || !cards.length) return;

    const applyFilter = (filter, shouldAnimate = true) => {
      filterButtons.forEach((b) => {
        const isActive = b.dataset.filterGrade === filter;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      cards.forEach((card) => {
        const grades = (card.dataset.courseGrade || "").split(/\s+/);
        const isMatch = filter === "all" || grades.includes(filter);

        if (isMatch) {
          card.style.display = "";
          if (shouldAnimate) {
            card.style.opacity = "0";
            card.style.transform = "translateY(12px)";
            requestAnimationFrame(() => {
              card.style.transition = "opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.opacity = "1";
            card.style.transform = "none";
          }
          card.classList.add("is-visible");
        } else {
          card.style.display = "none";
        }
      });

      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filterGrade;
        applyFilter(filter, true);
      });
    });

    // Check URL parameters & hash for auto-filtering (e.g. ?grade=elementary or ?grade=middle#course-detail)
    const params = new URLSearchParams(window.location.search);
    const rawParam = (params.get("grade") || params.get("filter") || window.location.hash.replace("#", "")).toLowerCase().trim();

    let targetGrade = null;
    if (rawParam.includes("elem") || rawParam.includes("1-5") || rawParam.includes("1_5") || rawParam.includes("1–5")) {
      targetGrade = "elementary";
    } else if (rawParam.includes("mid") || rawParam.includes("6-8") || rawParam.includes("6_8") || rawParam.includes("6–8")) {
      targetGrade = "middle";
    } else if (rawParam.includes("high") || rawParam.includes("9-10") || rawParam.includes("9_10") || rawParam.includes("9–10")) {
      targetGrade = "high";
    } else if (rawParam.includes("sen") || rawParam.includes("11-12") || rawParam.includes("11_12") || rawParam.includes("11–12")) {
      targetGrade = "senior";
    } else if (rawParam === "all") {
      targetGrade = "all";
    }

    if (targetGrade) {
      applyFilter(targetGrade, false);
      const targetElement = document.getElementById("course-detail") || document.querySelector(".filter-bar");
      if (targetElement && (window.location.hash || params.get("grade"))) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  };

  // Hero Parallax Motion
  const setupHeroMotion = () => {
    const visual = document.querySelector(".hero-visual");
    const frame = visual?.querySelector(".hero-image-frame");
    if (!visual || !frame || prefersReduced || !window.matchMedia("(pointer: fine)").matches) return;
    visual.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      frame.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    visual.addEventListener("pointerleave", () => {
      frame.style.transform = "translate3d(0,0,0)";
    });
  };

  // Misc Utilities
  const setupMisc = () => {
    document.querySelectorAll("[data-year]").forEach((item) => {
      item.textContent = new Date().getFullYear();
    });

    document.querySelectorAll("[data-copy-email]").forEach((button) => {
      button.addEventListener("click", async () => {
        const email = button.dataset.copyEmail;
        try {
          await navigator.clipboard.writeText(email);
          showToast(`Email copied: ${email}`);
          const original = button.textContent;
          button.textContent = "Copied!";
          window.setTimeout(() => { button.textContent = original; }, 1600);
        } catch {
          location.href = `mailto:${email}`;
        }
      });
    });
  };

  // Interactive Live Map Recenter
  const setupMap = () => {
    document.querySelectorAll("[data-map-recenter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const frame = btn.closest(".interactive-map")?.querySelector(".map-frame");
        if (frame) {
          const currentSrc = frame.src;
          frame.src = currentSrc;
          showToast("Map recentered to Northstar Learning Center!");
        }
      });
    });
  };

  const init = () => {
    makeCurtain();
    setupNavigation();
    setupPreferences();
    setupReveal();
    setupCounters();
    setupAccordions();
    setupForms();
    setupFinder();
    setupPrefill();
    setupCourseFilter();
    setupHeroMotion();
    setupMap();
    setupMisc();
    refreshIcons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("load", refreshIcons, { once: true });
})();
