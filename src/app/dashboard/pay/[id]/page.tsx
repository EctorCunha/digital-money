"use client";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { Flex } from "@chakra-ui/react";
import { Success } from "./components/Success";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetServiceById } from "@/query/use-get-service-by-id";
import { FormProvider, useForm } from "react-hook-form";
import { useStepPayService } from "@/contexts/step_pay_service";
import Step1 from "./components/Step1";
import { useEffect } from "react";
import Step2 from "./components/Step2";
import { FormPayService, TypeFormPayService } from "./schema";

interface PageParams {
  params: {
    id: number;
  };
}

export default function ServiceDetail({ params }: PageParams) {
  const id = params.id;

  const methods = useForm<TypeFormPayService>({
    resolver: zodResolver(FormPayService),
    mode: "onChange",
  });

  const { data } = useGetServiceById({ id: id });

  const { step, setStep } = useStepPayService();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid
        p={{
          base: "20px 20px 42px 20px",
          sm: "68px 52px 85px 50px",
          lg: "40px 79px 42px 79px",
        }}
      >
        <Flex
          h="100%"
          w="100%"
          flexDir={"column"}
          gap={"20px"}
          maxH="calc(100vh - 128px)"
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
              overflow={"auto"}
            >
              {step === 1 && <Step1 data={data!} />}
              {step === 2 && <Step2 data={data!} />}
              {step === 3 && <Success data={data!}/>}
            </Flex>
          </FormProvider>
        </Flex>
      </TemplateGrid>
    </Template>
  );
}
