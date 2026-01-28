import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Phone, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  MessageSquare
} from 'lucide-react';
import { mockCustomers, Customer } from '@/data/bangladeshData';

const CustomerDuesTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter only customers with dues
  const customersWithDues = mockCustomers.filter(c => c.dueAmount > 0);
  const filteredCustomers = customersWithDues.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalDues = customersWithDues.reduce((acc, c) => acc + c.dueAmount, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-destructive" />
            Customer Dues
          </CardTitle>
          <Badge variant="destructive" className="text-sm">
            ৳{totalDues.toLocaleString()} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search customer..."
            className="pl-10 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Customer Due List */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id}
              className="p-3 bg-muted/50 rounded-lg border border-border hover:border-destructive/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{customer.name}</div>
                    <div className="text-xs text-muted-foreground">{customer.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-destructive">৳{customer.dueAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Due</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Phone className="w-3 h-3" />
                {customer.phone}
              </div>

              {/* Unpaid items */}
              <div className="text-xs mb-3">
                <span className="text-muted-foreground">Unpaid: </span>
                {customer.purchaseHistory
                  .filter(p => !p.paid)
                  .map(p => p.items.join(', '))
                  .join('; ') || 'Various items'}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Remind
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Mark Paid
                </Button>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No pending dues found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDuesTracker;
