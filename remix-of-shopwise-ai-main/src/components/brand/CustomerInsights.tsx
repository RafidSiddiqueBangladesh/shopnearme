import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Phone, 
  MapPin, 
  Star, 
  TrendingUp,
  ShoppingBag,
  Calendar
} from 'lucide-react';
import { mockCustomers, Customer } from '@/data/bangladeshData';

interface CustomerInsightsProps {
  customers?: Customer[];
}

const CustomerInsights = ({ customers = mockCustomers }: CustomerInsightsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalPurchases, 0);
  const totalDues = customers.reduce((acc, c) => acc + c.dueAmount, 0);
  const avgPurchase = totalRevenue / totalCustomers;

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Total Customers</span>
            </div>
            <div className="text-xl font-bold">{totalCustomers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-medium">Total Revenue</span>
            </div>
            <div className="text-xl font-bold">৳{(totalRevenue / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Avg Purchase</span>
            </div>
            <div className="text-xl font-bold">৳{(avgPurchase / 1000).toFixed(1)}K</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-destructive mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Total Dues</span>
            </div>
            <div className="text-xl font-bold">৳{totalDues.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or customer ID..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Customer List */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {filteredCustomers.map((customer) => (
            <Card 
              key={customer.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                selectedCustomer?.id === customer.id ? 'border-primary ring-1 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{customer.name}</span>
                      <Badge variant="outline" className="text-xs">{customer.id}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {customer.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">৳{customer.totalPurchases.toLocaleString()}</div>
                    {customer.dueAmount > 0 && (
                      <Badge variant="destructive" className="text-xs mt-1">
                        Due: ৳{customer.dueAmount}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Star className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">
                    {customer.loyaltyPoints} loyalty points
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Detail */}
        {selectedCustomer ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{selectedCustomer.name}</span>
                <Badge>{selectedCustomer.id}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Phone</div>
                  <div className="font-medium">{selectedCustomer.phone}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Location</div>
                  <div className="font-medium">{selectedCustomer.location}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Total Purchases</div>
                  <div className="font-medium text-primary">৳{selectedCustomer.totalPurchases.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Due Amount</div>
                  <div className={`font-medium ${selectedCustomer.dueAmount > 0 ? 'text-destructive' : 'text-primary'}`}>
                    ৳{selectedCustomer.dueAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Preferred Products</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.preferredProducts.map((product) => (
                    <Badge key={product} variant="secondary">{product}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Recent Purchases</div>
                <div className="space-y-2">
                  {selectedCustomer.purchaseHistory.slice(0, 3).map((purchase, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm">
                      <div>
                        <div className="font-medium">{purchase.items.join(', ')}</div>
                        <div className="text-xs text-muted-foreground">{purchase.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">৳{purchase.amount}</div>
                        <Badge variant={purchase.paid ? 'default' : 'destructive'} className="text-xs">
                          {purchase.paid ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Contact Customer</Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex items-center justify-center h-[400px]">
            <div className="text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a customer to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerInsights;
