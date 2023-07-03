import { Button, ButtonProps, Flex, HStack, Text } from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";

interface ButtonDashboardProps extends Omit<ButtonProps, "leftIcon"> {
  label: string;
  leftIcon: React.ReactNode;
}

export const ButtonDashboard = (props: ButtonDashboardProps) => {
  const { label, leftIcon, ...rest } = props;

  return (
    <Button
      justifyContent={"flex-start"}
      w="100%"
      px={{ base: "25px", sm: "35px" }}
      background={"#201F22"}
      {...rest}
      borderRadius={"8px"}
      _hover={{
        background: "#201f22f4",
      }}
      color={"#C1FD35"}
      fontWeight={700}
      fontSize=" 20px"
      line-height="24px"
      whiteSpace={"break-spaces"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      h={{ base: "122px", sm: "157px" }}
    >
      <HStack w="100%" justify={"space-between"}>
        <Flex alignItems={"center"} gap={"16px"}>
          {leftIcon}
          <Text>{label}</Text>
        </Flex>

        <BsArrowRightShort size={"33px"} color="#C1FD35" />
      </HStack>
    </Button>
  );
};
