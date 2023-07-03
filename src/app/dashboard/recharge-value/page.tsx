"use client";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Step1 } from "./Step/Step1";
import { useStep } from "@/contexts/steps";
import { Step2 } from "./Step/Step2";
import { Step3 } from "./Step/Step3";
import { FormProvider, useForm } from "react-hook-form";
import { FormRechargeForm, TypeFormRechargeForm } from "./Step/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step4 } from "./Step/Step4";
import { Step5 } from "./Step/Step5";
import { useEffect } from "react";
import RechargeValueLink from "./components/RechargeValueLink";

export default function RechargeValue() {
  const { step, setStep } = useStep();

  const methods = useForm<TypeFormRechargeForm>({
    resolver: zodResolver(FormRechargeForm),
    mode: "onChange",
  });

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  const isSm = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid
        p={{
          base: "20px 20px 42px 20px",
          sm: "68px 52px 85px 50px",
          lg: "40px 79px 42px 79px",
        }}
      >
        <FormProvider {...methods}>
          <Flex
            h="100%"
            w="100%"
            p={{
              base: "20px 20px 61px 20px",
              sm: "68px 52px 85px 50px",
              lg: "58px 95px 42px 95px",
            }}
            flexDir={"column"}
            gap={"20px"}
            maxH="calc(100vh - 128px)"
          >
            {isSm && <RechargeValueLink />}

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </Flex>
        </FormProvider>
      </TemplateGrid>
    </Template>
  );
}
