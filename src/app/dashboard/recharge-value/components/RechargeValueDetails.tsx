import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFormContext } from "react-hook-form";
import { useSession } from "next-auth/react";

export const RechargeValueDetails = () => {
  const { watch } = useFormContext();

  const valueWatch = watch("value");

  const { data: session } = useSession();

  return (
    <Flex
      w="100%"
      p={{ base: "25px", sm: "40px" }}
      background={"#201F22"}
      borderRadius={"8px"}
      flexDir={"column"}
    >
      <VStack spacing={"25px"} align={"flex-start"}>
        <Heading
          fontWeight="400"
          fontSize={{ base: "12px", sm: "16px" }}
          lineHeight="16px"
          color="#FFFFFF"
        >
          {format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
            locale: ptBR,
          })}
        </Heading>

        <Text
          color={"#C1FD35"}
          fontWeight="700"
          fontSize={{ base: "16", sm: "20px" }}
          lineHeight="22px"
        >
          {`R$ ${valueWatch}`}
        </Text>

        <VStack spacing={"8px"} align={"flex-start"}>
          <Text
            color={"#FFFFFF"}
            fontWeight="400"
            fontSize="12px"
            lineHeight="16px"
          >
            Para
          </Text>

          <Text
            color={"#C1FD35"}
            fontWeight="700"
            fontSize="20px"
            lineHeight="24px"
          >
            Conta própria
          </Text>
        </VStack>

        <VStack spacing={"8px"} align={"flex-start"}>
          <Text
            color={"#FFFFFF"}
            fontWeight="400"
            fontSize=" 16px"
            lineHeight="22px"
          >
            {session?.user?.user_info?.alias}
          </Text>

          <Text
            color={"#FFFFFF"}
            fontWeight="400"
            fontSize=" 12px"
            lineHeight="16px"
          >
            {`CVU ${session?.user?.user_info?.cvu}`}
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};
