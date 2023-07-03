"use client";
import { CardInfo } from "./components/CardInfo";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { useGetCards } from "@/query/use-get-cards";
import { VStack, Flex, HStack, Text, Divider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function CardsPage() {
  const { data: session } = useSession();

  const { data } = useGetCards({
    account_id: session?.user?.user_info?.id ?? 0,
  });

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
          overflow={"auto"}
          w="100%"
          align={"flex-start"}
          h={"calc(100vh - 120px)"}
        >
          <Flex
            background="#201F22"
            p={{
              base: "15px 23px 23px 22px",
              sm: "16px 19px 47px 27px",
              md: "32px 60px 47px 25px",
            }}
            flexDir={"column"}
            borderRadius={"8px"}
            w="100%"
          >
            <Text
              color="#FFFF"
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
              py={"2rem"}
            >
              Adicione seu cartão de crédito ou débito
            </Text>
            <Link href="/dashboard/cards/create-card">
              <HStack
                spacing={"16px"}
                w="100%"
                align={"center"}
                justifyContent={"flex-start"}
                fontSize={{ base: "16px", sm: "24px" }}
              >
                <AiOutlinePlusCircle color="#C1FD35" />
                <Text color="#C1FD35" fontWeight="700">
                  Novo Cartão
                </Text>
              </HStack>
            </Link>
          </Flex>

          <Flex
            background="#FFF"
            p={{
              base: "15px 23px 23px 22px",
              sm: "16px 19px 47px 27px",
              md: "32px 60px 47px 25px",
            }}
            flexDir={"column"}
            borderRadius={"8px"}
            w="100%"
          >
            <Text
              color="#201F22"
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
              py={"2rem"}
            >
              Seus cartões
            </Text>

            <Divider borderBottomColor={"blackAlpha.600"} />

            {data?.map((card, index) => {
              return (
                <CardInfo
                  key={card.id}
                  card_number={card.number_id}
                  card_id={card.id} 
                  expiration_date={Number(card.expiration_date.split('/').join(''))}                />
              );
            })}
          </Flex>
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
