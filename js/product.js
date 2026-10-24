/**
 * Hamadan Stores — Product Details Page Controller
 * Handles image gallery, horizontal size/color radio pills, variant availability, quantity, and WhatsApp dispatch.
 */
document.addEventListener('DOMContentLoaded', () => {
  const products = window.HAMADAN_PRODUCTS || [];
  const container = document.getElementById('productDetailContainer');
  const relatedGrid = document.getElementById('relatedProductsGrid');

  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'w-101'; // Default fallback to first item if none provided
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = `
      <div class="no-results" style="padding: 60px 20px; text-align: center;">
        <h2>Product not found</h2>
        <p>The requested sample item could not be located in our catalog.</p>
        <a href="shop.html" class="button button-dark" style="margin-top: 18px;">Return to Shop Catalog</a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${product.name} — Hamadan Stores`;

  // Color mapping dictionary
  const colorMap = {
    Black: '#222222', White: '#ffffff', Grey: '#8e8b86', Beige: '#d6c5b3',
    Oatmeal: '#d8c8b6', Stone: '#a9a095', Olive: '#6e7651', Red: '#c93434',
    Cream: '#f0e7d8', Blue: '#4a729e', Sand: '#c8b8a5', Sage: '#9ca88d'
  };

  const sizes = product.sizes && product.sizes.length ? product.sizes : ['One Size'];
  const colors = product.colors && product.colors.length ? product.colors : ['Standard'];

  let selectedSize = sizes[0];
  let selectedColor = colors[0];
  let quantity = 1;

  function isVariantAvailable(size, color) {
    if (!product.availability) return true;
    const key = `${size}|${color}`;
    return product.availability[key] !== false;
  }

  // Find initial available combination if first is out of stock
  if (!isVariantAvailable(selectedSize, selectedColor)) {
    for (const s of sizes) {
      for (const c of colors) {
        if (isVariantAvailable(s, c)) {
          selectedSize = s;
          selectedColor = c;
          break;
        }
      }
    }
  }

  const money = window.formatMoney || (v => `$${Number(v).toFixed(2)}`);
  const priceDisplay = product.salePrice
    ? `<span class="price-strike">${money(product.price)}</span><span style="color: #b23b3b;">${money(product.salePrice)}</span>`
    : money(product.price);

  // Gallery images list
  const galleryImages = product.images && product.images.length ? product.images : [product.image];

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span class="crumb-sep">/</span>
      <a href="shop.html">Shop</a>
      <span class="crumb-sep">/</span>
      <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">${product.name}</span>
    </nav>

    <div class="product-detail-layout">
      <!-- Left: Gallery -->
      <div class="product-gallery">
        <div class="gallery-main-img">
          <img id="mainGalleryImg" src="${galleryImages[0]}" alt="${product.name} — sample photograph">
        </div>
        ${galleryImages.length > 1 ? `
          <div class="gallery-thumbs" role="tablist" aria-label="Product thumbnail images">
            ${galleryImages.map((img, idx) => `
              <button class="gallery-thumb ${idx === 0 ? 'active' : ''}" type="button" data-img="${img}" aria-label="View photo ${idx + 1}">
                <img src="${img}" alt="Thumbnail ${idx + 1}">
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Right: Product Information & Variant Selector -->
      <div class="product-info-wrap">
        <p class="eyebrow">${product.category}${product.subcategory ? ` · ${product.subcategory}` : ''} · SAMPLE ITEM</p>
        <h1 class="product-info-title">${product.name}</h1>
        
        <div class="product-meta-row">
          <div class="product-info-price">${priceDisplay}</div>
          <div class="product-sku">SKU: ${product.sku || 'HAM-' + product.id.toUpperCase()}</div>
          <span class="product-badge ${product.badge === 'SALE' ? 'sale-tag' : ''}">${product.badge || 'AUTHENTIC'}</span>
        </div>

        <p class="product-info-desc">${product.description}</p>

        <!-- Horizontal Size Radio Buttons -->
        <fieldset class="variant-selector-wrap choice-group">
          <div class="variant-label-row">
            <legend><strong>Select Size:</strong></legend>
            <span class="variant-selected-value" id="selectedSizeLabel">${selectedSize}</span>
          </div>
          <div class="size-pills" id="sizePillsGroup" role="radiogroup" aria-label="Available Sizes">
            ${sizes.map(size => {
              const available = isVariantAvailable(size, selectedColor);
              const isChecked = size === selectedSize;
              return `
                <label class="choice-pill ${!available ? 'is-disabled' : ''}">
                  <input type="radio" name="productSize" value="${size}" ${isChecked ? 'checked' : ''} ${!available ? 'aria-disabled="true"' : ''}>
                  <span>${size}</span>
                </label>
              `;
            }).join('')}
          </div>
        </fieldset>

        <!-- Horizontal Color Swatches -->
        <fieldset class="variant-selector-wrap choice-group">
          <div class="variant-label-row">
            <legend><strong>Select Color:</strong></legend>
            <span class="variant-selected-value" id="selectedColorLabel">${selectedColor}</span>
          </div>
          <div class="color-swatches" id="colorSwatchesGroup" role="radiogroup" aria-label="Available Colors">
            ${colors.map(color => {
              const available = isVariantAvailable(selectedSize, color);
              const isChecked = color === selectedColor;
              const swatchHex = colorMap[color] || '#c8b8a5';
              return `
                <label class="choice-pill color-choice ${!available ? 'is-disabled' : ''}">
                  <input type="radio" name="productColor" value="${color}" ${isChecked ? 'checked' : ''} ${!available ? 'aria-disabled="true"' : ''}>
                  <span>
                    <i class="color-swatch" style="--swatch:${swatchHex}"></i>
                    ${color}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </fieldset>

        <!-- Variant Availability Box -->
        <div class="stock-status-box" id="stockStatusBox">
          <span class="stock-status-dot"></span>
          <span id="stockStatusText">Checking availability...</span>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="product-actions-row">
          <div class="qty-control" aria-label="Quantity selector">
            <button type="button" id="qtyDec" aria-label="Decrease quantity">−</button>
            <input type="number" id="qtyInput" value="1" min="1" max="10" readonly aria-label="Quantity">
            <button type="button" id="qtyInc" aria-label="Increase quantity">+</button>
          </div>
          <button class="button button-dark button-add-cart" id="addToBagBtn" type="button">
            Add to bag <span>＋</span>
          </button>
        </div>

        <!-- WhatsApp Direct Inquiry -->
        <a class="product-wa-action" id="waProductInquiry" href="#" target="_blank" rel="noopener">
          <span>◉</span> Inquire about this item on WhatsApp ↗
        </a>

        <!-- Service & Store Perks Accordion / Info -->
        <div class="product-perks">
          <div class="perk-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <div>
              <strong>Sample Pricing &amp; Stock</strong>
              <span>Prices and availability shown are for prototype testing. Confirm final details with the store.</span>
            </div>
          </div>
          <div class="perk-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
              <strong>In-Store Try-On &amp; Branch Pickup</strong>
              <span>Visit our branches in Rayak, Douris, or Taalabaya to try on sizes.</span>
            </div>
          </div>
          <div class="perk-item">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <div>
              <strong>Delivery Across Lebanon</strong>
              <span>Delivery arrangements and rates are confirmed promptly via WhatsApp.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Gallery Thumbnail Click Logic
  const mainImg = document.getElementById('mainGalleryImg');
  const thumbs = container.querySelectorAll('.gallery-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.dataset.img;
    });
  });

  // Variant Availability Sync
  function updateVariantUI() {
    const sizeLabel = document.getElementById('selectedSizeLabel');
    const colorLabel = document.getElementById('selectedColorLabel');
    const stockBox = document.getElementById('stockStatusBox');
    const stockText = document.getElementById('stockStatusText');
    const addBtn = document.getElementById('addToBagBtn');
    const waLink = document.getElementById('waProductInquiry');

    if (sizeLabel) sizeLabel.textContent = selectedSize;
    if (colorLabel) colorLabel.textContent = selectedColor;

    const available = isVariantAvailable(selectedSize, selectedColor);

    // Update Size pills disabled state based on selectedColor
    sizes.forEach(size => {
      const radio = container.querySelector(`input[name="productSize"][value="${size}"]`);
      if (radio) {
        const pill = radio.closest('.choice-pill');
        const sizeAvail = isVariantAvailable(size, selectedColor);
        pill.classList.toggle('is-disabled', !sizeAvail);
        radio.setAttribute('aria-disabled', String(!sizeAvail));
      }
    });

    // Update Color pills disabled state based on selectedSize
    colors.forEach(color => {
      const radio = container.querySelector(`input[name="productColor"][value="${color}"]`);
      if (radio) {
        const pill = radio.closest('.choice-pill');
        const colorAvail = isVariantAvailable(selectedSize, color);
        pill.classList.toggle('is-disabled', !colorAvail);
        radio.setAttribute('aria-disabled', String(!colorAvail));
      }
    });

    if (available) {
      stockBox.classList.remove('is-unavailable');
      stockText.innerHTML = `<strong>In Stock (Sample):</strong> Available in size <strong>${selectedSize}</strong>, color <strong>${selectedColor}</strong>.`;
      addBtn.disabled = false;
      addBtn.textContent = 'Add to bag ＋';

      const waMsg = `Hello Hamadan Stores! I'd like to check if "${product.name}" (SKU: ${product.sku}, Size: ${selectedSize}, Color: ${selectedColor}, Price: ${money(product.price)}) is currently available at your branches or for delivery.`;
      waLink.href = `https://wa.me/96176010841?text=${encodeURIComponent(waMsg)}`;
      waLink.innerHTML = `<span>◉</span> Inquire about this item on WhatsApp ↗`;
    } else {
      stockBox.classList.add('is-unavailable');
      stockText.innerHTML = `<strong>Out of Stock:</strong> Size <strong>${selectedSize}</strong> is currently unavailable in <strong>${selectedColor}</strong>. Please choose another combination.`;
      addBtn.disabled = true;
      addBtn.textContent = 'Combination unavailable';

      const waMsg = `Hello Hamadan Stores! I'm interested in "${product.name}" (SKU: ${product.sku}), but size ${selectedSize} in ${selectedColor} seems out of stock. When might this combination be restocked?`;
      waLink.href = `https://wa.me/96176010841?text=${encodeURIComponent(waMsg)}`;
      waLink.innerHTML = `<span>◉</span> Ask about restock on WhatsApp ↗`;
    }
  }

  // Radio Change Listeners
  container.addEventListener('change', event => {
    if (event.target.name === 'productSize') {
      selectedSize = event.target.value;
      updateVariantUI();
    } else if (event.target.name === 'productColor') {
      selectedColor = event.target.value;
      updateVariantUI();
    }
  });

  // Quantity Increment / Decrement
  const qtyInput = document.getElementById('qtyInput');
  const qtyDec = document.getElementById('qtyDec');
  const qtyInc = document.getElementById('qtyInc');

  if (qtyDec && qtyInput) {
    qtyDec.addEventListener('click', () => {
      quantity = Math.max(1, quantity - 1);
      qtyInput.value = quantity;
    });
  }
  if (qtyInc && qtyInput) {
    qtyInc.addEventListener('click', () => {
      quantity = Math.min(10, quantity + 1);
      qtyInput.value = quantity;
    });
  }

  // Add to Bag Button
  const addToBagBtn = document.getElementById('addToBagBtn');
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (!isVariantAvailable(selectedSize, selectedColor)) {
        window.showToast?.('Please choose an available size and color combination.');
        return;
      }
      if (window.HamadanCart) {
        window.HamadanCart.addToCart(product, selectedSize, selectedColor, quantity);
      }
    });
  }

  // Initial Variant UI sync
  updateVariantUI();

  // Render Related Products (same category, excluding current)
  if (relatedGrid) {
    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    if (related.length > 0) {
      relatedGrid.innerHTML = related.map(p => {
        const pPrice = p.salePrice
          ? `<span class="price-strike">${money(p.price)}</span>${money(p.salePrice)}`
          : money(p.price);

        return `
          <article class="product-card">
            <div class="product-image-wrap">
              <a class="product-image-link" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="View ${p.name}">
                <img src="${p.image}" alt="${p.name} — sample product photo" loading="lazy">
                <span class="product-badge ${p.badge === 'SALE' ? 'sale-tag' : ''}">${p.badge || 'RELATED'}</span>
              </a>
              <button class="quick-add" type="button" data-quick-add="${p.id}" aria-label="Add ${p.name} to bag">
                ＋ <span>Quick add</span>
              </button>
            </div>
            <div class="product-card-info">
              <div class="product-meta">
                <span>${p.category}</span>
                <button class="save-product" type="button" aria-label="Save ${p.name}" data-save="${p.id}">♡</button>
              </div>
              <a class="product-name" href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
              <div class="product-price">${pPrice} <small>sample price</small></div>
            </div>
          </article>
        `;
      }).join('');
    } else {
      const section = relatedGrid.closest('.related-section');
      if (section) section.hidden = true;
    }
  }
});
