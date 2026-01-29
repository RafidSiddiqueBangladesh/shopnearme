import { useState, useEffect } from "react";
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
  CheckCircle,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Glass Card Component
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl ${className}`}>
    {children}
  </div>
);

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
  
  // Transaction form states
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('sell');
  const [paymentType, setPaymentType] = useState<'cash' | 'due'>('cash');
  const [entityId, setEntityId] = useState('00');
  const [amount, setAmount] = useState('');
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  
  // Realtime data states
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [isLoadingRealtime, setIsLoadingRealtime] = useState(false);
  const [realtimeTotalSells, setRealtimeTotalSells] = useState(7250);
  const [realtimeTotalBuys, setRealtimeTotalBuys] = useState(4500);
  const [lastRealtimeUpdate, setLastRealtimeUpdate] = useState<Date | null>(null);
  const API_BASE_URL = 'https://fastworking.onrender.com';

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sells`, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (error) {
        setApiStatus('offline');
      }
    };
    checkApiStatus();
  }, []);

  const fetchRealtimeData = async () => {
    setIsLoadingRealtime(true);
    setApiStatus('checking');
    try {
      const [sellsRes, buysRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/sells`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'omit'
        }),
        fetch(`${API_BASE_URL}/api/buys`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'omit'
        })
      ]);

      if (sellsRes.ok && buysRes.ok) {
        const sellsData = await sellsRes.json();
        const buysData = await buysRes.json();
        
        setRealtimeTotalSells(sellsData.total_sells || 7250);
        setRealtimeTotalBuys(buysData.total_buys || 4500);
        setApiStatus('online');
        setLastRealtimeUpdate(new Date());
        
        toast({
          title: "Data Synced! ✓",
          description: `Sales: ৳${sellsData.total_sells || 0} | Buys: ৳${buysData.total_buys || 0}`,
        });
      } else {
        const errorSells = await sellsRes.text();
        const errorBuys = await buysRes.text();
        console.error('Sell response:', errorSells);
        console.error('Buy response:', errorBuys);
        
        setApiStatus('offline');
        toast({
          title: "Sync Failed",
          description: `Server response: ${sellsRes.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setApiStatus('offline');
      toast({
        title: "Connection Error",
        description: `${error instanceof Error ? error.message : 'Unable to connect to API'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoadingRealtime(false);
    }
  };

  // Function to send transaction data to API
  const sendTransactionToAPI = async (transactionData: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({ data: transactionData })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Transaction Sent! ✓",
          description: `Data: ${transactionData} recorded successfully`,
        });
        // Refresh data after sending
        setTimeout(fetchRealtimeData, 1000);
        return true;
      } else {
        const error = await response.text();
        console.error('Transaction error:', error);
        toast({
          title: "Transaction Failed",
          description: `Server response: ${response.status}`,
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Send transaction error:', error);
      toast({
        title: "Send Failed",
        description: `${error instanceof Error ? error.message : 'Unable to send transaction'}`,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSendTransaction = async () => {
    if (!amount || isNaN(parseInt(amount))) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsSendingTransaction(true);
    
    // Format: *1 for sell cash, #1 for buy cash, etc
    // First char: * for sell, # for buy
    // Second char: 1 for cash, 0 for due
    // Next 2 chars: entity/product id
    // Rest: amount
    const prefix = transactionType === 'sell' ? '*' : '#';
    const paymentChar = paymentType === 'cash' ? '1' : '0';
    const transactionData = `${prefix}${paymentChar}${entityId}${amount}`;
    
    const success = await sendTransactionToAPI(transactionData);
    
    if (success) {
      setAmount('');
      setEntityId('00');
    }
    setIsSendingTransaction(false);
  };

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

        {/* Tabs Section */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="realtime">Real-time Data</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-4 space-y-6">

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
          </TabsContent>

          {/* Realtime Data Tab */}
          <TabsContent value="realtime" className="mt-4 space-y-6">
            {/* Hero API Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-6 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 ${apiStatus === 'online' ? 'bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/10' : apiStatus === 'offline' ? 'bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/10' : 'bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/10'}`} />
                
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      animate={apiStatus === 'checking' || isLoadingRealtime ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className={`p-4 rounded-2xl shadow-lg ${apiStatus === 'online' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : apiStatus === 'offline' ? 'bg-gradient-to-br from-red-500 to-orange-600' : 'bg-gradient-to-br from-yellow-500 to-amber-600'}`}
                    >
                      <Activity className="h-8 w-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">IoT Backend Server</h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {API_BASE_URL}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`${apiStatus === 'online' ? 'border-green-500 text-green-500 bg-green-500/10' : apiStatus === 'offline' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'}`}
                        >
                          <span className={`w-2 h-2 rounded-full mr-2 ${apiStatus === 'online' ? 'bg-green-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'} ${(apiStatus === 'checking' || isLoadingRealtime) ? 'animate-pulse' : ''}`} />
                          {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Disconnected' : 'Connecting...'}
                        </Badge>
                        {isLoadingRealtime && (
                          <Badge variant="secondary" className="animate-pulse">
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Fetching (10-20s)...
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {lastRealtimeUpdate && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last sync: {lastRealtimeUpdate.toLocaleTimeString()}
                      </div>
                    )}
                    <Button 
                      onClick={fetchRealtimeData} 
                      disabled={isLoadingRealtime}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingRealtime ? 'animate-spin' : ''}`} />
                      {isLoadingRealtime ? 'Syncing...' : 'Sync Now'}
                    </Button>
                  </div>
                </div>

                {/* Loading Progress Bar */}
                {isLoadingRealtime && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <Wifi className="h-4 w-4 animate-pulse" />
                      <span>Fetching data from Render server (cold start may take 10-20 seconds)...</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>

            {/* Live Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Sells Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassCard className="p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/10" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Today's Total Sells</p>
                        <p className="text-xs text-green-600/70">Live from /api/sells</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {isLoadingRealtime ? (
                      <div className="space-y-3">
                        <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
                        <div className="flex gap-2">
                          <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
                          <div className="h-4 w-16 bg-muted/50 rounded animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.p 
                          key={realtimeTotalSells}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"
                        >
                          ৳{realtimeTotalSells.toLocaleString()}
                        </motion.p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="border-green-500/50 text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Sales Revenue
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Total Buys Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard className="p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/10" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Today's Total Buys</p>
                        <p className="text-xs text-blue-600/70">Live from /api/buys</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                        <TrendingDown className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {isLoadingRealtime ? (
                      <div className="space-y-3">
                        <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
                        <div className="flex gap-2">
                          <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
                          <div className="h-4 w-16 bg-muted/50 rounded animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.p 
                          key={realtimeTotalBuys}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"
                        >
                          ৳{realtimeTotalBuys.toLocaleString()}
                        </motion.p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="border-blue-500/50 text-blue-600">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Purchase Expense
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Send Transaction Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Send Transaction from Website</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Transaction Type */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Transaction Type</label>
                    <div className="flex gap-2">
                      <Button
                        variant={transactionType === 'sell' ? 'default' : 'outline'}
                        onClick={() => setTransactionType('sell')}
                        className="flex-1"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Sell
                      </Button>
                      <Button
                        variant={transactionType === 'buy' ? 'default' : 'outline'}
                        onClick={() => setTransactionType('buy')}
                        className="flex-1"
                      >
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Buy
                      </Button>
                    </div>
                  </div>

                  {/* Payment Type */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Payment</label>
                    <div className="flex gap-2">
                      <Button
                        variant={paymentType === 'cash' ? 'default' : 'outline'}
                        onClick={() => setPaymentType('cash')}
                        className="flex-1"
                      >
                        <Banknote className="h-4 w-4 mr-2" />
                        Cash
                      </Button>
                      <Button
                        variant={paymentType === 'due' ? 'default' : 'outline'}
                        onClick={() => setPaymentType('due')}
                        className="flex-1"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Due
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Entity ID */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      {transactionType === 'sell' ? 'Customer ID' : 'Product ID'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        max="9"
                        value={entityId}
                        onChange={(e) => setEntityId(e.target.value.padStart(2, '0').slice(0, 2))}
                        placeholder="00-09"
                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {transactionType === 'sell' 
                        ? 'Customer: 00=Rahim, 01=Karim, ...' 
                        : 'Product: 01=Medribo, 02=Pran, ...'}
                    </p>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Amount (৳)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="300"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>

                  {/* Send Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleSendTransaction}
                      disabled={isSendingTransaction || !amount}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {isSendingTransaction ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Activity className="h-4 w-4 mr-2" />
                          Send Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Format Guide */}
                <div className="space-y-4">
                  {/* Format Explanation */}
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/20">
                    <p className="font-semibold text-sm text-foreground mb-2">📋 Data Format Guide</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-background px-2 py-1 rounded text-primary font-bold">{transactionType === 'sell' ? '#' : '*'}</span>
                        <span className="text-muted-foreground">Type: {transactionType === 'sell' ? '#=Sell' : '*=Buy'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-background px-2 py-1 rounded text-primary font-bold">{paymentType === 'cash' ? '1' : '0'}</span>
                        <span className="text-muted-foreground">Payment: {paymentType === 'cash' ? '1=Cash' : '0=Due'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-background px-2 py-1 rounded text-primary font-bold">{entityId}</span>
                        <span className="text-muted-foreground">{transactionType === 'sell' ? 'Customer ID' : 'Product ID'}: {entityId}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono bg-background px-2 py-1 rounded text-primary font-bold">{amount || '___'}</span>
                        <span className="text-muted-foreground">Amount: {amount ? amount + ' Taka' : 'Enter amount'}</span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-background rounded border border-border">
                      <p className="font-mono text-sm font-bold text-primary">
                        Final: {transactionType === 'sell' ? '#' : '*'}{paymentType === 'cash' ? '1' : '0'}{entityId}{amount || '___'}
                      </p>
                    </div>
                  </div>

                  {/* Reference Tables */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Customers for Sells */}
                    {transactionType === 'sell' && (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="font-semibold text-xs mb-2 text-foreground">👥 Customers (Sell)</p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {[
                            { id: '00', name: 'Rahim' },
                            { id: '01', name: 'Karim' },
                            { id: '02', name: 'Asif' },
                            { id: '03', name: 'Jamal' },
                            { id: '04', name: 'Nasir' },
                            { id: '05', name: 'Faruk' },
                            { id: '06', name: 'Salim' },
                            { id: '07', name: 'Rahat' },
                            { id: '08', name: 'Sakib' },
                            { id: '09', name: 'Tamim' },
                          ].map((cust) => (
                            <button
                              key={cust.id}
                              onClick={() => setEntityId(cust.id)}
                              className={`p-2 rounded text-xs transition-colors ${
                                entityId === cust.id
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-background border border-border hover:bg-muted'
                              }`}
                            >
                              {cust.id}: {cust.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products for Buys */}
                    {transactionType === 'buy' && (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="font-semibold text-xs mb-2 text-foreground">📦 Products (Buy)</p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {[
                            { id: '01', name: 'Medribo' },
                            { id: '02', name: 'Pran' },
                            { id: '03', name: 'Merico' },
                            { id: '04', name: 'Prans' },
                            { id: '05', name: 'Product5' },
                            { id: '06', name: 'Product6' },
                            { id: '07', name: 'Product7' },
                            { id: '08', name: 'Product8' },
                            { id: '09', name: 'Product9' },
                            { id: '10', name: 'Product10' },
                          ].map((prod) => (
                            <button
                              key={prod.id}
                              onClick={() => setEntityId(prod.id)}
                              className={`p-2 rounded text-xs transition-colors ${
                                entityId === prod.id
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-background border border-border hover:bg-muted'
                              }`}
                            >
                              {prod.id}: {prod.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Amount Examples */}
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <p className="font-semibold text-xs mb-2 text-foreground">⚡ Quick Amounts</p>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        {['100', '300', '500', '1000', '2000', '5000'].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`p-2 rounded transition-colors ${
                              amount === amt
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background border border-border hover:bg-muted'
                            }`}
                          >
                            ৳{amt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Example Transactions */}
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="font-semibold text-xs mb-2 text-foreground">✓ Example Transactions</p>
                    <div className="space-y-1 text-xs text-muted-foreground font-mono">
                      <p><span className="text-primary">#0013000</span> = Sell (due) to Karim (01) for 3000৳</p>
                      <p><span className="text-primary">*1021500</span> = Buy (cash) Pran (02) for 1500৳</p>
                      <p><span className="text-primary">#1005000</span> = Sell (cash) to Faruk (05) for 5000৳</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>
        </Tabs>
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
