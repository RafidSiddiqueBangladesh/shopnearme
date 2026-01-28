import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Utensils, 
  Shirt, 
  Calendar, 
  BookOpen, 
  Heart,
  Phone,
  MapPin,
  Clock,
  Package,
  User,
  CheckCircle
} from 'lucide-react';
import { mockDonations } from '@/data/mockDonations';
import { Donation } from '@/types/donation';

interface DonationListProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationList = ({ isOpen, onClose }: DonationListProps) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  const donationTypes = [
    { id: "all", label: "All", icon: Heart },
    { id: "food", label: "Food Sharing", icon: Utensils },
    { id: "cloth", label: "Cloth Sharing", icon: Shirt },
    { id: "event", label: "Local Events", icon: Calendar },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "medical", label: "Medical", icon: Heart },
  ];

  const filteredDonations = mockDonations.filter(d => 
    selectedType === "all" || d.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "food": return Utensils;
      case "cloth": return Shirt;
      case "event": return Calendar;
      case "education": return BookOpen;
      case "medical": return Heart;
      default: return Heart;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "food": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "cloth": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "event": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "education": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "medical": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Community Donations & Events
              <Badge variant="secondary" className="ml-2">
                {filteredDonations.length} Available
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {/* Type Filter */}
          <div className="px-6 py-3 border-b bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {donationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <ScrollArea className="max-h-[calc(85vh-180px)]">
            <div className="p-6 space-y-4">
              {filteredDonations.map((donation) => {
                const TypeIcon = getTypeIcon(donation.type);
                return (
                  <Card 
                    key={donation.id} 
                    className="cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => setSelectedDonation(donation)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(donation.type)}`}>
                          <TypeIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{donation.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{donation.description}</p>
                            </div>
                            <Badge className={getTypeColor(donation.type)}>
                              {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {donation.donorName}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {donation.donorAddress.split(',')[0]}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {donation.quantity}
                            </span>
                            {donation.eventDate && (
                              <span className="flex items-center gap-1 text-primary font-medium">
                                <Calendar className="w-3 h-3" />
                                {new Date(donation.eventDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {donation.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Donation Detail Dialog */}
      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-lg">
          {selectedDonation && (() => {
            const TypeIcon = getTypeIcon(selectedDonation.type);
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(selectedDonation.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    {selectedDonation.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedDonation.description}</p>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{selectedDonation.donorName}</span>
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${selectedDonation.donorPhone}`} className="text-primary hover:underline">
                        {selectedDonation.donorPhone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>{selectedDonation.donorAddress}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-muted-foreground">Quantity</span>
                      <p className="font-medium">{selectedDonation.quantity}</p>
                    </div>
                    {selectedDonation.condition && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <span className="text-muted-foreground">Condition</span>
                        <p className="font-medium">{selectedDonation.condition}</p>
                      </div>
                    )}
                    {selectedDonation.eventDate && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <span className="text-muted-foreground">Date</span>
                        <p className="font-medium">{new Date(selectedDonation.eventDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedDonation.eventTime && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <span className="text-muted-foreground">Time</span>
                        <p className="font-medium">{selectedDonation.eventTime}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedDonation.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Donor
                    </Button>
                    <Button variant="outline" size="lg">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonationList;
