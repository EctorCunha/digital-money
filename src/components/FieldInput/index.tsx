import React from "react";
import { Input, InputProps } from "@chakra-ui/react";

const FieldInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  return (
    <Input
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

export default React.forwardRef(FieldInput);
