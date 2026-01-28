import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tag, 
  Plus, 
  Percent, 
  Calendar, 
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { brandDeals, BrandDeal } from '@/data/bangladeshData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const DealsManager = () => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<BrandDeal[]>(brandDeals);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'upcoming': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'expired': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handlePublishDeal = (dealId: number) => {
    toast({
      title: "Deal Published! ✓",
      description: "This deal is now visible to all shopkeepers and customers in the selected regions.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Special Deals & Discounts</h3>
          <p className="text-sm text-muted-foreground">
            Create deals that appear on Shopkeeper and Customer dashboards
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Special Deal</DialogTitle>
              <DialogDescription>
                This deal will be shown to shopkeepers and customers across Bangladesh
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Product Name</label>
                  <Input placeholder="e.g., Rice 5kg" />
                </div>
                <div>
                  <label className="text-sm font-medium">Original Price (৳)</label>
                  <Input type="number" placeholder="385" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Discount %</label>
                  <Input type="number" placeholder="15" />
                </div>
                <div>
                  <label className="text-sm font-medium">Valid Until</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Special offer description..." />
              </div>
              <Button className="w-full" onClick={() => {
                setShowCreateDialog(false);
                toast({
                  title: "Deal Created! ✓",
                  description: "Your deal is now live across all selected regions.",
                });
              }}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Publish Deal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{deals.filter(d => d.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Active Deals</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{deals.filter(d => d.status === 'upcoming').length}</div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">৳2.5L</div>
            <div className="text-sm text-muted-foreground">Total Savings Offered</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">1,245</div>
            <div className="text-sm text-muted-foreground">Orders via Deals</div>
          </CardContent>
        </Card>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {deals.map((deal) => (
          <Card key={deal.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{deal.productName}</span>
                      <Badge className={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{deal.brandName}</div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1 text-destructive">
                        <TrendingDown className="w-4 h-4" />
                        {deal.discountPercent}% OFF
                      </span>
                      <span className="line-through text-muted-foreground">৳{deal.originalPrice}</span>
                      <span className="font-bold text-primary">৳{deal.discountedPrice}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(deal.validFrom).toLocaleDateString()} - {new Date(deal.validUntil).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {deal.regions.slice(0, 3).map((region) => (
                        <Badge key={region} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                      {deal.regions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{deal.regions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  {deal.status === 'upcoming' && (
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handlePublishDeal(deal.id)}
                    >
                      Publish Now
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                {deal.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealsManager;
