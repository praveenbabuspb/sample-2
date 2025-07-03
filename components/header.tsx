
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LocationSelector } from "./location-selector";
import { SuperSaverToggle } from "./super-saver-toggle";
import { SearchDialog } from "./search-dialog";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex md:h-20 md:items-center md:justify-between md:gap-6">

        {/* --- Desktop View --- */}
        <div className="hidden w-full items-center gap-4 md:flex">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">React Nav</span>
          </Link>
          <LocationSelector />
          <SearchDialog>
             <button className="relative h-12 flex-1 w-full rounded-lg border bg-background text-left pl-12 pr-4 text-muted-foreground text-sm hover:bg-accent transition-colors">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                Search for "milk"
             </button>
          </SearchDialog>
          <SuperSaverToggle />
        </div>

        {/* --- Mobile View --- */}
        <div className="flex w-full flex-col items-center gap-2 py-2 md:hidden">
          <div className="flex w-full items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-full max-w-xs flex-col p-4">
                 <nav className="grid gap-2 text-lg font-medium">
                   <Link href="/" className="flex items-center space-x-2 mb-4 border-b pb-4">
                      <ShoppingCart className="h-7 w-7 text-primary" />
                      <span className="text-xl font-bold">React Nav</span>
                  </Link>
                  <Link href="/" className="block rounded-lg py-2 px-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <Link href="/about" className="block rounded-lg py-2 px-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/contact" className="block rounded-lg py-2 px-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>

            <LocationSelector />
            
            <div className="flex-1">
                <SearchDialog>
                    <button className="relative h-10 w-full rounded-lg border bg-background text-left pl-10 pr-4 text-muted-foreground text-sm hover:bg-accent transition-colors">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        Search...
                    </button>
                </SearchDialog>
            </div>
          </div>
          <SuperSaverToggle />
        </div>
      </div>
    </header>
  );
}
