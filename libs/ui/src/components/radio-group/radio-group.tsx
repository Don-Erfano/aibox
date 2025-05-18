import { Label } from '../label';
import { RadioGroup as RadioGroupRoot, RadioGroupItem } from './components';
import { RadioGroupProps } from './types';

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  defaultValue,
  items,
  isDisabled,
}) => {
  return (
    <RadioGroupRoot
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={isDisabled}
    >
      {items &&
        items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <RadioGroupItem value={item.value} id={item.id} />
            <Label
              className="font-normal text-sm leading-6 text-zinc-600"
              htmlFor={item.id}
            >
              {item.label}
            </Label>
          </div>
        ))}
    </RadioGroupRoot>
  );
};

export default RadioGroup;
