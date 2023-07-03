"use client";
import { DefaultButton } from "@/components/Button";
import { Template } from "@/components/Template";
import { Image } from "@chakra-ui/next-js";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SignupSuccessPage() {
  const { push } = useRouter();
  return (
    <Template>
      <Flex
        as="form"
        flexDir={"column"}
        h="100%"
        w="100%"
        background="#272727"
        alignItems="center"
        justifyContent="center"
        p={{ base: "45px", sm: "unset" }}
      >
        <VStack spacing={"20px"} maxW={"md"} w="100%">
          <Heading size="4xl" color="#FFFF" style={{ textAlign: "center" }}>
            Cadastro realizado
          </Heading>
          <Box>
            <Image
              src={"/checkmark.png"}
              alt="checkmark"
              width={100}
              height={100}
            />
          </Box>
          <Text align="center" color="#FFFF">
            Enviamos uma mensagem de confirmação para seu e-mail, por favor
            acesse e siga as instruções para iniciar a sessão.
          </Text>
          <DefaultButton
            w="70%"
            variant="primary"
            label="Continuar"
            type="button"
            onClick={() => push("/login")}
          />
        </VStack>
      </Flex>
    </Template>
  );
}
