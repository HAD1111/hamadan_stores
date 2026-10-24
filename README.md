# Hamadan Stores — E-Commerce Concept Demo (Version 2.0)

A polished, multi-page responsive storefront prototype for **Hamadan Stores**, a real clothing and footwear retailer serving families in Lebanon with three branches:
1. **Rayak / Zahle Highway** (Main branch)
2. **Douris / Baalbeck Highway**
3. **Taalabaya / Main Road**

WhatsApp Hotline: **+961 76 010 841** (`https://wa.me/96176010841`)

---

## 1. Quick Start & Preview

This prototype is built using **pure HTML5, CSS3, and vanilla JavaScript**. It requires no Node.js build step, bundler, or framework.

### Option A: Open directly in any modern browser
Double-click `index.html` (or right-click → Open With Chrome/Safari/Edge/Firefox).
All internal links use relative paths, ensuring complete functionality via `file:///`.

### Option B: Run a local static development server (Recommended)
From this directory:
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx serve .
```
Then open `http://localhost:8000` in your web browser.

*Note: An internet connection is required to load Google Fonts (DM Sans & Manrope) and sample Unsplash photography.*

---

## 2. Completed Architecture & Project Structure

The project has been expanded into a complete multi-page architecture conforming to the specification:

```
hamadan-stores-demo-v2/
├── index.html          # Homepage with hero, category showcase, curated arrivals & branch highlights
├── shop.html           # Dedicated catalog with 20-product pagination, filters & sorting
├── product.html        # Product details page with horizontal size/color pills & variant availability
├── cart.html           # Full shopping bag page with line items, quantities & subtotal calculation
├── checkout.html       # Checkout simulation with delivery vs pickup & WhatsApp order generation
├── branches.html       # Dedicated three branches page with Google Maps links & inquiry buttons
├── about.html          # Brand story, core pillars, and local community values
├── contact.html        # Contact hub, WhatsApp hotline, direct inquiry form & store FAQs
│
├── css/
│   ├── style.css       # Core typography, color system, layout, announcement bar, drawer & header
│   └── components.css  # Modular styles for shop toolbar, product gallery, variant pills, cart & checkout
│
├── js/
│   ├── products.js     # Expanded 32-item catalog across Women, Men, Kids & Shoes with SKUs and stock maps
│   ├── app.js          # Shared application core: HamadanCart API, navigation sync, drawer & toasts
│   ├── home.js         # Homepage arrivals grid renderer with category chips
│   ├── shop.js         # Shop page logic: 20-item pagination, "Load More", filters, sort & skeletons
│   ├── product.js      # Product detail logic: gallery, size/color radio buttons & variant validation
│   ├── cart.js         # Cart page logic: line items, quantities, line totals & order summary
│   └── checkout.js     # Checkout logic: field validation, fulfillment switching & order confirmation
│
└── test-suite.js       # Automated validation suite (363 checks passing)
```

---

## 3. Key Implemented Features

### High-Priority Navigation Consistency
- **Shared Desktop Header:** Wordmark, Home, Shop, Women, Men, Kids, Shoes, Our Branches, Search panel toggle, and Shopping Bag with live item counter.
- **Responsive Mobile Navigation:** Menu toggle, accessible `aria-expanded` and `aria-controls`, smooth expand/collapse, outside-tap dismiss, and Escape key closure.
- **Direct Page Landing:** Navigating directly to any inner page (`shop.html`, `branches.html`, `cart.html`, etc.) renders the identical header and accurately highlights the active link.

### Dedicated Shop Catalog & 20-Product Rule
- **20-Product Batching:** Initial catalog render caps visible items to 20.
- **Load More Button:** Dynamically loads the next batch of sample items without duplication.
- **Filtering & Search:** Real-time filtering by Category (All, Women, Men, Kids, Shoes), Price Range (Under $25, $25–$40, Over $40), and keyword Search query.
- **Sorting:** Supports Featured, Price: Low to High, Price: High to Low, and Newest Arrivals.
- **Skeleton Loading:** Realistic skeleton cards display during transitions with `prefers-reduced-motion` compliance.
- **Empty States:** Clear messaging with a "Reset All Filters" action when no items match.

