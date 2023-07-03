import React, { forwardRef } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
type InputProps = CurrencyInputProps;

const InputCurrency: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ ...rest }, ref) => {
  return (
    <CurrencyInput
      style={{
        background: "#E1F5FE",
        border: "0px",
        borderRadius: "10px",
        height: "64px",
        width: "100%",
        paddingLeft: "10px",
        outline: "none",
      }}
      autoComplete="off"
      decimalSeparator=","
      groupSeparator="."
      allowNegativeValue={false}
      prefix="R$"
      ref={ref}
      {...rest}
    />
  );
};

export const InputCurrencyComponent = forwardRef(InputCurrency);
