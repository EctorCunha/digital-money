import React from "react";
import { Input, InputProps } from "@chakra-ui/react";
import ReactInputMask, { Props } from "react-input-mask";

export type FieldInputMaskProps = InputProps & Props;

const FieldInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  FieldInputMaskProps
> = (props, ref) => {
  return (
    <Input
      as={ReactInputMask}
      background={"#E1F5FE"}
      border="0px"
      borderRadius="10px"
      autoComplete="off"
      h="64px"
      w="100%"
      ref={ref}
      {...props}
    />
  );
};

export const FieldInputMask = React.forwardRef(FieldInput);
