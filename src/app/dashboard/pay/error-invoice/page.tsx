"use client";
import { DefaultButton } from "@/components/Button";
import { Divider, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { Template } from "@/components/Template";
import iconX from "public/icon-x.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ErrorInvoice() {
  const { push } = useRouter();

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid>
        <VStack
          p={{
            base: "20px 20px 42px 20px",
            sm: "68px 52px 85px 50px",
            lg: "40px 79px 42px 79px",
          }}
          spacing={"20px"}
          w="100%"
          align={"flex-start"}
          maxH={"calc(100vh - 128px)"}
          h="100%"
          overflow={"auto"}
        >
          <VStack spacing={"28px"} w="100%">
            <Flex
              w="100%"
              p={{ base: "25px", sm: "40px" }}
              background={"#201F22"}
              borderRadius={"8px"}
              flexDir={"column"}
            >
              <VStack spacing={"25px"} align={"flex-start"}>
                <Stack
                  w="full"
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "center", sm: "flex-end" }}
                  justify={"space-between"}
                  gap={"20px"}
                >
                  <Flex
                    gap="30px"
                    align={"center"}
                    justify={"center"}
                    direction={"column"}
                    width={"100%"}
                  >
                    <Image src={iconX} alt="icone de erro" />
                    <Text
                      color={"#FFFFFF"}
                      fontWeight="700"
                      fontSize={{ base: "20", sm: "36px" }}
                      lineHeight="32px"
                    >
                      Não encontramos faturas associadas a esses dados
                    </Text>
                  </Flex>
                </Stack>

                <Divider borderBottomColor="#cecece" />

                <VStack
                  spacing={"8px"}
                  align={"center"}
                  justify={"center"}
                  width={"100%"}
                >
                  <Text
                    color={"#CECECE"}
                    fontWeight="400"
                    fontSize="20px"
                    lineHeight="20px"
                  >
                    Revise os dados adicionados. Se estão corretos, é possível
                    que a empresa ainda não tenha carregado a sua fatura.{" "}
                  </Text>
                </VStack>
              </VStack>
            </Flex>

            <Stack
              w="full"
              direction={{ base: "column", sm: "row" }}
              align={{ base: "center", sm: "flex-end" }}
              justify={"flex-end"}
              gap={"20px"}
            >
              <DefaultButton
                label={"Tentar novamente "}
                border={"0px"}
                maxW={{ base: "unset", sm: "233px" }}
                w="100%"
                onClick={() => push("/dashboard/pay")}
              />
            </Stack>
          </VStack>
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
