export interface Donation {
  id: number;
  type: "food" | "cloth" | "event" | "education" | "medical";
  title: string;
  description: string;
  donorName: string;
  donorPhone: string;
  donorAddress: string;
  lat: number;
  lng: number;
  quantity: string;
  expiryDate?: string;
  condition?: string;
  eventDate?: string;
  eventTime?: string;
  isAvailable: boolean;
  postedDate: string;
  tags: string[];
}
