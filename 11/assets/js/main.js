(function () {
  "use strict";

  const body = document.body;
  const root = body.dataset.root || ".";
  const page = body.dataset.page || "";
  const path = (value) => `${root}/${value}`.replace("././", "./");

  const brand = `
    <a class="brand" href="${path("index.html")}" aria-label="Stillwater Aquatics home">
      <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 33c9-15 26-18 38-5l10-8v26l-10-8C34 51 17 48 8 33Z" fill="currentColor" opacity=".16"></path>
        <path d="M10 33c9-12 23-14 34-4l8-6v20l-8-6c-11 10-25 8-34-4Z" fill="none" stroke="currentColor" stroke-width="3"></path>
        <circle cx="38" cy="30" r="2.5" fill="currentColor"></circle>
      </svg>
      <span>Stillwater<span>.</span></span>
    </a>`;

  const isHome = page === "home" || page === "home2";
  const isPages = ["about", "coming-soon", "privacy", "terms", "404"].includes(page);

  const homeDropdown = `
    <div class="nav-dropdown" data-dropdown ${isHome ? 'data-active="true"' : ""}>
      <button class="dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">
        <span>Home</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="dropdown-menu" role="menu">
        <a class="dropdown-item" href="${path("index.html")}" role="menuitem"${page === "home" ? ' aria-current="page"' : ""}>Home 1</a>
        <a class="dropdown-item" href="${path("index1.html")}" role="menuitem"${page === "home2" ? ' aria-current="page"' : ""}>Home 2</a>
      </div>
    </div>`;

  const standardNavLinks = [
    ["catalog", "pages/fish-catalog.html", "Fish Catalog"],
    ["plants", "pages/aquatic-plants.html", "Aquatic Plants"],
    ["equipment", "pages/equipment.html", "Equipment"],
    ["guides", "pages/care-guides.html", "Care Guides"],
    ["contact", "pages/contact.html", "Contact"]
  ].map(([key, href, label]) =>
    `<a href="${path(href)}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");

  const pagesDropdown = `
    <div class="nav-dropdown" data-dropdown ${isPages ? 'data-active="true"' : ""}>
      <button class="dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">
        <span>Pages</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="dropdown-menu" role="menu">
        <a class="dropdown-item" href="${path("pages/about.html")}" role="menuitem"${page === "about" ? ' aria-current="page"' : ""}>About Us</a>
        <a class="dropdown-item" href="${path("pages/coming-soon.html")}" role="menuitem"${page === "coming-soon" ? ' aria-current="page"' : ""}>Coming Soon</a>
        <a class="dropdown-item" href="${path("pages/404.html")}" role="menuitem"${page === "404" ? ' aria-current="page"' : ""}>404</a>
        <a class="dropdown-item" href="${path("pages/privacy.html")}" role="menuitem"${page === "privacy" ? ' aria-current="page"' : ""}>Privacy Policy</a>
        <a class="dropdown-item" href="${path("pages/terms.html")}" role="menuitem"${page === "terms" ? ' aria-current="page"' : ""}>Terms of Service</a>
      </div>
    </div>`;

  const mobileNavHTML = `
    <div class="mobile-group">
      <button class="mobile-group-toggle" type="button" data-mobile-group-btn aria-expanded="${isHome ? "true" : "false"}" aria-controls="m-home-group">
        <span>Home</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="mobile-group-panel ${isHome ? "is-open" : ""}" id="m-home-group">
        <a href="${path("index.html")}"${page === "home" ? ' aria-current="page"' : ""}>Home 1</a>
        <a href="${path("index1.html")}"${page === "home2" ? ' aria-current="page"' : ""}>Home 2</a>
      </div>
    </div>
    <a href="${path("pages/fish-catalog.html")}"${page === "catalog" ? ' aria-current="page"' : ""}>Fish Catalog</a>
    <a href="${path("pages/aquatic-plants.html")}"${page === "plants" ? ' aria-current="page"' : ""}>Aquatic Plants</a>
    <a href="${path("pages/equipment.html")}"${page === "equipment" ? ' aria-current="page"' : ""}>Equipment</a>
    <a href="${path("pages/care-guides.html")}"${page === "guides" ? ' aria-current="page"' : ""}>Care Guides</a>
    <a href="${path("pages/contact.html")}"${page === "contact" ? ' aria-current="page"' : ""}>Contact</a>
    <div class="mobile-group">
      <button class="mobile-group-toggle" type="button" data-mobile-group-btn aria-expanded="${isPages ? "true" : "false"}" aria-controls="m-pages-group">
        <span>Pages</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="mobile-group-panel ${isPages ? "is-open" : ""}" id="m-pages-group">
        <a href="${path("pages/about.html")}"${page === "about" ? ' aria-current="page"' : ""}>About Us</a>
        <a href="${path("pages/coming-soon.html")}"${page === "coming-soon" ? ' aria-current="page"' : ""}>Coming Soon</a>
        <a href="${path("pages/404.html")}"${page === "404" ? ' aria-current="page"' : ""}>404</a>
        <a href="${path("pages/privacy.html")}"${page === "privacy" ? ' aria-current="page"' : ""}>Privacy Policy</a>
        <a href="${path("pages/terms.html")}"${page === "terms" ? ' aria-current="page"' : ""}>Terms of Service</a>
      </div>
    </div>`;

  const headerTarget = document.getElementById("site-header");
  if (headerTarget) {
    headerTarget.innerHTML = `
      <div class="announcement">
        <i data-lucide="package-check"></i>
        <span>Free local delivery over ₹2,500 · Livestock dispatched Tuesday–Thursday</span>
      </div>
      <header class="site-header" data-header>
        <div class="container nav-shell">
          ${brand}
          <nav class="nav-links" aria-label="Primary navigation">
            ${homeDropdown}
            ${standardNavLinks}
            ${pagesDropdown}
          </nav>
          <div class="nav-actions">
            <button class="dir-button" type="button" data-direction-toggle aria-label="Switch text direction" title="Switch text direction">
              <i data-lucide="arrow-left-right"></i>
              <span data-direction-label>RTL</span>
            </button>
            <button class="icon-button" type="button" data-theme-toggle aria-label="Switch color theme" title="Switch light / dark theme">
              <i data-lucide="moon"></i>
            </button>
            <a class="button coral sm nav-cta" href="${path("pages/signin.html")}">
              Sign In <i data-lucide="log-in"></i>
            </a>
            <button class="icon-button menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation">
              <i data-lucide="menu"></i>
            </button>
          </div>
        </div>
        <div class="container mobile-panel" id="mobile-navigation" aria-hidden="true">
          <div>
            <nav class="mobile-links" aria-label="Mobile navigation">${mobileNavHTML}</nav>
            <div class="mobile-panel-actions">
              <a class="button coral sm" href="${path("pages/signin.html")}" style="width:100%;justify-content:center">
                Sign In <i data-lucide="log-in"></i>
              </a>
            </div>
          </div>
        </div>
      </header>`;
  }

  const footerTarget = document.getElementById("site-footer");
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-intro">
              ${brand}
              <p>Thoughtfully sourced fish, aquatic plants, and dependable equipment for calm, thriving aquariums.</p>
            </div>
            <div class="footer-columns">
              <div class="footer-column">
                <h3>Catalog</h3>
                <a href="${path("index.html")}">Home 1</a>
                <a href="${path("index1.html")}">Home 2</a>
                <a href="${path("pages/fish-catalog.html")}">Fish Catalog</a>
                <a href="${path("pages/aquatic-plants.html")}">Aquatic Plants</a>
                <a href="${path("pages/equipment.html")}">Equipment</a>
              </div>
              <div class="footer-column">
                <h3>Information</h3>
                <a href="${path("pages/about.html")}">About Us</a>
                <a href="${path("pages/care-guides.html")}">Care Guides</a>
                <a href="${path("pages/contact.html")}">Contact</a>
                <a href="${path("pages/coming-soon.html")}">Coming Soon</a>
                <a href="${path("pages/404.html")}">404</a>
              </div>
              <div class="footer-column">
                <h3>Account &amp; Legal</h3>
                <a href="${path("pages/signin.html")}">Sign In</a>
                <a href="${path("pages/signup.html")}">Sign Up</a>
                <a href="${path("pages/privacy.html")}">Privacy Policy</a>
                <a href="${path("pages/terms.html")}">Terms of Service</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span data-year></span> Stillwater Aquatics.</span>
            <span><a href="${path("pages/privacy.html")}">Privacy Policy</a> · <a href="${path("pages/terms.html")}">Terms of Service</a></span>
          </div>
        </div>
      </footer>`;
  }

  const refreshIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons({
        attrs: {
          "aria-hidden": "true",
          "stroke-width": 1.8
        }
      });
    }
  };

  // Theme Handling
  const getTheme = () => localStorage.getItem("stillwater-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}"></i>`;
      btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
      btn.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    });
    refreshIcons();
  };
  applyTheme(getTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("stillwater-theme", next);
      applyTheme(next);
    });
  });

  // Direction Handling (RTL / LTR)
  const savedDirection = localStorage.getItem("stillwater-direction") || "ltr";
  const updateDirectionUI = (dir) => {
    document.documentElement.dir = dir;
    const nextTarget = dir === "rtl" ? "LTR" : "RTL";
    document.querySelectorAll("[data-direction-toggle]").forEach((btn) => {
      btn.innerHTML = `<i data-lucide="arrow-left-right"></i> <span data-direction-label>${nextTarget}</span>`;
      btn.setAttribute("aria-label", `Switch to ${nextTarget} layout`);
      btn.setAttribute("title", `Switch to ${nextTarget}`);
    });
  };
  updateDirectionUI(savedDirection);

  document.querySelectorAll("[data-direction-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
      localStorage.setItem("stillwater-direction", next);
      updateDirectionUI(next);
      refreshIcons();
    });
  });

  // Dropdown Desktop Handling
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    trigger?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("is-open");
          other.querySelector(".dropdown-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown").forEach((d) => {
      d.classList.remove("is-open");
      d.querySelector(".dropdown-trigger")?.setAttribute("aria-expanded", "false");
    });
  });

  // Mobile Group Accordions
  document.querySelectorAll("[data-mobile-group-btn]").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      panel?.classList.toggle("is-open", !open);
    });
  });

  // Mobile Menu
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobilePanel = document.getElementById("mobile-navigation");
  const closeMobileMenu = () => {
    if (!menuButton || !mobilePanel) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.innerHTML = `<i data-lucide="menu"></i>`;
    mobilePanel.setAttribute("aria-hidden", "true");
    refreshIcons();
  };

  menuButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    mobilePanel?.setAttribute("aria-hidden", String(!open));
    refreshIcons();
  });

  // Close on Escape or click outside
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      document.querySelectorAll(".nav-dropdown").forEach((d) => {
        d.classList.remove("is-open");
        d.querySelector(".dropdown-trigger")?.setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("click", (e) => {
    if (mobilePanel && !mobilePanel.contains(e.target) && !menuButton?.contains(e.target)) {
      closeMobileMenu();
    }
  });
  mobilePanel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Sticky Header Scroll
  const header = document.querySelector("[data-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Scroll Animations
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animated = document.querySelectorAll(".reveal, .stagger");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    animated.forEach((node) => node.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px" });
    animated.forEach((node) => observer.observe(node));
  }

  // Interactive Live Filter & Search System
  const initFilterAndSearch = () => {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const searchInput = document.querySelector("[data-search-input]");
    const cards = document.querySelectorAll("[data-category]");
    const countDisplay = document.querySelector("[data-match-count]");
    const emptyState = document.querySelector("[data-empty-state]");
    const resetBtn = document.querySelector("[data-reset-filter]");

    if (!cards.length) return;

    let activeFilter = "all";
    let searchQuery = "";

    const applyFilters = () => {
      let matchCount = 0;
      const term = searchQuery.toLowerCase().trim();

      cards.forEach((card) => {
        const category = card.dataset.category || "";
        const categoryMatch = activeFilter === "all" || category === activeFilter;
        const textContent = card.textContent.toLowerCase();
        const textMatch = !term || textContent.includes(term);

        if (categoryMatch && textMatch) {
          card.hidden = false;
          matchCount++;
        } else {
          card.hidden = true;
        }
      });

      if (countDisplay) {
        countDisplay.textContent = `Showing ${matchCount} ${matchCount === 1 ? "item" : "items"}`;
      }

      if (emptyState) {
        emptyState.classList.toggle("is-visible", matchCount === 0);
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        applyFilters();
      });
    });

    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });

    resetBtn?.addEventListener("click", () => {
      activeFilter = "all";
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === "all")));
      applyFilters();
    });

    const handleHashFilter = (scroll = true) => {
      const raw = window.location.hash.replace("#", "").toLowerCase().trim();
      if (!raw) {
        applyFilters();
        return;
      }
      const matchingBtn = document.querySelector(`[data-filter="${raw}"]`);
      if (matchingBtn) {
        activeFilter = raw;
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === matchingBtn)));
        applyFilters();
        if (scroll) {
          const targetSection = document.getElementById("stock") || document.querySelector(".catalog-controls");
          if (targetSection) {
            setTimeout(() => {
              targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
          }
        }
      }
    };

    handleHashFilter(true);
    window.addEventListener("hashchange", () => handleHashFilter(true));

    // Category feature panels click handlers (top of catalog page)
    document.querySelectorAll("[data-filter-target], .category-panel").forEach((panel) => {
      panel.addEventListener("click", (e) => {
        const raw = panel.dataset.filterTarget || panel.getAttribute("href")?.replace("#", "") || panel.querySelector("h2")?.textContent.toLowerCase().trim() || "";
        const target = raw.includes("freshwater") ? "freshwater" : raw.includes("marine") ? "marine" : raw.includes("planted") ? "planted" : "";
        if (target) {
          e.preventDefault();
          history.pushState(null, "", `#${target}`);
          activeFilter = target;
          filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === target)));
          applyFilters();
          const stock = document.getElementById("stock") || document.querySelector(".catalog-controls");
          if (stock) {
            stock.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  };
  initFilterAndSearch();

  // Accordions
  document.querySelectorAll("[data-accordion-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      panel?.classList.toggle("is-open", !open);
    });
  });

  // Password Visibility Toggle
  document.querySelectorAll("[data-password-toggle]").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
      const input = toggleBtn.closest(".password-wrap")?.querySelector("input");
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggleBtn.innerHTML = `<i data-lucide="${isPassword ? "eye-off" : "eye"}"></i>`;
      toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      refreshIcons();
    });
  });

  // Accessible Form Validation
  const messageFor = (field) => {
    if (field.validity.valueMissing) return "Please complete this required field.";
    if (field.validity.typeMismatch) return "Please enter a valid email address.";
    if (field.validity.tooShort) return `Please use at least ${field.minLength} characters (currently ${field.value.length}).`;
    if (field.validity.patternMismatch) return field.dataset.patternMessage || "Please use the requested format.";
    return "Please check this value.";
  };

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.setAttribute("novalidate", "");
    const fields = [...form.querySelectorAll("input, select, textarea")].filter((field) => field.type !== "submit" && field.type !== "button");

    const validate = (field) => {
      let valid = field.checkValidity();
      let message = valid ? "" : messageFor(field);
      if (field.dataset.matches) {
        const other = form.querySelector(field.dataset.matches);
        if (other && field.value !== other.value) {
          valid = false;
          message = "Passwords do not match.";
        }
      }
      field.setAttribute("aria-invalid", String(!valid));
      const error = field.id ? form.querySelector(`[data-error-for="${field.id}"]`) : null;
      if (error) error.textContent = message;
      return valid;
    };

    fields.forEach((field) => {
      field.addEventListener("blur", () => validate(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validate(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = fields.map(validate).every(Boolean);
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const successBox = form.querySelector("[data-form-success]");
      if (successBox) {
        successBox.classList.add("is-visible");
        successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
      fields.forEach((f) => f.removeAttribute("aria-invalid"));
    });
  });

  // Dynamic Year
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Live Map Controls
  const initMapControls = () => {
    const iframe = document.getElementById("interactive-map-iframe");
    if (!iframe) return;

    let zoomLevel = 1.0;
    const baseSpan = 0.012; // span around center
    const center = [77.6412, 12.9716]; // [lon, lat]

    const updateMapSrc = () => {
      const spanLon = baseSpan * zoomLevel;
      const spanLat = (baseSpan * 0.75) * zoomLevel;
      const minLon = center[0] - spanLon;
      const maxLon = center[0] + spanLon;
      const minLat = center[1] - spanLat;
      const maxLat = center[1] + spanLat;
      iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon.toFixed(4)}%2C${minLat.toFixed(4)}%2C${maxLon.toFixed(4)}%2C${maxLat.toFixed(4)}&layer=mapnik&marker=${center[1]}%2C${center[0]}`;
    };

    document.getElementById("btn-zoom-in")?.addEventListener("click", () => {
      if (zoomLevel > 0.35) {
        zoomLevel = Math.max(0.35, zoomLevel * 0.65);
        updateMapSrc();
      }
    });

    document.getElementById("btn-zoom-out")?.addEventListener("click", () => {
      if (zoomLevel < 3.5) {
        zoomLevel = Math.min(3.5, zoomLevel * 1.5);
        updateMapSrc();
      }
    });

    document.getElementById("btn-recenter")?.addEventListener("click", () => {
      zoomLevel = 1.0;
      updateMapSrc();
    });
  };
  initMapControls();

  // Specimen & Item Details Modal Popup System
  const initSpecimenModal = () => {
    let modalBackdrop = document.getElementById("specimen-modal");
    if (!modalBackdrop) {
      modalBackdrop = document.createElement("div");
      modalBackdrop.id = "specimen-modal";
      modalBackdrop.className = "specimen-modal-backdrop";
      modalBackdrop.setAttribute("aria-hidden", "true");
      modalBackdrop.setAttribute("role", "dialog");
      modalBackdrop.setAttribute("aria-modal", "true");
      modalBackdrop.setAttribute("aria-labelledby", "modal-title");
      modalBackdrop.innerHTML = `
        <div class="specimen-modal-card" role="document">
          <button class="modal-close-btn" type="button" aria-label="Close details popup" data-modal-close>
            <i data-lucide="x"></i>
          </button>
          <div class="modal-body" id="modal-content"></div>
        </div>`;
      document.body.appendChild(modalBackdrop);
    }

    const modalContent = document.getElementById("modal-content");
    const closeBtn = modalBackdrop.querySelector("[data-modal-close]");

    const itemDatabase = {
      "honey gourami": {
        scientific: "Trichogaster chuna",
        origin: "India & Bangladesh (calm floodplain streams)",
        tag: "Easy Care · Peaceful Labyrinth",
        price: "₹420",
        stock: "14-Day Health Promise · In Stock",
        specs: { "Min Tank": "60 L+", "Temperature": "24–28°C", "pH Range": "6.0 – 7.5", "Hardness": "4 – 10 dGH", "Diet": "Omnivore / Micro-pellets", "Max Size": "5 cm (2 in)" },
        description: "The Honey Gourami is one of the gentlest and most endearing labyrinth fish in the aquarium hobby. Males develop glowing sunset-amber and honey tones accented with a dark throat stripe when displaying. Unlike larger gouramis, they are exceptionally peaceful, moving slowly through planted stems and living harmoniously with dwarf Neocaridina shrimp and small schooling fish.",
        careTip: "Provide gentle surface water circulation and floating plants (such as Salvinia or Amazon Frogbit) to create shelter for their surface labyrinth organ breathing and peaceful bubble-nesting behavior."
      },
      "cardinal tetra": {
        scientific: "Paracheirodon axelrodi",
        origin: "Rio Negro & Orinoco River Basin (blackwater)",
        tag: "School of 6+ · Blackwater Classic",
        price: "₹190",
        stock: "Batch Tested · In Stock",
        specs: { "Min Tank": "75 L+", "Temperature": "23–28°C", "pH Range": "4.5 – 6.8", "Hardness": "1 – 6 dGH", "Diet": "Micro-predator / Crushed Flake", "School Size": "6–15+ fish" },
        description: "A jewel of the Amazon basin, the Cardinal Tetra features an unbroken, vibrant iridescent electric-blue stripe and an intense scarlet-red underbody running from nose to tail. In seasoned aquascapes, a schooling group of 10 or more provides synchronized midwater movement and unmatched visual depth.",
        careTip: "Requires soft, clean water with gentle filtration. Dim lighting or natural driftwood tannins highlight their electric colors and significantly reduce shipping stress."
      },
      "ocellaris clownfish": {
        scientific: "Amphiprion ocellaris",
        origin: "Indo-Pacific Coral Reefs (100% Captive-Bred)",
        tag: "Reef-Safe · Beginner Marine",
        price: "₹1,950",
        stock: "Captive-Bred · Active & Feeding",
        specs: { "Min Tank": "75 L+", "Temperature": "24–27°C", "Specific Gravity": "1.023 – 1.026 SG", "dKH": "8 – 12", "Diet": "Marine Pellets / Mysis", "Reef Safe": "100% Yes" },
        description: "Our Ocellaris Clownfish are sustainably captive-bred, ensuring remarkable vigor, disease resistance, and instant willingness to accept dry marine pellets. With their iconic orange-and-white striping and playful waddling swim motion, they form the friendly centerpiece of any nano or standard marine reef.",
        careTip: "Anemones are not strictly mandatory; captive-bred clownfish readily adopt torch corals, toadstool leathers, or live rock ledges as their home base."
      },
      "royal gramma": {
        scientific: "Gramma loreto",
        origin: "Caribbean Sea (deep coral drop-offs & caves)",
        tag: "Cave Dweller · Vivid Reef Centerpiece",
        price: "₹2,850",
        stock: "Quarantine Clear · In Stock",
        specs: { "Min Tank": "110 L+", "Temperature": "24–27°C", "Specific Gravity": "1.023 – 1.025 SG", "pH Range": "8.1 – 8.4", "Diet": "Carnivore / Enriched Mysis", "Compatibility": "Reef Safe" },
        description: "One of the most striking fish in the sea, the Royal Gramma boasts an electric split coloration: rich royal magenta-purple across the anterior half fading through soft golden specks into a bright sun-yellow tail. Completely reef-safe with all corals, crabs, and ornamental shrimp.",
        careTip: "Incorporate shaded rock overhangs, arches, and cavities into your aquascape. They frequently orient their bodies parallel to cave roofs and appreciate moderate, indirect water flow."
      },
      "chili rasbora": {
        scientific: "Boraras brigittae",
        origin: "Southwest Borneo (peat swamp forests)",
        tag: "Nano School · Shrimp Companion",
        price: "₹260",
        stock: "Conditioned Batch · In Stock",
        specs: { "Min Tank": "30 L+", "Temperature": "22–28°C", "pH Range": "4.0 – 6.8", "Hardness": "1 – 4 dGH", "Diet": "Micro-fauna / Micro-granules", "Max Size": "1.8 cm (0.7 in)" },
        description: "Barely reaching 1.8 cm as fully grown adults, the Chili Rasbora (Mosquito Rasbora) is the definitive nano planted tank gem. Males develop radiant ruby-red bodies with striking black lateral wedges. Because of their microscopic mouths, they are 100% safe with newly hatched shrimp shrimplets.",
        careTip: "Feed powdered flakes, baby brine shrimp, or vinegar eels. Maintain gentle filtration with sponge filters to avoid overpowering their tiny fins."
      },
      "otocinclus": {
        scientific: "Otocinclus vestitus",
        origin: "South American River Shallows",
        tag: "Algae Grazer · Plant-Safe Master",
        price: "₹360",
        stock: "Biofilm Conditioned · In Stock",
        specs: { "Min Tank": "55 L+", "Temperature": "22–26°C", "pH Range": "6.0 – 7.2", "Hardness": "3 – 8 dGH", "Diet": "Soft Diatoms & Biofilm", "Group Size": "4–8+ fish" },
        description: "The undisputed MVP of aquascaping maintenance crews. Otocinclus work tirelessly across glass, hardscape, and fine plant leaves, grazing soft green algae and brown diatoms without ever biting or damaging delicate plant tissue.",
        careTip: "Only introduce into established tanks with existing biofilm. Supplement weekly with blanched zucchini, cucumber slices, or high-grade spirulina algae wafers."
      },
      "pygmy cory": {
        scientific: "Corydoras pygmaeus",
        origin: "Madeira River Basin (Brazil & Peru)",
        tag: "Bottom Group · Midwater Hoverer",
        price: "₹280",
        stock: "Active Shoal · In Stock",
        specs: { "Min Tank": "45 L+", "Temperature": "22–26°C", "pH Range": "6.0 – 7.2", "Hardness": "2 – 9 dGH", "Diet": "Sinking Micro-wafers / Brine", "Group Size": "8+ recommended" },
        description: "Unlike larger bottom-dwelling catfish, Pygmy Corydoras possess a delightful habit of schooling and hovering in midwater amongst stem plants. Their gentle, peaceful demeanor makes them a joy to watch as they flutter like miniature aquatic hummingbirds.",
        careTip: "Provide soft, smooth sand substrate to protect their delicate sensory barbels. Keeping them in groups of 8 or more dramatically increases their confidence and schooling behavior."
      },
      "blue ram": {
        scientific: "Mikrogeophagus ramirezi",
        origin: "Orinoco Basin Llanos (Colombia & Venezuela)",
        tag: "Centerpiece · Dwarf Cichlid",
        price: "₹780",
        stock: "Hand-Selected Pairs · In Stock",
        specs: { "Min Tank": "75 L+", "Temperature": "27–30°C", "pH Range": "5.5 – 6.8", "Hardness": "1 – 6 dGH", "Diet": "Omnivore / High Protein", "Temperament": "Peaceful Pair" },
        description: "A captivating dwarf cichlid showcasing glittering electric-blue spangles across a golden-yellow body with ruby-red iris rings. Blue Rams establish monogamous pair bonds and exhibit fascinating parental rituals without tearing up planted layouts.",
        careTip: "Requires warm water (27–30°C) and exceptionally clean water with low nitrates. Test parameters routinely and provide flat river stones or coconut caves for territory marking."
      },
      "anubias nana ‘petite’": {
        scientific: "Anubias barteri var. nana 'Petite'",
        origin: "West Africa (Cultivar)",
        tag: "Easy Care · Epiphyte",
        price: "₹480",
        stock: "Pest-Free Tissue Culture · In Stock",
        specs: { "Light": "Low to Medium", "Growth Rate": "Slow", "Placement": "Wood & Rock Attachment", "CO2": "Not required", "Height": "3 – 5 cm" },
        description: "The gold standard of miniature aquascaping epiphytes. Features tiny, dark emerald-green thick leaves that resist herbivorous fish and thrive in shaded hardscape crevices.",
        careTip: "Never bury the green horizontal rhizome in substrate, as it will rot. Attach to driftwood or lava rock using cyanoacrylate gel or cotton thread until roots anchor."
      },
      "cryptocoryne wendtii": {
        scientific: "Cryptocoryne wendtii ‘Brown’",
        origin: "Sri Lanka (riverbeds)",
        tag: "Easy Care · Heavy Root Feeder",
        price: "₹320",
        stock: "Potted · In Stock",
        specs: { "Light": "Low to High", "Growth Rate": "Medium", "Placement": "Midground", "CO2": "Beneficial but optional", "Height": "10 – 15 cm" },
        description: "An incredibly hardy, bronze-to-green ruffled leaf plant that adds rich earthy contrast to aquascapes. Highly adaptable to varied water hardness and low light conditions.",
        careTip: "As a heavy root feeder, insert specialized root tabs near its base to ensure steady iron and micro-nutrient uptake for deep bronze leaf pigmentation."
      },
      "java fern ‘trident’": {
        scientific: "Microsorum pteropus ‘Trident’",
        origin: "Southeast Asia (Cultivar)",
        tag: "Rhizome · Shaded Zones",
        price: "₹560",
        stock: "Mother Plant · In Stock",
        specs: { "Light": "Low to Medium", "Growth Rate": "Slow", "Placement": "Hardscape / Midground", "CO2": "Not required", "Height": "15 – 20 cm" },
        description: "Characterized by narrow, deeply lobed trident-shaped fronds. Creates airy, naturalistic bush textures in shadow zones beneath driftwood canopies.",
        careTip: "Attach to stone or wood. Avoid high-intensity direct lighting, which can cause black spotting or algae growth on older fronds."
      },
      "micranthemum ‘monte carlo’": {
        scientific: "Micranthemum tweediei ‘Monte Carlo’",
        origin: "South America (Argentina)",
        tag: "Carpet · Lush Lawn",
        price: "₹390",
        stock: "Tissue Culture Cup · In Stock",
        specs: { "Light": "Medium to High", "Growth Rate": "Medium-Fast", "Placement": "Foreground Carpet", "CO2": "Highly recommended", "Height": "1 – 3 cm" },
        description: "The ideal foreground carpeting plant. Forms a dense, compact emerald-green carpet with small round leaves. Much more forgiving and easier to root than Cuba (*Hemianthus callitrichoides*).",
        careTip: "Plant small pinches 2 cm apart into nutrient-rich aquasoil with fine aquascaping tweezers. Regular trimming stimulates compact, downward runners."
      },
      "rotala rotundifolia": {
        scientific: "Rotala rotundifolia ‘Colorata’",
        origin: "Southeast Asia",
        tag: "Stem · Background Color",
        price: "₹250",
        stock: "Fresh Cut Bunch · In Stock",
        specs: { "Light": "Medium to High", "Growth Rate": "Fast", "Placement": "Background Bush", "CO2": "Recommended", "Height": "20 – 40 cm" },
        description: "A fast-growing classic stem plant that develops soft pink, amber, and fiery red hues toward the water surface under moderate to high light levels.",
        careTip: "Trim frequently with curved aquascaping spring scissors to create a dense, rounded hedge. Replant trimmed tops to propagate easily."
      },
      "bucephalandra ‘mini coin’": {
        scientific: "Bucephalandra sp. ‘Mini Coin’",
        origin: "Borneo (fast-flowing rainforest streams)",
        tag: "Collector Rheophyte · Rare",
        price: "₹680",
        stock: "Clump · Limited Stock",
        specs: { "Light": "Low to Medium", "Growth Rate": "Very Slow", "Placement": "Hardscape Foreground", "CO2": "Recommended", "Height": "2 – 4 cm" },
        description: "A rare Bornean rheophyte prized for its small, rounded, metallic-sheened leaves speckled with tiny silver stomata dots. Produces delicate underwater white spathe blooms.",
        careTip: "Wedged into fine gaps in driftwood or stones. Keep water clean with stable flow to prevent green spot algae on its slow-growing foliage."
      },
      "bucephalandra 'mini'": {
        scientific: "Bucephalandra sp. ‘Mini Coin’",
        origin: "Borneo (fast-flowing rainforest streams)",
        tag: "Collector Rheophyte · Rare",
        price: "₹680",
        stock: "Clump · Limited Stock",
        specs: { "Light": "Low to Medium", "Growth Rate": "Very Slow", "Placement": "Hardscape Foreground", "CO2": "Recommended", "Height": "2 – 4 cm" },
        description: "A rare Bornean rheophyte prized for its small, rounded, metallic-sheened leaves speckled with tiny silver stomata dots. Produces delicate underwater white spathe blooms.",
        careTip: "Wedged into fine gaps in driftwood or stones. Keep water clean with stable flow to prevent green spot algae on its slow-growing foliage."
      },
      "oase thermomaster 250": {
        scientific: "Oase ThermoMaster 250 External",
        origin: "Engineered in Germany",
        tag: "Canister Filter · Integrated Heater",
        price: "₹14,200",
        stock: "3-Year Warranty · In Stock",
        specs: { "Flow Rate": "900 L/h", "Power": "15 W", "Integrated Heater": "150 W", "Filter Volume": "4.4 L", "Aquarium Sizing": "Up to 250 L" },
        description: "Premium German canister filter featuring an internal heater chamber (eliminating unsightly in-tank glass heaters) and an EasyClean pre-filter module for 60-second maintenance without disconnecting hoses.",
        careTip: "Rinse mechanical pre-filter foams in old aquarium water every 3–4 weeks. Biological biomaster media should remain undisturbed for beneficial nitrifying bacteria."
      },
      "chihiros wrgb ii slim": {
        scientific: "Chihiros WRGB II Slim 60",
        origin: "Full Spectrum LED Lighting",
        tag: "App Controlled · Planted Tank",
        price: "₹11,800",
        stock: "1-Year Warranty · In Stock",
        specs: { "Luminous Flux": "2,400 lm", "Power": "45 W", "App Support": "My Chihiros (iOS/Android)", "Color Spectrum": "Full 3-in-1 RGB", "Tank Length": "60 – 80 cm" },
        description: "Ultra-slim full-spectrum LED engineered to bring out intense reds and deep greens in demanding planted tanks. Features built-in Bluetooth app control with customizable sunrise, midday peak, and sunset ramps.",
        careTip: "Start light intensity at 50% for 6 hours daily on newly established tanks to prevent initial green dust algae while plants develop root systems."
      },
      "aquario dual-stage co2 kit": {
        scientific: "Aquario NEO Precision Dual-Stage CO₂ Kit",
        origin: "South Korea",
        tag: "CO2 System · Zero End-of-Tank Dump",
        price: "₹9,600",
        stock: "Tested & Calibrated · In Stock",
        specs: { "Stage": "Dual-Stage Diaphragm", "Solenoid": "12V Low Heat", "Working Pressure": "0 – 60 PSI", "Bubble Counter": "Integrated Precision Needle", "Connector": "Standard W21.8" },
        description: "Dual-stage pressure reduction eliminates the dangerous 'end-of-tank dump' that plagues cheap single-stage regulators. Comes with an ultra-cool 12V solenoid for automatic timer synchronization.",
        careTip: "Set to turn on 1 hour before aquarium lights illuminate and turn off 1 hour before lights go dark to ensure saturated CO₂ availability for plant photosynthesis."
      },
      "jbl proaqua test set": {
        scientific: "JBL ProAqua Test Lab Combi Set",
        origin: "Germany",
        tag: "Water Testing · Laboratory Grade",
        price: "₹4,600",
        stock: "Full Reagents · In Stock",
        specs: { "Tests Included": "pH, KH, GH, NO2, NO3, NH4/NH3, PO4, Fe", "Test Method": "Droplet Colorimetric", "Comparator Block": "Compensates Water Tint", "Tests Count": "Over 50 tests per parameter" },
        description: "Laboratory-grade colorimetric droplet test kit with custom comparator block that neutralizes existing water tint (from tannins) for pinpoint parameter readings.",
        careTip: "Rinse glass test vials with aquarium water before testing and clean with demineralized/RO water afterward to preserve reagent sensitivity."
      },
      "rimless tanks": {
        scientific: "Stillwater Opti-White Rimless Glass",
        origin: "Ultra-Clear Low-Iron Float Glass",
        tag: "Low-Iron Glass · 45° Mitered",
        price: "From ₹4,800",
        stock: "Pre-Inspected · In Stock",
        specs: { "Glass Type": "Ultra-Clear Low-Iron", "Joints": "German High-Tensile Silicone", "Bevel": "45° Mitered Polished Edges", "Available Sizes": "30 L, 60 L, 90 L, 120 L, 240 L", "Included": "High-Density Foam Mat", "Warranty": "2 Years Leak-Proof" },
        description: "Crafted from optical-grade low-iron float glass with over 91% light transmittance, delivering distortion-free color fidelity for your aquascapes. Mitered 45-degree edge joints ensure maximum structural bonding and nearly invisible seams.",
        careTip: "Always position on a completely level stand with the included high-density EVA mat. Never move or adjust tank positioning with water or hardscape inside."
      },
      "filters & media": {
        scientific: "Biological Core Multi-Stage Filtration",
        origin: "Engineered Bio-Filtration Systems",
        tag: "Biological Core · Quiet Operation",
        price: "From ₹950",
        stock: "Tested in Showroom · In Stock",
        specs: { "Filtration Types": "Canister, HOB & Fine Sponge", "Flow Rates": "300 L/h to 1500 L/h", "Media Capacity": "Multi-Stage Matrix / Siporax", "Noise Level": "< 28 dB Silent Magnetic Drive", "Energy Use": "5 W – 22 W Eco-Motor" },
        description: "Proper biological filtration is the lifeblood of healthy aquariums. Our filters are curated based on actual biological media chamber volume rather than theoretical flow ratings, ensuring massive colonization space for nitrifying bacteria.",
        careTip: "Never wash biological filter ceramic media in tap water—always rinse gently in siphoned aquarium water during routine maintenance to protect live nitrifying colonies."
      },
      "plant lighting": {
        scientific: "Full-Spectrum WRGB High-PAR Fixtures",
        origin: "Planted Aquaria Photometrics",
        tag: "Full Spectrum · App Controlled",
        price: "From ₹2,600",
        stock: "PAR Tested · In Stock",
        specs: { "Spectrum": "True RGB + Warm White (400–700nm)", "Control": "Bluetooth / WiFi Automated Schedule", "PAR Output": "75–180 µmol/m²/s @ 30cm depth", "Lifespan": "50,000 Hours", "Thermal": "Anodized Aluminum Heat Dissipation" },
        description: "Engineered specifically to stimulate chlorophyll A & B synthesis in aquatic flora. Promotes intense red pigment expression in Rotala and Ludwigia while preventing leggy, sparse stem growth.",
        careTip: "Implement a gradual 30-minute sunrise ramp and 30-minute sunset fade. Keep photoperiod between 6.5 to 8 hours daily to maintain vigorous plant growth without nuisance algae."
      },
      "fish food": {
        scientific: "Nutrition & Specialist Formulations",
        origin: "Clean Ingredients · Low Phosphate",
        tag: "Clean Diet · Low Waste",
        price: "From ₹180",
        stock: "Fresh Batch · In Stock",
        specs: { "Varieties": "Micro-pellets, crisps, algae wafers, frozen", "Protein Range": "42% – 58% Marine & Insect Protein", "Digestibility": "Ultra-Low Ash & Phosphate", "Vitamins": "Enriched with Vitamin C & Garlic Extract", "Feeding": "1–2 times daily in small pinches" },
        description: "High-absorption, low-polluting nutrition designed to enhance natural immunity, intensify iridescent scale pigmentation, and prevent swim-bladder issues across freshwater and marine species.",
        careTip: "Feed only what fish can consume within 90 seconds. Remove any uneaten sinking food to maintain near-zero ammonia and phosphate levels."
      },
      "aquascaping tools": {
        scientific: "Surgical Grade 316 Stainless Steel Tools",
        origin: "Precision Aquascaping Instruments",
        tag: "Surgical Grade · Rust Proof",
        price: "From ₹420",
        stock: "Lifetime Rust Warranty · In Stock",
        specs: { "Material": "Grade 316 Surgical Stainless Steel", "Tool Set": "Wave scissors, spring pinsettes, sand flatteners", "Finish": "Mirror polished & matte black titanium", "Ergonomics": "Balanced spring tension for finger comfort" },
        description: "Precision-engineered instruments essential for planting delicate stem cuttings, trimming tight Monte Carlo carpets, and sculpting fine cosmetic sand paths without muddying aquasoil layers.",
        careTip: "Rinse with freshwater and dry thoroughly with a microfiber towel after use in marine tanks or acidic planted systems to maintain razor-sharp spring action."
      },
      "testing & control": {
        scientific: "Precision Liquid Master Test & Climate",
        origin: "Laboratory-Accurate Diagnostics",
        tag: "Water Safety · Precision Diagnostics",
        price: "From ₹290",
        stock: "Calibrated Reagents · In Stock",
        specs: { "Key Parameters": "pH, Ammonia (NH3/NH4), Nitrite (NO2), Nitrate (NO3), KH, GH, TDS", "Heater Tech": "Shatterproof quartz & electronic thermistors", "Accuracy": "± 0.2°C Temperature / ± 0.1 pH unit", "Safety": "Automatic thermal cutoff switch" },
        description: "Eliminate guesswork from aquarium keeping. Our testing reagents and electronic climate controllers provide lab-grade accuracy so you can detect water parameter shifts before they affect delicate livestock.",
        careTip: "Test ammonia and nitrite every 48 hours during initial cycling. Perform weekly nitrate testing on mature tanks to guide water change schedules."
      },
      "the invisible engine: your nitrogen cycle": {
        scientific: "Biological Nitrification & Biotope Colonization Protocol",
        origin: "Aquatic Microbiology & Filter Maturation",
        tag: "Nitrification · Fundamental Care Guide",
        price: "Free Store Guide",
        stock: "Full Protocol · Accessible Anytime",
        specs: {
          "Phase 1 Ammonia": "NH3/NH4+ oxidised by Nitrosomonas (Target: 0.0 ppm)",
          "Phase 2 Nitrite": "NO2- converted by Nitrospira (Target: 0.0 ppm)",
          "Phase 3 Nitrate": "NO3- exported via water changes (Target: < 20 ppm)",
          "Optimal Cycling Temp": "26°C – 28°C (Speeds colony division)",
          "Optimal pH": "7.2 – 8.0 during cycling (Bacteria consume KH)",
          "Matured Test": "2.0 ppm dosed ammonia converts fully to 0 in 24 hours"
        },
        description: "The nitrogen cycle is the invisible life-support system of every aquarium. Beneficial nitrifying bacteria colonize the immense surface area inside porous filter media and substrate, transforming toxic fish waste and uneaten protein into relatively harmless nitrate. Rushing this 3 to 5-week biological colonization process is the leading cause of new tank syndrome and livestock loss.",
        careTip: "Never add fish until a dosed ammonia level of 2.0 ppm drops to absolute zero ammonia and zero nitrite within a single 24-hour testing window. Always preserve established filter media in dechlorinated water."
      },
      "why adult size matters more than shop size": {
        scientific: "Stocking Biomass, Strata Distribution & Territorial Span",
        origin: "Ethical Husbandry & Biotope Geometry",
        tag: "Stocking Geometry · Species Welfare",
        price: "Free Store Guide",
        stock: "Full Protocol · Accessible Anytime",
        specs: {
          "Biomass Calculation": "Volumetric mass (A 4″ adult creates 8× waste of two 2″ juveniles)",
          "Surface Layer": "Hatchetfish, surface gouramis (Labyrinth respiration)",
          "Midwater Layer": "Tetras, rasboras (Horizontal schooling swim channels)",
          "Bottom Strata": "Corydoras, Otocinclus (Fine sand foraging zone)",
          "Schooling Density": "Minimum 8–10 individuals per shoaling group",
          "Acclimation Buffer": "14-day pause between introducing new groups"
        },
        description: "Juvenile fish displayed in aquarium shops are typically only 20% to 30% of their eventual adult mass. Planning an aquarium around full adult body volume, territorial breeding boundaries, and natural horizontal swimming lanes ensures long-term health, prevents aggressive fin-nipping, and eliminates chronic stress.",
        careTip: "Stock in layered phases: establish bottom scavengers and hardscape first, add midwater schooling groups two weeks later, and introduce centerpiece fish last to establish calm community dynamics."
      },
      "a weekly routine you can actually keep": {
        scientific: "20-Minute Structured Biotope Maintenance Cadence",
        origin: "Preventive Aquascaping & Ecosystem Longevity",
        tag: "Weekly Routine · Low Stress Maintenance",
        price: "Free Store Guide",
        stock: "Full Protocol · Accessible Anytime",
        specs: {
          "Step 1 (0–5 min)": "Diagnostic testing (pH, Temperature, Nitrate, TDS)",
          "Step 2 (5–10 min)": "Glass wiping with blade scraper & dead leaf pruning",
          "Step 3 (10–17 min)": "20–25% sand substrate vacuum & water siphon",
          "Step 4 (17–20 min)": "Temperature-matched (±0.5°C) dechlorinated water refill",
          "Filter Media Cleaning": "Gentle sponge squeeze in siphoned bucket water only",
          "Water Change Volume": "20% to 25% weekly for optimal plant & fish vitality"
        },
        description: "Consistency trumps sporadic deep cleans. A disciplined 20-minute weekly rhythm keeps organic waste minimal, prevents algae spore outbreaks, and preserves the beneficial biofilm covering plant leaves, driftwood, and filter cartridges.",
        careTip: "Never scrub interior glass with household sponges or wash filter media under chlorinated tap water, which instantly kills the nitrifying biofilm. Always use extracted tank water for filter cleaning."
      }
    };

    const openModal = (card) => {
      const heading = card.querySelector("h3")?.textContent.trim() || "Aquatic Specimen";
      const key = heading.toLowerCase().replace(/[‘’]/g, "'");
      const tagText = card.querySelector(".tag")?.textContent.trim() || "Specimen";
      const priceText = card.querySelector(".price")?.textContent.trim() || "";
      const noteText = card.querySelector(".card-note")?.textContent.trim() || "";
      const dataSpans = [...card.querySelectorAll(".data-row span")].map((s) => s.textContent.trim());

      let data = itemDatabase[key];
      if (!data) {
        const foundKey = Object.keys(itemDatabase).find((k) => key.includes(k) || k.includes(key));
        if (foundKey) {
          data = itemDatabase[foundKey];
        }
      }

      if (!data) {
        data = {
          scientific: heading,
          origin: "Responsibly Sourced & Quarantined",
          tag: tagText,
          price: priceText || "Enquire",
          stock: "Quarantined & Matched · In Stock",
          specs: {
            "Specimen Type": tagText,
            "Parameters": dataSpans[0] || "Standard",
            "Condition": dataSpans[1] || "Stable water",
            "Health Guarantee": "14-Day Warranty"
          },
          description: noteText || "Selected by experienced Stillwater Aquatics keepers for temperament, health, and ethical husbandry.",
          careTip: "Keep water parameters stable with regular partial water changes. Drip acclimate for 30 minutes before release."
        };
      }

      const specsHTML = Object.entries(data.specs).map(([label, val]) => `
        <div class="spec-box">
          <span>${label}</span>
          <strong>${val}</strong>
        </div>
      `).join("");

      modalContent.innerHTML = `
        <span class="modal-header-tag">${data.tag}</span>
        <h2 class="modal-title" id="modal-title">${heading}</h2>
        ${data.scientific !== heading ? `<p class="modal-subtitle"><em>${data.scientific}</em> · ${data.origin}</p>` : `<p class="modal-subtitle">${data.origin}</p>`}
        
        <div class="modal-price-row">
          <div>
            <span style="display:block;font-size:0.75rem;font-weight:750;color:var(--ink-soft);text-transform:uppercase;letter-spacing:0.06em">Live Price</span>
            <span class="modal-price">${data.price}</span>
          </div>
          <span class="modal-stock-badge"><i data-lucide="shield-check"></i> ${data.stock}</span>
        </div>

        <h3 class="modal-section-title">Care &amp; Water Specifications</h3>
        <div class="modal-specs-grid">
          ${specsHTML}
        </div>

        <h3 class="modal-section-title">Natural Habitat &amp; Temperament</h3>
        <p class="modal-description">${data.description}</p>

        <div class="modal-tip-box">
          <strong><i data-lucide="sparkles"></i> Keeper’s Acclimation &amp; Tank Tip</strong><br>
          ${data.careTip}
        </div>

        <div class="modal-actions">
          <a class="button coral" href="${path("pages/contact.html#special-order")}" data-order-cta>
            Reserve / Order Enquiry <i data-lucide="arrow-up-right"></i>
          </a>
          <button class="button secondary" type="button" data-modal-close>
            Close Details
          </button>
        </div>
      `;

      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      refreshIcons();

      modalContent.querySelectorAll("[data-modal-close]").forEach((btn) => {
        btn.addEventListener("click", closeModal);
      });
      modalContent.querySelector("[data-order-cta]")?.addEventListener("click", closeModal);
    };

    const closeModal = () => {
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", closeModal);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
        closeModal();
      }
    });

    const bindCards = () => {
      document.querySelectorAll(".product-card, .plant-card, .equipment-card, .arrival-card, .guide-card").forEach((card) => {
        if (card.dataset.navLink) {
          if (card.dataset.navBound) return;
          card.dataset.navBound = "true";
          card.setAttribute("tabindex", "0");
          card.setAttribute("role", "link");
          const title = card.querySelector("h3")?.textContent.trim() || "Category";
          card.setAttribute("aria-label", `Navigate to ${title}`);
          card.addEventListener("click", (e) => {
            if (!e.target.closest("a")) {
              window.location.href = card.dataset.navLink;
            }
          });
          card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.location.href = card.dataset.navLink;
            }
          });
          return;
        }

        if (!card.querySelector(".card-arrow")) {
          const arrowEl = document.createElement("div");
          arrowEl.className = "card-arrow";
          arrowEl.setAttribute("aria-hidden", "true");
          arrowEl.setAttribute("title", "View details");
          arrowEl.innerHTML = `<i data-lucide="arrow-up-right"></i>`;
          card.appendChild(arrowEl);
        }

        if (card.dataset.modalBound) return;
        card.dataset.modalBound = "true";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-haspopup", "dialog");
        const title = card.querySelector("h3")?.textContent.trim() || "Item";
        card.setAttribute("aria-label", `View detailed specifications and care info for ${title}`);

        card.addEventListener("click", (e) => {
          if (e.target.closest("a")) return;
          openModal(card);
        });
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(card);
          }
        });
      });
      refreshIcons();
    };

    bindCards();
  };

  // Forgot Password Recovery Modal
  const initForgotPasswordModal = () => {
    const modalBackdrop = document.getElementById("forgot-modal");
    const triggers = document.querySelectorAll("[data-forgot-trigger], [data-open-forgot]");
    if (!modalBackdrop && !triggers.length) return;

    let lastFocusedElement = null;

    const openForgotModal = (trigger) => {
      if (!modalBackdrop) return;
      lastFocusedElement = trigger || document.activeElement;
      modalBackdrop.classList.add("is-open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      refreshIcons();

      const emailInput = modalBackdrop.querySelector("#forgot-email");
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 80);
      }
    };

    const closeForgotModal = () => {
      if (!modalBackdrop || !modalBackdrop.classList.contains("is-open")) return;
      modalBackdrop.classList.remove("is-open");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (window.location.hash === "#forgot" || window.location.hash === "#forgot-password") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        openForgotModal(trigger);
      });
    });

    modalBackdrop?.querySelectorAll("[data-modal-close], [data-close-forgot]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeForgotModal();
      });
    });

    modalBackdrop?.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeForgotModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop?.classList.contains("is-open")) {
        closeForgotModal();
      }
    });

    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#forgot" || hash === "#forgot-password") {
        openForgotModal();
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
  };

  initSpecimenModal();
  initForgotPasswordModal();
  refreshIcons();
})();
