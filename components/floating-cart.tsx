
"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { useCartStore, type ShopCart } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function FloatingCart() {
  const { 
    carts, 
    isOpen, 
    toggleCart, 
    setCartOpen, 
    clearAllCarts
  } = useCartStore();

  const cartArray = Object.values(carts);
  const grandTotalItems = cartArray.reduce((sum, cart) => sum + cart.totalItems, 0);
  const grandTotalPrice = cartArray.reduce((sum, cart) => sum + cart.totalPrice, 0);
  
  return (
    <>
      <motion.div
        className="fixed bottom-24 right-6 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Button
          onClick={toggleCart}
          className="px-6 py-3 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {grandTotalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {grandTotalItems}
              </motion.span>
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">
              {grandTotalItems === 0 ? 'Cart Empty' : `${grandTotalItems} Items`}
            </span>
            {grandTotalPrice > 0 && (
              <span className="text-sm opacity-90">
                ${grandTotalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setCartOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    My Carts
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {grandTotalItems > 0 
                      ? `${grandTotalItems} ${grandTotalItems === 1 ? 'item' : 'items'} in ${cartArray.length} ${cartArray.length === 1 ? 'shop' : 'shops'}`
                      : 'Your cart is empty'
                    }
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartArray.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-muted-foreground">
                      Add some products to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Select a shop to proceed to checkout.
                    </p>
                    {cartArray.map((shopCart) => (
                      <Link
                        key={shopCart.shopName}
                        href={`/checkout?shop=${encodeURIComponent(shopCart.shopName)}`}
                        onClick={() => setCartOpen(false)}
                        className="block rounded-lg border bg-card hover:bg-muted/50 transition-colors p-4 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-card-foreground truncate">{shopCart.shopName}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {shopCart.totalItems} {shopCart.totalItems === 1 ? 'item' : 'items'} &bull; ${shopCart.totalPrice.toFixed(2)}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ml-4 shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {cartArray.length > 0 && (
                <div className="p-6 border-t bg-muted/20 space-y-4">
                  {cartArray.length > 1 && (
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout?global=true" onClick={() => setCartOpen(false)}>
                        Global Checkout (${grandTotalPrice.toFixed(2)})
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearAllCarts}
                  >
                    Clear All Carts
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
