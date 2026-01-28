// Nationwide Bangladesh Data for Brand and Shopkeeper Dashboards

export interface Division {
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
  shops: number;
  sales: number;
  growth: number;
  womenLed: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  location: string;
  totalPurchases: number;
  lastPurchase: string;
  dueAmount: number;
  loyaltyPoints: number;
  preferredProducts: string[];
  purchaseHistory: PurchaseRecord[];
}

export interface PurchaseRecord {
  date: string;
  items: string[];
  amount: number;
  paid: boolean;
}

export interface Competitor {
  id: number;
  name: string;
  region: string;
  marketShare: number;
  priceComparison: 'lower' | 'similar' | 'higher';
  products: CompetitorProduct[];
  strengths: string[];
  weaknesses: string[];
}

export interface CompetitorProduct {
  name: string;
  theirPrice: number;
  ourPrice: number;
  priceDiff: number;
}

export interface OpportunityAlert {
  id: number;
  type: 'growth' | 'demand' | 'competitor' | 'seasonal' | 'expansion';
  title: string;
  description: string;
  region: string;
  potential: string;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AdCampaign {
  id: number;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  startDate: string;
  endDate: string;
  targetRegions: string[];
  targetAudience: string;
}

// Special Deals from Brands
export interface BrandDeal {
  id: number;
  brandName: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  validFrom: string;
  validUntil: string;
  minQuantity: number;
  maxQuantity: number;
  regions: string[];
  status: 'active' | 'upcoming' | 'expired';
  description: string;
  termsConditions: string[];
}

export interface Supplier {
  id: number;
  name: string;
  type: 'manufacturer' | 'distributor' | 'wholesaler';
  products: string[];
  minOrder: number;
  deliveryTime: string;
  rating: number;
  verified: boolean;
  contact: string;
  priceList: SupplierProduct[];
}

export interface SupplierProduct {
  name: string;
  price: number;
  unit: string;
  minQty: number;
  inStock: boolean;
}

export interface SupplierProduct {
  name: string;
  price: number;
  unit: string;
  minQty: number;
  inStock: boolean;
}

// All 8 Divisions of Bangladesh
export const bangladeshDivisions: Division[] = [
  { name: 'Dhaka', nameBn: 'ঢাকা', lat: 23.8103, lng: 90.4125, shops: 2450, sales: 4500000, growth: 12, womenLed: 320 },
  { name: 'Chittagong', nameBn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832, shops: 1890, sales: 3200000, growth: 15, womenLed: 245 },
  { name: 'Sylhet', nameBn: 'সিলেট', lat: 24.8949, lng: 91.8687, shops: 980, sales: 1800000, growth: 18, womenLed: 156 },
  { name: 'Rajshahi', nameBn: 'রাজশাহী', lat: 24.3745, lng: 88.6042, shops: 1120, sales: 1500000, growth: 10, womenLed: 189 },
  { name: 'Khulna', nameBn: 'খুলনা', lat: 22.8456, lng: 89.5403, shops: 890, sales: 1200000, growth: 8, womenLed: 134 },
  { name: 'Barisal', nameBn: 'বরিশাল', lat: 22.7010, lng: 90.3535, shops: 560, sales: 800000, growth: 14, womenLed: 98 },
  { name: 'Rangpur', nameBn: 'রংপুর', lat: 25.7439, lng: 89.2752, shops: 780, sales: 950000, growth: 11, womenLed: 112 },
  { name: 'Mymensingh', nameBn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203, shops: 650, sales: 720000, growth: 16, womenLed: 87 },
];

// Women Entrepreneurs across Bangladesh
export const womenEntrepreneurs = [
  { id: 1, name: 'Fatima Begum', division: 'Dhaka', business: 'Handicrafts', employees: 12, revenue: 450000, lat: 23.7925, lng: 90.4078 },
  { id: 2, name: 'Rashida Khatun', division: 'Chittagong', business: 'Textiles', employees: 8, revenue: 320000, lat: 22.3475, lng: 91.8123 },
  { id: 3, name: 'Amina Sultana', division: 'Sylhet', business: 'Food Processing', employees: 15, revenue: 580000, lat: 24.9045, lng: 91.8612 },
  { id: 4, name: 'Nasreen Akter', division: 'Rajshahi', business: 'Boutique', employees: 6, revenue: 280000, lat: 24.3636, lng: 88.6241 },
  { id: 5, name: 'Salma Rahman', division: 'Khulna', business: 'Cosmetics', employees: 4, revenue: 180000, lat: 22.8200, lng: 89.5500 },
  { id: 6, name: 'Taslima Begum', division: 'Barisal', business: 'Grocery', employees: 3, revenue: 150000, lat: 22.7100, lng: 90.3700 },
  { id: 7, name: 'Shirin Akter', division: 'Rangpur', business: 'Tailoring', employees: 10, revenue: 350000, lat: 25.7500, lng: 89.2600 },
  { id: 8, name: 'Kulsum Begum', division: 'Mymensingh', business: 'Dairy', employees: 5, revenue: 220000, lat: 24.7550, lng: 90.4100 },
];

// Mock Customers Data
export const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Abdul Karim',
    phone: '+880 1712-345678',
    location: 'Mirpur, Dhaka',
    totalPurchases: 125000,
    lastPurchase: '2024-01-25',
    dueAmount: 3500,
    loyaltyPoints: 1250,
    preferredProducts: ['Rice', 'Oil', 'Sugar'],
    purchaseHistory: [
      { date: '2024-01-25', items: ['Rice 5kg', 'Oil 2L'], amount: 1200, paid: true },
      { date: '2024-01-20', items: ['Sugar 2kg', 'Salt 1kg'], amount: 350, paid: false },
    ]
  },
  {
    id: 'CUST002',
    name: 'Rahim Uddin',
    phone: '+880 1812-456789',
    location: 'Uttara, Dhaka',
    totalPurchases: 89000,
    lastPurchase: '2024-01-24',
    dueAmount: 1200,
    loyaltyPoints: 890,
    preferredProducts: ['Medicines', 'Vitamins'],
    purchaseHistory: [
      { date: '2024-01-24', items: ['Paracetamol', 'Vitamin C'], amount: 450, paid: true },
    ]
  },
  {
    id: 'CUST003',
    name: 'Fatima Khatun',
    phone: '+880 1912-567890',
    location: 'Dhanmondi, Dhaka',
    totalPurchases: 156000,
    lastPurchase: '2024-01-23',
    dueAmount: 5800,
    loyaltyPoints: 1560,
    preferredProducts: ['Cosmetics', 'Skincare'],
    purchaseHistory: [
      { date: '2024-01-23', items: ['Face Cream', 'Shampoo'], amount: 850, paid: false },
    ]
  },
  {
    id: 'CUST004',
    name: 'Mohammad Ali',
    phone: '+880 1612-678901',
    location: 'Gulshan, Dhaka',
    totalPurchases: 210000,
    lastPurchase: '2024-01-22',
    dueAmount: 0,
    loyaltyPoints: 2100,
    preferredProducts: ['Groceries', 'Dairy'],
    purchaseHistory: [
      { date: '2024-01-22', items: ['Milk 2L', 'Bread', 'Eggs'], amount: 580, paid: true },
    ]
  },
  {
    id: 'CUST005',
    name: 'Shirin Akter',
    phone: '+880 1512-789012',
    location: 'Banani, Dhaka',
    totalPurchases: 78000,
    lastPurchase: '2024-01-21',
    dueAmount: 2300,
    loyaltyPoints: 780,
    preferredProducts: ['Clothing', 'Fabrics'],
    purchaseHistory: [
      { date: '2024-01-21', items: ['Saree', 'Blouse piece'], amount: 2500, paid: false },
    ]
  },
];

