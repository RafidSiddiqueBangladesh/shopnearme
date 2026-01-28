import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Store, 
  Pill, 
  Sparkles, 
  Shirt,
  Heart,
  Navigation,
  Star,
  Clock,
  ArrowLeft,
  HandHeart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SettingsDropdown from "@/components/common/SettingsDropdown";
import ShopMap from "@/components/map/ShopMap";
import ShopDetailModal from "@/components/dashboard/ShopDetailModal";
import CustomerDeals from "@/components/dashboard/CustomerDeals";
import DonationList from "@/components/dashboard/DonationList";
import { mockShops } from "@/data/mockShops";
import { Shop } from "@/types/shop";

const categories = [
  { id: "all", nameKey: "category.all", icon: Store },
  { id: "grocery", nameKey: "category.grocery", icon: Store },
  { id: "medicine", nameKey: "category.medicine", icon: Pill },
  { id: "cosmetics", nameKey: "category.cosmetics", icon: Sparkles },
  { id: "clothing", nameKey: "category.clothing", icon: Shirt },
  { id: "handmade", nameKey: "category.handmade", icon: Heart },
  { id: "donation", nameKey: "category.donation", icon: HandHeart },
];

const radiusOptions = [1, 3, 5, 10];

const Dashboard = () => {
  const [selectedRadius, setSelectedRadius] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDonations, setShowDonations] = useState(false);
  const { t, language } = useLanguage();

  const filteredShops = mockShops.filter((shop) => {
    if (selectedCategory === "donation") return false; // Donation is a separate view
    if (selectedCategory !== "all" && shop.category !== selectedCategory) return false;
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "donation") {
      setShowDonations(true);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-display font-bold text-lg">ShopSync</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SettingsDropdown />
              <Button variant="outline" size="sm">
                {t('common.login')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)]">
        {/* Left Panel - Filters & List */}
        <div className="w-full lg:w-[400px] border-r border-border bg-card flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('dashboard.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Radius Selection */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t('common.radius')}</span>
            </div>
            <div className="flex gap-2">
              {radiusOptions.map((radius) => (
                <button
                  key={radius}
                  onClick={() => setSelectedRadius(radius)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    selectedRadius === radius
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {radius} km
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t('common.category')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    category.id === "donation"
                      ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/50"
                      : selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.id === "donation" ? "Donation" : t(category.nameKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Shop List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-sm text-muted-foreground mb-2">
              {filteredShops.length} {language === 'bn' ? 'দোকান পাওয়া গেছে' : 'shops found'} ({selectedRadius}km)
            </div>
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="bg-background rounded-xl p-4 border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {shop.name}
                      </h3>
                      {shop.isWomenLed && (
                        <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 text-xs rounded-full font-medium">
                          {t('dashboard.womenLed')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        {shop.rating}
                      </span>
                      <span className={`flex items-center gap-1 ${shop.isOpen ? "text-primary" : "text-destructive"}`}>
                        <Clock className="w-3 h-3" />
                        {shop.isOpen ? t('common.open') : t('common.closed')}
                      </span>
                    </div>
                  </div>
                  {shop.isVerified && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {shop.products.slice(0, 3).map((product) => (
                    <span key={product} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      {product}
                    </span>
                  ))}
                  {shop.products.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{shop.products.length - 3}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">
                    {shop.availability}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Tap for details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 relative">
          <ShopMap 
            shops={filteredShops} 
            selectedRadius={selectedRadius}
          />

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 bg-card rounded-xl p-4 shadow-lg border border-border z-[1000]">
            <div className="text-sm font-medium mb-2">{t('dashboard.legend')}</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="text-muted-foreground">{t('dashboard.regularShop')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="text-muted-foreground">{t('dashboard.womenLed')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent" />
                <span className="text-muted-foreground">{t('dashboard.yourLocation')}</span>
              </div>
            </div>
          </div>

          {/* Stats Overlay */}
          <div className="absolute top-6 right-6 bg-card rounded-xl p-4 shadow-lg border border-border z-[1000]">
            <div className="text-2xl font-bold text-foreground">{filteredShops.length}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'bn' 
                ? `${selectedRadius} কিমি এর মধ্যে দোকান` 
                : `Shops within ${selectedRadius}km`
              }
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="text-sm text-secondary font-medium">
                {filteredShops.filter(s => s.isWomenLed).length} {t('dashboard.womenLed')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <div className="container mx-auto px-4 pb-6">
        <CustomerDeals userDivision="Dhaka" />
      </div>

      {/* Shop Detail Modal */}
      <ShopDetailModal 
        shop={selectedShop}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Donation List Modal */}
      <DonationList 
        isOpen={showDonations}
        onClose={() => setShowDonations(false)}
      />
    </div>
  );
};

export default Dashboard;
