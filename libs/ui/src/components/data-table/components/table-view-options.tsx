"use client";

import { useMemo } from "react";
import { Settings2 } from "lucide-react";
import { PopoverContent, PopoverTrigger, Popover } from "../../popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../../command";

import { Button, Checkbox } from "../../form";
import { TableViewOptionsProps } from "../types";

export function TableViewOptions<TData>({
  table,
}: TableViewOptionsProps<TData>) {
  const columns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        ),
    [table],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Toggle columns" variant="subtle" size="sm">
          <Settings2 />
          نمایش
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  className="flex h-9 w-full justify-between"
                  onSelect={() =>
                    column.toggleVisibility(!column.getIsVisible())
                  }
                >
                  <span className="truncate">
                    {column.columnDef.meta?.label ?? column.id}
                  </span>
                  <Checkbox checked={column.getIsVisible()} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
