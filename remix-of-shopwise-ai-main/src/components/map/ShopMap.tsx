import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Store, Pill, Sparkles, Shirt, Heart } from 'lucide-react';
import { renderToString } from 'react-dom/server';

interface Shop {
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
}

interface ShopMapProps {
  shops: Shop[];
  selectedRadius: number;
  onShopSelect?: (shop: Shop) => void;
  center?: [number, number];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'grocery': return Store;
    case 'medicine': return Pill;
    case 'cosmetics': return Sparkles;
    case 'clothing': return Shirt;
    case 'handmade': return Heart;
    default: return Store;
  }
};

const createMarkerIcon = (category: string, isWomenLed: boolean) => {
  const IconComponent = getCategoryIcon(category);
  const bgColor = isWomenLed ? 'hsl(16, 85%, 60%)' : 'hsl(152, 55%, 42%)';
  
  const iconHtml = `
    <div style="
      width: 40px;
      height: 40px;
      background: ${bgColor};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      border: 3px solid white;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${category === 'grocery' ? '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>' : ''}
        ${category === 'medicine' ? '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>' : ''}
        ${category === 'cosmetics' ? '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>' : ''}
        ${category === 'clothing' ? '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"/>' : ''}
        ${category === 'handmade' ? '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' : ''}
      </svg>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const createUserLocationIcon = () => {
  const iconHtml = `
    <div style="
      width: 48px;
      height: 48px;
      background: hsl(185, 60%, 35%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 4px solid white;
      animation: pulse 2s infinite;
    ">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    </div>
    <style>
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 hsla(185, 60%, 35%, 0.7); }
        70% { box-shadow: 0 0 0 20px hsla(185, 60%, 35%, 0); }
        100% { box-shadow: 0 0 0 0 hsla(185, 60%, 35%, 0); }
      }
    </style>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'user-location-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

const ShopMap = ({ shops, selectedRadius, onShopSelect, center = [23.8103, 90.4125] }: ShopMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const circleRef = useRef<L.Circle | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>(center);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map
    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: false,
    }).setView(userLocation, 14);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Try to get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 14);
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Keep default Dhaka location
        }
      );
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update user location marker and radius circle
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old circle
    if (circleRef.current) {
      circleRef.current.remove();
    }

    // Add radius circle
    circleRef.current = L.circle(userLocation, {
      radius: selectedRadius * 1000,
      color: 'hsl(152, 55%, 42%)',
      fillColor: 'hsl(152, 55%, 42%)',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '10, 10',
    }).addTo(mapInstanceRef.current);

    // Add user location marker
    const userMarker = L.marker(userLocation, {
      icon: createUserLocationIcon(),
    }).addTo(mapInstanceRef.current);

    return () => {
      userMarker.remove();
    };
  }, [userLocation, selectedRadius]);

  // Update shop markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    shops.forEach((shop) => {
      const marker = L.marker([shop.lat, shop.lng], {
        icon: createMarkerIcon(shop.category, shop.isWomenLed),
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; padding: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <h3 style="font-weight: 600; font-size: 14px; margin: 0;">${shop.name}</h3>
            ${shop.isWomenLed ? '<span style="background: hsl(16, 85%, 60%); color: white; font-size: 10px; padding: 2px 6px; border-radius: 9999px;">Women-Led</span>' : ''}
          </div>
          <div style="display: flex; gap: 12px; font-size: 12px; color: #666; margin-bottom: 8px;">
            <span>⭐ ${shop.rating}</span>
            <span style="color: ${shop.isOpen ? 'hsl(152, 55%, 42%)' : 'hsl(0, 84%, 60%)'}">
              ${shop.isOpen ? '🟢 Open' : '🔴 Closed'}
            </span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
            ${shop.products.slice(0, 3).map(p => `<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 11px;">${p}</span>`).join('')}
          </div>
          <div style="font-size: 11px; color: hsl(152, 55%, 42%); font-weight: 500;">
            ${shop.availability}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        if (onShopSelect) {
          onShopSelect(shop);
        }
      });

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [shops, onShopSelect]);

  // Fit bounds when radius changes
  useEffect(() => {
    if (!mapInstanceRef.current || !circleRef.current) return;
    mapInstanceRef.current.fitBounds(circleRef.current.getBounds(), {
      padding: [50, 50],
    });
  }, [selectedRadius]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
  );
};

export default ShopMap;
