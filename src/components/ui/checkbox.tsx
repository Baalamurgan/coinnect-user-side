import { cn } from "@/lib/utils";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./styles.css";

type Props = {
  id: string;
  label: string;
  value: string;
  labelClassName?: string;
  onCheckedChange: (checked: boolean) => void;
};

const Checkbox = ({
  id,
  label,
  value,
  labelClassName,
  onCheckedChange,
}: Props) => (
  <div className="flex items-center">
    <RadixCheckbox.Root
      className="CheckboxRoot"
      id={id}
      value={value}
      onCheckedChange={onCheckedChange}
    >
      <RadixCheckbox.Indicator className="CheckboxIndicator">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    {label && (
      <label className={cn("!text-black ml-2", labelClassName)} htmlFor={id}>
        {label}
      </label>
    )}
  </div>
);

export default Checkbox;
