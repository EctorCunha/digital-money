"use client";
import { DefaultButton } from "@/components/Button";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useStep } from "@/contexts/steps";
import { RechargeValueDetails } from "../components/RechargeValueDetails";

export const Step5 = () => {
  const { setStep } = useStep();

  const { push } = useRouter();

  return (
    <VStack spacing={"28px"}>
      <VStack
        borderRadius={"8px"}
        background={"#C1FD35"}
        w="100%"
        py="20px"
        spacing={"11px"}
      >
        <AiOutlineCheckCircle size={"60px"} color="#000000" />

        <Heading
          fontWeight="700"
          fontSize={{ base: "16px", sm: "24px" }}
          color="#000000"
          lineHeight="33px"
          textAlign={"center"}
          px="10px"
        >
          Já depositamos o dinheiro na sua conta
        </Heading>
      </VStack>

      <RechargeValueDetails />

      <Stack
        w="full"
        direction={{ base: "column", sm: "row" }}
        align={{ base: "center", sm: "flex-end" }}
        justify={"flex-end"}
        gap={"20px"}
      >
        <DefaultButton
          label={"Voltar ao início"}
          border={"0px"}
          maxW={{ base: "unset", sm: "233px" }}
          w="100%"
          onClick={() => {
            push("/dashboard/home");
            setStep(1);
          }}
        />

        <DefaultButton
          maxW={{ base: "unset", sm: "233px" }}
          w="100%"
          variant="secondary"
          label={"Baixar Comprovante"}
          border={"0px"}
        />
      </Stack>
    </VStack>
  );
};
