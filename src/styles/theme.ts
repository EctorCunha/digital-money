import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const theme: ThemeConfig = extendTheme({
  // breakpoints: {
  //   sm: "390px",
  //   md: "834px",
  //   lg: "62em",
  //   xl: "80em",
  //   "2xl": "1440px",
  // },
  fonts: {
    body: "var(--font-openSans)",
  },
  colors: {
    white: {
      500: "#E3DFCF",
    },
    green: {
      500: "#C1FD35",
    },
    gray: {
      400: "#E3DFCF",
      500: "#3A393E",
    },
  },
  useSystemColorMode: true,
  components: {},
  styles: {
    global: (props: StyleFunctionProps) => ({
      html: {
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        overflow: "auto",
      },
    }),
  },
});
