"use client";
import {
  Button,
  Divider,
  Flex,
  HStack,
  ModalFooter,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { useDeleteCard } from "@/query/use-mutate-delete-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModalDefault } from "@/components/Modal";
import { useGetCards } from "@/query/use-get-cards";

interface CardInfoProps {
  card_id: number;
  card_number: number;
  expiration_date: number;
}

export const CardInfo = (props: CardInfoProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutateDeleteCard = useDeleteCard();
  const { data: session } = useSession();
  const toast = useToast();
  const router = useRouter();
  const timestampNow = Date.now();

  const getCard = useGetCards({
    account_id: session?.user?.user_info?.id ?? 0,
  });

  function convertDateToTimestamp(dateString: string): number {
    const [monthString, yearString] = dateString.split("/");

    const month = parseInt(monthString, 10);
    const year = parseInt(yearString, 10);

    const date = new Date(year, month - 1, 1);

    const timestamp2 = date.getTime();

    return timestamp2;
  }

  function formatDateString(dateString: string): string {
    const month = dateString.slice(0, 2);
    const year = dateString.slice(2);
    return `${month}/${year}`;
  }

  const numberToString = String(`${0}${props.expiration_date}`);
  const formattedDateString = formatDateString(numberToString);
  const dateString = formattedDateString;
  const timestamp2 = convertDateToTimestamp(dateString);

  const deleteCard = async (card_id: number) => {
    try {
      if (session?.user?.user_info?.id) {
        await mutateDeleteCard.mutateAsync({
          account_id: session.user.user_info.id,
          card_id,
        });
        toast({
          title: "Sucesso",
          description: "Cartão excluído.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      getCard.refetch();
    }
  };

  const handleConfirm = () => {
    deleteCard(props.card_id);
    onClose();
  };

  return (
    <>
      <HStack
        spacing={"16px"}
        w="100%"
        align={"center"}
        justifyContent={"space-between"}
        fontSize={{ base: "14px", sm: "16px" }}
      >
        <Flex gap={4} align="center" justifyContent="center" py={"1.5rem"}>
          <BsCircleFill fontSize={"2em"} color="#C1FD35" />
          <Text w={"30vw"}>
            Termina em {String(props.card_number).slice(-4)}
          </Text>
        </Flex>

        <Text
          onClick={onOpen}
          fontWeight="700"
          cursor={"pointer"}
          _hover={{ borderBottom: "1px solid black" }}
        >
          Eliminar
        </Text>

        {timestamp2 <= timestampNow ? (
          <Text marginBottom={"7px"} fontSize={"10px"} color={"red"}>
            Seu cartão expirou
          </Text>
        ) : null}

        <ModalDefault isCentered isOpen={isOpen} onClose={onClose}>
          <Text>Tem certeza que deseja excluir o cartão ?</Text>

          <ModalFooter
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button colorScheme="green" mr={10} onClick={handleConfirm}>
              Sim
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Não
            </Button>
          </ModalFooter>
        </ModalDefault>
      </HStack>
      <Divider borderBottomColor={"blackAlpha.600"} />
    </>
  );
};
