"use client";
import Card from "@/app/dashboard/recharge-value/components/Card";
import { DefaultButton } from "@/components/Button";
import { RadioGroupController } from "@/components/RadioGroup/RadioGroupController";
import { useStepPayService } from "@/contexts/step_pay_service";
import { useGetAccount } from "@/query/use-get-account";
import { useGetCards } from "@/query/use-get-cards";
import {
  ServiceDetail,
  useGetServiceById,
} from "@/query/use-get-service-by-id";
import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Step2Props {
  data: ServiceDetail;
}

export default function Step2({ data }: Step2Props) {
  const { data: session } = useSession();

  const { setStep } = useStepPayService();

  const { data: accountData } = useGetAccount();

  const { push } = useRouter();

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { data: cards } = useGetCards({
    account_id: session?.user?.user_info?.id ?? 0,
  });

  const validateSecondStep = async () => {
    try {
      const triggerErrors = await Promise.resolve(
        trigger("card", {
          shouldFocus: true,
        })
      );

      if (
        accountData &&
        accountData?.available_amount < Number(data?.invoice_value)
      ) {
        push("/dashboard/pay/error-pay");
      }
      if (triggerErrors) {
        setStep(3);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        w="100%"
        p={{ base: "25px", sm: "40px" }}
        background={"#201F22"}
        borderRadius={"8px"}
        alignItems={"center"}
        gap={"45px"}
        justifyContent={"space-between"}
        color={"#FFFFF"}
      >
        <Heading as="h1" color={"#FFFFFF"}>
          Total a pagar
        </Heading>

        <Text color={"#FFFFFF"}>{`R$ ${data?.invoice_value ?? 0}`}</Text>
      </Flex>

      <VStack
        borderRadius={"8px"}
        spacing={"1rem"}
        align={"flex-start"}
        bg="white"
        p="40px"
        overflow={"auto"}
      >
        {cards?.map((card, index) => {
          return (
            <RadioGroupController
              name="card"
              key={card.id}
              w="full"
              control={control}
            >
              <Card card={card} />
              {index !== cards.length - 1 && <Divider my="0.5rem" />}
            </RadioGroupController>
          );
        })}
      </VStack>

      {errors.card?.message && (
        <Text color={"#FF0000"}>{errors.card.message.toString()}</Text>
      )}

      <DefaultButton
        maxW={"233px"}
        label="Pagar"
        type="submit"
        alignSelf={"end"}
        onClick={validateSecondStep}
      />
    </>
  );
}
