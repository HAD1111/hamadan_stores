/**
 * Hamadan Stores — Shop Page Controller
 * Supports 20-product pagination, skeleton loading, category/price/search filtering, and sorting.
 */
document.addEventListener('DOMContentLoaded', () => {
  const products = window.HAMADAN_PRODUCTS || [];
  const grid = document.getElementById('shopProductGrid');
  const countEl = document.getElementById('shopProductCount');
  const loadMoreBtn = document.getElementById('shopLoadMoreBtn');
  const categoryChips = document.querySelectorAll('#shopCategoryChips .filter-chip');
  const priceSelect = document.getElementById('priceFilterSelect');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('shopSearchInput');
  const searchClearBtn = document.getElementById('shopSearchClear');
  const activeFiltersBar = document.getElementById('activeFiltersBar');
  const activeFiltersSummary = document.getElementById('activeFiltersSummary');

  if (!grid) return;

  const PAGE_SIZE = 20;
  let visibleLimit = PAGE_SIZE;
  let renderTimer = null;

  // Read initial query params
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('category') || 'All';
  if (!['All', 'Women', 'Men', 'Kids', 'Shoes'].includes(activeCategory)) {
    activeCategory = 'All';
  }
  let searchQuery = urlParams.get('search') || '';
  let activePrice = urlParams.get('price') || 'all';
  let activeSort = urlParams.get('sort') || 'featured';

  // Set initial control values
  if (searchInput) searchInput.value = searchQuery;
  if (priceSelect) priceSelect.value = activePrice;
  if (sortSelect) sortSelect.value = activeSort;

  function updateUrlParams() {
    const params = new URLSearchParams();
    if (activeCategory !== 'All') params.set('category', activeCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (activePrice !== 'all') params.set('price', activePrice);
    if (activeSort !== 'featured') params.set('sort', activeSort);

    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newQuery);
  }

  function getEffectivePrice(p) {
    return Number(p.salePrice || p.price);
  }

  function getFilteredAndSortedProducts() {
    let result = products.filter(p => {
      // Category filter
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const haystack = `${p.name} ${p.category} ${p.subcategory || ''} ${p.description || ''} ${p.sku || ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      // Price range filter
      const price = getEffectivePrice(p);
      if (activePrice === 'under-25' && price >= 25) return false;
      if (activePrice === '25-40' && (price < 25 || price > 40)) return false;
      if (activePrice === 'over-40' && price <= 40) return false;

      return true;
    });

    // Sorting
    if (activeSort === 'price-asc') {
      result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    } else if (activeSort === 'price-desc') {
      result.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    } else if (activeSort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || '2026-01-01') - new Date(a.createdAt || '2026-01-01'));
    }

    return result;
  }

  function renderProductCard(p) {
    const money = window.formatMoney || (v => `$${Number(v).toFixed(2)}`);
    const priceDisplay = p.salePrice
      ? `<span class="price-strike">${money(p.price)}</span>${money(p.salePrice)}`
      : money(p.price);

    return `
      <article class="product-card" data-card-id="${p.id}">
        <div class="product-image-wrap">
          <a class="product-image-link" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="View details for ${p.name}">
            <img src="${p.image}" alt="${p.name} — sample product photo" loading="lazy">
            <span class="product-badge ${p.badge === 'SALE' ? 'sale-tag' : ''}">${p.badge || 'FEATURED'}</span>
          </a>
          <button class="quick-add" type="button" data-quick-add="${p.id}" aria-label="Add ${p.name} to shopping bag">
            ＋ <span>Quick add</span>
          </button>
        </div>
        <div class="product-card-info">
          <div class="product-meta">
            <span>${p.category}${p.subcategory ? ` · ${p.subcategory}` : ''}</span>
            <button class="save-product" type="button" aria-label="Save ${p.name}" data-save="${p.id}">♡</button>
          </div>
          <a class="product-name" href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
          <div class="product-price">
            ${priceDisplay} <small>sample price</small>
          </div>
        </div>
      </article>
    `;
  }

  function render(showSkeleton = true) {
    const filtered = getFilteredAndSortedProducts();
    const visible = filtered.slice(0, visibleLimit);

    // Update Category Chips
    categoryChips.forEach(chip => {
      const isSelected = chip.dataset.category === activeCategory;
      chip.classList.toggle('active', isSelected);
      chip.setAttribute('aria-pressed', String(isSelected));
    });

    // Update active filters summary bar
    const hasActiveFilters = activeCategory !== 'All' || searchQuery !== '' || activePrice !== 'all' || activeSort !== 'featured';
    if (activeFiltersBar) {
      activeFiltersBar.hidden = !hasActiveFilters;
      if (hasActiveFilters && activeFiltersSummary) {
        const parts = [];
        if (activeCategory !== 'All') parts.push(`Category: <strong>${activeCategory}</strong>`);
        if (searchQuery) parts.push(`Search: <strong>"${searchQuery}"</strong>`);
        if (activePrice !== 'all') {
          const priceLabels = { 'under-25': 'Under $25', '25-40': '$25 - $40', 'over-40': 'Over $40' };
          parts.push(`Price: <strong>${priceLabels[activePrice] || activePrice}</strong>`);
        }
        if (activeSort !== 'featured') {
          const sortLabels = { 'price-asc': 'Price: Low to High', 'price-desc': 'Price: High to Low', 'newest': 'Newest Arrivals' };
          parts.push(`Sort: <strong>${sortLabels[activeSort] || activeSort}</strong>`);
        }
        activeFiltersSummary.innerHTML = parts.join(' · ');
      }
    }

    if (showSkeleton) {
      grid.setAttribute('aria-busy', 'true');
      const skeletonCount = Math.min(8, Math.max(4, visible.length || 4));
      grid.innerHTML = Array.from({ length: skeletonCount }, () =>
        '<div class="product-skeleton" aria-hidden="true"><div class="skeleton-image"></div><div class="skeleton-line skeleton-line-short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line-price"></div></div>'
      ).join('');
    }

    clearTimeout(renderTimer);
    const delay = showSkeleton ? 200 : 0;

    renderTimer = setTimeout(() => {
      grid.setAttribute('aria-busy', 'false');

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="no-results">
            <h3>No products found</h3>
            <p>We could not find any sample products matching your current filters.</p>
            <button class="button button-outline" id="clearAllFiltersBtn" type="button" style="margin-top: 14px;">Clear all filters</button>
          </div>
        `;
        const clearBtn = document.getElementById('clearAllFiltersBtn');
        if (clearBtn) clearBtn.addEventListener('click', resetAllFilters);
      } else {
        grid.innerHTML = visible.map(renderProductCard).join('');
      }

      // Update Counts
      if (countEl) {
        if (filtered.length === 0) {
          countEl.textContent = '0 sample products';
        } else {
          countEl.textContent = `Showing ${visible.length} of ${filtered.length} sample products`;
        }
      }

      // Load More Button visibility & text
      if (loadMoreBtn) {
        if (filtered.length > visibleLimit) {
          loadMoreBtn.hidden = false;
          const remaining = filtered.length - visibleLimit;
          const nextBatch = Math.min(PAGE_SIZE, remaining);
          loadMoreBtn.textContent = `Load ${nextBatch} more products (${remaining} remaining)`;
        } else {
          loadMoreBtn.hidden = true;
        }
      }

      updateUrlParams();
    }, delay);
  }

  function resetAllFilters() {
    activeCategory = 'All';
    searchQuery = '';
    activePrice = 'all';
    activeSort = 'featured';
    visibleLimit = PAGE_SIZE;

    if (searchInput) searchInput.value = '';
    if (priceSelect) priceSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';

    render(true);
  }

  // Event Listeners
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.category;
      visibleLimit = PAGE_SIZE;
      render(true);
    });
  });

  if (priceSelect) {
    priceSelect.addEventListener('change', () => {
      activePrice = priceSelect.value;
      visibleLimit = PAGE_SIZE;
      render(true);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      visibleLimit = PAGE_SIZE;
      render(true);
    });
  }

  if (searchInput) {
    let debounce = null;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        visibleLimit = PAGE_SIZE;
        render(true);
      }, 300);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      visibleLimit = PAGE_SIZE;
      render(true);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleLimit += PAGE_SIZE;
      render(false); // Smoothly append without skeleton flash
    });
  }

  const resetAllFiltersLink = document.getElementById('resetAllFiltersLink');
  if (resetAllFiltersLink) {
    resetAllFiltersLink.addEventListener('click', resetAllFilters);
  }

  // Listen to header search custom event
  window.addEventListener('hamadan:search', event => {
    if (event.detail && typeof event.detail.query === 'string') {
      searchQuery = event.detail.query;
      if (searchInput) searchInput.value = searchQuery;
      visibleLimit = PAGE_SIZE;
      render(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    activeCategory = params.get('category') || 'All';
    searchQuery = params.get('search') || '';
    activePrice = params.get('price') || 'all';
    activeSort = params.get('sort') || 'featured';

    if (searchInput) searchInput.value = searchQuery;
    if (priceSelect) priceSelect.value = activePrice;
    if (sortSelect) sortSelect.value = activeSort;

    visibleLimit = PAGE_SIZE;
    render(true);
  });

  // Initial load
  render(true);
});
