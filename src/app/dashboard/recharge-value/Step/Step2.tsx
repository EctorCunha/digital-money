"use client";
import { useGetCards } from "@/query/use-get-cards";
import { Text, Divider, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Card from "../components/Card";
import React from "react";
import { DefaultButton } from "@/components/Button";
import { Link } from "@chakra-ui/next-js";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useStep } from "@/contexts/steps";
import { useFormContext } from "react-hook-form";
import { RadioGroupController } from "@/components/RadioGroup/RadioGroupController";
export const Step2 = () => {
  const { data: session } = useSession();

  const { data } = useGetCards({
    account_id: session?.user?.user_info?.id ?? 0,
  });

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { setStep } = useStep();

  const validateSecondStep = async () => {
    const triggerErrors = await Promise.resolve(
      trigger("card", {
        shouldFocus: true,
      })
    );

    if (triggerErrors) {
      setStep(3);
    }
  };

  return (
    <Flex
      h="auto"
      w="100%"
      p={{ base: "25px", sm: "40px" }}
      background={"#201F22"}
      borderRadius={"8px"}
      flexDir={"column"}
      gap={"2rem"}
      overflow={"hidden"}
    >
      <Heading
        fontWeight="700"
        fontSize="24px"
        lineHeight="33px"
        color="#C1FD35"
      >
        Selecione um cartão
      </Heading>

      <VStack
        borderRadius={"8px"}
        spacing={"1rem"}
        align={"flex-start"}
        bg="white"
        p="40px"
        overflow={"auto"}
      >
        {data?.map((card, index) => {
          return (
            <RadioGroupController
              rules={{ required: true }}
              name="card"
              key={card.id}
              w="full"
              control={control}
            >
              <Card card={card} />
              {index !== data.length - 1 && <Divider my="0.5rem" />}
            </RadioGroupController>
          );
        })}
      </VStack>

      {errors.card?.message && (
        <Text color={"#FF0000"}>{errors.card.message.toString()}</Text>
      )}

      <HStack w="full" justifyContent={"space-between"}>
        <Link href={"/dashboard/cards/create-card"} style={{ width: "100%" }}>
          <HStack w="100%">
            <HiOutlinePlusCircle size={"34px"} color="#C1FD35" />
            <Text
              fontWeight="700"
              fontSize="20px"
              lineHeight="24px"
              color={"#C1FD35"}
            >
              Novo cartão
            </Text>
          </HStack>
        </Link>

        <DefaultButton
          maxW={"233px"}
          label="Continuar"
          onClick={validateSecondStep}
        />
      </HStack>
    </Flex>
  );
};
