import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Division, womenEntrepreneurs } from '@/data/bangladeshData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Store, Heart } from 'lucide-react';

interface BangladeshMapProps {
  divisions: Division[];
  onDivisionSelect?: (division: Division) => void;
  showWomenEntrepreneurs?: boolean;
}

const createDivisionMarker = (division: Division) => {
  const size = Math.min(60, Math.max(30, division.shops / 50));
  
  const iconHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, hsl(152, 55%, 42%) 0%, hsl(185, 60%, 35%) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      border: 3px solid white;
      cursor: pointer;
      transition: transform 0.2s;
    ">
      <span style="color: white; font-weight: bold; font-size: ${size / 3}px;">
        ${(division.shops / 1000).toFixed(1)}k
      </span>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'division-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const createWomenMarker = () => {
  const iconHtml = `
    <div style="
      width: 32px;
      height: 32px;
      background: hsl(16, 85%, 60%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
      border: 2px solid white;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'women-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const BangladeshMap = ({ divisions, onDivisionSelect, showWomenEntrepreneurs = true }: BangladeshMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [hoveredWoman, setHoveredWoman] = useState<typeof womenEntrepreneurs[0] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center of Bangladesh
    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([23.8103, 90.4125], 7);

    L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 12,
      minZoom: 6,
    }).addTo(mapInstanceRef.current);

    // Add division markers
    divisions.forEach((division) => {
      const marker = L.marker([division.lat, division.lng], {
        icon: createDivisionMarker(division),
      });

      const popupContent = `
        <div style="min-width: 200px; padding: 8px;">
          <h3 style="font-weight: 700; font-size: 16px; margin: 0 0 8px 0;">${division.name}</h3>
          <div style="display: grid; gap: 6px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Shops:</span>
              <span style="font-weight: 600;">${division.shops.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Sales:</span>
              <span style="font-weight: 600;">৳${(division.sales / 100000).toFixed(1)}L</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Growth:</span>
              <span style="font-weight: 600; color: hsl(152, 55%, 42%);">+${division.growth}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Women-Led:</span>
              <span style="font-weight: 600; color: hsl(16, 85%, 60%);">${division.womenLed}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedDivision(division);
        if (onDivisionSelect) onDivisionSelect(division);
      });

      marker.addTo(mapInstanceRef.current!);
    });

    // Add women entrepreneur markers if enabled
    if (showWomenEntrepreneurs) {
      womenEntrepreneurs.forEach((woman) => {
        const marker = L.marker([woman.lat, woman.lng], {
          icon: createWomenMarker(),
        });

        const popupContent = `
          <div style="min-width: 180px; padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="background: hsl(16, 85%, 60%); color: white; font-size: 10px; padding: 2px 8px; border-radius: 9999px;">Women-Led</span>
            </div>
            <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0;">${woman.name}</h3>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${woman.business} • ${woman.division}</div>
            <div style="display: grid; gap: 4px; font-size: 12px;">
              <div>Employees: <strong>${woman.employees}</strong></div>
              <div>Revenue: <strong>৳${(woman.revenue / 1000).toFixed(0)}K/month</strong></div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(mapInstanceRef.current!);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [divisions, showWomenEntrepreneurs, onDivisionSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
      
      {/* Legend */}
      <Card className="absolute bottom-4 left-4 p-3 z-[1000] bg-card/95 backdrop-blur-sm">
        <div className="text-sm font-medium mb-2">Legend</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Store className="w-3 h-3 text-white" />
            </div>
            <span className="text-muted-foreground">Division (shop count)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <span className="text-muted-foreground">Women Entrepreneur</span>
          </div>
        </div>
      </Card>

      {/* Stats Overlay */}
      <Card className="absolute top-4 right-4 p-3 z-[1000] bg-card/95 backdrop-blur-sm">
        <div className="text-lg font-bold text-foreground">
          {divisions.reduce((acc, d) => acc + d.shops, 0).toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Total Shops in BD</div>
        <div className="mt-2 pt-2 border-t border-border flex items-center gap-2">
          <Heart className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">
            {divisions.reduce((acc, d) => acc + d.womenLed, 0).toLocaleString()} Women-Led
          </span>
        </div>
      </Card>
    </div>
  );
};

export default BangladeshMap;
