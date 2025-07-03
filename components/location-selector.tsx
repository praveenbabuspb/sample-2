
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, LocateFixed, Search } from "lucide-react";

export function LocationSelector() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="shrink-0 cursor-pointer">
            {/* Desktop and large screen view */}
            <div className="hidden md:flex flex-col items-start">
                <span className="text-lg font-bold text-primary">Delivery in 13 Mins</span>
                <div className="flex items-center gap-x-1 text-sm font-semibold">
                    <span className="max-w-[200px] truncate lg:max-w-[250px]">
                        Periamet, Poongavanapuram, Chennai, Tamil Nadu
                    </span>
                    <ChevronDown className="h-4 w-4 text-primary"/>
                </div>
            </div>
            {/* Mobile view */}
            <div className="flex items-center gap-1 md:hidden">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-primary">Deliver to</span>
                    <span className="text-xs font-semibold max-w-[120px] truncate">
                        Periamet, Poongavanapuram, Chennai...
                    </span>
                </div>
                <ChevronDown className="h-4 w-4 text-primary shrink-0"/>
            </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Delivery Location</DialogTitle>
          <DialogDescription>
            Enter your address to see products and delivery times for your area.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input id="location-search" placeholder="Search for area, street name..." className="pl-10" />
          </div>
          <Button variant="outline" className="justify-start gap-2">
            <LocateFixed className="h-4 w-4" />
            <span>Use current location</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