// Competitor Data
export const mockCompetitors: Competitor[] = [
  {
    id: 1,
    name: 'MarketPro BD',
    region: 'Dhaka',
    marketShare: 18.5,
    priceComparison: 'similar',
    products: [
      { name: 'Rice 5kg', theirPrice: 380, ourPrice: 375, priceDiff: -1.3 },
      { name: 'Cooking Oil 2L', theirPrice: 420, ourPrice: 415, priceDiff: -1.2 },
      { name: 'Sugar 1kg', theirPrice: 120, ourPrice: 118, priceDiff: -1.7 },
    ],
    strengths: ['Strong delivery network', 'Better app experience'],
    weaknesses: ['Higher prices', 'Limited rural reach'],
  },
  {
    id: 2,
    name: 'ShopEasy',
    region: 'Chittagong',
    marketShare: 12.3,
    priceComparison: 'higher',
    products: [
      { name: 'Rice 5kg', theirPrice: 395, ourPrice: 375, priceDiff: -5.1 },
      { name: 'Cooking Oil 2L', theirPrice: 440, ourPrice: 415, priceDiff: -5.7 },
    ],
    strengths: ['Premium branding', 'Urban presence'],
    weaknesses: ['No women entrepreneur focus', 'Expensive'],
  },
  {
    id: 3,
    name: 'LocalMart',
    region: 'Sylhet',
    marketShare: 8.7,
    priceComparison: 'lower',
    products: [
      { name: 'Rice 5kg', theirPrice: 360, ourPrice: 375, priceDiff: 4.2 },
      { name: 'Sugar 1kg', theirPrice: 110, ourPrice: 118, priceDiff: 7.3 },
    ],
    strengths: ['Lowest prices', 'Local trust'],
    weaknesses: ['Poor technology', 'Limited products'],
  },
];

