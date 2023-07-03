"use client";
import { DefaultButton } from "@/components/Button";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ServiceDetails } from "./ServiceDetails";
import { ServiceDetail } from "@/query/use-get-service-by-id";
import { useFormContext } from "react-hook-form";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

export const Success = ({ data }: { data: ServiceDetail }) => {
  const { data: session } = useSession();
  const { getValues } = useFormContext();

  const { push } = useRouter();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Detalhes da transação", 10, 10);
    doc.text(`Valor: R$${data?.invoice_value}`, 10, 20);
    doc.text(
      `Data: ${format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
        locale: ptBR,
      })}`,
      10,
      30
    );
    doc.text(`Destinatário: ${data?.name}`, 10, 50);
    doc.text(`Número da operação: ${data?.id}`, 10, 60);

    doc.save(`${`${session?.user?.user_data.firstname} ${session?.user?.user_data.lastname}`} ${data?.name}`);
  };

  return (
    <VStack spacing={"28px"}>
      <VStack borderRadius={"8px"} background={"#C1FD35"} w="100%" py="20px" spacing={"11px"}>
        <AiOutlineCheckCircle size={"60px"} color="#000000" />

        <Heading fontWeight="700" fontSize={{ base: "16px", sm: "24px" }} color="#000000" lineHeight="33px" textAlign={"center"} px="10px">
          Pagamento realizado com sucesso!
        </Heading>
      </VStack>

      <ServiceDetails service={data} card={getValues("card")} />

      <Stack w="full" direction={{ base: "column", sm: "row" }} align={{ base: "center", sm: "flex-end" }} justify={"flex-end"} gap={"20px"}>
        <DefaultButton
          label={"Voltar ao início"}
          border={"0px"}
          maxW={{ base: "unset", sm: "233px" }}
          w="100%"
          onClick={() => {
            push("/dashboard/home");
          }}
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
  );
};
