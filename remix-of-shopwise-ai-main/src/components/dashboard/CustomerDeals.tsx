import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Tag, 
  Clock, 
  MapPin,
  Sparkles,
  ArrowRight,
  Store,
  Phone,
  User,
  Package,
  Star,
  CheckCircle
} from 'lucide-react';
import { brandDeals, BrandDeal } from '@/data/bangladeshData';
import { mockShops } from '@/data/mockShops';

interface CustomerDealsProps {
  userDivision?: string;
}

// Shopkeepers selling these deals
const dealShopkeepers: Record<number, {
  shopName: string;
  ownerName: string;
  ownerPhoto?: string;
  rating: number;
  phone: string;
  address: string;
  isVerified: boolean;
  isWomenLed: boolean;
  distance: string;
}[]> = {
  1: [ // PRAN Rice
    { shopName: 'Rahman Grocery Store', ownerName: 'Mohammad Rahman', rating: 4.5, phone: '+880 1712-345678', address: 'Uttara, Dhaka', isVerified: true, isWomenLed: false, distance: '1.2 km' },
    { shopName: 'Mirpur Fresh Market', ownerName: 'Jamal Hossain', rating: 4.4, phone: '+880 1715-123456', address: 'Mirpur-10, Dhaka', isVerified: true, isWomenLed: false, distance: '2.8 km' },
    { shopName: 'Zindabazar Grocery', ownerName: 'Abdul Matin', rating: 4.4, phone: '+880 1721-234567', address: 'Zindabazar, Sylhet', isVerified: true, isWomenLed: false, distance: '3.5 km' },
  ],
  2: [ // Meghna Oil
    { shopName: 'Mirpur Fresh Market', ownerName: 'Jamal Hossain', rating: 4.4, phone: '+880 1715-123456', address: 'Mirpur-10, Dhaka', isVerified: true, isWomenLed: false, distance: '2.8 km' },
    { shopName: 'Agrabad General Store', ownerName: 'Shamsul Alam', rating: 4.3, phone: '+880 1811-234567', address: 'Agrabad, Chittagong', isVerified: true, isWomenLed: false, distance: '4.2 km' },
  ],
  3: [ // Square Pharma
    { shopName: "Fatima's Medicine Shop", ownerName: 'Fatima Khatun', ownerPhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop', rating: 4.8, phone: '+880 1912-567890', address: 'Uttara, Dhaka', isVerified: true, isWomenLed: true, distance: '0.8 km' },
    { shopName: 'Dhanmondi Pharmacy Plus', ownerName: 'Dr. Rafiq Islam', rating: 4.7, phone: '+880 1819-876543', address: 'Dhanmondi, Dhaka', isVerified: true, isWomenLed: false, distance: '5.1 km' },
  ],
  5: [ // ACI Salt
    { shopName: 'Rangpur Potato Mart', ownerName: 'Sumon Chandra', rating: 4.3, phone: '+880 1741-567890', address: 'Rangpur City', isVerified: true, isWomenLed: false, distance: '1.5 km' },
    { shopName: 'Barisal Rice Traders', ownerName: 'Habibur Rahman', rating: 4.4, phone: '+880 1731-456789', address: 'Barisal', isVerified: true, isWomenLed: false, distance: '2.1 km' },
  ],
  6: [ // Beximco Pharma
    { shopName: "Fatima's Medicine Shop", ownerName: 'Fatima Khatun', ownerPhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop', rating: 4.8, phone: '+880 1912-567890', address: 'Uttara, Dhaka', isVerified: true, isWomenLed: true, distance: '0.8 km' },
    { shopName: 'Jamalpur Medicine Point', ownerName: 'Md. Sirajul Islam', rating: 4.4, phone: '+880 1781-901234', address: 'Jamalpur', isVerified: true, isWomenLed: false, distance: '3.2 km' },
  ],
};

const getShopkeepersForDeal = (dealId: number) => {
  return dealShopkeepers[dealId] || [
    { shopName: 'Local Shop', ownerName: 'Shop Owner', rating: 4.0, phone: '+880 1700-000000', address: 'Nearby', isVerified: false, isWomenLed: false, distance: '1 km' }
  ];
};

const CustomerDeals = ({ userDivision = 'Dhaka' }: CustomerDealsProps) => {
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<BrandDeal | null>(null);

  // Filter deals available in user's region
  const availableDeals = brandDeals.filter(deal => 
    deal.status === 'active' && 
    (deal.regions.includes('All Bangladesh') || deal.regions.includes(userDivision))
  );

  const getDaysRemaining = (validUntil: string) => {
    const end = new Date(validUntil);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };


  if (availableDeals.length === 0) {
    return null;
  }

  const DealCard = ({ deal, onClick }: { deal: BrandDeal; onClick?: () => void }) => {
    const daysRemaining = getDaysRemaining(deal.validUntil);
    return (
      <div 
        onClick={onClick}
        className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            {deal.discountPercent}% OFF
          </Badge>
        </div>
        
        <h4 className="font-medium mb-1">{deal.productName}</h4>
        <p className="text-xs text-muted-foreground mb-3">{deal.brandName}</p>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">৳{deal.discountedPrice}</span>
          <span className="line-through text-sm text-muted-foreground">৳{deal.originalPrice}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {daysRemaining > 0 ? (
              <span className={daysRemaining <= 3 ? 'text-destructive' : ''}>
                {daysRemaining} days left
              </span>
            ) : (
              <span className="text-destructive">Last day!</span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Cheaper Buy Button */}
      <Button 
        onClick={() => setShowAllDeals(true)}
        className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
        size="lg"
      >
        <Sparkles className="w-5 h-5" />
        Cheaper Buy
        <Badge variant="secondary" className="ml-1 bg-white/20 text-white border-0">
          {availableDeals.length}
        </Badge>
      </Button>

      {/* View All Deals Dialog */}
      <Dialog open={showAllDeals} onOpenChange={setShowAllDeals}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              All Available Deals
              <Badge variant="secondary" className="ml-2">
                {availableDeals.length} Deals
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(85vh-100px)]">
            <div className="p-6 space-y-6">
              {availableDeals.map((deal) => {
                const shopkeepers = getShopkeepersForDeal(deal.id);
                const daysRemaining = getDaysRemaining(deal.validUntil);
                
                return (
                  <div 
                    key={deal.id}
                    className="p-5 bg-card rounded-xl border border-border"
                  >
                    {/* Deal Header */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{deal.productName}</h3>
                          <p className="text-sm text-muted-foreground">{deal.brandName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-sm px-3">
                          {deal.discountPercent}% OFF
                        </Badge>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-2xl font-bold text-primary">৳{deal.discountedPrice}</span>
                          <span className="line-through text-sm text-muted-foreground">৳{deal.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Last day!'}
                      </span>
                      <span>•</span>
                      <span>Min: {deal.minQuantity} units</span>
                    </div>

                    {/* Shopkeepers Section */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Store className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Available at {shopkeepers.length} Shops Near You</span>
                      </div>
                      
                      <div className="space-y-3">
                        {shopkeepers.map((shop, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                            <div className="flex items-center gap-3">
                              {shop.ownerPhoto ? (
                                <img src={shop.ownerPhoto} alt={shop.ownerName} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{shop.shopName}</p>
                                  {shop.isWomenLed && (
                                    <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800">
                                      Women-Led
                                    </Badge>
                                  )}
                                  {shop.isVerified && (
                                    <CheckCircle className="w-3 h-3 text-primary" />
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {shop.ownerName}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    {shop.rating}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {shop.distance}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="h-8">
                                <Phone className="w-3 h-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" className="h-8">
                                Visit Shop
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Single Deal Detail Dialog */}
      <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDeal && (() => {
            const shopkeepers = getShopkeepersForDeal(selectedDeal.id);
            const daysRemaining = getDaysRemaining(selectedDeal.validUntil);
            
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    {selectedDeal.productName}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">৳{selectedDeal.discountedPrice}</span>
                    <span className="line-through text-lg text-muted-foreground">৳{selectedDeal.originalPrice}</span>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/30">
                      {selectedDeal.discountPercent}% OFF
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">{selectedDeal.description}</p>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Store className="w-4 h-4 text-primary" />
                      <span className="font-medium">Shopkeepers Selling This</span>
                    </div>
                    <div className="space-y-2">
                      {shopkeepers.map((shop, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-background rounded border">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{shop.shopName}</p>
                              <p className="text-xs text-muted-foreground">{shop.address} • {shop.distance}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {shop.rating}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg">
                      Order Now
                    </Button>
                    <Button variant="outline" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Shop
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerDeals;
