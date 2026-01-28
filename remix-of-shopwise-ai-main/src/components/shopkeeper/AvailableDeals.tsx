import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tag, 
  Percent, 
  Clock, 
  TrendingDown,
  ShoppingCart,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { brandDeals } from '@/data/bangladeshData';
import { useToast } from '@/hooks/use-toast';

const AvailableDeals = () => {
  const { toast } = useToast();
  const activeDeals = brandDeals.filter(deal => deal.status === 'active');

  const handleClaimDeal = (dealId: number, productName: string) => {
    toast({
      title: "Deal Added to Cart! ✓",
      description: `${productName} at special price added to your order cart.`,
    });
  };

  const getDaysRemaining = (validUntil: string) => {
    const end = new Date(validUntil);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-amber-600 dark:text-amber-400">Special Brand Deals</span>
          <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
            {activeDeals.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeDeals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No special deals available right now</p>
          </div>
        ) : (
          <>
            {activeDeals.slice(0, 4).map((deal) => {
              const daysRemaining = getDaysRemaining(deal.validUntil);
              return (
                <div 
                  key={deal.id} 
                  className="p-4 bg-card rounded-lg border border-border hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-foreground">{deal.productName}</div>
                      <div className="text-xs text-muted-foreground">by {deal.brandName}</div>
                    </div>
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      <Percent className="w-3 h-3 mr-1" />
                      {deal.discountPercent}% OFF
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <span className="line-through text-muted-foreground text-sm">৳{deal.originalPrice}</span>
                    <span className="text-xl font-bold text-primary">৳{deal.discountedPrice}</span>
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded">
                      Save ৳{deal.originalPrice - deal.discountedPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {daysRemaining > 0 ? (
                        <span className={daysRemaining <= 3 ? 'text-red-500' : ''}>
                          {daysRemaining} days left
                        </span>
                      ) : (
                        <span className="text-red-500">Expires today!</span>
                      )}
                      <span>•</span>
                      <span>Min: {deal.minQuantity} units</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handleClaimDeal(deal.id, deal.productName)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Claim Deal
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {activeDeals.length > 4 && (
              <Button variant="outline" className="w-full mt-2">
                View All {activeDeals.length} Deals
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableDeals;
