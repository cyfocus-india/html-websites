(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const storage = {
    get(key, fallback = null) {
      try {
        return localStorage.getItem(key) ?? fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Fallback gracefully if storage is restricted
      }
    }
  };

  const icon = (name, style = "solid") => `<i class="fa-${style} fa-${name}" aria-hidden="true"></i>`;

  /* ----------------------------------------------------
     THEME & DIRECTION
  ---------------------------------------------------- */
  function setTheme(theme, announce = false) {
    root.dataset.theme = theme;
    storage.set("pawfolk-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = theme === "dark";
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("title", isDark ? "Light mode" : "Dark mode");
      button.innerHTML = icon(isDark ? "sun" : "moon");
    });
    if (announce) showToast(`${theme === "dark" ? "Dark" : "Light"} mode active`);
  }

  function initTheme() {
    const saved = storage.get("pawfolk-theme");
    setTheme(saved || (prefersDark.matches ? "dark" : "light"));
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
      });
    });
    prefersDark.addEventListener?.("change", (event) => {
      if (!storage.get("pawfolk-theme")) setTheme(event.matches ? "dark" : "light");
    });
  }

  function setDirection(direction, announce = false) {
    root.dir = direction;
    root.lang = direction === "rtl" ? "ar" : "en";
    storage.set("pawfolk-direction", direction);
    document.querySelectorAll("[data-dir-toggle]").forEach((button) => {
      const isRtl = direction === "rtl";
      button.setAttribute("aria-label", isRtl ? "Switch to LTR layout" : "Switch to RTL layout");
      button.setAttribute("title", isRtl ? "LTR layout" : "RTL layout");
      button.textContent = isRtl ? "LTR" : "RTL";
    });
    if (announce) showToast(direction === "rtl" ? "RTL layout active" : "LTR layout active");
  }

  function initDirection() {
    setDirection(storage.get("pawfolk-direction", root.dir || "ltr"));
    document.querySelectorAll("[data-dir-toggle]").forEach((button) => {
      button.addEventListener("click", () => setDirection(root.dir === "rtl" ? "ltr" : "rtl", true));
    });
  }

  /* ----------------------------------------------------
     RESPONSIVE NAVIGATION MENU
  ---------------------------------------------------- */
  function initMenu() {
    const menu = document.querySelector("[data-nav-list]");
    const toggle = document.querySelector("[data-menu-toggle]");
    if (!menu || !toggle) return;

    let menuScrim = document.querySelector("[data-menu-scrim]");
    if (!menuScrim) {
      menuScrim = document.createElement("div");
      menuScrim.className = "scrim";
      menuScrim.dataset.menuScrim = "";
      body.append(menuScrim);
    }

    const close = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.innerHTML = icon("bars");
      body.classList.remove("menu-open");
      menuScrim.classList.remove("is-visible");
    };

    const open = () => {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      toggle.innerHTML = icon("xmark");
      body.classList.add("menu-open");
      menuScrim.classList.add("is-visible");
    };

    toggle.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) close();
      else open();
    });

    menuScrim.addEventListener("click", close);

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100 && menu.classList.contains("is-open")) close();
    });
  }

  /* ----------------------------------------------------
     DROPDOWN MENUS
  ---------------------------------------------------- */
  function initDropdowns() {
    document.querySelectorAll(".nav-item--dropdown").forEach((dropdownItem) => {
      const toggle = dropdownItem.querySelector(".nav-link--dropdown");
      if (!toggle) return;

      toggle.addEventListener("click", (e) => {
        // Toggle on click for touch devices & keyboard
        const isOpen = dropdownItem.classList.contains("is-open");
        document.querySelectorAll(".nav-item--dropdown").forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".nav-link--dropdown")?.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          dropdownItem.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-item--dropdown")) {
        document.querySelectorAll(".nav-item--dropdown").forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".nav-link--dropdown")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.querySelectorAll(".nav-item--dropdown").forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".nav-link--dropdown")?.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  /* ----------------------------------------------------
     SCROLL REVEAL & 3D TILT
  ---------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px" });
    items.forEach((item) => observer.observe(item));
  }

  function initTilt() {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ----------------------------------------------------
     TOAST NOTIFICATIONS
  ---------------------------------------------------- */
  let toastTimer;
  function ensureToast() {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.dataset.toast = "";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      body.append(toast);
    }
    return toast;
  }

  function showToast(message, actionText = null, actionHandler = null) {
    const toast = ensureToast();
    toast.innerHTML = "";
    
    const textSpan = document.createElement("span");
    textSpan.textContent = message;
    toast.append(textSpan);

    if (actionText && typeof actionHandler === "function") {
      const actionBtn = document.createElement("button");
      actionBtn.className = "btn btn--sm btn--coral";
      actionBtn.style.marginLeft = "10px";
      actionBtn.textContent = actionText;
      actionBtn.addEventListener("click", () => {
        actionHandler();
        toast.classList.remove("is-visible");
      });
      toast.append(actionBtn);
    }

    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  /* ----------------------------------------------------
     WISHLIST SYSTEM
  ---------------------------------------------------- */
  const wishlist = {
    items: [],
    load() {
      try {
        this.items = JSON.parse(storage.get("pawfolk-wishlist", "[]"));
      } catch {
        this.items = [];
      }
    },
    save() {
      storage.set("pawfolk-wishlist", JSON.stringify(this.items));
      this.syncButtons();
    },
    toggle(name) {
      if (this.items.includes(name)) {
        this.items = this.items.filter((item) => item !== name);
        showToast(`${name} removed from favorites`);
      } else {
        this.items.push(name);
        showToast(`${name} saved to favorites! ❤️`);
      }
      this.save();
    },
    syncButtons() {
      document.querySelectorAll("[data-wishlist]").forEach((btn) => {
        const name = btn.dataset.name;
        const active = this.items.includes(name);
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-label", active ? `Remove ${name} from favorites` : `Save ${name} to favorites`);
        btn.innerHTML = icon("heart", active ? "solid" : "regular");
      });
    }
  };

  function initWishlist() {
    wishlist.load();
    document.querySelectorAll("[data-wishlist]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = btn.dataset.name || "Pet Favorite";
        wishlist.toggle(name);
      });
    });
    wishlist.syncButtons();
  }

  /* ----------------------------------------------------
     SHOPPING CART & CHECKOUT ENGINE
  ---------------------------------------------------- */
  const cart = {
    items: [],
    discount: 0,
    promoCode: "",
    freeShippingThreshold: 45,

    load() {
      try {
        this.items = JSON.parse(storage.get("pawfolk-cart", "[]"));
      } catch {
        this.items = [];
      }
    },
    save() {
      storage.set("pawfolk-cart", JSON.stringify(this.items));
      this.render();
    },
    add(product) {
      const existing = this.items.find((item) => item.name === product.name);
      if (existing) {
        existing.quantity += (product.quantity || 1);
      } else {
        this.items.push({
          name: product.name,
          price: Number(product.price || 0),
          icon: product.icon || "paw",
          quantity: Number(product.quantity || 1)
        });
      }
      this.save();
      showToast(`${product.name} joined your bag`, "View Bag", () => openCart());
    },
    updateQty(name, delta) {
      const item = this.items.find((i) => i.name === name);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.items = this.items.filter((i) => i.name !== name);
        showToast(`${name} removed`);
      }
      this.save();
    },
    remove(name) {
      this.items = this.items.filter((item) => item.name !== name);
      this.save();
      showToast(`${name} removed`);
    },
    applyPromo(code) {
      const cleaned = code.trim().toUpperCase();
      if (cleaned === "PAWFRIEND") {
        this.discount = 0.10; // 10% off
        this.promoCode = "PAWFRIEND (10% OFF)";
        showToast("Promo applied: 10% discount on your order!");
      } else if (cleaned === "FREESHIP") {
        this.discount = 0.05;
        this.promoCode = "FREESHIP";
        showToast("Promo applied: Special shipping perk!");
      } else if (cleaned === "") {
        this.discount = 0;
        this.promoCode = "";
      } else {
        showToast("Invalid promo code. Try 'PAWFRIEND'");
      }
      this.render();
    },
    clear() {
      this.items = [];
      this.discount = 0;
      this.promoCode = "";
      this.save();
    },
    get subtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    get discountAmount() {
      return this.subtotal * this.discount;
    },
    get shipping() {
      if (this.subtotal === 0 || this.subtotal >= this.freeShippingThreshold || this.promoCode.includes("FREESHIP")) return 0;
      return 4.99;
    },
    get total() {
      return Math.max(0, this.subtotal - this.discountAmount + this.shipping);
    },
    get count() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    render() {
      document.querySelectorAll("[data-cart-count]").forEach((countEl) => {
        countEl.textContent = this.count;
        countEl.hidden = this.count === 0;
      });

      const bodyEl = document.querySelector("[data-cart-body]");
      const totalEl = document.querySelector("[data-cart-total]");
      const shippingMeter = document.querySelector("[data-shipping-meter]");

      if (shippingMeter) {
        const remaining = Math.max(0, this.freeShippingThreshold - this.subtotal);
        const percent = Math.min(100, (this.subtotal / this.freeShippingThreshold) * 100);
        if (this.subtotal === 0) {
          shippingMeter.innerHTML = `<span>Free local delivery on orders over $${this.freeShippingThreshold}</span>`;
        } else if (remaining === 0) {
          shippingMeter.innerHTML = `<span>🎉 You unlocked <strong>Free Delivery!</strong></span><div class="progress-track"><div class="progress-fill" style="width: 100%"></div></div>`;
        } else {
          shippingMeter.innerHTML = `<span>Add <strong>$${remaining.toFixed(2)}</strong> more for Free Delivery</span><div class="progress-track"><div class="progress-fill" style="width: ${percent}%"></div></div>`;
        }
      }

      if (!bodyEl) return;
      bodyEl.innerHTML = "";

      if (!this.items.length) {
        bodyEl.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-drawer__face">${icon("bone")}</div>
            <h3>Your bag is having a nap.</h3>
            <p class="muted">Wake it up with one very good thing for your pet.</p>
            <a class="btn btn--blue btn--sm" href="pages/shop.html" style="margin: 16px auto 0">Start sniffing around</a>
          </div>`;
      } else {
        const list = document.createElement("div");
        list.className = "cart-list";

        this.items.forEach((item) => {
          const row = document.createElement("div");
          row.className = "cart-item";

          const thumb = document.createElement("div");
          thumb.className = "cart-item__thumb";
          thumb.innerHTML = icon(item.icon || "paw");

          const info = document.createElement("div");
          info.innerHTML = `
            <strong>${item.name}</strong>
            <p class="muted">$${item.price.toFixed(2)} each</p>
            <div class="cart-qty-ctrls">
              <button class="cart-qty-btn" type="button" data-qty-minus aria-label="Decrease quantity of ${item.name}">−</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" type="button" data-qty-plus aria-label="Increase quantity of ${item.name}">+</button>
            </div>`;

          info.querySelector("[data-qty-minus]").addEventListener("click", () => this.updateQty(item.name, -1));
          info.querySelector("[data-qty-plus]").addEventListener("click", () => this.updateQty(item.name, 1));

          const removeBtn = document.createElement("button");
          removeBtn.className = "icon-btn";
          removeBtn.type = "button";
          removeBtn.setAttribute("aria-label", `Remove ${item.name}`);
          removeBtn.innerHTML = icon("trash-can");
          removeBtn.addEventListener("click", () => this.remove(item.name));

          row.append(thumb, info, removeBtn);
          list.append(row);
        });

        bodyEl.append(list);
      }

      if (totalEl) totalEl.textContent = `$${this.total.toFixed(2)}`;

      const discountEl = document.querySelector("[data-cart-discount]");
      if (discountEl) {
        if (this.discount > 0) {
          discountEl.innerHTML = `<small class="muted">Discount (${this.promoCode}):</small> <strong>-$${this.discountAmount.toFixed(2)}</strong>`;
          discountEl.hidden = false;
        } else {
          discountEl.hidden = true;
        }
      }
    }
  };

  let openCart = () => {};
  let closeCart = () => {};

  function ensureCartDrawer() {
    if (!document.querySelector("[data-cart-toggle]")) return;

    let scrim = document.querySelector("[data-cart-scrim]");
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "scrim";
      scrim.dataset.cartScrim = "";
      body.append(scrim);
    }

    let drawer = document.querySelector("[data-cart-drawer]");
    if (!drawer) {
      drawer = document.createElement("aside");
      drawer.className = "cart-drawer";
      drawer.dataset.cartDrawer = "";
      drawer.setAttribute("aria-label", "Shopping bag");
      drawer.setAttribute("aria-hidden", "true");
      drawer.innerHTML = `
        <div class="cart-drawer__head">
          <div>
            <p class="eyebrow">Pawfolk Goods</p>
            <h3>Your shopping bag</h3>
          </div>
          <button class="icon-btn" type="button" data-cart-close aria-label="Close shopping bag">${icon("xmark")}</button>
        </div>
        <div class="cart-shipping-bar" data-shipping-meter></div>
        <div class="cart-drawer__body" data-cart-body></div>
        <div class="cart-drawer__foot">
          <div class="cart-promo-row">
            <label class="sr-only" for="cart-promo-code">Promo Code</label>
            <input class="cart-promo-input" id="cart-promo-code" type="text" placeholder="Promo code (e.g. PAWFRIEND)">
            <button class="cart-promo-btn" type="button" data-apply-promo>Apply</button>
          </div>
          <div data-cart-discount hidden style="display: flex; justify-content: space-between; font-size: .88rem"></div>
          <div class="cart-total-row">
            <div>
              <small class="muted">Estimated Total</small>
              <div class="price" data-cart-total>$0.00</div>
            </div>
            <button class="btn btn--coral" type="button" data-checkout>Checkout ${icon("arrow-right")}</button>
          </div>
        </div>`;
      body.append(drawer);
    }

    openCart = () => {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      scrim.classList.add("is-visible");
      body.classList.add("cart-open");
      drawer.querySelector("[data-cart-close]")?.focus();
    };

    closeCart = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      scrim.classList.remove("is-visible");
      body.classList.remove("cart-open");
    };

    document.querySelectorAll("[data-cart-toggle]").forEach((btn) => btn.addEventListener("click", openCart));
    drawer.querySelector("[data-cart-close]")?.addEventListener("click", closeCart);
    scrim.addEventListener("click", closeCart);

    drawer.querySelector("[data-apply-promo]")?.addEventListener("click", () => {
      const input = drawer.querySelector("#cart-promo-code");
      if (input) cart.applyPromo(input.value);
    });

    drawer.querySelector("[data-checkout]")?.addEventListener("click", () => {
      if (!cart.items.length) {
        showToast("Your shopping bag is empty!");
        return;
      }
      closeCart();
      openCheckoutModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
    });
  }

  function initCart() {
    cart.load();
    ensureCartDrawer();
    cart.render();

    document.querySelectorAll("[data-add-cart]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const product = {
          name: button.dataset.name || "Pawfolk Pick",
          price: Number(button.dataset.price || 0),
          icon: button.dataset.icon || "paw",
          quantity: Number(button.dataset.quantity || 1)
        };
        cart.add(product);
        button.classList.add("is-added");
        button.innerHTML = icon("check");
        button.setAttribute("aria-label", `${product.name} added to bag`);
        window.setTimeout(() => {
          button.classList.remove("is-added");
          button.innerHTML = icon("plus");
          button.setAttribute("aria-label", `Add ${product.name} to bag`);
        }, 1600);
      });
    });
  }

  /* ----------------------------------------------------
     CHECKOUT MODAL FLOW
  ---------------------------------------------------- */
  function openCheckoutModal() {
    let modal = document.querySelector("#checkout-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.id = "checkout-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "checkout-title");
      modal.innerHTML = `
        <div class="modal__backdrop" data-modal-close></div>
        <div class="modal__dialog">
          <button class="icon-btn modal__close" type="button" data-modal-close aria-label="Close checkout">${icon("xmark")}</button>
          <div data-checkout-step="form">
            <p class="eyebrow">Safe & Joyful Checkout</p>
            <h2 id="checkout-title">Complete your Pawfolk order</h2>
            <p class="muted">Free local pickup at 24 Tailwag Lane or standard neighborhood delivery.</p>
            
            <div style="background: var(--paper-2); padding: 16px; border: var(--line); border-radius: var(--radius-md); margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; font-weight: 800">
                <span>Items in bag (${cart.count}):</span>
                <span data-checkout-total>$${cart.total.toFixed(2)}</span>
              </div>
            </div>

            <form class="form-grid" data-checkout-form novalidate>
              <div class="form-group">
                <label for="co-name">Your Full Name</label>
                <input class="field" id="co-name" name="name" required placeholder="Alex & Sparky">
                <p class="field-error"></p>
              </div>
              <div class="form-group">
                <label for="co-email">Email Address</label>
                <input class="field" id="co-email" name="email" type="email" required placeholder="alex@example.com">
                <p class="field-error"></p>
              </div>
              <div class="form-group form-group--full">
                <label for="co-address">Delivery Address (or 'Pickup')</label>
                <input class="field" id="co-address" name="address" required placeholder="123 Cozy Street, Apt 4B">
                <p class="field-error"></p>
              </div>
              <div class="form-group form-group--full">
                <label for="co-pay">Payment Method</label>
                <select class="select" id="co-pay" name="payment" required>
                  <option value="card">Demo Card (Instant Approval)</option>
                  <option value="applepay">Apple Pay / Google Pay</option>
                  <option value="pickup">Pay at Store Pickup</option>
                </select>
              </div>
              <div class="form-group form-group--full">
                <button class="btn btn--blue btn--full" type="submit">Place Order ($${cart.total.toFixed(2)})</button>
              </div>
            </form>
          </div>

          <div data-checkout-step="success" hidden style="text-align: center; padding: 20px 0;">
            <div class="cart-drawer__face" style="background: #38b000; color: #fff; font-size: 2.5rem">${icon("check")}</div>
            <h2>Wags and High Paws!</h2>
            <p class="lead">Your Pawfolk order <strong data-order-id>#PF-8492</strong> has been confirmed.</p>
            <p class="muted">We're packing your pet's good things with care. A confirmation has been sent to your email.</p>
            <div style="margin-top: 28px">
              <button class="btn btn--ink" type="button" data-modal-close>Back to browsing</button>
            </div>
          </div>
        </div>`;
      body.append(modal);
    }

    const close = () => {
      modal.classList.remove("is-open");
      body.classList.remove("modal-open");
    };

    modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.onclick = close;
    });

    const form = modal.querySelector("[data-checkout-form]");
    const formStep = modal.querySelector('[data-checkout-step="form"]');
    const successStep = modal.querySelector('[data-checkout-step="success"]');

    if (form) {
      formStep.hidden = false;
      successStep.hidden = true;
      modal.querySelector("[data-checkout-total]").textContent = `$${cart.total.toFixed(2)}`;
      modal.querySelector("button[type='submit']").textContent = `Place Order ($${cart.total.toFixed(2)})`;

      form.onsubmit = (e) => {
        e.preventDefault();
        const inputs = [...form.querySelectorAll("input, select")];
        const valid = inputs.map(validateField).every(Boolean);
        if (!valid) return;

        const orderId = `PF-${Math.floor(10000 + Math.random() * 90000)}`;
        modal.querySelector("[data-order-id]").textContent = `#${orderId}`;
        formStep.hidden = true;
        successStep.hidden = false;
        cart.clear();
        showToast("Order placed successfully! 🎉");
      };
    }

    modal.classList.add("is-open");
    body.classList.add("modal-open");
  }

  /* ----------------------------------------------------
     PRODUCT QUICK-VIEW MODAL
  ---------------------------------------------------- */
  const productDetails = {
    "Bounce-Back Bone": {
      pet: "Dogs · Play",
      image: "product-bone.png",
      rating: "★★★★★ (48 reviews)",
      desc: "Super-durable natural tree rubber engineered for energetic games of fetch and chewing comfort. Cleans easily and floats in water.",
      features: ["100% natural tree rubber", "Gentle on gums and enamel", "Dishwasher safe & non-toxic"]
    },
    "Sky Dancer Wand": {
      pet: "Cats · Play",
      image: "product-wand.png",
      rating: "★★★★★ (62 reviews)",
      desc: "An ultra-flexible beechwood wand with cruelty-free recycled felt feathers and a chime bell that mimics fluttery bird movements.",
      features: ["FSC-certified beechwood handle", "Non-toxic dyed felt", "Reinforced braided cord"]
    },
    "Garden Forage Mix": {
      pet: "Birds · Forage",
      image: "product-forage.png",
      rating: "★★★★☆ (35 reviews)",
      desc: "A rich botanical blend of chamomile flowers, oat groats, safflower, and dried calendula petals for busy beaks and healthy plumage.",
      features: ["No artificial dust or sugars", "Encourages natural foraging", "Vet-approved daily supplement"]
    },
    "Soft Current Fern": {
      pet: "Fish · Habitat",
      image: "product-fern.png",
      rating: "★★★★★ (29 reviews)",
      desc: "Handcrafted aquarium silk plant with weighted ceramic base. Swaying gracefully with the water flow without tearing delicate fin tissue.",
      features: ["Safe for all freshwater tanks", "Zero water chemistry changes", "Silky, rounded leaf edges"]
    },
    "Hide & Seek House": {
      pet: "Small Animals · Home",
      image: "product-house.png",
      rating: "★★★★★ (41 reviews)",
      desc: "A safe, breathable sanctuary handwoven from 100% pesticide-free timothy grass. Safe to chew, hide, and nap in.",
      features: ["High-fiber natural timothy grass", "Edible & digestible", "Cozy nesting hideaway"]
    },
    "Everyday Collar": {
      pet: "Dogs · Walk",
      image: "product-collar.png",
      rating: "★★★★☆ (53 reviews)",
      desc: "Supple organic hemp webbing that softens with every walk, paired with solid antiqued brass hardware and a dedicated tag ring.",
      features: ["Hypoallergenic organic hemp", "Solid rust-proof brass buckle", "Stitch-reinforced pull points"]
    },
    "Doughnut Daybed": {
      pet: "Cats & Small Dogs · Sleep",
      image: "product-bed.png",
      rating: "★★★★★ (77 reviews)",
      desc: "A plush, supportive donut bed lined with recycled sherpa fleece and high-density memory foam bolsters for deep-sleep neck support.",
      features: ["Machine-washable removable cover", "Non-skid waterproof bottom", "Certified human-grade foam"]
    },
    "Crunchy Garden Bites": {
      pet: "Small Animals · Treat",
      image: "product-bites.png",
      rating: "★★★★★ (39 reviews)",
      desc: "Oven-baked tiny biscuits packed with fresh carrots, parsley, and sun-cured hay. Perfect for bonding and positive reinforcement.",
      features: ["No added sugar or molasses", "Crunchy texture supports tooth wear", "Baked in small batches in Oregon"]
    },
    "Moon Munchies": {
      pet: "Dogs & Cats · Treat",
      image: "product-munchies.png",
      rating: "★★★★★ (94 reviews)",
      desc: "Freeze-dried wild-caught Pacific salmon cubes with zero fillers or preservatives. An irresistible single-ingredient training reward.",
      features: ["Single ingredient: Wild salmon", "Rich in Omega-3 fatty acids", "Easily broken for training"]
    }
  };

  function openQuickView(name, price, iconName) {
    let modal = document.querySelector("#quickview-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.id = "quickview-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
        <div class="modal__backdrop" data-modal-close></div>
        <div class="modal__dialog">
          <button class="icon-btn modal__close" type="button" data-modal-close aria-label="Close product preview">${icon("xmark")}</button>
          <div class="quick-view-grid">
            <div class="quick-view-visual">
              <div class="product-shape" data-qv-shape>${icon(iconName || "paw")}</div>
            </div>
            <div class="quick-view-info">
              <p class="eyebrow" data-qv-pet>Pet Goods</p>
              <h2 data-qv-name>${name}</h2>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px">
                <span class="price" data-qv-price>$${price}</span>
                <span class="product-card__rating" data-qv-rating>★★★★★</span>
              </div>
              <p data-qv-desc class="muted"></p>
              <ul class="check-list" data-qv-features style="margin: 16px 0 24px; gap: 8px"></ul>
              <div style="display: flex; gap: 12px; align-items: center">
                <button class="btn btn--blue btn--full" type="button" data-qv-add>Add to bag ${icon("bag-shopping")}</button>
              </div>
            </div>
          </div>
        </div>`;
      body.append(modal);
    }

    const info = productDetails[name] || {
      pet: "General Goods",
      rating: "★★★★★ (Recommended)",
      desc: "Carefully selected pet goods designed for health, joy, and durability.",
      features: ["Tested by real pet parents", "Clear, honest materials", "Pawfolk Quality Guaranteed"]
    };

    const isPagesDir = window.location.pathname.includes("/pages/");
    const imagePath = info.image 
      ? (isPagesDir ? `../assets/images/${info.image}` : `assets/images/${info.image}`)
      : null;

    const visualEl = modal.querySelector(".quick-view-visual");
    if (imagePath) {
      visualEl.innerHTML = `<img src="${imagePath}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)">`;
    } else {
      visualEl.innerHTML = `<div class="product-shape" data-qv-shape>${icon(iconName || "paw")}</div>`;
    }

    modal.querySelector("[data-qv-name]").textContent = name;
    modal.querySelector("[data-qv-price]").textContent = `$${Number(price).toFixed(2)}`;
    modal.querySelector("[data-qv-pet]").textContent = info.pet;
    modal.querySelector("[data-qv-rating]").textContent = info.rating;
    modal.querySelector("[data-qv-desc]").textContent = info.desc;

    const featList = modal.querySelector("[data-qv-features]");
    featList.innerHTML = info.features.map((f) => `<li><span>${f}</span></li>`).join("");

    const addBtn = modal.querySelector("[data-qv-add]");
    addBtn.onclick = () => {
      cart.add({ name, price: Number(price), icon: iconName || "paw" });
      modal.classList.remove("is-open");
      body.classList.remove("modal-open");
    };

    const close = () => {
      modal.classList.remove("is-open");
      body.classList.remove("modal-open");
    };

    modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.onclick = close;
    });

    modal.classList.add("is-open");
    body.classList.add("modal-open");
  }

  function initQuickViewTriggers() {
    document.querySelectorAll(".product-card").forEach((card) => {
      const name = card.querySelector("h3")?.textContent.trim();
      const priceText = card.querySelector(".price")?.textContent.replace(/[^0-9.]/g, "");
      const addBtn = card.querySelector("[data-add-cart]");
      const iconName = addBtn?.dataset.icon || "paw";
      const price = priceText || addBtn?.dataset.price || "0";

      // Add Quick View button overlay if not present
      if (!card.querySelector(".quick-view-btn")) {
        const qvBtn = document.createElement("button");
        qvBtn.className = "quick-view-btn";
        qvBtn.type = "button";
        qvBtn.innerHTML = `Quick Peek ${icon("eye")}`;
        qvBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openQuickView(name, price, iconName);
        });
        card.querySelector(".product-card__visual")?.append(qvBtn);
      }

      // Add Wishlist button if not present
      if (!card.querySelector(".wishlist-btn")) {
        const actWrap = document.createElement("div");
        actWrap.className = "product-card__actions";
        actWrap.innerHTML = `<button class="wishlist-btn" type="button" data-wishlist data-name="${name}" aria-label="Save ${name} to favorites">${icon("heart", "regular")}</button>`;
        card.querySelector(".product-card__visual")?.append(actWrap);
      }

      card.querySelector("h3")?.addEventListener("click", () => openQuickView(name, price, iconName));
    });

    initWishlist();
  }

  /* ----------------------------------------------------
     SHOP SEARCH & FILTER ENGINE WITH URL PARAMS
  ---------------------------------------------------- */
  function initFilters() {
    const grid = document.querySelector("[data-filter-grid]");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const searchInput = document.querySelector(".shop-search-input");
    const sortSelect = document.querySelector("[data-sort]");

    if (!grid) return;

    let activeCategory = "all";
    let searchQuery = "";

    // Read URL query parameter: ?pet=dogs or ?category=cats
    const urlParams = new URLSearchParams(window.location.search);
    const petParam = urlParams.get("pet") || urlParams.get("category");
    if (petParam) {
      activeCategory = petParam.toLowerCase();
    }

    function applyFilters() {
      const cards = grid.querySelectorAll("[data-category]");
      let visibleCount = 0;

      cards.forEach((card) => {
        const cat = card.dataset.category || "";
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const meta = card.querySelector(".product-card__meta")?.textContent.toLowerCase() || "";

        const matchCat = activeCategory === "all" || cat.includes(activeCategory);
        const matchSearch = !searchQuery || title.includes(searchQuery) || meta.includes(searchQuery);

        const isVisible = matchCat && matchSearch;
        card.dataset.hidden = String(!isVisible);
        if (isVisible) visibleCount++;
      });

      // Update active button state
      filterButtons.forEach((btn) => {
        const btnFilter = btn.dataset.filter;
        const isActive = btnFilter === activeCategory;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      // Show/hide empty state
      let emptyBox = grid.querySelector(".empty-results");
      if (visibleCount === 0) {
        if (!emptyBox) {
          emptyBox = document.createElement("div");
          emptyBox.className = "empty-results";
          emptyBox.innerHTML = `
            <div>${icon("magnifying-glass")}</div>
            <h3>No creatures matched that search</h3>
            <p class="muted">Try adjusting your keywords or clearing the category filter.</p>
            <button class="btn btn--paper btn--sm" type="button" data-reset-filters style="margin-top: 12px">Reset Filters</button>`;
          grid.append(emptyBox);
          emptyBox.querySelector("[data-reset-filters]")?.addEventListener("click", () => {
            activeCategory = "all";
            searchQuery = "";
            if (searchInput) searchInput.value = "";
            applyFilters();
          });
        }
        emptyBox.hidden = false;
      } else if (emptyBox) {
        emptyBox.hidden = true;
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;
        applyFilters();
        showToast(activeCategory === "all" ? "Showing all goods" : `Filtered for ${button.textContent.trim()}`);
      });
    });

    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });

    sortSelect?.addEventListener("change", () => {
      const cards = [...grid.querySelectorAll("[data-category]")];
      cards.sort((a, b) => {
        if (sortSelect.value === "price-low") return Number(a.dataset.price) - Number(b.dataset.price);
        if (sortSelect.value === "price-high") return Number(b.dataset.price) - Number(a.dataset.price);
        return Number(a.dataset.order || 0) - Number(b.dataset.order || 0);
      });
      cards.forEach((c) => grid.append(c));
    });

    // Run initial filter based on URL parameter or default
    applyFilters();
  }

  /* ----------------------------------------------------
     CARE JOURNAL CATEGORY FILTERS
  ---------------------------------------------------- */
  function initJournalFilters() {
    const journalGrid = document.querySelector(".journal-grid");
    const buttons = document.querySelectorAll(".filter-pills [data-journal-filter]");
    if (!journalGrid || !buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.journalFilter;
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));

        journalGrid.querySelectorAll(".journal-card").forEach((card) => {
          const cat = card.dataset.category || "all";
          const visible = filter === "all" || cat.includes(filter);
          card.dataset.hidden = String(!visible);
        });
        showToast(`Showing ${btn.textContent.trim()} notes`);
      });
    });
  }

  /* ----------------------------------------------------
     JOURNAL / ARTICLE READER POPUP MODAL
  ---------------------------------------------------- */
  const journalArticles = {
    "first-week": {
      id: "first-week",
      category: "Wellbeing",
      readTime: "6 min read",
      title: "The low-drama guide to a happier first week",
      subtitle: "Routines, quiet corners, and the three things every new pet wishes you knew.",
      image: "care-story-tricolor.png",
      imageAlt: "A cat reads a friendly pet-care book to a blue dog and small bird",
      intro: "Bringing a new companion home is one of life’s brightest milestones, but the first seven days are often sensory overload for their nervous systems. New smells, acoustics, and strange footsteps can cause silent anxiety if introduced all at once.",
      sections: [
        {
          heading: "1. The 3-3-3 Rule of Decompression",
          content: "Understanding your pet's emotional transition timeline sets the foundation for lifetime trust:",
          points: [
            "<strong>First 3 Days:</strong> In a state of sensory shock. They need a quiet sanctuary room, fresh water, and minimal human commotion.",
            "<strong>First 3 Weeks:</strong> Starting to feel safe, settling into the house routine, testing boundaries, and showing their genuine personality.",
            "<strong>First 3 Months:</strong> Complete trust and belonging. They understand this is their permanent home and bond deeply with their pack."
          ]
        },
        {
          heading: "2. Setting Up the Base Camp Sanctuary",
          content: "Before giving free rein over the entire home, designate one secure retreat corner with:",
          points: [
            "A supportive orthopedic bed with high side bolsters for deep sleep security.",
            "Low ambient lighting and consistent background white noise or soft acoustic music.",
            "Two heavy ceramic or stainless water bowls kept fresh and refreshed twice daily.",
            "Calming enrichment toys (such as textured lick mats or olive wood chews) that trigger natural stress-relieving endorphins."
          ]
        },
        {
          heading: "3. Body Language: Reading Subtle Signals",
          content: "Pets rarely vocalize stress until they are overwhelmed. Look out for these early signs: sudden yawning when not tired, frequent lip-licking, whale eye (showing white crescents), and turning their head away. When observed, give them breathing room and let them approach you on their own terms."
        }
      ],
      callout: {
        title: "🩺 Pawfolk Care Rule",
        text: "Connection grows faster when nobody is in a rush. Let curiosity, not human excitement, set the pace for your first week together."
      },
      actionText: "Browse Calming Essentials",
      actionLink: "shop.html?pet=dogs"
    },
    "labels": {
      id: "labels",
      category: "Nutrition",
      readTime: "4 min read",
      title: "Reading the back of the bag",
      subtitle: "Four key lines worth noticing before trusting front-label marketing claims.",
      image: "nutrition-story-tricolor.png",
      imageAlt: "A cat and dog reading a pet food label with a friendly magnifying glass",
      icon: "fa-solid fa-bowl-food",
      iconBg: "var(--mustard-soft)",
      intro: "Pet food packaging is filled with vibrant illustrations and buzzwords like 'natural', 'holistic', and 'gourmet'. However, the legally binding nutritional truth is printed exclusively on the back in the ingredient list and guaranteed analysis panel.",
      sections: [
        {
          heading: "1. The First 5 Ingredients Rule",
          content: "Ingredients must be listed in descending order by pre-cooking weight. Pay close attention to the top five items:",
          points: [
            "<strong>Explicit Named Protein:</strong> Look for specific named meats like 'Deboned Wild Salmon' or 'Cage-Free Turkey', never vague descriptors like 'Meat By-Products' or 'Poultry Meal'.",
            "<strong>Ingredient Splitting Alert:</strong> Watch out for split carbs (e.g. 'Pea flour', 'Pea protein', 'Whole peas') listed separately so meat appears artificially higher.",
            "<strong>Identified Healthy Fats:</strong> High-grade identified animal lipids (like 'Wild Salmon Oil' or 'Chicken Fat' preserved with Mixed Tocopherols) supply vital Omega-3/6 fatty acids."
          ]
        },
        {
          heading: "2. Decoding the Guaranteed Analysis",
          content: "This panel provides minimum and maximum percentages of essential macronutrients:",
          points: [
            "<strong>Crude Protein (%):</strong> Fundamental for muscle tone, cellular maintenance, and enzyme production.",
            "<strong>Crude Fat (%):</strong> Concentrated energy source and essential carrier for fat-soluble vitamins (A, D, E, K).",
            "<strong>Moisture Content:</strong> Crucial when comparing dry kibble (approx. 10% moisture) to raw or wet food (approx. 75% moisture)."
          ]
        },
        {
          heading: "3. The AAFCO Nutritional Adequacy Statement",
          content: "Always check the fine print for the statement: 'Formulated to meet the nutritional levels established by the AAFCO Nutrient Profiles for [Growth / Adult Maintenance / All Life Stages]'. This guarantees complete and balanced nutrition."
        }
      ],
      callout: {
        title: "🥕 Clean Nutrition Standard",
        text: "Avoid artificial chemical dyes (Red 40, Yellow 5), synthetic chemical preservatives (BHA, BHT, Ethoxyquin), and undisclosed animal renderings."
      },
      actionText: "Browse Wholesome Pantry & Treats",
      actionLink: "shop.html"
    },
    "shy-walks": {
      id: "shy-walks",
      category: "Training & Confidence",
      readTime: "5 min read",
      title: "Brave walks for shy dogs",
      subtitle: "Short routes, generous buffer distance, and why turning around early counts as a win.",
      image: "training-story-tricolor.png",
      imageAlt: "A calm blue puppy walking happily along a neighborhood path with friends",
      icon: "fa-solid fa-shield-dog",
      iconBg: "var(--paper-2)",
      intro: "For a nervous or sensitive dog, stepping out into the neighborhood can feel like walking into a noisy storm. Building walking confidence isn't about logging mileage — it is about keeping stress levels safely beneath their reactive threshold.",
      sections: [
        {
          heading: "1. Understanding Trigger Stacking",
          content: "Stress hormones like cortisol take up to 72 hours to fully leave the bloodstream. If your dog encounters a loud delivery van, an off-leash dog, and a bicyclist within 10 minutes, their emotional cup overflows. Keeping walks short prevents stacking."
        },
        {
          heading: "2. The Power of the 'Sniffari'",
          content: "Olfactory exploration is a dog's primary tool for neurological decompression:",
          points: [
            "<strong>Lowers Heart Rate:</strong> Deep sniffing engages the parasympathetic nervous system, naturally lowering pulse and adrenaline.",
            "<strong>High Mental Workout:</strong> 15 minutes of dedicated scent-work burns more mental energy than 45 minutes of brisk sidewalk marching.",
            "<strong>Agency & Autonomy:</strong> Allowing your dog to choose which direction to sniff restores confidence and reduces leash frustration."
          ]
        },
        {
          heading: "3. Three Rules for Fear-Free Outings",
          content: "Set your companion up for calm, brave steps every day:",
          points: [
            "<strong>The U-Turn Superpower:</strong> Never force an encounter. If a trigger appears ahead, cheerfully say 'This way!' and turn around with zero guilt.",
            "<strong>Ergonomic Y-Harness:</strong> Always use a non-restrictive Y-shaped harness and a standard 6-foot fixed leash. Avoid retractable or tightening choke chains.",
            "<strong>High-Value Bridge Rewards:</strong> Carry soft, high-value treats (freeze-dried salmon, roast turkey) reserved exclusively for calm disengagement from scary stimuli."
          ]
        }
      ],
      callout: {
        title: "🎯 Trainer's Daily Mantra",
        text: "A calm 5-minute sniff around your quiet driveway is infinitely more valuable than a stressful 30-minute forced march down a noisy boulevard."
      },
      actionText: "View Gentle Walking Gear",
      actionLink: "shop.html?pet=dogs"
    }
  };

  function openJournalModal(articleKey) {
    const article = journalArticles[articleKey] || journalArticles["first-week"];
    const isPagesDir = window.location.pathname.includes("/pages/");
    const imagePath = article.image 
      ? (isPagesDir ? `../assets/images/${article.image}` : `assets/images/${article.image}`)
      : null;
    const actionUrl = isPagesDir ? article.actionLink : (article.actionLink.startsWith("shop.html") ? `pages/${article.actionLink}` : article.actionLink);

    let modal = document.querySelector("#article-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.id = "article-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "article-modal-title");
      body.append(modal);
    }

    const sectionsHtml = article.sections.map((sec) => `
      <div class="article-modal__section">
        <h4>${sec.heading}</h4>
        <p>${sec.content}</p>
        ${sec.points ? `<ul class="check-list" style="gap:10px; margin-top:8px">${sec.points.map(p => `<li><span>${p}</span></li>`).join("")}</ul>` : ""}
      </div>
    `).join("");

    const visualHtml = imagePath 
      ? `<div class="article-modal__media"><img src="${imagePath}" alt="${article.imageAlt || article.title}" loading="lazy"></div>`
      : `<div class="article-modal__icon-hero" style="background:${article.iconBg}"><i class="${article.icon}" aria-hidden="true"></i></div>`;

    modal.innerHTML = `
      <div class="modal__backdrop" data-modal-close></div>
      <div class="modal__dialog article-modal__dialog">
        <button class="icon-btn modal__close" type="button" data-modal-close aria-label="Close article">${icon("xmark")}</button>
        
        <div class="article-modal__header">
          ${visualHtml}
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
            <span class="badge" style="background:var(--mustard); font-weight:850">${article.category}</span>
            <span class="muted" style="font-size:0.88rem; font-weight:700"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${article.readTime}</span>
          </div>
          <h2 id="article-modal-title" style="margin-bottom:8px">${article.title}</h2>
          <p class="lead muted" style="margin:0">${article.subtitle}</p>
        </div>

        <div class="article-modal__body">
          <p class="article-modal__lead">${article.intro}</p>
          ${sectionsHtml}

          <div class="article-modal__callout">
            <h5>${article.callout.title}</h5>
            <p style="margin:0; font-size:0.95rem; font-weight:600">${article.callout.text}</p>
          </div>
        </div>

        <div class="article-modal__footer">
          <button class="btn btn--paper btn--sm" type="button" data-modal-close>Close Note</button>
          <a class="btn btn--blue btn--sm" href="${actionUrl}">${article.actionText} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    `;

    const close = () => {
      modal.classList.remove("is-open");
      body.classList.remove("modal-open");
    };

    modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.onclick = close;
    });

    modal.classList.add("is-open");
    body.classList.add("modal-open");
  }

  function initJournalTriggers() {
    document.querySelectorAll(".journal-card").forEach((card) => {
      let key = card.id || card.dataset.articleId;
      if (!key) {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        if (title.includes("first week") || title.includes("low-drama")) key = "first-week";
        else if (title.includes("bag") || title.includes("labels") || title.includes("reading")) key = "labels";
        else if (title.includes("walk") || title.includes("shy")) key = "shy-walks";
      }

      card.addEventListener("click", (e) => {
        e.preventDefault();
        openJournalModal(key);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openJournalModal(key);
        }
      });
    });
  }

  /* ----------------------------------------------------
     FORM VALIDATION, PASSWORD TOGGLE & DEEP LINKS
  ---------------------------------------------------- */
  const validators = {
    required: (field) => field.type === "checkbox" ? field.checked : field.value.trim().length > 0,
    email: (field) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()),
    minlength: (field) => field.value.trim().length >= Number(field.minLength || 0)
  };

  function validateField(field) {
    let message = "";
    if (field.required && !validators.required(field)) {
      message = field.dataset.requiredMessage || "Please fill in this detail.";
    } else if (field.type === "email" && field.value && !validators.email(field)) {
      message = "Please enter a valid email address.";
    } else if (field.minLength > 0 && field.value && !validators.minlength(field)) {
      message = `Please use at least ${field.minLength} characters.`;
    }

    field.setAttribute("aria-invalid", String(Boolean(message)));
    const error = field.closest(".form-group, .checkbox")?.querySelector(".field-error") || document.getElementById(`${field.id}-error`);
    if (error) error.textContent = message;
    return !message;
  }

  function initForms() {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
      const fields = [...form.querySelectorAll("input, select, textarea")].filter((field) => field.type !== "submit" && field.type !== "button");
      fields.forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
          if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const valid = fields.map(validateField).every(Boolean);
        if (!valid) {
          form.querySelector('[aria-invalid="true"]')?.focus();
          showToast("A few fields need your attention");
          return;
        }
        const success = form.dataset.success || "Thanks — your message is on its way!";
        showToast(success);
        form.reset();
        fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
      });
    });

    // Password show/hide toggle
    document.querySelectorAll(".password-toggle-btn").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", () => {
        const input = toggleBtn.previousElementSibling;
        if (!input) return;
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        toggleBtn.innerHTML = icon(isPassword ? "eye-slash" : "eye");
        toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      });
    });

    // Special order & booking smooth scroll auto-fill
    if (window.location.hash === "#special-order") {
      const topicSelect = document.querySelector("#contact-topic");
      if (topicSelect) topicSelect.value = "Special order";
    }
  }

  /* ----------------------------------------------------
     LIVE INTERACTIVE MAP CONTROLS
  ---------------------------------------------------- */
  function initInteractiveMap() {
    const mapCard = document.querySelector("#interactive-map-card");
    const mapFrame = document.querySelector("#live-map-frame");
    if (!mapCard || !mapFrame) return;

    const baseCoords = {
      bbox: "-122.6945%2C45.5175%2C-122.6775%2C45.5275",
      marker: "45.5225%2C-122.6860"
    };

    let currentLayerIndex = 0;
    const layers = ["mapnik", "hot", "cyclemap"];

    const recenterBtn = mapCard.querySelector('[data-map-action="recenter"]');
    const layerBtn = mapCard.querySelector('[data-map-action="toggle-layer"]');
    const fullscreenBtn = mapCard.querySelector('[data-map-action="fullscreen"]');

    recenterBtn?.addEventListener("click", () => {
      mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${baseCoords.bbox}&layer=${layers[currentLayerIndex]}&marker=${baseCoords.marker}`;
      showToast("📍 Map recentered on 24 Tailwag Lane");
    });

    layerBtn?.addEventListener("click", () => {
      currentLayerIndex = (currentLayerIndex + 1) % layers.length;
      const layerName = layers[currentLayerIndex] === "mapnik" ? "Standard" : (layers[currentLayerIndex] === "hot" ? "High Contrast" : "Cycling / Transit");
      mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${baseCoords.bbox}&layer=${layers[currentLayerIndex]}&marker=${baseCoords.marker}`;
      showToast(`Switched map style: ${layerName}`);
    });

    fullscreenBtn?.addEventListener("click", () => {
      const isFullscreen = mapCard.classList.toggle("is-fullscreen");
      fullscreenBtn.innerHTML = icon(isFullscreen ? "compress" : "expand");
      fullscreenBtn.setAttribute("aria-label", isFullscreen ? "Exit fullscreen map" : "Expand fullscreen map");
      body.classList.toggle("modal-open", isFullscreen);
      showToast(isFullscreen ? "Expanded live map view" : "Closed expanded map");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mapCard.classList.contains("is-fullscreen")) {
        mapCard.classList.remove("is-fullscreen");
        fullscreenBtn.innerHTML = icon("expand");
        body.classList.remove("modal-open");
      }
    });
  }

  /* ----------------------------------------------------
     UTILITIES & INITIALIZATION
  ---------------------------------------------------- */
  function initUtilities() {
    document.querySelectorAll("[data-year]").forEach((item) => item.textContent = new Date().getFullYear());
    
    document.querySelectorAll("[data-demo-action]").forEach((button) => {
      button.addEventListener("click", () => showToast(button.dataset.demoAction || "Demo action complete"));
    });
  }

  // Master Initializer
  initTheme();
  initDirection();
  initMenu();
  initDropdowns();
  initReveal();
  initTilt();
  initWishlist();
  initCart();
  initQuickViewTriggers();
  initJournalTriggers();
  initInteractiveMap();
  initFilters();
  initJournalFilters();
  initForms();
  initUtilities();
})();
