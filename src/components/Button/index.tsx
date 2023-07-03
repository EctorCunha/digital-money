import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, useMemo } from "react";

type Variants = "primary" | "secondary" | "home1" | "home2";

interface DefaultButtonProps extends Omit<ButtonProps, Variants> {
  label: string;
  variant?: Variants;
}

export const DefaultButton: FC<DefaultButtonProps> = (props: DefaultButtonProps) => {
  const { label, variant = "primary", ...rest } = props;

  const stylesByVariant = useMemo((): Record<Variants, ButtonProps> => {
    return {
      primary: {
        background: "#C1FD35",
        border: "1px solid #C1FD35",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: { base: "50px", sm: "64px" },
        textAlign: "center",
        w: "100%",
        _active: {
          background: "#C1FD35",
        },
        _hover: {
          filter: "brightness(105%)",
        },
      },
      secondary: {
        background: "#CECECE",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: { base: "50px", sm: "64px" },
        textAlign: "center",
        w: "100%",
        _active: {
          background: "#CECECE",
        },
        _hover: {
          background: "#cececee6",
        },
      },
      home1: {
        background: "none",
        border: "1px solid #C1FD35",
        borderRadius: "5px",
        textAlign: "center",
        color: "#C1FD35",
        w: "100%",
        height: "100%",
        _hover: {
          boxShadow: "4px 4px 4px #c1fd355d",
          transition: "0.2s",
          transform: "translateY(-1px)",
        },
      },
      home2: {
        background: "#C1FD35",
        border: "1px solid #C1FD35",
        borderRadius: "5px",
        fontWeight: "bold",
        textAlign: "center",
        color: "#000000",
        w: "100%",
        height: "100%",
        _hover: {
          boxShadow: "5px 5px 4px #c1fd355d",
          transition: "0.2s",
          transform: "translateY(-1px)",
        },
      },
    };
  }, []);

  return (
    <Button {...stylesByVariant[variant]} {...rest}>
      {label}
    </Button>
  );
};
