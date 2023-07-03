"use client";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import {
  Flex,
  useBreakpointValue,
  Text,
  VStack,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MdOutlineContentCopy } from "react-icons/md";

export default function RechargeValue() {
  const isSm = useBreakpointValue({
    base: true,
    sm: false,
  });

  const { data: session } = useSession();

  const toast = useToast();
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
          p={{
            base: "20px 20px 61px 20px",
            sm: "68px 52px 85px 50px",
            lg: "58px 95px 42px 95px",
          }}
          flexDir={"column"}
          maxH="calc(100vh - 128px)"
        >
          <VStack
            h="auto"
            w="100%"
            p={{ base: "25px", sm: "40px" }}
            background={"#201F22"}
            borderRadius={"8px"}
            flexDir={"column"}
            overflow={"hidden"}
            spacing={"2rem"}
            align={"flex-start"}
          >
            <Text
              fontWeight="400"
              fontSize="16px"
              lineHeight="22px"
              color="#EEEAEA"
            >
              Copie seu código de verificação ou nome de usuário para começar a
              transferir dinheiro de outra conta
            </Text>

            <HStack
              align={"flex-start"}
              w="100%"
              justifyContent={"space-between"}
            >
              <VStack align={"flex-start"} spacing={"8px"}>
                <Text
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="24px"
                  color="#C1FD35"
                >
                  Código de verificação
                </Text>

                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22px"
                  color="#EEEAEA"
                >
                  {session?.user?.user_info?.cvu}
                </Text>
              </VStack>

              <MdOutlineContentCopy
                onClick={() => {
                  if (session?.user?.user_info?.cvu) {
                    navigator.clipboard.writeText(
                      session?.user?.user_info?.cvu
                    );
                  }

                  toast({
                    title: "Sucesso",
                    description: "Código copiado para área de transferência.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                }}
                color="#C1FD35"
                cursor={"pointer"}
                size="32px"
              />
            </HStack>

            {isSm && <Divider />}

            <HStack
              align={"flex-start"}
              w="100%"
              justifyContent={"space-between"}
            >
              <VStack align={"flex-start"} spacing={"8px"}>
                <Text
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="24px"
                  color="#C1FD35"
                >
                  Nome de usuário
                </Text>

                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="22px"
                  color="#EEEAEA"
                >
                  {`${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`}
                </Text>
              </VStack>

              <MdOutlineContentCopy
                onClick={() => {
                  if (
                    session?.user?.user_data?.firstname &&
                    session?.user?.user_data?.lastname
                  ) {
                    navigator.clipboard.writeText(
                      `${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`
                    );
                  }

                  toast({
                    title: "Sucesso",
                    description: "Nome copiado para área de transferência.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                }}
                color="#C1FD35"
                size="32px"
                cursor={"pointer"}
              />
            </HStack>
          </VStack>
        </Flex>
      </TemplateGrid>
    </Template>
  );
}
