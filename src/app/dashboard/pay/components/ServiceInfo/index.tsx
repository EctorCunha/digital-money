"use client";
import { Divider, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Service } from "@/query/use-get-services";

interface ServiceInfoProps {
  service: Service;
}

export const ServiceInfo = (props: ServiceInfoProps) => {
  const { service } = props;

  return (
    <>
      <HStack
        spacing={"16px"}
        w="100%"
        align={"center"}
        justifyContent={"space-between"}
        fontSize={{ base: "14px", sm: "16px" }}
      >
        <Flex
          w={"100%"}
          gap={4}
          align="center"
          justifyContent="space-between"
          py={"1.5rem"}
        >
          <Text>{service.name}</Text>
          <Link
            style={{ fontWeight: "700" }}
            href={`/dashboard/pay/${service.id}/?date=${service.date}&name=${service.name}`}
          >
            Selecionar
          </Link>
        </Flex>
      </HStack>
      <Divider borderBottomColor={"blackAlpha.600"} />
    </>
  );
};
