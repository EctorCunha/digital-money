"use client";
import { DefaultButton } from "@/components/Button";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import {
  HStack,
  Stack,
  Flex,
  Text,
  Box,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import FieldInput from "@/components/FieldInput";
import { AiOutlineSearch } from "react-icons/ai";
import { RecentActivity } from "./components/RecentActivity";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGetActivity } from "@/query/use-get-activity";
import { useMemo, useState } from "react";
import { filter, orderBy } from "lodash";
import { useGetAccount } from "@/query/use-get-account";

export default function Home() {
  const { push } = useRouter();

  const { data: session } = useSession();

  const { data } = useGetActivity({
    account_id: session?.user?.user_info?.id ?? 0,
  });

  const [search, setSearch] = useState("");

  const { data: accountData } = useGetAccount();

  const ordedData = useMemo(() => {
    return orderBy(data, "dated", "desc").reverse();
  }, [data]);

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
            <HStack
              spacing={"16px"}
              w="100%"
              align={"flex-end"}
              justifyContent={"flex-end"}
              fontSize={{ base: "12px", sm: "16px" }}
            >
              <Link
                href={"/dashboard/cards"}
                color="#FFFF"
                style={{ textDecoration: "underline", color: "#FFFF" }}
                _hover={{ fontWeight: 500 }}
              >
                Ver cartões
              </Link>

              <Link
                href={"/dashboard/profile"}
                color="#FFFF"
                style={{ textDecoration: "underline", color: "#FFFF" }}
                _hover={{ fontWeight: 500 }}
              >
                Ver CVU
              </Link>
            </HStack>

            <Text
              color="#FFFF"
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
              py={"2rem"}
            >
              Dinheiro disponível
            </Text>

            <Box
              border="2px solid #C1FD35"
              px="20px"
              borderRadius="100px"
              background={"inherit"}
              fontSize={{ base: "24px", sm: "36px" }}
              lineHeight="49px"
              color={"#FFFF"}
              w="fit-content"
            >
              {accountData && `R$ ${accountData?.available_amount}`}
            </Box>
          </Flex>

          <Stack
            spacing={"20px"}
            w="100%"
            direction={{ base: "column", md: "row" }}
          >
            <DefaultButton
              h={{ base: "67px", md: "85px", lg: "106px" }}
              label={"Carregar valor"}
              fontSize={{ base: "16px", sm: "24px" }}
              onClick={() => push("/dashboard/recharge-value")}
            />

            <DefaultButton
              h={{ base: "67px", md: "85px", lg: "106px" }}
              label={"Pagar serviços"}
              fontSize={{ base: "16px", sm: "24px" }}
              onClick={() => push("/dashboard/pay")}
            />
          </Stack>

          <InputGroup>
            <InputLeftElement h="full">
              <AiOutlineSearch />
            </InputLeftElement>

            <FieldInput
              background={"#FFFF !important"}
              border="1px solid #D2FFEC"
              name="search"
              placeholder="Pesquisar em 'Minha atividade'"
              _focus={{ boxShadow: "none", outline: "none" }}
              _placeholder={{
                color: "rgba(0, 0, 0, 0.5)",
              }}
              fontWeight={"400"}
              pl="35px"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </InputGroup>

          <RecentActivity
            seeActivities
            activity={
              search
                ? filter(ordedData, (activity) =>
                    activity.description.includes(search)
                  )
                : ordedData
            }
          />
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
