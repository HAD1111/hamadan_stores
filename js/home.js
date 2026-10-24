/**
 * Hamadan Stores — Homepage Featured Products Script
 */
document.addEventListener('DOMContentLoaded', () => {
  const products = window.HAMADAN_PRODUCTS || [];
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  const filterChips = document.querySelectorAll('#categoryFilters .filter-chip');

  if (!grid) return;

  let activeCategory = 'All';

  function renderHomeProducts() {
    const filtered = products.filter(p => activeCategory === 'All' || p.category === activeCategory);
    const visible = filtered.slice(0, 8); // Display 8 curated items on homepage

    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = Array.from({ length: 4 }, () =>
      '<div class="product-skeleton" aria-hidden="true"><div class="skeleton-image"></div><div class="skeleton-line skeleton-line-short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line-price"></div></div>'
    ).join('');

    setTimeout(() => {
      if (visible.length === 0) {
        grid.innerHTML = '<div class="no-results"><h3>No sample items found</h3><p>Try selecting another category.</p></div>';
      } else {
        grid.innerHTML = visible.map(product => {
          const money = window.formatMoney || (v => `$${Number(v).toFixed(2)}`);
          const priceDisplay = product.salePrice
            ? `<span class="price-strike">${money(product.price)}</span>${money(product.salePrice)}`
            : money(product.price);

          return `
            <article class="product-card">
              <div class="product-image-wrap">
                <a class="product-image-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
                  <img src="${product.image}" alt="${product.name} — sample product image" loading="lazy">
                  <span class="product-badge ${product.badge === 'SALE' ? 'sale-tag' : ''}">${product.badge || 'NEW'}</span>
                </a>
                <button class="quick-add" type="button" data-quick-add="${product.id}" aria-label="Quick add ${product.name} to bag">
                  ＋ <span>Quick add</span>
                </button>
              </div>
              <div class="product-card-info">
                <div class="product-meta">
                  <span>${product.category}</span>
                  <button class="save-product" type="button" aria-label="Save ${product.name}" data-save="${product.id}">♡</button>
                </div>
                <a class="product-name" href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
                <div class="product-price">
                  ${priceDisplay} <small>sample price</small>
                </div>
              </div>
            </article>
          `;
        }).join('');
      }

      grid.setAttribute('aria-busy', 'false');

      if (countEl) {
        countEl.textContent = `Showing ${visible.length} of ${filtered.length} sample arrivals in ${activeCategory === 'All' ? 'all categories' : activeCategory}`;
      }

      filterChips.forEach(chip => {
        const isSelected = chip.dataset.filter === activeCategory;
        chip.classList.toggle('active', isSelected);
        chip.setAttribute('aria-pressed', String(isSelected));
      });
    }, 180);
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.filter;
      renderHomeProducts();
    });
  });

  renderHomeProducts();
});
