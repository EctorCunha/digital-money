import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "@/query/use-get-cards";
import { ServiceDetail } from "@/query/use-get-service-by-id";

interface ServiceDetailsProps {
  service: ServiceDetail | undefined;
  card: string;
}

export const ServiceDetails = ({ service, card }: ServiceDetailsProps) => {
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
          {`R$ ${service?.invoice_value}`}
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
            {service?.name}
          </Text>
        </VStack>

        <VStack spacing={"8px"} align={"flex-start"}>
          <Text
            color={"#FFFFFF"}
            fontWeight="400"
            fontSize=" 16px"
            lineHeight="22px"
          >
            Cartão
          </Text>

          <Text
            color={"#FFFFFF"}
            fontWeight="400"
            fontSize=" 12px"
            lineHeight="16px"
          >
            ************{`${String(card).slice(-4)}`}
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};
