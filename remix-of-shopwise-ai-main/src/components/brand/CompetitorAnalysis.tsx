import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  PieChart,
  DollarSign,
  Target
} from 'lucide-react';
import { mockCompetitors, Competitor } from '@/data/bangladeshData';

interface CompetitorAnalysisProps {
  competitors?: Competitor[];
}

const getPriceComparisonBadge = (comparison: Competitor['priceComparison']) => {
  switch (comparison) {
    case 'lower': return <Badge variant="destructive">Lower Prices</Badge>;
    case 'similar': return <Badge variant="secondary">Similar</Badge>;
    case 'higher': return <Badge className="bg-primary">Higher Prices</Badge>;
  }
};

const CompetitorAnalysis = ({ competitors = mockCompetitors }: CompetitorAnalysisProps) => {
  const ourMarketShare = 23.5;
  const totalCompetitorShare = competitors.reduce((acc, c) => acc + c.marketShare, 0);

  return (
    <div className="space-y-4">
      {/* Market Share Overview */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Market Position</h3>
                <p className="text-sm text-muted-foreground">Your share vs competitors</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{ourMarketShare}%</div>
              <div className="text-xs text-muted-foreground">Your market share</div>
            </div>
          </div>
          
          <div className="flex gap-2 h-4 rounded-full overflow-hidden bg-muted">
            <div 
              className="bg-primary rounded-l-full" 
              style={{ width: `${ourMarketShare}%` }}
              title={`ShopSync: ${ourMarketShare}%`}
            />
            {competitors.map((c, idx) => (
              <div 
                key={c.id}
                className={`${idx === 0 ? 'bg-secondary' : idx === 1 ? 'bg-amber-500' : 'bg-accent'}`}
                style={{ width: `${c.marketShare}%` }}
                title={`${c.name}: ${c.marketShare}%`}
              />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>ShopSync ({ourMarketShare}%)</span>
            </div>
            {competitors.slice(0, 3).map((c, idx) => (
              <div key={c.id} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-secondary' : idx === 1 ? 'bg-amber-500' : 'bg-accent'}`} />
                <span>{c.name} ({c.marketShare}%)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Cards */}
      <div className="space-y-3">
        {competitors.map((competitor) => (
          <Card key={competitor.id} className="hover:border-primary/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{competitor.name}</h4>
                    {getPriceComparisonBadge(competitor.priceComparison)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {competitor.region} • {competitor.marketShare}% market share
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="gap-1 h-8">
                  Details <ArrowRight className="w-3 h-3" />
                </Button>
              </div>

              {/* Price Comparison Table */}
              <div className="mb-3">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Price Comparison
                </div>
                <div className="bg-muted/50 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 gap-2 p-2 text-xs font-medium border-b border-border">
                    <span>Product</span>
                    <span className="text-center">Their Price</span>
                    <span className="text-center">Our Price</span>
                    <span className="text-right">Difference</span>
                  </div>
                  {competitor.products.slice(0, 3).map((product) => (
                    <div key={product.name} className="grid grid-cols-4 gap-2 p-2 text-xs">
                      <span className="text-muted-foreground">{product.name}</span>
                      <span className="text-center">৳{product.theirPrice}</span>
                      <span className="text-center font-medium">৳{product.ourPrice}</span>
                      <span className={`text-right flex items-center justify-end gap-1 ${
                        product.priceDiff < 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {product.priceDiff < 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        {Math.abs(product.priceDiff).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium mb-1 text-primary">Their Strengths</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {competitor.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium mb-1 text-destructive">Their Weaknesses</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {competitor.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-destructive mt-0.5">•</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2">
        <Target className="w-4 h-4" />
        Get Full Competitor Report
      </Button>
    </div>
  );
};

export default CompetitorAnalysis;
