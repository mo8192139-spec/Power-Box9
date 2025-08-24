import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdminInputProps {
  label: string;
  type?: "text" | "number" | "email" | "url" | "textarea";
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export const AdminInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, AdminInputProps>(
  ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    className,
    rows = 3,
    min,
    max,
    step,
    description,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
      onChange(newValue);
    };

    const inputProps = {
      value: value,
      onChange: handleChange,
      placeholder,
      required,
      className: cn("w-full", className),
      ...props,
    };

    const numberProps = type === "number" ? { min, max, step } : {};

    return (
      <div className="space-y-2">
        <Label htmlFor={label} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        {type === "textarea" ? (
          <Textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            id={label}
            rows={rows}
            {...inputProps}
          />
        ) : (
          <Input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            id={label}
            type={type}
            {...inputProps}
            {...numberProps}
          />
        )}
        
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    );
  }
);

AdminInput.displayName = "AdminInput";
