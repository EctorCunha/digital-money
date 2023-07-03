import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { RadioGroup, RadioGroupProps } from "@chakra-ui/radio";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

interface RadioControllerProps extends RadioGroupProps {
  name: string;
  label?: string;
  error?: FieldError;
  control?: Control<any>;
  defaultValue?: any;
  children: React.ReactNode;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

export function RadioGroupController(props: RadioControllerProps) {
  const {
    control,
    rules,
    defaultValue,
    name,
    error,
    label,
    children,
    ...rest
  } = props;

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel
          fontFamily="Mulish"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight={"20px"}
          color="#F5F5FA"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <RadioGroup
            fontStyle="normal"
            fontWeight="400"
            fontSize="16px"
            color={"#F5F5FA"}
            {...rest}
            {...field}
          >
            {children}
          </RadioGroup>
        )}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
