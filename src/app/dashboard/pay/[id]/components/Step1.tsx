"use client";
import { DefaultButton } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { useStepPayService } from "@/contexts/step_pay_service";
import { ServiceDetail } from "@/query/use-get-service-by-id";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Step1Props {
  data: ServiceDetail;
}
interface Step1Forms {
  accountNumber: number;
}

export default function Step1({ data }: Step1Props) {
  const {
    watch,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<Step1Forms>();

  const accountNumberValue = watch("accountNumber");

  const { setStep } = useStepPayService();

  const { data: session } = useSession();

  const { push } = useRouter();

  useEffect(() => {
    if (session?.user.user_data.dni)
      setValue("accountNumber", session?.user.user_data.dni);
  }, [session, setValue]);

  const validateTFirstStep = async () => {
    try {
      const triggerErrors = await Promise.resolve(
        trigger("accountNumber", {
          shouldFocus: true,
        })
      );

      if (data?.invoice_value == "0") {
        push("/dashboard/pay/error-invoice");
      } else {
        if (triggerErrors) {
          setStep(2);
        }
      }
    } catch (err) {
      console.log(err);
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
    >
      <Heading
        fontWeight="700"
        fontSize="24px"
        lineHeight="33px"
        color="#C1FD35"
      >
        Número da conta
      </Heading>

      <FieldInputController isDisabled control={control} name="accountNumber" />

      {errors.accountNumber?.message && (
        <Text color={"#FF0000"}>{errors.accountNumber?.message}</Text>
      )}

      <DefaultButton
        label={"Continuar"}
        border={"0px"}
        onClick={validateTFirstStep}
        background={
          accountNumberValue === undefined ? "#cececef0" : "#c1fd35ed"
        }
      />
    </Flex>
  );
}
