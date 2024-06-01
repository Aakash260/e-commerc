"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

import React from "react";

const MultiSelect = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((coll) => coll.id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter((collection) =>
    selected.includes(collection)
  );
  console.log(selectables);
  return (
    <Command>
      <div>
        <div className="flex gap-1 flex-wrap border rounded-md">
          {selectables.map((collection) => (
            <Badge key={collection.id}>
              {collection.title}
              <button
                type="button"
                className="ml-1 hover:text-red-1"
                onClick={() => onRemove(collection.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="mt-2 ">
        {open && (
          <CommandGroup className="absolute z-30 top-[50%] left-[-20] bg-white w-[50vw] min-h-[150px] overflow-y-auto  border rounded-md shadow-md">
            {collections.map((collection): any => {
              return (
                <CommandItem
                  key={collection.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => onChange(collection.id)}
                >
                  {collection.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
