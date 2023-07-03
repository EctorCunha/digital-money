import React from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Control, Controller, FieldError } from "react-hook-form";
import { CurrencyInputProps } from "react-currency-input-field";
import { InputCurrencyComponent } from ".";

type InputCurrencyControllerProps = CurrencyInputProps & {
  label?: string;
  name: string;
  error?: FieldError;
  isDirty?: boolean;
  control: Control<any>;
  defaultValue?: any;
  inputProps?: CurrencyInputProps;
};

export const InputCurrencyController = (
  props: InputCurrencyControllerProps
) => {
  const { control, name, label, defaultValue, error, inputProps, ...rest } =
    props;

  return (
    <FormControl border={"none !important"} isInvalid={!!error}>
      {label && (
        <FormLabel mr={"0"} htmlFor={name}>
          {label}
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <InputCurrencyComponent
            onValueChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            value={field.value}
            ref={field.ref}
          />
        )}
      />

      {!!error && (
        <FormErrorMessage colorScheme="red">{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
