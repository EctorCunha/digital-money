"use client";
import { DefaultButton } from "@/components/Button";
import { Divider, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ptBR } from "date-fns/locale";
import { useGetTransaction } from "@/query/use-get-transaction";
import { useGetUser } from "@/query/use-get-user";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { Template } from "@/components/Template";
import { AiOutlineCheckCircle } from "react-icons/ai";
import jsPDF from "jspdf";

export default function ActivityDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const { data: session } = useSession();
  const { push } = useRouter();
  const { data } = useGetTransaction({
    account_id: session?.user?.user_info?.id ?? 0,
    transaction_id: id,
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Detalhes da transação", 10, 10);
    doc.text(`Valor: R$${data?.amount}`, 10, 20);
    doc.text(
      `Data: ${format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
        locale: ptBR,
      })}`,
      10,
      30
    );
    doc.text(`Descrição: ${data?.description}`, 10, 40);
    doc.text(`Destinatário: ${data?.destination}`, 10, 50);
    doc.text(`Número da operação: ${data?.id}`, 10, 60);
    doc.text(
      `Transferido para: ${`${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`}`,
      10,
      70
    );

    doc.save(
      `${`${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`} ${
        data?.type
      }`
    );
  };

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid>
        <VStack
          p={{
            base: "20px 20px 42px 20px",
            sm: "68px 52px 85px 50px",
            lg: "40px 79px 42px 79px",
          }}
          spacing={"20px"}
          w="100%"
          align={"flex-start"}
          maxH={"calc(100vh - 128px)"}
          h="100%"
          overflow={"auto"}
        >
          <VStack spacing={"28px"} w="100%">
            <Flex
              w="100%"
              p={{ base: "25px", sm: "40px" }}
              background={"#201F22"}
              borderRadius={"8px"}
              flexDir={"column"}
            >
              <VStack spacing={"25px"} align={"flex-start"}>
                <Stack
                  w="full"
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "center", sm: "flex-end" }}
                  justify={"space-between"}
                  gap={"20px"}
                >
                  <Flex gap="8px" align={"center"}>
                    <AiOutlineCheckCircle size={"26px"} color="#c1fd35" />
                    <Text
                      color={"#C1FD35"}
                      fontWeight="700"
                      fontSize={{ base: "16", sm: "20px" }}
                      lineHeight="22px"
                    >
                      Aprovado
                    </Text>
                  </Flex>
                  <Heading
                    fontWeight="400"
                    fontSize={{ base: "12px", sm: "16px" }}
                    lineHeight="16px"
                    color="#FFFFFF"
                  >
                    {format(
                      new Date(),
                      "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                      {
                        locale: ptBR,
                      }
                    )}
                  </Heading>
                </Stack>
                <Divider borderBottomColor="#cecece" />
                <VStack spacing={"8px"} align={"flex-start"}>
                  <Text
                    color={"#FFFFFF"}
                    fontWeight="700"
                    fontSize={{ base: "16", sm: "20px" }}
                    lineHeight="22px"
                  >
                    Transferência em dinheiro
                  </Text>
                  <Text
                    color={"#C1FD35"}
                    fontWeight="700"
                    fontSize={{ base: "16", sm: "22px" }}
                    lineHeight="22px"
                  >
                    R${data?.amount}
                  </Text>
                </VStack>

                <VStack spacing={"8px"} align={"flex-start"}>
                  <Text
                    color={"#FFFFFF"}
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="16px"
                  >
                    Transferido para
                  </Text>
                  <Text
                    color={"#C1FD35"}
                    fontWeight="700"
                    fontSize="20px"
                    lineHeight="24px"
                  >
                    {/* {data?.destination} */}
                    {`${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`}
                  </Text>
                </VStack>

                <VStack spacing={"8px"} align={"flex-start"}>
                  <Text
                    color={"#FFFFFF"}
                    fontWeight="400"
                    fontSize=" 16px"
                    lineHeight="22px"
                  >
                    Número da operação
                  </Text>
                  <Text
                    color={"#C1FD35"}
                    fontWeight="400"
                    fontSize=" 12px"
                    lineHeight="16px"
                  >
                    {data?.id}
                  </Text>
                </VStack>
              </VStack>
            </Flex>

            <Stack
              w="full"
              direction={{ base: "column", sm: "row" }}
              align={{ base: "center", sm: "flex-end" }}
              justify={"flex-end"}
              gap={"20px"}
            >
              <DefaultButton
                label={"Voltar ao início"}
                border={"0px"}
                maxW={{ base: "unset", sm: "233px" }}
                w="100%"
                onClick={() => push("/dashboard/home")}
              />

              <DefaultButton
                maxW={{ base: "unset", sm: "233px" }}
                w="100%"
                variant="secondary"
                label={"Baixar Comprovante"}
                border={"0px"}
                onClick={generatePDF}
              />
            </Stack>
          </VStack>
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