// Opportunity Alerts
export const mockOpportunities: OpportunityAlert[] = [
  {
    id: 1,
    type: 'growth',
    title: 'High Growth Potential in Sylhet',
    description: 'Sylhet division shows 18% monthly growth. Consumer spending increased by 25% in Q4. Recommend increasing distribution partners.',
    region: 'Sylhet',
    potential: '৳2.5L additional monthly revenue',
    urgency: 'high',
    createdAt: '2024-01-25',
  },
  {
    id: 2,
    type: 'demand',
    title: 'Rising Demand for Organic Products',
    description: 'Search trends show 45% increase in organic product queries in Dhaka. Consider partnering with organic farmers.',
    region: 'Dhaka',
    potential: '12% market share increase',
    urgency: 'medium',
    createdAt: '2024-01-24',
  },
  {
    id: 3,
    type: 'seasonal',
    title: 'Ramadan Preparation Alert',
    description: 'Ramadan starts in 45 days. Historical data shows 80% increase in grocery demand. Stock up on dates, cooking oil, and rice.',
    region: 'All Bangladesh',
    potential: '৳15L seasonal revenue',
    urgency: 'high',
    createdAt: '2024-01-23',
  },
  {
    id: 4,
    type: 'competitor',
    title: 'Competitor Weakness in Rangpur',
    description: 'LocalMart facing supply issues in Rangpur. This is an opportunity to capture their 8% market share.',
    region: 'Rangpur',
    potential: '800+ new customers',
    urgency: 'high',
    createdAt: '2024-01-22',
  },
  {
    id: 5,
    type: 'expansion',
    title: 'Untapped Market in Barisal',
    description: 'Only 560 shops in Barisal with growing population. Low competition makes it ideal for expansion.',
    region: 'Barisal',
    potential: '৳80K monthly',
    urgency: 'medium',
    createdAt: '2024-01-20',
  },
];

