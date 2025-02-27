"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChainDropdownItems } from "@/lib/types";

type ComboboxProps = {
  chains: ChainDropdownItems[];
  value: string;
  setValue: (value: string) => void;
};

export function Combobox({ chains, value, setValue }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? chains.find((chain) => chain.value === value)?.label
            : "Select chain..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search chain..." className="h-9" />
          <CommandList>
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              {chains.map((chain) => (
                <CommandItem
                  key={chain.value}
                  value={chain.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {chain.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === chain.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