### Product Details Page
- **Breadcrumb Navigation:** `Home / Shop / [Category] / [Product Name]`
- **Interactive Gallery:** Multi-image gallery with clickable thumbnail selector.
- **Horizontal Size Radio Pills:** Styled radio buttons (`[ XS ] [ S ] [ M ] [ L ] [ XL ]`) with natural wrapping, keyboard navigation, and disabled indicators for unavailable combinations.
- **Horizontal Color Swatches:** Visual swatch circles paired with readable color names (`[ ● Black ] [ ● Beige ]`).
- **Dynamic Variant-Level Stock Availability:** Stock belongs to the specific `(size, color)` combination. When an unavailable combination (e.g., Size XL in Black on `w-101`) is selected, the stock status alerts the customer and disables the "Add to Bag" button.
- **WhatsApp Inquiry:** Pre-populates a WhatsApp message containing the exact product title, SKU, selected size, and color.

### Shopping Bag & Cart Drawer
- **Persistent Cart:** Saved automatically in `localStorage` under `hamadan-demo-cart-v1`.
- **Variant Separation:** Adding the same product in two different sizes or colors creates distinct line items. Adding the identical variant merges quantities.
- **Dual Interface:** Accessible via quick slide-out drawer on all pages or via full dedicated `cart.html` page.
- **Quantity Controls:** Increase, decrease, or remove items with automatic subtotal recalculation.

### Checkout Simulation
- **Customer Form:** Name and Lebanese phone number inputs with client-side validation.
- **Fulfillment Method Switching:** Choose between "Home Delivery" ($3.00 illustrative fee) or "Branch Pickup" (FREE).
- **Branch Selector:** Displays the three verified Hamadan branches (Rayak, Douris, Taalabaya) when pickup is selected.
- **Simulated Order Confirmation Modal:** Explicitly states that the checkout is a demonstration, provides a unique demo reference (`DEMO-HAM-XXXXX`), and offers a one-click button to send the complete order details to the store's WhatsApp line.

---

## 4. Verification & Testing Report

An automated test suite (`test-suite.js`) runs with Node.js to verify all project components:

```bash
node test-suite.js
```

### Test Results Summary
- **Total Checks:** 363 passed, 0 failed.
- **Navigation & Links:** All internal links, stylesheets, and scripts resolve to existing files with zero 404s.
- **Catalog Schema:** Verified 32 products with unique IDs, SKUs, sizes, colors, and variant availability maps.
- **20-Product Rule:** Confirmed initial 20-item cap and duplicate-free "Load More" expansion.
- **Filters & Sorting:** Confirmed category filtering, price bounds, search indexing, and ascending/descending sorts.
- **Variant Logic:** Verified in-stock vs out-of-stock combination detection.
- **Cart Operations:** Verified variant separation, quantity merging, subtotal math, and line removal.
- **Checkout Calculations:** Verified delivery vs branch pickup fee logic and disclaimer presence.

---

## 5. Prototype Limitations (Demo Mode)

This website is a **frontend prototype** created for client review and feedback:
1. **Sample Inventory:** All product names, photos, SKUs, and prices are illustrative placeholders.
2. **No Backend Database:** Inventory and order submissions are not connected to a live ERP, POS, or database.
3. **No Payment Processing:** No credit card processing or payment gateway is implemented. Live transactions in Lebanon typically operate on Cash on Delivery (COD) or in-store payment upon pickup.
4. **Delivery Policies:** The $3.00 delivery fee and delivery areas are illustrative demo figures that must be confirmed by the store owner before commercial release.

---

## 6. Production Readiness Checklist

Before publishing this storefront for live commercial use:
- [ ] Replace text wordmark with official Hamadan Stores vector logo and favicon.
- [ ] Replace sample Unsplash photos with authentic high-resolution product photography.
- [ ] Connect catalog to Hamadan Stores' live POS or inventory database.
- [ ] Finalize delivery zones, shipping rates, and delivery timeframes across Lebanon.
- [ ] Review and publish official Returns, Privacy, and Store Policies.
- [ ] Connect custom domain and configure production SSL and CDN caching.
