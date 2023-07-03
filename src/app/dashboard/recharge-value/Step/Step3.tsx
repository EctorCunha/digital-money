"use client";
import { DefaultButton } from "@/components/Button";
import { useStep } from "@/contexts/steps";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputCurrencyController } from "@/components/FieldCurrency/FieldCurrencyController";

interface Step3Props {
  value: string;
}

export const Step3 = () => {
  const {
    watch,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<Step3Props>();

  const watchDeposit = watch("value");

  const { setStep } = useStep();

  const validateThirdStep = async () => {
    const triggerErrors = await Promise.resolve(
      trigger("value", {
        shouldFocus: true,
      })
    );

    if (triggerErrors) {
      setStep(4);
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
        Quanto deseja depositar na sua conta?
      </Heading>

      <InputCurrencyController control={control} name="value" />

      {errors.value?.message && (
        <Text color={"#FF0000"}>{errors.value.message}</Text>
      )}

      <DefaultButton
        label={"Continuar"}
        border={"0px"}
        _hover={
          watchDeposit === undefined
            ? { background: "#CECECE" }
            : { background: "#C1FD35" }
        }
        onClick={validateThirdStep}
        background={watchDeposit === undefined ? "#cececef0" : "#c1fd35ed"}
      />
    </Flex>
  );
};
