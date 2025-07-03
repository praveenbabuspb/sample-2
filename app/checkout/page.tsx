
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast"

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(10, "Address must be at least 10 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  zip: z.string().min(5, "ZIP code must be at least 5 characters.").regex(/^\d+$/, "ZIP code must be a number."),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { carts, addItem, updateQuantity, clearCart, clearAllCarts } = useCartStore();
  const { toast } = useToast();

  const shopName = searchParams.get('shop');
  const isGlobalCheckout = searchParams.get('global') === 'true';

  let itemsToCheckout: CartItem[] = [];
  let checkoutTitle = "Checkout";
  
  if (isGlobalCheckout) {
    itemsToCheckout = Object.values(carts).flatMap(cart => cart.items);
    checkoutTitle = "Global Checkout";
  } else if (shopName && carts[shopName]) {
    itemsToCheckout = carts[shopName].items;
    checkoutTitle = `Checkout from ${shopName}`;
  }
  
  const subtotal = itemsToCheckout.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shippingFee;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    // Simulate a successful API call without a real backend
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully submitted.",
    });

    if (isGlobalCheckout) {
      clearAllCarts();
    } else if (shopName) {
      clearCart(shopName);
    }
    
    router.push('/');
  };
  
  if (itemsToCheckout.length === 0 && !form.formState.isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>

      <h1 className="text-4xl font-bold mb-8">{checkoutTitle}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="shipping-form" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                   <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-1/3">
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {itemsToCheckout.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover h-16 w-16" data-ai-hint={item.dataAiHint}/>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.shopName, item.quantity - 1)}
                          className="h-8 w-8 rounded-r-none text-destructive hover:bg-destructive/10"
                        >
                          {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                        </Button>
                        <span className="font-bold text-sm text-foreground px-2">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => addItem(item)}
                          className="h-8 w-8 rounded-l-none text-primary hover:bg-primary/10"
                          disabled={!item.inStock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" form="shipping-form" disabled={itemsToCheckout.length === 0 || form.formState.isSubmitting}>
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPageContent />
        </Suspense>
    )
}
