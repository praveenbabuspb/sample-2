'use client';

import * as React from 'react';
import { Search, History, ArrowLeft } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const popularSearches = ["Milk", "Bread", "Eggs", "Chicken", "Onion", "Potato"];
const recentSearches = ["Coffee", "Apples"];

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="bottom" className="h-full w-full flex flex-col p-0">
          <SheetHeader className="p-4 flex flex-row items-center gap-2 border-b">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <ArrowLeft />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for anything"
                className="h-12 w-full rounded-lg pl-10 text-base"
                autoFocus
              />
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            <SearchSuggestion
              title="Recent Searches"
              items={recentSearches}
              icon={<History className="h-4 w-4" />}
            />
            <SearchSuggestion
              title="Popular on React Nav"
              items={popularSearches}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for anything"
              className="h-12 rounded-lg pl-10 text-base"
              autoFocus
            />
          </div>
        </div>
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-8">
          <SearchSuggestion
            title="Recent Searches"
            items={recentSearches}
            icon={<History className="h-4 w-4" />}
          />
          <SearchSuggestion
            title="Popular on React Nav"
            items={popularSearches}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchSuggestion({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Button key={item} variant="outline" className="rounded-full h-8">
            {icon}
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
