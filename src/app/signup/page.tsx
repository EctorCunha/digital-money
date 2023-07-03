"use client";
import { DefaultButton } from "@/components/Button";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { Template } from "@/components/Template";
import { Text, Flex, VStack, useToast, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, signupZodInfer } from "./schema";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/query/use-mutate-create-user";
import { FieldInputMaskController } from "@/components/FieldComponentMask/FieldMaskController";

export default function SignupPage() {
  const { push } = useRouter();
  const { mutateAsync } = useCreateUser();
  const toast = useToast();

  const onSubmit = async (userData: signupZodInfer) => {
    try {
      await mutateAsync({
        dni: Number(userData.dni),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        phone: userData.phone,
      });
      toast({
        title: "Sucesso",
        description: "Usuário criado.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      return push("/signup-success");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar usuário",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupZodInfer>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

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
        <VStack spacing={"20px"} maxW={{ base: "360px", md: "720" }} w="100%">
          <Stack spacing={"20px"} w="100%" direction={{ base: "column", md: "row" }}>
            <FieldInputController placeholder="Nome*" name="firstName" type="text" control={control} error={errors.firstName} />

            <FieldInputController placeholder="Sobrenome*" name="lastName" type="text" control={control} error={errors.lastName} />
          </Stack>

          <Stack spacing={"20px"} w="100%" direction={{ base: "column", md: "row" }}>
            <FieldInputMaskController mask={"999.999.999-99"} placeholder="CPF*" name="dni" type="text" control={control} error={errors.dni} />

            <FieldInputController placeholder="E-mail*" name="email" type="email" control={control} error={errors.email} />
          </Stack>

          <Text color="#FFFF" fontSize="14px">
            Use entre 6 e 20 caracteres (deve conter pelo menos 1 caractere especial, uma letra maiúscula e um número)
          </Text>

          <Stack spacing={"20px"} w="100%" direction={{ base: "column", md: "row" }}>
            <FieldInputController placeholder="Senha*" control={control} name="password" type="password" error={errors.password} />
            <FieldInputController
              placeholder="Confirmar senha*"
              name="confirmPassword"
              type="password"
              control={control}
              error={errors.confirmPassword}
            />
          </Stack>

          <Stack spacing={"20px"} w="100%" direction={{ base: "column", md: "row" }}>
            <FieldInputMaskController
              mask={"(99) 99999-9999"}
              placeholder="Telefone*"
              name="phone"
              type="text"
              control={control}
              error={errors.phone}
            />

            <DefaultButton variant="primary" label="Criar conta" maxW={"350px"} isLoading={isSubmitting} type="submit" />
          </Stack>
        </VStack>
      </Flex>
    </Template>
  );
}
