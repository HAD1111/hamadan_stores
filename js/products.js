const rootScope = typeof window !== 'undefined' ? window : globalThis;
rootScope.HAMADAN_PRODUCTS = [
  // --- WOMEN ---
  {
    id: 'w-101',
    sku: 'HAM-W-101',
    name: 'Soft Knit Sweater',
    category: 'Women',
    subcategory: 'Knitwear',
    price: 28,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Oatmeal', 'Black'],
    availability: {
      'S|Oatmeal': true, 'M|Oatmeal': true, 'L|Oatmeal': true, 'XL|Oatmeal': true,
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': false
    },
    description: 'An easy everyday knit with a relaxed, comfortable fit. Designed for breathable warmth and effortless layering.',
    createdAt: '2026-10-10'
  },
  {
    id: 'w-102',
    sku: 'HAM-W-102',
    name: 'Relaxed Puffer Jacket',
    category: 'Women',
    subcategory: 'Outerwear',
    price: 46,
    salePrice: null,
    badge: 'JUST IN',
    image: 'https://images.unsplash.com/photo-1548624149-f32d1f2c7a7d?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1548624149-f32d1f2c7a7d?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Stone'],
    availability: {
      'S|Black': true, 'M|Black': true, 'L|Black': true,
      'S|Stone': true, 'M|Stone': false, 'L|Stone': true
    },
    description: 'A lightweight quilted outer layer with a modern silhouette and snug wind-resistant collar.',
    createdAt: '2026-10-08'
  },
  {
    id: 'w-103',
    sku: 'HAM-W-103',
    name: 'Tailored Wide-Leg Trousers',
    category: 'Women',
    subcategory: 'Trousers',
    price: 34,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'Black'],
    availability: {
      'XS|Beige': true, 'S|Beige': true, 'M|Beige': true, 'L|Beige': false,
      'XS|Black': true, 'S|Black': true, 'M|Black': true, 'L|Black': true
    },
    description: 'Crisp high-waisted trousers with front pleats and fluid movement, ideal for workdays and family gatherings.',
    createdAt: '2026-09-28'
  },
  {
    id: 'w-104',
    sku: 'HAM-W-104',
    name: 'Textured Midi Cardigan',
    category: 'Women',
    subcategory: 'Knitwear',
    price: 38,
    salePrice: 32,
    badge: 'SALE',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Grey'],
    availability: {
      'S|Cream': true, 'M|Cream': true, 'L|Cream': true, 'XL|Cream': true,
      'S|Grey': false, 'M|Grey': true, 'L|Grey': true, 'XL|Grey': false
    },
    description: 'Longline ribbed cardigan featuring tortoiseshell buttons and deep patch pockets.',
    createdAt: '2026-09-20'
  },
  {
    id: 'w-105',
    sku: 'HAM-W-105',
    name: 'Classic Trench Overcoat',
    category: 'Women',
    subcategory: 'Outerwear',
    price: 58,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Sand', 'Black'],
    availability: {
      'S|Sand': true, 'M|Sand': true, 'L|Sand': true,
      'S|Black': true, 'M|Black': true, 'L|Black': false
    },
    description: 'Timeless double-breasted coat with storm flap and waist tie belt. A wardrobe cornerstone.',
    createdAt: '2026-10-12'
  },
  {
    id: 'w-106',
    sku: 'HAM-W-106',
    name: 'Pleated Floral Midi Dress',
    category: 'Women',
    subcategory: 'Dresses',
    price: 42,
    salePrice: null,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Black'],
    availability: {
      'S|Olive': true, 'M|Olive': true, 'L|Olive': false, 'XL|Olive': true,
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': true
    },
    description: 'An elegant long-sleeve dress with modest neckline, micro pleats, and comfortable elasticated cuffs.',
    createdAt: '2026-09-18'
  },
  {
    id: 'w-107',
    sku: 'HAM-W-107',
    name: 'Oversized Poplin Shirt',
    category: 'Women',
    subcategory: 'Tops',
    price: 24,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blue'],
    availability: {
      'XS|White': true, 'S|White': true, 'M|White': true, 'L|White': true,
      'XS|Blue': true, 'S|Blue': true, 'M|Blue': true, 'L|Blue': false
    },
    description: 'Crisp 100% cotton button-down with dropped shoulders and a curved step hem.',
    createdAt: '2026-09-10'
  },
  {
    id: 'w-108',
    sku: 'HAM-W-108',
    name: 'Cashmere-Blend Fringe Scarf',
    category: 'Women',
    subcategory: 'Accessories',
    price: 19,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1601055903647-87e2213d8d64?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1601055903647-87e2213d8d64?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['One Size'],
    colors: ['Sand', 'Grey', 'Oatmeal'],
    availability: {
      'One Size|Sand': true, 'One Size|Grey': true, 'One Size|Oatmeal': true
    },
    description: 'Ultra-soft fringed wrap scarf for seasonal warmth, crafted in delicate woven neutral tones.',
    createdAt: '2026-10-02'
  },

  // --- MEN ---
  {
    id: 'm-201',
    sku: 'HAM-M-201',
    name: 'Everyday Zip Hoodie',
    category: 'Men',
    subcategory: 'Hoodies',
    price: 32,
    salePrice: null,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
    availability: {
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': true,
      'S|Grey': true, 'M|Grey': true, 'L|Grey': false, 'XL|Grey': true
    },
    description: 'A versatile layer for relaxed days and cool evenings. Brushed fleece lining for lasting comfort.',
    createdAt: '2026-10-09'
  },
  {
    id: 'm-202',
    sku: 'HAM-M-202',
    name: 'Essential Crew T-Shirt',
    category: 'Men',
    subcategory: 'T-Shirts',
    price: 16,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Olive'],
    availability: {
      'S|White': true, 'M|White': true, 'L|White': true, 'XL|White': true, 'XXL|White': true,
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': true, 'XXL|Black': false,
      'S|Olive': true, 'M|Olive': true, 'L|Olive': false, 'XL|Olive': true, 'XXL|Olive': false
    },
    description: 'A wardrobe staple designed to work with almost anything. Heavyweight combed organic cotton.',
    createdAt: '2026-09-12'
  },
  {
    id: 'm-203',
    sku: 'HAM-M-203',
    name: 'Casual Oxford Button-Down',
    category: 'Men',
    subcategory: 'Shirts',
    price: 29,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White'],
    availability: {
      'S|Blue': true, 'M|Blue': true, 'L|Blue': true, 'XL|Blue': true,
      'S|White': true, 'M|White': true, 'L|White': false, 'XL|White': true
    },
    description: 'Sturdy oxford cotton shirt tailored for a smart-casual silhouette that stays crisp all day.',
    createdAt: '2026-10-06'
  },
  {
    id: 'm-204',
    sku: 'HAM-M-204',
    name: 'Structured Harrington Jacket',
    category: 'Men',
    subcategory: 'Outerwear',
    price: 49,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Sand'],
    availability: {
      'M|Black': true, 'L|Black': true, 'XL|Black': true,
      'M|Sand': true, 'L|Sand': false, 'XL|Sand': true
    },
    description: 'Clean zip jacket with ribbed hem and heritage collar. Water-repellent finish for transitional weather.',
    createdAt: '2026-09-25'
  },
  {
    id: 'm-205',
    sku: 'HAM-M-205',
    name: 'Straight Fit Stretch Chinos',
    category: 'Men',
    subcategory: 'Trousers',
    price: 33,
    salePrice: 28,
    badge: 'SALE',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Beige', 'Black', 'Olive'],
    availability: {
      '30|Beige': true, '32|Beige': true, '34|Beige': true, '36|Beige': false,
      '30|Black': true, '32|Black': true, '34|Black': true, '36|Black': true,
      '30|Olive': false, '32|Olive': true, '34|Olive': true, '36|Olive': false
    },
    description: 'Mid-rise cotton chinos with added elastane for easy flex and all-day comfort.',
    createdAt: '2026-09-14'
  },
  {
    id: 'm-206',
    sku: 'HAM-M-206',
    name: 'Fine Gauge Merino Crewneck',
    category: 'Men',
    subcategory: 'Knitwear',
    price: 36,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black'],
    availability: {
      'S|Grey': true, 'M|Grey': true, 'L|Grey': true, 'XL|Grey': false,
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': true
    },
    description: 'Lightweight, ultra-smooth knitwear suitable for layering under coats or over collared shirts.',
    createdAt: '2026-10-14'
  },
  {
    id: 'm-207',
    sku: 'HAM-M-207',
    name: 'Relaxed Heavyweight Sweatpants',
    category: 'Men',
    subcategory: 'Trousers',
    price: 27,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black'],
    availability: {
      'S|Grey': true, 'M|Grey': true, 'L|Grey': true, 'XL|Grey': true,
      'S|Black': true, 'M|Black': true, 'L|Black': true, 'XL|Black': false
    },
    description: 'Thick fleece joggers with drawcord waistband and elasticated cuffs for downtime ease.',
    createdAt: '2026-09-08'
  },
  {
    id: 'm-208',
    sku: 'HAM-M-208',
    name: 'Quilted Winter Gilet',
    category: 'Men',
    subcategory: 'Outerwear',
    price: 41,
    salePrice: null,
    badge: 'JUST IN',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    availability: {
      'M|Black': true, 'L|Black': true, 'XL|Black': true,
      'M|Olive': true, 'L|Olive': true, 'XL|Olive': false
    },
    description: 'Sleeveless padded vest with thermal fill, two fleece-lined pockets, and full front zipper.',
    createdAt: '2026-10-11'
  },

  // --- KIDS ---
  {
    id: 'k-301',
    sku: 'HAM-K-301',
    name: 'Mini Weekend Hoodie',
    category: 'Kids',
    subcategory: 'Hoodies',
    price: 22,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Cream', 'Blue'],
    availability: {
      '4Y|Cream': true, '6Y|Cream': true, '8Y|Cream': true, '10Y|Cream': false,
      '4Y|Blue': true, '6Y|Blue': true, '8Y|Blue': true, '10Y|Blue': true
    },
    description: 'A soft casual layer for little weekend adventures with kangaroo pocket and jersey hood lining.',
    createdAt: '2026-10-07'
  },
  {
    id: 'k-302',
    sku: 'HAM-K-302',
    name: 'Little Explorer Set',
    category: 'Kids',
    subcategory: 'Sets',
    price: 25,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    colors: ['Sand', 'Sage'],
    availability: {
      '2Y|Sand': true, '4Y|Sand': true, '6Y|Sand': true, '8Y|Sand': true,
      '2Y|Sage': true, '4Y|Sage': false, '6Y|Sage': true, '8Y|Sage': true
    },
    description: 'An easy-to-style two-piece outfit set for everyday play. Pre-washed cotton fleece.',
    createdAt: '2026-10-05'
  },
  {
    id: 'k-303',
    sku: 'HAM-K-303',
    name: 'Warm Hooded Winter Parka',
    category: 'Kids',
    subcategory: 'Outerwear',
    price: 38,
    salePrice: 32,
    badge: 'SALE',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Olive', 'Black'],
    availability: {
      '4Y|Olive': true, '6Y|Olive': true, '8Y|Olive': true, '10Y|Olive': true, '12Y|Olive': false,
      '4Y|Black': true, '6Y|Black': true, '8Y|Black': true, '10Y|Black': false, '12Y|Black': true
    },
    description: 'Heavy winter coat with cozy sherpa lining and storm cuffs to keep little explorers warm.',
    createdAt: '2026-09-22'
  },
  {
    id: 'k-304',
    sku: 'HAM-K-304',
    name: 'Durable Denim Overalls',
    category: 'Kids',
    subcategory: 'Overalls',
    price: 26,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    colors: ['Blue'],
    availability: {
      '2Y|Blue': true, '4Y|Blue': true, '6Y|Blue': true, '8Y|Blue': false
    },
    description: 'Classic dungarees with adjustable buckles and reinforced knee panels for rough-and-tumble wear.',
    createdAt: '2026-09-17'
  },
  {
    id: 'k-305',
    sku: 'HAM-K-305',
    name: 'Everyday Stripe Tee Pack',
    category: 'Kids',
    subcategory: 'T-Shirts',
    price: 18,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Blue', 'Red'],
    availability: {
      '4Y|Blue': true, '6Y|Blue': true, '8Y|Blue': true, '10Y|Blue': true,
      '4Y|Red': true, '6Y|Red': false, '8Y|Red': true, '10Y|Red': false
    },
    description: 'Soft 100% cotton crewneck tops that retain their shape through repeated washing machine cycles.',
    createdAt: '2026-09-04'
  },
  {
    id: 'k-306',
    sku: 'HAM-K-306',
    name: 'Cosy Cable Knit Sweater',
    category: 'Kids',
    subcategory: 'Knitwear',
    price: 24,
    salePrice: null,
    badge: 'JUST IN',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Oatmeal', 'Sage'],
    availability: {
      '4Y|Oatmeal': true, '6Y|Oatmeal': true, '8Y|Oatmeal': true, '10Y|Oatmeal': true,
      '4Y|Sage': true, '6Y|Sage': true, '8Y|Sage': false, '10Y|Sage': true
    },
    description: 'Chunky pattern sweater in gentle non-itch yarn, perfect for holiday gatherings and chilly outings.',
    createdAt: '2026-10-13'
  },
  {
    id: 'k-307',
    sku: 'HAM-K-307',
    name: 'Active Stretch Track Pants',
    category: 'Kids',
    subcategory: 'Trousers',
    price: 19,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Black', 'Grey'],
    availability: {
      '4Y|Black': true, '6Y|Black': true, '8Y|Black': true, '10Y|Black': true,
      '4Y|Grey': true, '6Y|Grey': false, '8Y|Grey': true, '10Y|Grey': true
    },
    description: 'Cotton-blend joggers with elastic waistband, ankle cuffs, and zip security pockets.',
    createdAt: '2026-09-19'
  },
  {
    id: 'k-308',
    sku: 'HAM-K-308',
    name: 'Fleece-Lined Beanie & Mittens',
    category: 'Kids',
    subcategory: 'Accessories',
    price: 15,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['2-5Y', '6-10Y'],
    colors: ['Cream', 'Blue'],
    availability: {
      '2-5Y|Cream': true, '6-10Y|Cream': true,
      '2-5Y|Blue': true, '6-10Y|Blue': true
    },
    description: 'Matching knit winter hat and mittens with soft micro-fleece lining to keep ears and fingers toasty.',
    createdAt: '2026-10-04'
  },

  // --- SHOES ---
  {
    id: 's-401',
    sku: 'HAM-S-401',
    name: 'Classic Street Sneakers',
    category: 'Shoes',
    subcategory: 'Sneakers',
    price: 39,
    salePrice: null,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Red', 'White'],
    availability: {
      '39|Red': true, '40|Red': true, '41|Red': true, '42|Red': true, '43|Red': true, '44|Red': false,
      '39|White': true, '40|White': true, '41|White': true, '42|White': false, '43|White': true, '44|White': true
    },
    description: 'A clean, everyday sneaker-inspired style with cushioned insole and durable rubber cupsole.',
    createdAt: '2026-10-09'
  },
  {
    id: 's-402',
    sku: 'HAM-S-402',
    name: 'Daily Comfort Trainers',
    category: 'Shoes',
    subcategory: 'Sneakers',
    price: 35,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['White', 'Beige'],
    availability: {
      '36|White': true, '37|White': true, '38|White': true, '39|White': true, '40|White': true, '41|White': true,
      '36|Beige': true, '37|Beige': true, '38|Beige': false, '39|Beige': true, '40|Beige': false, '41|Beige': true
    },
    description: 'Comfort-led trainers engineered for busy days on the move. Breathable mesh panels and shock absorption.',
    createdAt: '2026-09-29'
  },
  {
    id: 's-403',
    sku: 'HAM-S-403',
    name: 'Chunky Chelsea Ankle Boots',
    category: 'Shoes',
    subcategory: 'Boots',
    price: 48,
    salePrice: null,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['37', '38', '39', '40', '41'],
    colors: ['Black', 'Stone'],
    availability: {
      '37|Black': true, '38|Black': true, '39|Black': true, '40|Black': true, '41|Black': false,
      '37|Stone': true, '38|Stone': false, '39|Stone': true, '40|Stone': true, '41|Stone': true
    },
    description: 'Modern lug-sole Chelsea boots featuring elastic side gores and sturdy pull tabs for easy on-off.',
    createdAt: '2026-10-07'
  },
  {
    id: 's-404',
    sku: 'HAM-S-404',
    name: 'Minimalist Leather-Look Loafers',
    category: 'Shoes',
    subcategory: 'Loafers',
    price: 44,
    salePrice: 38,
    badge: 'SALE',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['Black', 'Sand'],
    availability: {
      '39|Black': true, '40|Black': true, '41|Black': true, '42|Black': true, '43|Black': true,
      '39|Sand': false, '40|Sand': true, '41|Sand': true, '42|Sand': false, '43|Sand': true
    },
    description: 'Polished slip-on shoes with saddle strap detailing. Flexible non-slip synthetic sole.',
    createdAt: '2026-09-11'
  },
  {
    id: 's-405',
    sku: 'HAM-S-405',
    name: 'Retro Low-Top Canvas Sneakers',
    category: 'Shoes',
    subcategory: 'Sneakers',
    price: 26,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    colors: ['Black', 'White', 'Blue'],
    availability: {
      '36|Black': true, '37|Black': true, '38|Black': true, '39|Black': true, '40|Black': true, '41|Black': true, '42|Black': true, '43|Black': true,
      '36|White': true, '37|White': true, '38|White': true, '39|White': false, '40|White': true, '41|White': true, '42|White': true, '43|White': false,
      '36|Blue': true, '37|Blue': false, '38|Blue': true, '39|Blue': true, '40|Blue': false, '41|Blue': true, '42|Blue': true, '43|Blue': true
    },
    description: 'Vintage-inspired vulcanized canvas shoes with white contrast stitching and durable laces.',
    createdAt: '2026-09-02'
  },
  {
    id: 's-406',
    sku: 'HAM-S-406',
    name: 'Lightweight Kids Running Shoes',
    category: 'Shoes',
    subcategory: 'Kids Shoes',
    price: 29,
    salePrice: null,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['28', '30', '32', '34', '35'],
    colors: ['Blue', 'Grey'],
    availability: {
      '28|Blue': true, '30|Blue': true, '32|Blue': true, '34|Blue': true, '35|Blue': false,
      '28|Grey': true, '30|Grey': true, '32|Grey': false, '34|Grey': true, '35|Grey': true
    },
    description: 'Easy-strap athletic sneakers with supportive EVA sole and non-scuff rubber treads.',
    createdAt: '2026-10-01'
  },
  {
    id: 's-407',
    sku: 'HAM-S-407',
    name: 'Suede Lace-Up Desert Boots',
    category: 'Shoes',
    subcategory: 'Boots',
    price: 52,
    salePrice: null,
    badge: 'JUST IN',
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Sand', 'Black'],
    availability: {
      '40|Sand': true, '41|Sand': true, '42|Sand': true, '43|Sand': true, '44|Sand': false,
      '40|Black': true, '41|Black': false, '42|Black': true, '43|Black': true, '44|Black': true
    },
    description: 'Classic chukka boots in soft brushed suede with cushioned crepe-effect outsole.',
    createdAt: '2026-10-15'
  },
  {
    id: 's-408',
    sku: 'HAM-S-408',
    name: 'Cushioned Everyday Comfort Slides',
    category: 'Shoes',
    subcategory: 'Slides',
    price: 18,
    salePrice: null,
    badge: 'EVERYDAY',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=700&q=85',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=700&q=85'
    ],
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: ['Black', 'Beige'],
    availability: {
      '38|Black': true, '39|Black': true, '40|Black': true, '41|Black': true, '42|Black': true, '43|Black': true,
      '38|Beige': true, '39|Beige': true, '40|Beige': false, '41|Beige': true, '42|Beige': true, '43|Beige': false
    },
    description: 'Molded EVA slip-on sandals with contoured footbed for post-workout recovery or casual lounging.',
    createdAt: '2026-09-07'
  }
];
