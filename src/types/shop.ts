export interface Shop {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  isOpen: boolean;
  isWomenLed: boolean;
  products: string[];
  availability: string;
  
  // Contact & Basic Info
  phone: string;
  address: string;
  ownerName: string;
  ownerPhoto?: string;
  
  // Pricing & Import Info
  priceRange: "low" | "medium" | "high";
  importOrigins: ImportOrigin[];
  
  // Authenticity & Verification
  isVerified: boolean;
  authenticityScore: number; // 0-100
  verificationDetails: VerificationDetails;
  
  // Women Entrepreneur Details
  womenEntrepreneurDetails?: WomenEntrepreneurDetails;
  
  // Medicine Shop Specific
  medicineDetails?: MedicineDetails;
  
  // Reviews
  reviews: Review[];
  totalReviews: number;
  
  // Nearby Services
  nearbyTeachers?: NearbyTeacher[];
  
  // Real-time Data (ESP32)
  realtimeData?: RealtimeData;
}

export interface ImportOrigin {
  product: string;
  origin: string;
  supplier: string;
  isVerified: boolean;
}

export interface VerificationDetails {
  tradeLicense: boolean;
  taxRegistration: boolean;
  healthCertificate?: boolean;
  lastInspection?: string;
  certifications: string[];
}

export interface WomenEntrepreneurDetails {
  businessStartDate: string;
  skills: string[];
  productionCapacity: string;
  customOrderAvailable: boolean;
  priceList: PriceItem[];
  trainingReceived: string[];
  supportPrograms: string[];
}

export interface PriceItem {
  item: string;
  price: number;
  unit: string;
  productionTime?: string;
}

export interface MedicineDetails {
  pharmacyLicense: string;
  pharmacistName: string;
  pharmacistRegistration: string;
  suppliers: MedicineSupplier[];
  coldStorageAvailable: boolean;
  emergencyAvailable: boolean;
}

export interface MedicineSupplier {
  name: string;
  type: "pharmaceutical" | "local" | "government";
  isAuthorized: boolean;
  products: string[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface NearbyTeacher {
  id: number;
  name: string;
  school: string;
  subject: string;
  distance: string;
  available: boolean;
  phone?: string;
}

export interface RealtimeData {
  lastUpdate: string;
  temperature?: number;
  humidity?: number;
  customerCount?: number;
  stockAlerts?: string[];
  deviceStatus: "online" | "offline";
}
