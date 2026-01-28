import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { mockOpportunities, OpportunityAlert } from '@/data/bangladeshData';

interface OpportunityAlertsProps {
  opportunities?: OpportunityAlert[];
}

const getTypeIcon = (type: OpportunityAlert['type']) => {
  switch (type) {
    case 'growth': return TrendingUp;
    case 'demand': return Target;
    case 'competitor': return AlertCircle;
    case 'seasonal': return Calendar;
    case 'expansion': return MapPin;
    default: return Target;
  }
};

const getTypeColor = (type: OpportunityAlert['type']) => {
  switch (type) {
    case 'growth': return 'bg-primary/10 text-primary';
    case 'demand': return 'bg-secondary/10 text-secondary';
    case 'competitor': return 'bg-amber-500/10 text-amber-600';
    case 'seasonal': return 'bg-purple-500/10 text-purple-600';
    case 'expansion': return 'bg-accent/10 text-accent';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getUrgencyBadge = (urgency: OpportunityAlert['urgency']) => {
  switch (urgency) {
    case 'high': return <Badge variant="destructive">Urgent</Badge>;
    case 'medium': return <Badge variant="secondary">Medium</Badge>;
    case 'low': return <Badge variant="outline">Low</Badge>;
  }
};

const OpportunityAlerts = ({ opportunities = mockOpportunities }: OpportunityAlertsProps) => {
  const highPriorityCount = opportunities.filter(o => o.urgency === 'high').length;

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{opportunities.length} Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              {highPriorityCount} require immediate action
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-3">
        {opportunities.map((opportunity) => {
          const Icon = getTypeIcon(opportunity.type);
          const colorClass = getTypeColor(opportunity.type);
          
          return (
            <Card key={opportunity.id} className="hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{opportunity.title}</h4>
                      {getUrgencyBadge(opportunity.urgency)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {opportunity.region}
                        </span>
                        <span className="text-primary font-medium">
                          {opportunity.potential}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="gap-1 h-8">
                        Take Action <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OpportunityAlerts;
