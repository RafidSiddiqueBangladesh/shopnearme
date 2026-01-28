import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp,
  MapPin,
  Store,
  Users,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Megaphone,
  Bell,
  Eye,
  Map,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SettingsDropdown from "@/components/common/SettingsDropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { bangladeshDivisions } from "@/data/bangladeshData";
import BangladeshMap from "@/components/brand/BangladeshMap";
import CustomerInsights from "@/components/brand/CustomerInsights";
import OpportunityAlerts from "@/components/brand/OpportunityAlerts";
import AdCampaignManager from "@/components/brand/AdCampaignManager";
import CompetitorAnalysis from "@/components/brand/CompetitorAnalysis";
import DealsManager from "@/components/brand/DealsManager";

const productPerformance = [
  { name: 'Product A', value: 35, color: 'hsl(152, 55%, 42%)' },
  { name: 'Product B', value: 28, color: 'hsl(16, 85%, 60%)' },
  { name: 'Product C', value: 22, color: 'hsl(185, 60%, 35%)' },
  { name: 'Others', value: 15, color: 'hsl(220, 13%, 70%)' },
];

const demandTrend = [
  { month: 'Jan', demand: 4000, supply: 3800 },
  { month: 'Feb', demand: 4500, supply: 4200 },
  { month: 'Mar', demand: 5200, supply: 4800 },
  { month: 'Apr', demand: 4800, supply: 5000 },
  { month: 'May', demand: 5500, supply: 5200 },
  { month: 'Jun', demand: 6200, supply: 5800 },
];

const BrandDashboard = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate stats from Bangladesh data
  const totalShops = bangladeshDivisions.reduce((acc, d) => acc + d.shops, 0);
  const totalSales = bangladeshDivisions.reduce((acc, d) => acc + d.sales, 0);
  const totalWomenLed = bangladeshDivisions.reduce((acc, d) => acc + d.womenLed, 0);
  const avgGrowth = bangladeshDivisions.reduce((acc, d) => acc + d.growth, 0) / bangladeshDivisions.length;

  const stats = {
    totalSales: totalSales,
    shopReach: totalShops,
    marketShare: 23.5,
    activeRegions: 8,
    monthlyGrowth: avgGrowth,
    womenLed: totalWomenLed,
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
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-sm">B</span>
                </div>
                <span className="font-display font-bold text-lg">{t('brand.title')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </Button>
              <SettingsDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Total Sales</span>
              </div>
              <div className="text-2xl font-bold text-foreground">৳{(stats.totalSales / 100000).toFixed(1)}L</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Store className="w-4 h-4" />
                <span className="text-xs font-medium">{t('brand.shopReach')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.shopReach.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <PieChartIcon className="w-4 h-4" />
                <span className="text-xs font-medium">Market Share</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.marketShare}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-medium">All Divisions</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.activeRegions}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Avg Growth</span>
              </div>
              <div className="text-2xl font-bold text-foreground">+{stats.monthlyGrowth.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border-pink-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-pink-600 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Women-Led</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.womenLed.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 h-auto gap-1">
            <TabsTrigger value="overview" className="gap-2 text-xs md:text-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2 text-xs md:text-sm">
              <Map className="w-4 h-4" />
              <span className="hidden md:inline">Bangladesh Map</span>
            </TabsTrigger>
            <TabsTrigger value="deals" className="gap-2 text-xs md:text-sm">
              <Tag className="w-4 h-4" />
              <span className="hidden md:inline">Deals</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2 text-xs md:text-sm">
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="gap-2 text-xs md:text-sm">
              <Target className="w-4 h-4" />
              <span className="hidden md:inline">Opportunities</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="gap-2 text-xs md:text-sm">
              <Megaphone className="w-4 h-4" />
              <span className="hidden md:inline">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="competitors" className="gap-2 text-xs md:text-sm">
              <Activity className="w-4 h-4" />
              <span className="hidden md:inline">Competitors</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Regional Performance */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {t('brand.regionalPerformance')}
                    </CardTitle>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveTab('map')}>
                      <Eye className="w-4 h-4" />
                      View Map
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bangladeshDivisions} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="sales" fill="hsl(16, 85%, 60%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Product Performance */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t('brand.productPerformance')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productPerformance}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {productPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {productPerformance.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Demand Analysis */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  {t('brand.demandAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={demandTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="demand" stroke="hsl(16, 85%, 60%)" fill="hsl(16, 85%, 60%, 0.2)" strokeWidth={2} />
                      <Area type="monotone" dataKey="supply" stroke="hsl(152, 55%, 42%)" fill="hsl(152, 55%, 42%, 0.2)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="text-sm text-muted-foreground">Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Supply</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Bangladesh Shop Network
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px]">
                  <BangladeshMap 
                    divisions={bangladeshDivisions}
                    showWomenEntrepreneurs={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals">
            <DealsManager />
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Customer Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerInsights />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Opportunity Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OpportunityAlerts />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-primary" />
                  Ad Campaign Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdCampaignManager />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Competitor Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CompetitorAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrandDashboard;
