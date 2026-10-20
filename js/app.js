(() => {
  const products = window.HAMADAN_PRODUCTS || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `$${Number(value).toFixed(2)}`;
  const CART_KEY = 'hamadan-demo-cart-v1';
  let activeFilter = 'All';
  let searchQuery = '';
  const PAGE_SIZE = 20;
  let visibleLimit = PAGE_SIZE;
  let renderTimer = null;
  let cart = readCart();
  let toastTimer;

  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage may be unavailable */ }
  }
  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('is-visible'), 2600);
  }
  function productCard(product) {
    return `<article class="product-card">
      <div class="product-image-wrap"><a class="product-image-link" href="#shop" data-product="${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name} — sample product image" loading="lazy"><span class="product-badge">${product.badge || 'FEATURED'}</span></a><button class="quick-add" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">＋ <span>Quick add</span></button></div>
      <div class="product-card-info"><div class="product-meta"><span>${product.category}</span><button class="save-product" type="button" aria-label="Save ${product.name}" data-save="${product.id}">♡</button></div><a class="product-name" href="#shop" data-product="${product.id}">${product.name}</a><div class="product-price">${money(product.price)} <small>sample price</small></div></div>
    </article>`;
  }
  function renderProducts() {
    const grid = $('#productGrid');
    if (!grid) return;
    const filtered = products.filter(product => {
      const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return matchesCategory && haystack.includes(searchQuery.toLowerCase());
    });
    const visible = filtered.slice(0, visibleLimit);
    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = Array.from({length: Math.min(8, Math.max(4, visible.length))}, () =>
      '<div class="product-skeleton" aria-hidden="true"><div class="skeleton-image"></div><div class="skeleton-line skeleton-line-short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line-price"></div></div>'
    ).join('');
    clearTimeout(renderTimer);
    renderTimer = window.setTimeout(() => {
      grid.innerHTML = visible.length ? visible.map(productCard).join('') : `<div class="no-results"><h3>No matching products</h3><p>Try another search or category.</p><button class="button button-outline" data-reset-filters>Clear filters</button></div>`;
      grid.setAttribute('aria-busy', 'false');
      let more = $('#loadMoreProducts');
      if (!more) {
        more = document.createElement('button');
        more.id = 'loadMoreProducts';
        more.className = 'button button-outline load-more-products';
        more.type = 'button';
        grid.insertAdjacentElement('afterend', more);
        more.addEventListener('click', () => { visibleLimit += PAGE_SIZE; renderProducts(); });
      }
      more.hidden = filtered.length <= visibleLimit;
      more.textContent = `Load ${PAGE_SIZE} more products`;
      $('#productCount').textContent = `${visible.length} of ${filtered.length} sample products${searchQuery ? ' matching your search' : ''}`;
      $$('.filter-chip').forEach(button => {
        const selected = button.dataset.filter === activeFilter;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    }, 260);
  }
  function setFilter(category) {
    activeFilter = ['Women','Men','Kids','Shoes'].includes(category) ? category : 'All';
    searchQuery = '';
    visibleLimit = PAGE_SIZE;
    $('#siteSearch').value = '';
    renderProducts();
    $('#shop')?.scrollIntoView({behavior:'smooth', block:'start'});
    closeMobileMenu();
  }
  function openSearch() {
    const panel = $('#searchPanel');
    panel.hidden = false;
    $('#siteSearch').focus();
  }
  function closeMobileMenu() {
    $('#mainNav').classList.remove('nav-open');
    $('#mobileMenuToggle').setAttribute('aria-expanded', 'false');
  }
  function cartCount() { return cart.reduce((sum, item) => sum + item.quantity, 0); }
  function cartTotal() { return cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }
  function updateCartUI() {
    const count = cartCount();
    $('#cartCount').textContent = count;
    $('#drawerCartCount').textContent = `(${count})`;
    $('#cartItems').innerHTML = cart.map(item => `<article class="cart-line"><img src="${item.image}" alt="${item.name}"><div class="cart-line-info"><strong>${item.name}</strong><small>${item.category} · ${item.size || 'Size not selected'} · ${item.color || 'Color not selected'}</small><div class="quantity-control"><button type="button" data-quantity="${item.key}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-quantity="${item.key}" data-change="1" aria-label="Increase quantity">+</button><button class="remove-item" type="button" data-remove="${item.key}">Remove</button></div></div><strong class="cart-line-price">${money(item.price * item.quantity)}</strong></article>`).join('');
    $('#cartSubtotal').textContent = money(cartTotal());
    $('#cartEmpty').hidden = cart.length > 0;
    $('#drawerFooter').hidden = cart.length === 0;
    const lines = cart.map(item => `• ${item.name} (${item.size || 'size n/a'}, ${item.color || 'color n/a'}) x${item.quantity} — ${money(item.price * item.quantity)}`).join('\n');
    const message = `Hello Hamadan Stores! I'd like to ask about these demo items:\n${lines}\n\nDemo subtotal: ${money(cartTotal())}\nPlease confirm actual availability, final prices, and delivery cost.`;
    $('#whatsappCheckout').href = `https://wa.me/96176010841?text=${encodeURIComponent(message)}`;
    saveCart();
  }
  function openCart() {
    $('#cartDrawer').classList.add('drawer-open');
    $('#cartDrawer').setAttribute('aria-hidden', 'false');
    $('#drawerBackdrop').hidden = false;
    document.body.classList.add('no-scroll');
    $('#cartClose').focus();
  }
  function closeCart() {
    $('#cartDrawer').classList.remove('drawer-open');
    $('#cartDrawer').setAttribute('aria-hidden', 'true');
    $('#drawerBackdrop').hidden = true;
    document.body.classList.remove('no-scroll');
  }
  function addToCart(product, size = product.sizes?.[0] || '', color = product.colors?.[0] || '') {
    const key = `${product.id}|${size}|${color}`;
    const existing = cart.find(item => item.key === key);
    if (existing) existing.quantity += 1;
    else cart.push({key, id:product.id, name:product.name, category:product.category, price:product.price, image:product.image, size, color, quantity:1});
    updateCartUI();
    toast(`${product.name} added to your bag`);
  }
  function showProduct(product) {
    const sizes = product.sizes || [];
    const colors = product.colors || [];
    const sizeOptions = sizes.map((size, index) => `<label class="choice-pill"><input type="radio" name="productSize" value="${size}" ${index === 0 ? 'checked' : ''}><span>${size}</span></label>`).join('');
    const colorMap = {Black:'#222222', White:'#ffffff', Grey:'#999999', Beige:'#d6c5b3', Oatmeal:'#d8c8b6', Stone:'#a9a095', Olive:'#6e7651', Red:'#c93434', Cream:'#f0e7d8', Blue:'#567da8', Sand:'#d6c5b3', Sage:'#9ca88d'};
    const colorOptions = colors.map((color, index) => `<label class="choice-pill color-choice"><input type="radio" name="productColor" value="${color}" ${index === 0 ? 'checked' : ''}><span><i class="color-swatch" style="--swatch:${colorMap[color] || '#c8b9a8'}"></i>${color}</span></label>`).join('');
    const overlay = document.createElement('div');
    overlay.className = 'product-modal-backdrop';
    overlay.innerHTML = `<section class="product-modal" role="dialog" aria-modal="true" aria-label="${product.name}"><button class="icon-button modal-close" aria-label="Close product details">×</button><div class="modal-product-image"><img src="${product.image}" alt="${product.name} sample image"></div><div class="modal-product-info"><p class="eyebrow">${product.category} · SAMPLE ITEM</p><h2>${product.name}</h2><p class="modal-price">${money(product.price)}</p><p>${product.description}</p><p class="demo-inline-note">Sample item and price for presentation only. Actual options and availability must be confirmed by the store.</p><fieldset class="choice-group"><legend>Choose size</legend><div class="choice-options">${sizeOptions}</div></fieldset><fieldset class="choice-group"><legend>Choose color</legend><div class="choice-options color-options">${colorOptions}</div></fieldset><button class="button button-dark button-full modal-add">Add to bag <span>＋</span></button><a class="modal-whatsapp" href="https://wa.me/96176010841" target="_blank" rel="noopener">Ask about this item on WhatsApp ↗</a></div></section>`;
    document.body.appendChild(overlay);
    document.body.classList.add('no-scroll');
    const close = () => { overlay.remove(); document.body.classList.remove('no-scroll'); };
    $('.modal-close', overlay).addEventListener('click', close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    $('.modal-add', overlay).addEventListener('click', () => { addToCart(product, $('input[name="productSize"]:checked', overlay)?.value || '', $('input[name="productColor"]:checked', overlay)?.value || ''); close(); openCart(); });
    document.addEventListener('keydown', function esc(event) { if (event.key === 'Escape' && document.body.contains(overlay)) { close(); document.removeEventListener('keydown', esc); } });
    $('.modal-close', overlay).focus();
  }
  function handleCheckout() {
    toast('Demo checkout only — no order or payment has been submitted.');
    const message = 'Hello Hamadan Stores! I would like to ask about placing an order and delivery. Please confirm actual product availability, final pricing, and delivery fees.';
    window.open(`https://wa.me/96176010841?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }

  document.addEventListener('click', event => {
    const categoryLink = event.target.closest('[data-category-link]');
    if (categoryLink) { event.preventDefault(); setFilter(categoryLink.dataset.categoryLink); return; }
    const addButton = event.target.closest('[data-add]');
    if (addButton) { const product = products.find(item => item.id === addButton.dataset.add); if (product) addToCart(product); return; }
    const productLink = event.target.closest('[data-product]');
    if (productLink) { event.preventDefault(); const product = products.find(item => item.id === productLink.dataset.product); if (product) showProduct(product); return; }
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) { activeFilter = filterButton.dataset.filter; visibleLimit = PAGE_SIZE; renderProducts(); return; }
    const quantityButton = event.target.closest('[data-quantity]');
    if (quantityButton) { const item = cart.find(entry => entry.key === quantityButton.dataset.quantity); if (item) { item.quantity += Number(quantityButton.dataset.change); if (item.quantity <= 0) cart = cart.filter(entry => entry.key !== item.key); updateCartUI(); } return; }
    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) { cart = cart.filter(item => item.key !== removeButton.dataset.remove); updateCartUI(); return; }
    if (event.target.closest('[data-reset-filters]')) { activeFilter = 'All'; visibleLimit = PAGE_SIZE; searchQuery = ''; $('#siteSearch').value = ''; renderProducts(); return; }
    if (event.target.closest('[data-save]')) { toast('Saved-item lists are a visual demo feature and are not stored yet.'); return; }
  });

  $('#mobileMenuToggle').addEventListener('click', () => {
    const nav = $('#mainNav'); const open = nav.classList.toggle('nav-open');
    $('#mobileMenuToggle').setAttribute('aria-expanded', String(open));
  });
  $('#searchToggle').addEventListener('click', () => { const panel = $('#searchPanel'); if (panel.hidden) openSearch(); else panel.hidden = true; });
  $('#searchSubmit').addEventListener('click', () => { searchQuery = $('#siteSearch').value.trim(); activeFilter = 'All'; visibleLimit = PAGE_SIZE; renderProducts(); $('#shop')?.scrollIntoView({behavior:'smooth'}); $('#searchPanel').hidden = true; });
  $('#siteSearch').addEventListener('keydown', event => { if (event.key === 'Enter') $('#searchSubmit').click(); if (event.key === 'Escape') $('#searchPanel').hidden = true; });
  $('#cartToggle').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#drawerBackdrop').addEventListener('click', closeCart);
  $('#continueShopping').addEventListener('click', closeCart);
  $('#checkoutButton').addEventListener('click', handleCheckout);
  $('#dismissDemoBanner').addEventListener('click', () => $('.demo-banner').remove());
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeCart(); $('#searchPanel').hidden = true; closeMobileMenu(); } });
  $('#currentYear').textContent = new Date().getFullYear();
  renderProducts();
  updateCartUI();
})();
