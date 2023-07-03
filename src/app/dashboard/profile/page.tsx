"use client";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import { Flex, Box } from "@chakra-ui/react";
import { DefaultButton } from "@/components/Button";
import { useGetUser } from "@/query/use-get-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Data } from "./components/Data";
import { Account } from "./components/Account";
import { AiOutlineArrowRight } from "react-icons/ai";
export default function Home() {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { data } = useGetUser({
    user_id: session?.user?.user_data?.id ?? 0,
    cvu: session?.user?.user_info?.cvu ?? 0,
    alias: session?.user?.user_info?.alias ?? 0,
  });

  return (
    <Template shouldShowUser variant="secondary">
      <TemplateGrid>
        <Flex
          position={"relative"}
          w="100%"
          h="100%"
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingBottom={"10px"}
          bg={"#EEEAEA"}
        >
          {data && (
            <Data
              key={data.id}
              user_id={session?.user?.user_data?.id ?? 0}
              firstName={data.firstname}
              lastName={data.lastname}
              email={data.email}
              phone={data.phone}
              dni={data.dni}
            />
          )}

          <Box display={"flex"} flexDir={"column"}>
            <DefaultButton
              label="Administrar meios de pagamento"
              h={{ base: "67px", md: "85px", lg: "106px" }}
              margin={"1rem 0rem 1rem 0rem"}
              borderRadius={"10px"}
              onClick={() => push("/dashboard/cards")}
              rightIcon={<AiOutlineArrowRight size={"1.6rem"} color="#3A393E" />}
              justifyContent={"space-between"}
              fontWeight={700}
            />
            <Account cvu={session?.user?.user_info?.cvu ?? ""} alias={session?.user?.user_info?.alias ?? ""} />
          </Box>
        </Flex>
      </TemplateGrid>
    </Template>
  );
}
