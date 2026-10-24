/**
 * Hamadan Stores — Checkout Page Controller
 * Handles customer contact inputs, delivery vs branch pickup toggle, order review,
 * validation, and simulated demo order confirmation with WhatsApp forwarding.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const itemsContainer = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const deliveryFeeEl = document.getElementById('checkoutDeliveryFee');
  const totalEl = document.getElementById('checkoutTotal');
  const emptyNotice = document.getElementById('checkoutEmptyNotice');
  const contentSection = document.getElementById('checkoutContentSection');

  const deliveryMethodRadios = document.querySelectorAll('input[name="deliveryMethod"]');
  const addressGroup = document.getElementById('addressGroup');
  const branchGroup = document.getElementById('branchGroup');
  const addressInput = document.getElementById('checkoutAddress');
  const branchSelect = document.getElementById('checkoutBranch');

  if (!form) return;

  const money = window.formatMoney || (v => `$${Number(v).toFixed(2)}`);
  const DEMO_DELIVERY_FEE = 3.00; // Illustrative sample rate

  let currentDeliveryMethod = 'delivery'; // 'delivery' | 'pickup'

  function getCart() {
    return window.HamadanCart ? window.HamadanCart.getCart() : [];
  }

  function getSubtotal() {
    return window.HamadanCart ? window.HamadanCart.getTotal() : 0;
  }

  function getDeliveryFee() {
    return currentDeliveryMethod === 'delivery' ? DEMO_DELIVERY_FEE : 0.00;
  }

  function getTotal() {
    return getSubtotal() + getDeliveryFee();
  }

  function renderCheckoutSummary() {
    const cart = getCart();

    if (cart.length === 0) {
      if (emptyNotice) emptyNotice.hidden = false;
      if (contentSection) contentSection.hidden = true;
      return;
    }

    if (emptyNotice) emptyNotice.hidden = true;
    if (contentSection) contentSection.hidden = false;

    // Render items mini-list
    if (itemsContainer) {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-mini-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="checkout-mini-info">
            <strong>${item.name}</strong>
            <small>${item.category} · Size: ${item.size} · Color: ${item.color} · Qty: ${item.quantity}</small>
          </div>
          <div class="checkout-mini-price">
            ${money(item.price * item.quantity)}
          </div>
        </div>
      `).join('');
    }

    // Update Totals
    const subtotal = getSubtotal();
    const fee = getDeliveryFee();
    const total = getTotal();

    if (subtotalEl) subtotalEl.textContent = money(subtotal);

    if (deliveryFeeEl) {
      if (currentDeliveryMethod === 'delivery') {
        deliveryFeeEl.innerHTML = `${money(fee)} <small style="display:block; font-size:10px; color:var(--muted); font-weight:normal;">(Illustrative demo rate)</small>`;
      } else {
        deliveryFeeEl.innerHTML = `<span style="color: var(--green); font-weight:700;">FREE</span> <small style="display:block; font-size:10px; color:var(--muted); font-weight:normal;">(Branch Pickup)</small>`;
      }
    }

    if (totalEl) totalEl.textContent = money(total);
  }

  // Delivery / Pickup toggle
  deliveryMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      currentDeliveryMethod = radio.value;

      document.querySelectorAll('.delivery-option-card').forEach(card => {
        card.classList.remove('is-selected');
      });
      radio.closest('.delivery-option-card').classList.add('is-selected');

      if (currentDeliveryMethod === 'delivery') {
        if (addressGroup) addressGroup.hidden = false;
        if (branchGroup) branchGroup.hidden = true;
      } else {
        if (addressGroup) addressGroup.hidden = true;
        if (branchGroup) branchGroup.hidden = false;
      }

      renderCheckoutSummary();
    });
  });

  // Validation helpers
  function showError(groupId, message) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.classList.add('has-error');
    const err = group.querySelector('.form-error');
    if (err) err.textContent = message;
  }

  function clearError(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.classList.remove('has-error');
  }

  // Form submission handler
  form.addEventListener('submit', event => {
    event.preventDefault();

    let isValid = true;
    const name = document.getElementById('checkoutName').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const address = addressInput ? addressInput.value.trim() : '';
    const branch = branchSelect ? branchSelect.value : '';
    const notes = document.getElementById('checkoutNotes') ? document.getElementById('checkoutNotes').value.trim() : '';

    // Validate Name
    if (!name || name.length < 2) {
      showError('nameGroup', 'Please enter your full name');
      isValid = false;
    } else {
      clearError('nameGroup');
    }

    // Validate Phone
    const digitsOnly = phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 7) {
      showError('phoneGroup', 'Please enter a valid phone number (at least 7 digits)');
      isValid = false;
    } else {
      clearError('phoneGroup');
    }

    // Validate Delivery Address or Branch
    if (currentDeliveryMethod === 'delivery') {
      if (!address || address.length < 5) {
        showError('addressGroup', 'Please provide your delivery city, area, and address');
        isValid = false;
      } else {
        clearError('addressGroup');
      }
    } else {
      if (!branch) {
        showError('branchGroup', 'Please select a branch location for pickup');
        isValid = false;
      } else {
        clearError('branchGroup');
      }
    }

    if (!isValid) {
      window.showToast?.('Please fill out all required fields correctly');
      return;
    }

    // Generate Demo Confirmation
    const demoRef = `DEMO-HAM-${Math.floor(10000 + Math.random() * 90000)}`;
    const cart = getCart();
    const subtotal = getSubtotal();
    const total = getTotal();

    const itemsSummary = cart.map(i => `• ${i.name} (${i.size}, ${i.color}) x${i.quantity} — ${money(i.price * i.quantity)}`).join('\n');
    const fulfillmentText = currentDeliveryMethod === 'delivery'
      ? `Home Delivery to: ${address}`
      : `Branch Pickup at: ${branch}`;

    const waOrderMessage = `Hello Hamadan Stores! Here is my demo order inquiry:\n\nReference: ${demoRef}\nName: ${name}\nPhone: ${phone}\nFulfillment: ${fulfillmentText}\n${notes ? `Notes: ${notes}\n` : ''}\nSelected Items:\n${itemsSummary}\n\nEstimated Subtotal: ${money(subtotal)}\nEstimated Total: ${money(total)}\n\nPlease let me know if these items are available in stock and how we can proceed!`;

    // Render Confirmation Overlay
    const modal = document.createElement('div');
    modal.className = 'order-confirm-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'confirmTitle');

    modal.innerHTML = `
      <div class="order-confirm-card">
        <div class="order-confirm-icon">✓</div>
        <h2 id="confirmTitle">Demo Order Preview</h2>
        <div class="order-ref">REFERENCE: ${demoRef}</div>

        <div class="demo-order-warning">
          <strong>DEMONSTRATION ONLY:</strong> No actual order was placed and no payment was processed. Hamadan Stores does not operate live online checkouts yet.
          <br><br>
          To contact the store directly with this order inquiry, click <strong>"Send via WhatsApp"</strong> below.
        </div>

        <div class="order-summary-box">
          <div><strong>Customer:</strong> ${name} (${phone})</div>
          <div><strong>Fulfillment:</strong> ${fulfillmentText}</div>
          <div style="margin-top: 6px;"><strong>Items:</strong> ${cart.length} item(s) (${money(total)})</div>
        </div>

        <div class="confirm-actions">
          <a class="button button-dark" href="https://wa.me/96176010841?text=${encodeURIComponent(waOrderMessage)}" target="_blank" rel="noopener">
            <span>◉</span> Send Order to Hamadan Stores on WhatsApp ↗
          </a>
          <button class="button button-outline" id="confirmDoneBtn" type="button">
            Done &amp; Clear Demo Cart
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('no-scroll');

    const doneBtn = modal.querySelector('#confirmDoneBtn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        if (window.HamadanCart) {
          window.HamadanCart.clearCart();
        }
        modal.remove();
        document.body.classList.remove('no-scroll');
        window.location.href = 'index.html';
      });
    }
  });

  // Initial render
  renderCheckoutSummary();
});
