"use client";

import { cn } from '@/lib/utils';
import { useSuperSaverStore } from '@/store/superSaverStore';

export function SuperSaverToggle() {
  const { isSuperSaver, toggleSuperSaver, setSuperSaver } = useSuperSaverStore();

  return (
    <>
      {/* Desktop Toggle */}
      <button
        onClick={toggleSuperSaver}
        className="hidden h-[44px] w-[120px] rounded-full border border-gray-200 py-1 px-[5px] md:block"
        aria-pressed={isSuperSaver}
      >
        <div
          className={cn(
            "relative flex h-full w-full cursor-pointer items-center rounded-full p-0.5 transition-all",
            isSuperSaver ? "bg-gradient-to-b from-green-500 to-green-600" : "bg-gray-300"
          )}
        >
          <div
            className={cn(
              "absolute h-8 w-8 rounded-full bg-[#FCF65D] p-[3px] shadow-md transition-transform duration-500 ease-in-out",
              isSuperSaver ? "translate-x-[72px]" : "translate-x-0"
            )}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F5D657] shadow-[inset_1px_0px_0px_0px_#EAB917]">
              <span className="text-lg font-bold text-green-700">₹</span>
            </div>
          </div>
          <span
            className={cn(
              "absolute left-3 font-bold italic text-white transition-opacity duration-300",
              isSuperSaver ? "opacity-100" : "opacity-0"
            )}
          >
            Saver
          </span>
        </div>
      </button>

      {/* Mobile Toggle */}
      <div className="flex h-12 w-full rounded-full bg-muted p-1 drop-shadow-md md:hidden">
        <button
          onClick={() => setSuperSaver(false)}
          className={cn(
            "flex-1 rounded-full text-center font-semibold transition-all duration-300",
            !isSuperSaver
              ? "bg-background text-foreground shadow-sm"
              : "bg-transparent text-muted-foreground"
          )}
        >
          Regular
        </button>
        <button
          onClick={() => setSuperSaver(true)}
          className={cn(
            "flex-1 rounded-full text-center font-semibold transition-all duration-300",
            isSuperSaver
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-transparent text-muted-foreground"
          )}
        >
          Super Saver
        </button>
      </div>
    </>
  );
}
