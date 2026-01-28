import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Package, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  ShoppingCart,
  BarChart3,
  Smartphone,
  Banknote,
  RefreshCw,
  Bell,
  Thermometer,
  Droplets,
  Users,
  Wifi,
  WifiOff,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SettingsDropdown from "@/components/common/SettingsDropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import CustomerDuesTracker from "@/components/shopkeeper/CustomerDuesTracker";
import SupplierOrdering from "@/components/shopkeeper/SupplierOrdering";
import AvailableDeals from "@/components/shopkeeper/AvailableDeals";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const salesData = [
  { day: 'Sat', sales: 4500 },
  { day: 'Sun', sales: 5200 },
  { day: 'Mon', sales: 3800 },
  { day: 'Tue', sales: 4100 },
  { day: 'Wed', sales: 6200 },
  { day: 'Thu', sales: 5800 },
  { day: 'Fri', sales: 7200 },
];

const paymentData = [
  { name: 'Cash', value: 65, color: 'hsl(152, 55%, 42%)' },
  { name: 'bKash', value: 25, color: 'hsl(16, 85%, 60%)' },
  { name: 'Nagad', value: 10, color: 'hsl(185, 60%, 35%)' },
];

const lowStockItems = [
  { name: 'Rice (5kg)', current: 5, reorder: 20, urgent: true },
  { name: 'Cooking Oil', current: 8, reorder: 15, urgent: true },
  { name: 'Sugar', current: 12, reorder: 25, urgent: false },
  { name: 'Salt', current: 18, reorder: 30, urgent: false },
];

const expiryAlerts = [
  { name: 'Paracetamol 500mg', expiry: '2024-02-15', days: 5, quantity: 50 },
  { name: 'Vitamin C', expiry: '2024-02-20', days: 10, quantity: 30 },
  { name: 'Cough Syrup', expiry: '2024-03-01', days: 20, quantity: 15 },
];

const bestSelling = [
  { name: 'Rice (5kg)', sold: 156, trend: 12 },
  { name: 'Cooking Oil', sold: 89, trend: 8 },
  { name: 'Milk', sold: 245, trend: -3 },
  { name: 'Bread', sold: 178, trend: 15 },
];

// Mock ESP32 real-time data
const realtimeData = {
  temperature: 24.5,
  humidity: 65,
  customerCount: 12,
  deviceStatus: 'online' as const,
  lastUpdate: '2 mins ago',
};

const ShopkeeperDashboard = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [orderConfirmation, setOrderConfirmation] = useState<{
    open: boolean;
    product: string;
    quantity: number;
    supplier: string;
  }>({ open: false, product: '', quantity: 0, supplier: '' });

  const handleQuickOrder = (product: string, quantity: number, supplier: string) => {
    setOrderConfirmation({ open: true, product, quantity, supplier });
    toast({
      title: "Order Placed Successfully! ✓",
      description: `${quantity} units of ${product} ordered from ${supplier}`,
    });
  };

  const stats = {
    todaySales: 7250,
    weeklySales: 42500,
    monthlySales: 185000,
    profit: 28500,
    dueAmount: 12800,
    totalItems: 1256,
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
                <span className="font-display font-bold text-lg">{t('shopkeeper.title')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <SettingsDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* ESP32 Real-time Data Banner */}
        <Card className={`border-2 ${realtimeData.deviceStatus === 'online' ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {realtimeData.deviceStatus === 'online' ? (
                  <Wifi className="w-5 h-5 text-primary animate-pulse" />
                ) : (
                  <WifiOff className="w-5 h-5 text-destructive" />
                )}
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    Live Shop Data
                    <Badge variant={realtimeData.deviceStatus === 'online' ? 'default' : 'destructive'}>
                      {realtimeData.deviceStatus === 'online' ? 'ESP32 Connected' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Last updated: {realtimeData.lastUpdate}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-secondary" />
                  <span className="font-medium">{realtimeData.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-accent" />
                  <span className="font-medium">{realtimeData.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{realtimeData.customerCount} in store</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.todaySales')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{stats.todaySales.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.weeklySales')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{stats.weeklySales.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.monthlySales')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{stats.monthlySales.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.profit')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{stats.profit.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.dueAmount')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{stats.dueAmount.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Package className="w-4 h-4" />
                <span className="text-xs font-medium">{t('shopkeeper.inventory')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.totalItems}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t('shopkeeper.weeklySales')}</CardTitle>
                <div className="flex gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        period === p
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="sales" fill="hsl(152, 55%, 42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {paymentData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brand Deals & Supplier Ordering */}
        <div className="grid md:grid-cols-2 gap-6">
          <AvailableDeals />
          <SupplierOrdering />
        </div>

        {/* Customer Dues */}
        <CustomerDuesTracker />

        {/* Alerts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Low Stock Alerts */}
          <Card className="border-destructive/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                {t('shopkeeper.lowStock')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Current: {item.current} | Reorder at: {item.reorder}
                      </div>
                    </div>
                    {item.urgent && (
                      <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t('shopkeeper.orderProducts')}
              </Button>
            </CardContent>
          </Card>

          {/* Expiry Alerts */}
          <Card className="border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-600">
                <Clock className="w-5 h-5" />
                {t('shopkeeper.expiryAlerts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiryAlerts.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Expires: {item.expiry} | Qty: {item.quantity}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.days <= 7 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {item.days} days
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Best Selling & AI Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Best Selling */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t('shopkeeper.bestSelling')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bestSelling.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Sold: {item.sold} units</div>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-sm font-medium ${
                      item.trend > 0 ? 'text-green-600' : 'text-destructive'
                    }`}>
                      {item.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(item.trend)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Reorder Suggestions */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <RefreshCw className="w-5 h-5" />
                {t('shopkeeper.reorderSuggestions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="font-medium text-foreground mb-1">Rice (5kg) - PRAN</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Based on your sales pattern, you'll run out in 2 days.
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Order 50 units</span>
                    <Button 
                      size="sm" 
                      className="h-7"
                      onClick={() => handleQuickOrder('Rice (5kg)', 50, 'PRAN')}
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="font-medium text-foreground mb-1">Cooking Oil - Meghna Fresh</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Weekend demand expected. Stock up now.
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Order 30 units</span>
                    <Button 
                      size="sm" 
                      className="h-7"
                      onClick={() => handleQuickOrder('Cooking Oil', 30, 'Meghna Fresh')}
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={orderConfirmation.open} onOpenChange={(open) => setOrderConfirmation(prev => ({ ...prev, open }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <CheckCircle className="w-6 h-6" />
              Order Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your order has been placed successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product:</span>
              <span className="font-medium">{orderConfirmation.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">{orderConfirmation.quantity} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Supplier:</span>
              <span className="font-medium">{orderConfirmation.supplier}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-muted-foreground">Status:</span>
              <Badge className="bg-primary/20 text-primary border-primary/30">Processing</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Delivery:</span>
              <span className="font-medium">24-48 hours</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => setOrderConfirmation(prev => ({ ...prev, open: false }))}>
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopkeeperDashboard;
