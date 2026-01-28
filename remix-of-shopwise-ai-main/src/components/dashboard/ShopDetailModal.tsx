import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Package,
  Globe,
  User,
  Heart,
  GraduationCap,
  Wifi,
  WifiOff,
  Thermometer,
  Droplets,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Pill,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { Shop } from "@/types/shop";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShopDetailModalProps {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShopDetailModal = ({ shop, isOpen, onClose }: ShopDetailModalProps) => {
  const { language } = useLanguage();

  if (!shop) return null;

  const getAuthenticityColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getPriceRangeDisplay = (range: string) => {
    switch (range) {
      case "low": return { label: "৳", desc: "Budget Friendly" };
      case "medium": return { label: "৳৳", desc: "Moderate" };
      case "high": return { label: "৳৳৳", desc: "Premium" };
      default: return { label: "৳৳", desc: "Moderate" };
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {shop.ownerPhoto ? (
                <img 
                  src={shop.ownerPhoto} 
                  alt={shop.ownerName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <DialogTitle className="text-xl flex items-center gap-2">
                  {shop.name}
                  {shop.isWomenLed && (
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                      <Heart className="w-3 h-3 mr-1" />
                      Women-Led
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Owner: {shop.ownerName}
                </p>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {shop.rating} ({shop.totalReviews} reviews)
                  </span>
                  <span className={`flex items-center gap-1 ${shop.isOpen ? "text-green-500" : "text-red-500"}`}>
                    <Clock className="w-4 h-4" />
                    {shop.isOpen ? "Open Now" : "Closed"}
                  </span>
                  <span className="text-muted-foreground">
                    {getPriceRangeDisplay(shop.priceRange).label} • {getPriceRangeDisplay(shop.priceRange).desc}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getAuthenticityColor(shop.authenticityScore)}`}>
                {shop.authenticityScore}%
              </div>
              <div className="text-xs text-muted-foreground">Authenticity Score</div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="flex items-center gap-4 mb-4 text-sm">
            <a href={`tel:${shop.phone}`} className="flex items-center gap-2 text-primary hover:underline">
              <Phone className="w-4 h-4" />
              {shop.phone}
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {shop.address}
            </span>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="w-max justify-start mb-4 flex-nowrap">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products & Pricing</TabsTrigger>
                <TabsTrigger value="authenticity">Authenticity</TabsTrigger>
                {shop.womenEntrepreneurDetails && (
                  <TabsTrigger value="entrepreneur">Entrepreneur</TabsTrigger>
                )}
                {shop.medicineDetails && (
                  <TabsTrigger value="medicine">Medicine Info</TabsTrigger>
                )}
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                {shop.nearbyTeachers && shop.nearbyTeachers.length > 0 && (
                  <TabsTrigger value="teachers">Nearby Teachers</TabsTrigger>
                )}
                {shop.realtimeData && (
                  <TabsTrigger value="realtime">Live Data</TabsTrigger>
                )}
              </TabsList>
            </ScrollArea>

            <ScrollArea className="h-[400px] pr-4">
              <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Available Products
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.products.map((product) => (
                        <Badge key={product} variant="outline">{product}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{shop.availability}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Verification Status
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Trade License</span>
                        {shop.verificationDetails.tradeLicense ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Tax Registration</span>
                        {shop.verificationDetails.taxRegistration ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      {shop.verificationDetails.healthCertificate !== undefined && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Health Certificate</span>
                          {shop.verificationDetails.healthCertificate ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Import Origins
                  </h4>
                  <div className="space-y-2">
                    {shop.importOrigins.map((origin, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm bg-background rounded p-2">
                        <div>
                          <span className="font-medium">{origin.product}</span>
                          <span className="text-muted-foreground ml-2">from {origin.origin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{origin.supplier}</span>
                          {origin.isVerified ? (
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="mt-0 space-y-4">
                {shop.womenEntrepreneurDetails?.priceList && shop.womenEntrepreneurDetails.priceList.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-medium">Custom Order Price List</h4>
                    {shop.womenEntrepreneurDetails.priceList.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          {item.productionTime && (
                            <p className="text-xs text-muted-foreground">Production: {item.productionTime}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">৳{item.price}</p>
                          <p className="text-xs text-muted-foreground">{item.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-medium">Available Products</h4>
                    {shop.products.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                        <span>{product}</span>
                        <Badge variant="outline">In Stock</Badge>
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground">{shop.availability}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="authenticity" className="mt-0 space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Overall Authenticity Score</h4>
                    <span className={`text-2xl font-bold ${getAuthenticityColor(shop.authenticityScore)}`}>
                      {shop.authenticityScore}%
                    </span>
                  </div>
                  <Progress value={shop.authenticityScore} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {shop.authenticityScore >= 90 
                      ? "Highly trusted shop with verified authentic products"
                      : shop.authenticityScore >= 70
                      ? "Generally reliable, some products may need verification"
                      : "Exercise caution, verify products before purchase"
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Certifications</h4>
                    <div className="space-y-2">
                      {shop.verificationDetails.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Inspection Details</h4>
                    {shop.verificationDetails.lastInspection && (
                      <p className="text-sm">
                        Last inspected: {new Date(shop.verificationDetails.lastInspection).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Product Source Verification</h4>
                  <div className="space-y-2">
                    {shop.importOrigins.map((origin, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{origin.product} ({origin.supplier})</span>
                        {origin.isVerified ? (
                          <Badge className="bg-green-100 text-green-700">Verified Source</Badge>
                        ) : (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-600">Unverified</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {shop.womenEntrepreneurDetails && (
                <TabsContent value="entrepreneur" className="mt-0 space-y-4">
                  <div className="bg-pink-50 dark:bg-pink-950/30 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-pink-500" />
                      <h4 className="font-medium">Women Entrepreneur Profile</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Business started: {new Date(shop.womenEntrepreneurDetails.businessStartDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.womenEntrepreneurDetails.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Production Capacity</h4>
                      <p className="text-sm">{shop.womenEntrepreneurDetails.productionCapacity}</p>
                      {shop.womenEntrepreneurDetails.customOrderAvailable && (
                        <Badge className="mt-2 bg-primary">Custom Orders Available</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Training Received</h4>
                    <div className="space-y-1">
                      {shop.womenEntrepreneurDetails.trainingReceived.map((training, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          {training}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Support Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.womenEntrepreneurDetails.supportPrograms.map((program, idx) => (
                        <Badge key={idx} variant="outline">{program}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              {shop.medicineDetails && (
                <TabsContent value="medicine" className="mt-0 space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-5 h-5 text-blue-500" />
                      <h4 className="font-medium">Pharmacy License Information</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">License No:</span>
                        <p className="font-medium">{shop.medicineDetails.pharmacyLicense}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pharmacist:</span>
                        <p className="font-medium">{shop.medicineDetails.pharmacistName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Registration:</span>
                        <p className="font-medium">{shop.medicineDetails.pharmacistRegistration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Thermometer className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <p className="font-medium">Cold Storage</p>
                      <p className="text-sm text-muted-foreground">
                        {shop.medicineDetails.coldStorageAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="font-medium">24/7 Emergency</p>
                      <p className="text-sm text-muted-foreground">
                        {shop.medicineDetails.emergencyAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Medicine Suppliers</h4>
                    <div className="space-y-3">
                      {shop.medicineDetails.suppliers.map((supplier, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-background rounded p-3">
                          <div>
                            <p className="font-medium">{supplier.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Products: {supplier.products.join(", ")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={supplier.type === "pharmaceutical" ? "default" : "secondary"}>
                              {supplier.type === "pharmaceutical" ? "Pharmaceutical" : 
                               supplier.type === "government" ? "Government" : "Local"}
                            </Badge>
                            {supplier.isAuthorized ? (
                              <ShieldCheck className="w-5 h-5 text-green-500" />
                            ) : (
                              <ShieldAlert className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="reviews" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Customer Reviews ({shop.totalReviews})
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{shop.rating}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {shop.reviews.map((review) => (
                    <div key={review.id} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {shop.nearbyTeachers && shop.nearbyTeachers.length > 0 && (
                <TabsContent value="teachers" className="mt-0 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Nearby School Teachers</h4>
                  </div>
                  <div className="space-y-3">
                    {shop.nearbyTeachers.map((teacher) => (
                      <div key={teacher.id} className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {teacher.subject} • {teacher.school}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Distance: {teacher.distance}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={teacher.available ? "default" : "secondary"}>
                              {teacher.available ? "Available" : "Busy"}
                            </Badge>
                            {teacher.phone && (
                              <a 
                                href={`tel:${teacher.phone}`}
                                className="block mt-2 text-xs text-primary hover:underline"
                              >
                                {teacher.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}

              {shop.realtimeData && (
                <TabsContent value="realtime" className="mt-0 space-y-4">
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    shop.realtimeData.deviceStatus === "online" 
                      ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                  }`}>
                    {shop.realtimeData.deviceStatus === "online" ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        ESP32 Device: {shop.realtimeData.deviceStatus === "online" ? "Online" : "Offline"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last update: {new Date(shop.realtimeData.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {shop.realtimeData.temperature !== undefined && (
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                        <p className="text-2xl font-bold">{shop.realtimeData.temperature}°C</p>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                      </div>
                    )}
                    {shop.realtimeData.humidity !== undefined && (
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <p className="text-2xl font-bold">{shop.realtimeData.humidity}%</p>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                      </div>
                    )}
                    {shop.realtimeData.customerCount !== undefined && (
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{shop.realtimeData.customerCount}</p>
                        <p className="text-xs text-muted-foreground">Customers Now</p>
                      </div>
                    )}
                  </div>

                  {shop.realtimeData.stockAlerts && shop.realtimeData.stockAlerts.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium">Stock Alerts</h4>
                      </div>
                      <ul className="space-y-1">
                        {shop.realtimeData.stockAlerts.map((alert, idx) => (
                          <li key={idx} className="text-sm text-yellow-700 dark:text-yellow-300">
                            • {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
              )}
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDetailModal;
