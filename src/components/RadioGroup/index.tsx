import React, { forwardRef } from "react";
import { Radio, RadioProps } from "@chakra-ui/react";

export interface RadioComponentProps extends RadioProps {}

const RadioComponent: React.ForwardRefRenderFunction<
  HTMLInputElement,
  RadioComponentProps
> = (props, ref) => {
  return (
    <Radio
      _focus={{ boxShadow: "none" }}
      colorScheme={"brand"}
      bgColor="inherit"
      fontStyle="normal"
      fontWeight="400"
      fontSize="16px"
      {...props}
    />
  );
};

export const RadioChakraComponent = forwardRef(RadioComponent);
