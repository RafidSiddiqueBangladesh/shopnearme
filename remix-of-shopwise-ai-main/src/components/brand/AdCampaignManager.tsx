import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone, 
  Plus, 
  Play, 
  Pause, 
  Eye, 
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  BarChart
} from 'lucide-react';
import { mockCampaigns, AdCampaign } from '@/data/bangladeshData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdCampaignManagerProps {
  campaigns?: AdCampaign[];
}

const getStatusBadge = (status: AdCampaign['status']) => {
  switch (status) {
    case 'active': return <Badge className="bg-primary">Active</Badge>;
    case 'draft': return <Badge variant="secondary">Draft</Badge>;
    case 'paused': return <Badge variant="outline">Paused</Badge>;
    case 'completed': return <Badge variant="default">Completed</Badge>;
  }
};

const AdCampaignManager = ({ campaigns = mockCampaigns }: AdCampaignManagerProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalReach = campaigns.reduce((acc, c) => acc + c.reach, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Megaphone className="w-4 h-4" />
              <span className="text-xs font-medium">Active Campaigns</span>
            </div>
            <div className="text-xl font-bold">{activeCampaigns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BarChart className="w-4 h-4" />
              <span className="text-xs font-medium">Budget Used</span>
            </div>
            <div className="text-xl font-bold">৳{(totalSpent / 1000).toFixed(0)}K</div>
            <Progress value={(totalSpent / totalBudget) * 100} className="mt-1 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">Total Reach</span>
            </div>
            <div className="text-xl font-bold">{(totalReach / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Conversions</span>
            </div>
            <div className="text-xl font-bold">{totalConversions.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Your Campaigns</h3>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Launch a new ad campaign to reach more customers across Bangladesh.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="e.g., Summer Sale 2024" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (৳)</Label>
                  <Input id="budget" type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input id="duration" type="number" placeholder="30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Target Regions</Label>
                <div className="flex flex-wrap gap-2">
                  {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'].map((region) => (
                    <Badge key={region} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input id="audience" placeholder="e.g., Urban consumers aged 25-45" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowCreateDialog(false)}>Create Campaign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-3">
        {campaigns.map((campaign) => {
          const budgetProgress = (campaign.spent / campaign.budget) * 100;
          
          return (
            <Card key={campaign.id} className="hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{campaign.name}</h4>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {campaign.targetRegions.length} regions
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {campaign.status === 'active' ? (
                      <Button size="sm" variant="outline" className="h-8">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : campaign.status === 'paused' || campaign.status === 'draft' ? (
                      <Button size="sm" variant="outline" className="h-8">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : null}
                    <Button size="sm" variant="ghost" className="h-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                    <div className="font-semibold">৳{campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Spent</div>
                    <div className="font-semibold">৳{campaign.spent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Reach</div>
                    <div className="font-semibold">{(campaign.reach / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Conversions</div>
                    <div className="font-semibold text-primary">{campaign.conversions.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Budget spent</span>
                    <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={budgetProgress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdCampaignManager;
