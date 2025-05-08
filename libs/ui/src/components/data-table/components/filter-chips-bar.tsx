import { X } from 'lucide-react';
import { FilterChipsBarProps } from '../types';
import { Badge } from '../../badge';

export function FilterChipsBar({
  chips,
  onRemove,
  chipCount,
}: FilterChipsBarProps) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const valueDisplay = Array.isArray(chip.value)
          ? chip.value.join(', ')
          : String(chip.value);

        return (
          <Badge
            key={chip.key}
            variant="outline"
            className="flex items-center px-2 py-1 rounded-md"
          >
            <span className="text-sm">
              {chip.label}: {valueDisplay}
            </span>
            <button
              onClick={() => onRemove(chip.key)}
              className="ml-1 flex items-center justify-center focus:outline-none"
              aria-label={`Remove ${chip.label}`}
            >
              <X size={12} />
            </button>
          </Badge>
        );
      })}

      <span className="text-sm text-muted-foreground px-2 py-1 border border-primary rounded-md">
        {chipCount}
      </span>
    </div>
  );
}