// Ad Campaigns
export const mockCampaigns: AdCampaign[] = [
  {
    id: 1,
    name: 'Women Entrepreneur Spotlight',
    status: 'active',
    budget: 50000,
    spent: 32500,
    reach: 125000,
    conversions: 3200,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    targetRegions: ['Dhaka', 'Chittagong', 'Sylhet'],
    targetAudience: 'Urban consumers interested in handmade products',
  },
  {
    id: 2,
    name: 'Eid Special Offers',
    status: 'draft',
    budget: 100000,
    spent: 0,
    reach: 0,
    conversions: 0,
    startDate: '2024-03-01',
    endDate: '2024-04-10',
    targetRegions: ['All Bangladesh'],
    targetAudience: 'All demographics',
  },
  {
    id: 3,
    name: 'Medicine Authenticity Campaign',
    status: 'completed',
    budget: 30000,
    spent: 28500,
    reach: 89000,
    conversions: 1850,
    startDate: '2024-01-01',
    endDate: '2024-01-20',
    targetRegions: ['Dhaka', 'Rajshahi'],
    targetAudience: 'Health-conscious consumers',
  },
];

// Big Suppliers for Shopkeeper Ordering
export const bigSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'PRAN-RFL Group',
    type: 'manufacturer',
    products: ['Rice', 'Juices', 'Snacks', 'Dairy', 'Spices'],
    minOrder: 5000,
    deliveryTime: '2-3 days',
    rating: 4.8,
    verified: true,
    contact: '+880 1777-700700',
    priceList: [
      { name: 'PRAN Aromatic Rice 5kg', price: 365, unit: 'pack', minQty: 20, inStock: true },
      { name: 'PRAN Mango Juice 1L', price: 85, unit: 'bottle', minQty: 48, inStock: true },
      { name: 'PRAN Chanachur 150g', price: 35, unit: 'pack', minQty: 100, inStock: true },
      { name: 'PRAN UHT Milk 1L', price: 95, unit: 'pack', minQty: 24, inStock: false },
    ],
  },
  {
    id: 2,
    name: 'Square Pharmaceuticals',
    type: 'manufacturer',
    products: ['Medicines', 'Vitamins', 'Healthcare'],
    minOrder: 10000,
    deliveryTime: '3-5 days',
    rating: 4.9,
    verified: true,
    contact: '+880 2-8432231',
    priceList: [
      { name: 'Ace 500mg (100 tabs)', price: 180, unit: 'strip', minQty: 50, inStock: true },
      { name: 'Seclo 20mg (14 caps)', price: 140, unit: 'strip', minQty: 50, inStock: true },
      { name: 'Neuro-B (30 tabs)', price: 220, unit: 'pack', minQty: 30, inStock: true },
    ],
  },
  {
    id: 3,
    name: 'Meghna Group (Fresh)',
    type: 'manufacturer',
    products: ['Cooking Oil', 'Salt', 'Flour', 'Sugar'],
    minOrder: 8000,
    deliveryTime: '2-4 days',
    rating: 4.7,
    verified: true,
    contact: '+880 2-9885566',
    priceList: [
      { name: 'Fresh Soyabean Oil 5L', price: 890, unit: 'bottle', minQty: 12, inStock: true },
      { name: 'Fresh Salt 1kg', price: 35, unit: 'pack', minQty: 50, inStock: true },
      { name: 'Fresh Atta 2kg', price: 95, unit: 'pack', minQty: 30, inStock: true },
    ],
  },
  {
    id: 4,
    name: 'ACI Limited',
    type: 'manufacturer',
    products: ['Salt', 'Flour', 'Spices', 'Consumer goods'],
    minOrder: 6000,
    deliveryTime: '3-4 days',
    rating: 4.6,
    verified: true,
    contact: '+880 2-8878787',
    priceList: [
      { name: 'ACI Pure Salt 1kg', price: 32, unit: 'pack', minQty: 100, inStock: true },
      { name: 'ACI Aerosol 300ml', price: 180, unit: 'can', minQty: 24, inStock: true },
    ],
  },
  {
    id: 5,
    name: 'Unilever Bangladesh',
    type: 'distributor',
    products: ['Soap', 'Shampoo', 'Detergent', 'Personal Care'],
    minOrder: 15000,
    deliveryTime: '4-5 days',
    rating: 4.8,
    verified: true,
    contact: '+880 2-8834567',
    priceList: [
      { name: 'Lux Soap 100g (6 pack)', price: 240, unit: 'pack', minQty: 20, inStock: true },
      { name: 'Sunsilk Shampoo 180ml', price: 145, unit: 'bottle', minQty: 24, inStock: true },
      { name: 'Wheel Detergent 1kg', price: 85, unit: 'pack', minQty: 50, inStock: true },
    ],
  },
];

