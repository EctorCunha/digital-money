"use client";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ServiceInfo } from "../ServiceInfo";
import { Service } from "@/query/use-get-services";

interface ServicesProps {
  services: Service[] | undefined;
}

export const Services = ({ services }: ServicesProps) => {
  const router = useRouter();

  return (
    <Flex
      background="#FFF"
      p={{
        base: "15px 23px 23px 22px",
        sm: "16px 19px 47px 27px",
        md: "32px 60px 47px 25px",
      }}
      flexDir={"column"}
      borderRadius={"8px"}
      w="100%"
    >
      <Text
        color="#201F22"
        fontWeight="700"
        fontSize="16px"
        lineHeight="22px"
        py={"2rem"}
      >
        Mais recentes
      </Text>

      <Divider borderBottomColor={"blackAlpha.600"} />

      {services?.map((service) => {
        return <ServiceInfo key={service.id} service={service} />;
      })}
    </Flex>
  );
};
