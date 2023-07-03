"use client";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { FC } from "react";

interface FooterProps extends FlexProps {}

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  return (
    <Flex
      py="25px"
      pl={{ base: "unset", sm: "20px" }}
      h="64px"
      background={"#3A393E"}
      justifyContent={{ base: "center", sm: "unset" }}
      {...props}
    >
      <Text fontWeight="400" color={"#C1FD35"} fontSize="14px">
        © 2022 Digital Money House
      </Text>
    </Flex>
  );
};
