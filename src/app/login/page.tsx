"use client";
import { DefaultButton } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { Template } from "@/components/Template";
import { Text, Flex, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { loginSchema, zodInfer } from "./schema";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [step, setStep] = useState(0);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const { push } = useRouter();

  const onSubmit = async (data: zodInfer) => {
    const response = await signIn("credentials", {
      email: data.login,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      setLoginErrorMessage("Senha incorreta, tente novamente");
      return;
    }

    if (response?.ok) {
      return push("/dashboard/home");
    }
  };

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<zodInfer>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const checkIfError = useCallback(async () => {
    const result = await trigger("login", { shouldFocus: true });

    if (result) {
      setStep(1);
    }
  }, [trigger]);

  return (
    <Template>
      <Flex
        as="form"
        flexDir={"column"}
        onSubmit={handleSubmit(onSubmit)}
        h="100%"
        w="100%"
        background="#272727"
        alignItems="center"
        justifyContent="center"
        p={{ base: "45px", sm: "unset" }}
      >
        {step === 0 && (
          <VStack spacing={"20px"} maxW={"360px"} w="100%">
            <Text mt="15px" fontWeight=" 700" fontSize=" 20px" lineHeight=" 24px" color="#FFFF" textAlign="center">
              Olá! Digite seu endereço de e-mail
            </Text>

            <FieldInputController name="login" type="email" control={control} error={errors.login} placeholder="E-mail" />

            <DefaultButton label="Continuar" onClick={checkIfError} />
            <DefaultButton variant="secondary" label="Criar conta" onClick={() => push("/signup")} />
            {errors.login && <Text color={"red"}>{errors.login.message}</Text>}
          </VStack>
        )}

        {step === 1 && (
          <VStack spacing={"20px"} maxW={"360px"} w="100%">
            <Text mt="15px" fontWeight=" 700" fontSize=" 20px" lineHeight=" 24px" color="#FFFF" textAlign="center">
              Digite sua senha
            </Text>

            <FieldInputController placeholder="Senha" control={control} name="password" type="password" error={errors.password} />

            <DefaultButton isLoading={isSubmitting} label="Continuar" type="submit" />
            <DefaultButton variant="secondary" label="Voltar" onClick={() => setStep(0)} />
            {loginErrorMessage && <Text color="red">{loginErrorMessage}</Text>}
            {errors.password && <Text color="red">{errors.password.message}</Text>}
          </VStack>
        )}
      </Flex>
    </Template>
  );
}
