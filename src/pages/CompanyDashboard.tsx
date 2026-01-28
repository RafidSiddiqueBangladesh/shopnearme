import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  TrendingUp,
  Shield,
  Heart,
  Leaf,
  Users,
  Globe,
  Activity,
  Server,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Bell,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SettingsDropdown from "@/components/common/SettingsDropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

const impactData = [
  { name: 'Women Empowerment', value: 78, target: 100, color: 'hsl(16, 85%, 60%)' },
  { name: 'Rural Reach', value: 65, target: 100, color: 'hsl(152, 55%, 42%)' },
  { name: 'Waste Reduction', value: 45, target: 100, color: 'hsl(185, 60%, 35%)' },
];

const supplyChainData = [
  { stage: 'Factory', count: 156, status: 'active' },
  { stage: 'Warehouse', count: 42, status: 'active' },
  { stage: 'Distribution', count: 380, status: 'active' },
  { stage: 'Retail', count: 3290, status: 'active' },
];

const authenticityData = [
  { month: 'Jan', verified: 98.2, flagged: 1.8 },
  { month: 'Feb', verified: 98.5, flagged: 1.5 },
  { month: 'Mar', verified: 99.1, flagged: 0.9 },
  { month: 'Apr', verified: 98.8, flagged: 1.2 },
  { month: 'May', verified: 99.3, flagged: 0.7 },
  { month: 'Jun', verified: 99.5, flagged: 0.5 },
];

const iotDevices = [
  { type: 'POS Terminals', active: 2850, total: 3000, health: 95 },
  { type: 'Inventory Scanners', active: 1420, total: 1500, health: 94.7 },
  { type: 'Smart Shelves', active: 890, total: 1000, health: 89 },
  { type: 'Temperature Monitors', active: 445, total: 500, health: 89 },
];

const CompanyDashboard = () => {
  const { t, language } = useLanguage();

  const stats = {
    totalShops: 3290,
    womenLedShops: 1245,
    ruralShops: 1856,
    authenticityScore: 99.5,
    activeDevices: 5605,
    dataPoints: 12500000,
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
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">C</span>
                </div>
                <span className="font-display font-bold text-lg">{t('company.title')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
              </Button>
              <SettingsDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{t('company.shopNetwork')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.totalShops.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-medium">{t('company.womenEmpowerment')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.womenLedShops}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-medium">{t('company.ruralReach')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.ruralShops}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">{t('company.authenticity')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.authenticityScore}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-medium">{t('company.iotDevices')}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.activeDevices.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-medium">Data Points</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{(stats.dataPoints / 1000000).toFixed(1)}M</div>
            </CardContent>
          </Card>
        </div>

        {/* SDG Impact Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t('company.impactMetrics')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {impactData.map((item) => (
                <div key={item.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%`, background: item.color }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">Target: {item.target}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supply Chain & Authenticity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Supply Chain */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                {t('company.supplyChain')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplyChainData.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        stage.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{stage.stage}</span>
                          <span className="text-lg font-bold text-primary">{stage.count}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Active nodes</div>
                      </div>
                    </div>
                    {index < supplyChainData.length - 1 && (
                      <div className="absolute left-5 top-10 w-0.5 h-4 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Authenticity Tracking */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                {t('company.productTracking')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={authenticityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[95, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="verified" stroke="hsl(152, 55%, 42%)" strokeWidth={3} dot={{ fill: 'hsl(152, 55%, 42%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.5%</div>
                  <div className="text-sm text-muted-foreground">Verified Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">0.5%</div>
                  <div className="text-sm text-muted-foreground">Flagged Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* IoT System Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="w-5 h-5 text-accent" />
              {t('company.systemHealth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {iotDevices.map((device) => (
                <div key={device.type} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground">{device.type}</span>
                    <span className={`w-2 h-2 rounded-full ${device.health > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {device.active.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">/{device.total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mr-3">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(device.active / device.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary">{device.health}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
