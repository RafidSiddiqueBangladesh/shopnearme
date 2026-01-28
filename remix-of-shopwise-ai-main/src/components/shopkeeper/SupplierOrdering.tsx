import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ShoppingCart, 
  Package,
  Phone,
  Star,
  CheckCircle,
  Clock,
  Plus,
  Minus,
  Truck
} from 'lucide-react';
import { bigSuppliers, Supplier, SupplierProduct } from '@/data/bangladeshData';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartItem {
  supplier: string;
  product: SupplierProduct;
  quantity: number;
}

const SupplierOrdering = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredSuppliers = bigSuppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (supplier: Supplier, product: SupplierProduct) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.supplier === supplier.name && item.product.name === product.name
      );
      if (existing) {
        return prev.map(item => 
          item.supplier === supplier.name && item.product.name === product.name
            ? { ...item, quantity: item.quantity + product.minQty }
            : item
        );
      }
      return [...prev, { supplier: supplier.name, product, quantity: product.minQty }];
    });
  };

  const removeFromCart = (supplierName: string, productName: string) => {
    setCart(prev => prev.filter(
      item => !(item.supplier === supplierName && item.product.name === productName)
    ));
  };

  const updateQuantity = (supplierName: string, productName: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.supplier === supplierName && item.product.name === productName) {
        const newQty = Math.max(item.product.minQty, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Order from Suppliers
          </CardTitle>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2 relative">
                <ShoppingCart className="w-4 h-4" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Order Cart</SheetTitle>
                <SheetDescription>
                  Review and place your order to suppliers
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium text-sm">{item.product.name}</div>
                            <div className="text-xs text-muted-foreground">{item.supplier}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 text-destructive"
                            onClick={() => removeFromCart(item.supplier, item.product.name)}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.supplier, item.product.name, -item.product.minQty)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-12 text-center">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.supplier, item.product.name, item.product.minQty)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="font-semibold">
                            ৳{(item.product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {cart.length > 0 && (
                <div className="pt-4 border-t mt-4 space-y-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <Button className="w-full gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Place Order
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search PRAN, Square, Meghna..."
            className="pl-10 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Supplier List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filteredSuppliers.map((supplier) => (
            <div 
              key={supplier.id}
              className="p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => setSelectedSupplier(selectedSupplier?.id === supplier.id ? null : supplier)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {supplier.verified && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{supplier.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{supplier.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{supplier.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {supplier.products.slice(0, 4).map((product) => (
                  <Badge key={product} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  Min: ৳{supplier.minOrder.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {supplier.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {supplier.contact}
                </span>
              </div>

              {/* Expandable Price List */}
              {selectedSupplier?.id === supplier.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-sm font-medium mb-2">Products & Pricing</div>
                  <div className="space-y-2">
                    {supplier.priceList.map((product) => (
                      <div 
                        key={product.name}
                        className="flex items-center justify-between p-2 bg-background rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Min: {product.minQty} {product.unit}s
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-semibold">৳{product.price}</div>
                            <div className="text-xs text-muted-foreground">per {product.unit}</div>
                          </div>
                          {product.inStock ? (
                            <Button 
                              size="sm" 
                              className="h-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(supplier, product);
                              }}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierOrdering;
