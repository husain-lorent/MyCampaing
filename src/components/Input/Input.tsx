import { Input } from "@mantine/core";
import { FC, ReactNode } from "react";

type CustomInputProps = {
  className?: string;
  icon?: ReactNode | string;
  variant?: string;
  placeholder?: string;
  radius?: string;
  rightSection?: string;
  disabled?: boolean;
  invalid?: boolean;
  component?: string;
  type?: string;
  register?: any;
  required?: boolean;
  name?: string;
  error?: any;
};

const CustomInput: FC<CustomInputProps> = ({
  className,
  icon,
  variant,
  placeholder,
  radius,
  rightSection,
  disabled,
  invalid,
  component,
  type,
  register,
  required,
  name,
  error,
}) => {
  return (
    <Input
      type={type}
      className={className}
      icon={icon}
      variant={variant}
      placeholder={placeholder}
      radius={radius}
      disabled={disabled}
      invalid={invalid}
      rightSection={rightSection}
      component={component}
      error={error}
      {...register(name, { required })}
    />
  );
};

export default CustomInput;