// Brand Special Deals - flows to Shopkeeper and Customer dashboards
export const brandDeals: BrandDeal[] = [
  {
    id: 1,
    brandName: 'PRAN-RFL',
    productName: 'PRAN Aromatic Rice 5kg',
    originalPrice: 385,
    discountedPrice: 345,
    discountPercent: 10,
    validFrom: '2024-01-20',
    validUntil: '2024-02-20',
    minQuantity: 5,
    maxQuantity: 100,
    regions: ['Dhaka', 'Chittagong', 'Sylhet'],
    status: 'active',
    description: 'Special winter discount on premium aromatic rice',
    termsConditions: ['Valid for registered shopkeepers only', 'Cannot combine with other offers'],
  },
  {
    id: 2,
    brandName: 'Meghna Fresh',
    productName: 'Fresh Soyabean Oil 5L',
    originalPrice: 920,
    discountedPrice: 780,
    discountPercent: 15,
    validFrom: '2024-01-25',
    validUntil: '2024-02-10',
    minQuantity: 10,
    maxQuantity: 50,
    regions: ['All Bangladesh'],
    status: 'active',
    description: 'Pre-Ramadan special offer on cooking oil',
    termsConditions: ['Limited stock available', 'First come first served'],
  },
  {
    id: 3,
    brandName: 'Square Pharma',
    productName: 'Ace 500mg (100 tabs)',
    originalPrice: 200,
    discountedPrice: 165,
    discountPercent: 17,
    validFrom: '2024-01-15',
    validUntil: '2024-02-28',
    minQuantity: 20,
    maxQuantity: 200,
    regions: ['Dhaka', 'Rajshahi', 'Khulna'],
    status: 'active',
    description: 'Healthcare accessibility discount',
    termsConditions: ['For licensed pharmacies only', 'Valid prescription required for resale'],
  },
  {
    id: 4,
    brandName: 'Unilever',
    productName: 'Lux Soap 100g (6 pack)',
    originalPrice: 280,
    discountedPrice: 220,
    discountPercent: 21,
    validFrom: '2024-02-01',
    validUntil: '2024-02-28',
    minQuantity: 15,
    maxQuantity: 100,
    regions: ['All Bangladesh'],
    status: 'upcoming',
    description: 'February beauty month special',
    termsConditions: ['Bulk purchase required', 'Free display stand with 50+ units'],
  },
  {
    id: 5,
    brandName: 'ACI',
    productName: 'ACI Pure Salt 1kg',
    originalPrice: 38,
    discountedPrice: 28,
    discountPercent: 26,
    validFrom: '2024-01-10',
    validUntil: '2024-01-30',
    minQuantity: 50,
    maxQuantity: 500,
    regions: ['Rangpur', 'Mymensingh', 'Barisal'],
    status: 'active',
    description: 'Rural market expansion offer',
    termsConditions: ['Only for rural shopkeepers', 'Free delivery above 200 units'],
  },
  {
    id: 6,
    brandName: 'Beximco Pharma',
    productName: 'Napa Extra (100 tabs)',
    originalPrice: 150,
    discountedPrice: 120,
    discountPercent: 20,
    validFrom: '2024-01-22',
    validUntil: '2024-02-22',
    minQuantity: 30,
    maxQuantity: 150,
    regions: ['Chittagong', 'Sylhet'],
    status: 'active',
    description: 'Winter health campaign discount',
    termsConditions: ['DGDA licensed stores only'],
  },
];
