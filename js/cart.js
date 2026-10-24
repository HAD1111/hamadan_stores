/**
 * Hamadan Stores — Shopping Bag (Cart) Page Controller
 * Manages full-page line items, quantities, line totals, subtotal, empty state, and checkout redirection.
 */
document.addEventListener('DOMContentLoaded', () => {
  const tableContainer = document.getElementById('cartPageItems');
  const emptyContainer = document.getElementById('cartPageEmpty');
  const summaryContainer = document.getElementById('cartPageSummary');

  if (!tableContainer) return;

  function renderCartPage() {
    const cart = window.HamadanCart ? window.HamadanCart.getCart() : [];
    const count = window.HamadanCart ? window.HamadanCart.getCount() : 0;
    const subtotal = window.HamadanCart ? window.HamadanCart.getTotal() : 0;
    const money = window.formatMoney || (v => `$${Number(v).toFixed(2)}`);

    const pageCountEl = document.getElementById('cartPageCount');
    if (pageCountEl) pageCountEl.textContent = `(${count} ${count === 1 ? 'item' : 'items'})`;

    if (cart.length === 0) {
      if (tableContainer) tableContainer.hidden = true;
      if (summaryContainer) summaryContainer.hidden = true;
      if (emptyContainer) emptyContainer.hidden = false;
      return;
    }

    if (emptyContainer) emptyContainer.hidden = true;
    if (tableContainer) tableContainer.hidden = false;
    if (summaryContainer) summaryContainer.hidden = false;

    // Render Cart Lines
    tableContainer.innerHTML = cart.map(item => {
      const lineTotal = item.price * item.quantity;
      return `
        <article class="cart-page-line" data-line-key="${item.key}">
          <a href="product.html?id=${encodeURIComponent(item.id)}">
            <img src="${item.image}" alt="${item.name}">
          </a>
          <div class="cart-page-info">
            <strong><a href="product.html?id=${encodeURIComponent(item.id)}">${item.name}</a></strong>
            <div class="cart-page-meta">
              <span>${item.category}</span>
              <span>Size: ${item.size}</span>
              <span>Color: ${item.color}</span>
              <span>Unit: ${money(item.price)}</span>
            </div>
            <div class="quantity-control" style="margin-top: 10px;">
              <button type="button" data-cart-page-action="dec" data-key="${item.key}" aria-label="Decrease quantity">−</button>
              <span style="font-weight: 700; padding: 0 4px;">${item.quantity}</span>
              <button type="button" data-cart-page-action="inc" data-key="${item.key}" aria-label="Increase quantity">+</button>
              <button class="remove-item" type="button" data-cart-page-action="remove" data-key="${item.key}" style="margin-left: 14px;">Remove</button>
            </div>
          </div>
          <div class="cart-page-price">
            ${money(lineTotal)}
          </div>
        </article>
      `;
    }).join('');

    // Render Order Summary
    const lines = cart.map(item => `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} — ${money(item.price * item.quantity)}`).join('\n');
    const waMessage = `Hello Hamadan Stores! I'd like to check out with these items from my shopping bag:\n\n${lines}\n\nEstimated Subtotal: ${money(subtotal)}\nPlease advise on branch availability and delivery options.`;

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="order-summary-card">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Items (${count})</span>
            <strong>${money(subtotal)}</strong>
          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span style="color: var(--muted); font-size: 11px;">Calculated at checkout</span>
          </div>
          <div class="summary-row total-row">
            <span>Estimated Subtotal</span>
            <strong style="color: var(--ink); font-size: 20px;">${money(subtotal)}</strong>
          </div>

          <div class="summary-notice">
            <strong>Demonstration notice:</strong> Prices and stock are sample values. In the real store, availability and exact delivery fees are confirmed directly.
          </div>

          <a href="checkout.html" class="button button-dark button-full" style="margin-bottom: 12px;">
            Proceed to Checkout <span>→</span>
          </a>

          <a class="product-wa-action" href="https://wa.me/96176010841?text=${encodeURIComponent(waMessage)}" target="_blank" rel="noopener" style="margin-bottom: 16px;">
            <span>◉</span> Send bag to WhatsApp ↗
          </a>

          <div style="text-align: center;">
            <a href="shop.html" class="text-link" style="border: 0; font-size: 11px; text-decoration: underline;">← Continue shopping</a>
          </div>
        </div>
      `;
    }
  }

  // Delegated event listener for cart actions
  document.addEventListener('click', event => {
    const actionBtn = event.target.closest('[data-cart-page-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.cartPageAction;
    const key = actionBtn.dataset.key;
    if (!key || !window.HamadanCart) return;

    const cart = window.HamadanCart.getCart();
    const item = cart.find(i => i.key === key);

    if (action === 'inc') {
      if (item && item.quantity >= 10) {
        window.showToast?.('Maximum demo quantity of 10 items reached for this variant.');
        return;
      }
      window.HamadanCart.updateQuantity(key, 1);
    } else if (action === 'dec') {
      window.HamadanCart.updateQuantity(key, -1);
    } else if (action === 'remove') {
      window.HamadanCart.removeItem(key);
    }
  });

  // Subscribe to cart updates
  if (window.HamadanCart) {
    window.HamadanCart.subscribe(renderCartPage);
  }

  // Initial render
  renderCartPage();
});
