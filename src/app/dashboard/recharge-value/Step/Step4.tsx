"use client";
import { DefaultButton } from "@/components/Button";
import {
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { SlNote } from "react-icons/sl";
import { TypeFormRechargeForm } from "./schema";
import { useCreateTransferenceDeposit } from "@/query/use-mutate-transference-deposit";
import { useStep } from "@/contexts/steps";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
export const Step4 = () => {
  const { data: session } = useSession();

  const toast = useToast();

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormContext();

  const valueWatch = watch("value");

  const { setStep } = useStep();

  const { mutateAsync: createTransferenceDeposit } =
    useCreateTransferenceDeposit();
  const submitForm = async (data: TypeFormRechargeForm) => {
    if (!data || !session) {
      return;
    }

    try {
      await createTransferenceDeposit({
        amount: data.value,
        dated: parseISO(format(new Date(), "yyyy-MM-dd", { locale: ptBR })),
        account_id: String(session.user.user_info.id),
        destination: session?.user?.user_info?.cvu,
        origin: session?.user?.user_info?.cvu,
      });

      toast({
        title: "Sucesso",
        description: "Depósito realizado.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível realizar o depósito.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setStep(5);
    }
  };

  return (
    <Flex
      w="100%"
      p={{ base: "25px", sm: "40px" }}
      background={"#201F22"}
      borderRadius={"8px"}
      flexDir={"column"}
      gap={"45px"}
      as={"form"}
      onSubmit={handleSubmit(submitForm as any)}
    >
      <Heading
        fontWeight="700"
        fontSize="24px"
        lineHeight="33px"
        color="#C1FD35"
      >
        Revise se está tudo correto
      </Heading>

      <VStack spacing={"30px"} align={"flex-start"}>
        <VStack align={"flex-start"} spacing={"8px"}>
          <HStack
            maxW={"160px"}
            w="100%"
            gap={"10px"}
            justifyContent={"space-between"}
          >
            <Text
              color={"#FFFFFF"}
              fontWeight="400"
              fontSize="16px"
              lineHeight="22px"
            >
              Vai transferir
            </Text>
            <SlNote color="#C1FD35" size={"30px"} />
          </HStack>

          <Text
            color={"#FFFFFF"}
            fontWeight="700"
            fontSize="16px"
            lineHeight="22px"
          >
            {`R$ ${valueWatch}`}
          </Text>
        </VStack>

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
            color={"#FFFFFF"}
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

      <DefaultButton
        type="submit"
        isLoading={isSubmitting}
        label={"Continuar"}
        border={"0px"}
      />
    </Flex>
  );
};
