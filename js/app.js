/**
 * Hamadan Stores — Shared Application Logic & Navigation
 * Handles cart persistence, mobile navigation, search drawer, cart drawer, and notifications.
 */
(() => {
  const CART_KEY = 'hamadan-demo-cart-v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `$${Number(value || 0).toFixed(2)}`;

  let toastTimer = null;
  const cartListeners = [];

  // 1. Centralized Cart Management
  function readCart() {
    try {
      const data = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function saveCart(cartData) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartData));
    } catch {
      /* localStorage may be disabled or full */
    }
  }

  let cart = readCart();

  function notifyCartListeners() {
    saveCart(cart);
    updateCartUI();
    cartListeners.forEach(listener => {
      try { listener(cart); } catch (e) { console.error('Cart listener error:', e); }
    });
  }

  const HamadanCart = {
    getCart() {
      return [...cart];
    },
    getCount() {
      return cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    },
    getTotal() {
      return cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    },
    addToCart(product, size = '', color = '', quantity = 1) {
      if (!product || !product.id) return;
      const selectedSize = size || product.sizes?.[0] || 'Standard';
      const selectedColor = color || product.colors?.[0] || 'Standard';
      const key = `${product.id}|${selectedSize}|${selectedColor}`;
      const existing = cart.find(item => item.key === key);

      const parsedQty = Math.max(1, parseInt(quantity, 10) || 1);

      if (existing) {
        existing.quantity += parsedQty;
      } else {
        cart.push({
          key,
          id: product.id,
          sku: product.sku || `HAM-${product.id.toUpperCase()}`,
          name: product.name,
          category: product.category,
          price: Number(product.price) || 0,
          image: product.image,
          size: selectedSize,
          color: selectedColor,
          quantity: parsedQty
        });
      }

      notifyCartListeners();
      showToast(`Added "${product.name}" (${selectedSize}, ${selectedColor}) to your bag`);
    },
    updateQuantity(key, delta) {
      const item = cart.find(entry => entry.key === key);
      if (!item) return;
      item.quantity += Number(delta);
      if (item.quantity <= 0) {
        cart = cart.filter(entry => entry.key !== key);
      }
      notifyCartListeners();
    },
    setItemQuantity(key, quantity) {
      const item = cart.find(entry => entry.key === key);
      if (!item) return;
      const qty = parseInt(quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        cart = cart.filter(entry => entry.key !== key);
      } else {
        item.quantity = Math.min(99, qty);
      }
      notifyCartListeners();
    },
    removeItem(key) {
      cart = cart.filter(item => item.key !== key);
      notifyCartListeners();
      showToast('Item removed from shopping bag');
    },
    clearCart() {
      cart = [];
      notifyCartListeners();
    },
    subscribe(callback) {
      if (typeof callback === 'function') {
        cartListeners.push(callback);
      }
    }
  };

  // Expose Cart API globally for shop.js, product.js, cart.js, checkout.js
  window.HamadanCart = HamadanCart;
  window.formatMoney = money;

  // 2. Toast Notifications
  function showToast(message) {
    let node = $('#toast');
    if (!node) {
      node = document.createElement('div');
      node.id = 'toast';
      node.className = 'toast';
      node.setAttribute('role', 'status');
      node.setAttribute('aria-live', 'polite');
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      node.classList.remove('is-visible');
    }, 2800);
  }
  window.showToast = showToast;

  // 3. Update Cart Badge & Drawer UI (if present)
  function updateCartUI() {
    const count = HamadanCart.getCount();
    const total = HamadanCart.getTotal();

    // Update header badges
    const headerCount = $('#cartCount');
    if (headerCount) headerCount.textContent = count;

    $$('.mobile-cart-badge').forEach(badge => {
      badge.textContent = count;
    });

    // Update Drawer if present
    const drawerCount = $('#drawerCartCount');
    if (drawerCount) drawerCount.textContent = `(${count})`;

    const drawerItems = $('#cartItems');
    if (drawerItems) {
      drawerItems.innerHTML = cart.map(item => `
        <article class="cart-line">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-line-info">
            <strong>${item.name}</strong>
            <small>${item.category} · Size: ${item.size} · Color: ${item.color}</small>
            <div class="quantity-control">
              <button type="button" data-cart-action="dec" data-key="${item.key}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="inc" data-key="${item.key}" aria-label="Increase quantity">+</button>
              <button class="remove-item" type="button" data-cart-action="remove" data-key="${item.key}">Remove</button>
            </div>
          </div>
          <strong class="cart-line-price">${money(item.price * item.quantity)}</strong>
        </article>
      `).join('');
    }

    const drawerSubtotal = $('#cartSubtotal');
    if (drawerSubtotal) drawerSubtotal.textContent = money(total);

    const drawerEmpty = $('#cartEmpty');
    if (drawerEmpty) drawerEmpty.hidden = cart.length > 0;

    const drawerFooter = $('#drawerFooter');
    if (drawerFooter) drawerFooter.hidden = cart.length === 0;

    const whatsappCheckout = $('#whatsappCheckout');
    if (whatsappCheckout) {
      const lines = cart.map(item => `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} — ${money(item.price * item.quantity)}`).join('\n');
      const message = `Hello Hamadan Stores! I would like to inquire about these items in my shopping bag:\n\n${lines}\n\nEstimated Subtotal: ${money(total)}\nPlease confirm item availability and delivery/pickup arrangements.`;
      whatsappCheckout.href = `https://wa.me/96176010841?text=${encodeURIComponent(message)}`;
    }
  }

  // 4. Drawer open / close handlers
  function openCart() {
    const drawer = $('#cartDrawer');
    const backdrop = $('#drawerBackdrop');
    if (!drawer) {
      window.location.href = 'cart.html';
      return;
    }
    drawer.classList.add('drawer-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.hidden = false;
    document.body.classList.add('no-scroll');
    const closeBtn = $('#cartClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeCart() {
    const drawer = $('#cartDrawer');
    const backdrop = $('#drawerBackdrop');
    if (drawer) {
      drawer.classList.remove('drawer-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  // 5. Mobile Navigation
  function closeMobileMenu() {
    const nav = $('#mainNav');
    const toggle = $('#mobileMenuToggle');
    if (nav) nav.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  // 6. Active Nav Link Detection
  function syncActiveNav() {
    const currentPath = window.location.pathname.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    $$('.main-nav .nav-link').forEach(link => {
      link.classList.remove('active');
      const navTag = link.dataset.nav;

      if (!categoryParam && (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '')) {
        if (navTag === 'home') link.classList.add('active');
      } else if (currentPath.endsWith('shop.html')) {
        if (!categoryParam && navTag === 'shop') link.classList.add('active');
        if (categoryParam && categoryParam.toLowerCase() === navTag) link.classList.add('active');
      } else if (currentPath.endsWith('branches.html') && navTag === 'branches') {
        link.classList.add('active');
      } else if (currentPath.endsWith('about.html') && navTag === 'about') {
        link.classList.add('active');
      } else if (currentPath.endsWith('contact.html') && navTag === 'contact') {
        link.classList.add('active');
      }
    });
  }

  // 7. Search handling
  function handleSearchSubmit() {
    const input = $('#siteSearch');
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.endsWith('shop.html')) {
      // Dispatches custom event for shop.js
      window.dispatchEvent(new CustomEvent('hamadan:search', { detail: { query } }));
      const searchPanel = $('#searchPanel');
      if (searchPanel) searchPanel.hidden = true;
    } else {
      window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
  }

  // 8. Event Delegations
  document.addEventListener('click', event => {
    // Drawer actions
    const cartActionBtn = event.target.closest('[data-cart-action]');
    if (cartActionBtn) {
      const action = cartActionBtn.dataset.cartAction;
      const key = cartActionBtn.dataset.key;
      if (action === 'inc') HamadanCart.updateQuantity(key, 1);
      else if (action === 'dec') HamadanCart.updateQuantity(key, -1);
      else if (action === 'remove') HamadanCart.removeItem(key);
      return;
    }

    // Direct Add to Cart buttons
    const addBtn = event.target.closest('[data-quick-add]');
    if (addBtn) {
      const productId = addBtn.dataset.quickAdd;
      const catalog = window.HAMADAN_PRODUCTS || [];
      const product = catalog.find(p => p.id === productId);
      if (product) {
        HamadanCart.addToCart(product);
      }
      return;
    }

    // Wishlist demo click
    if (event.target.closest('[data-save]')) {
      showToast('Saved items wishlist is a demo visual preview');
      return;
    }

    // Close mobile nav when clicking a nav link
    if (event.target.closest('.main-nav a')) {
      closeMobileMenu();
    }
  });

  // DOM ready bindings
  document.addEventListener('DOMContentLoaded', () => {
    syncActiveNav();
    updateCartUI();

    // Mobile menu toggle
    const mobileToggle = $('#mobileMenuToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const nav = $('#mainNav');
        const isOpen = nav.classList.toggle('nav-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Search toggle
    const searchToggle = $('#searchToggle');
    const searchPanel = $('#searchPanel');
    const searchInput = $('#siteSearch');
    const searchSubmit = $('#searchSubmit');

    if (searchToggle && searchPanel) {
      searchToggle.addEventListener('click', () => {
        searchPanel.hidden = !searchPanel.hidden;
        if (!searchPanel.hidden && searchInput) {
          searchInput.focus();
        }
      });
    }

    if (searchSubmit) {
      searchSubmit.addEventListener('click', handleSearchSubmit);
    }

    if (searchInput) {
      searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSearchSubmit();
        } else if (event.key === 'Escape' && searchPanel) {
          searchPanel.hidden = true;
        }
      });
    }

    // Cart Drawer triggers
    const cartToggle = $('#cartToggle');
    if (cartToggle) cartToggle.addEventListener('click', openCart);

    const cartClose = $('#cartClose');
    if (cartClose) cartClose.addEventListener('click', closeCart);

    const drawerBackdrop = $('#drawerBackdrop');
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeCart);

    const continueShopping = $('#continueShopping');
    if (continueShopping) continueShopping.addEventListener('click', closeCart);

    const drawerCheckoutBtn = $('#checkoutButton');
    if (drawerCheckoutBtn) {
      drawerCheckoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }

    // Dismiss Demo Banner
    const dismissBanner = $('#dismissDemoBanner');
    if (dismissBanner) {
      dismissBanner.addEventListener('click', () => {
        const banner = $('.demo-banner');
        if (banner) banner.remove();
      });
    }

    // Escape key listener for overlays
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeCart();
        closeMobileMenu();
        if (searchPanel) searchPanel.hidden = true;
      }
    });

    // Dynamic current year
    const yearSpan = $('#currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
})();
