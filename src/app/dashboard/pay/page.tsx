"use client";
import FieldInput from "@/components/FieldInput";
import { Template } from "@/components/Template";
import { TemplateGrid } from "@/components/Template/TemplateGrid";
import {
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useGetServices } from "@/query/use-get-services";
import { Services } from "./components/Services";

export default function PayPage() {
  const { data: services } = useGetServices();
  const [search, setSearch] = useState("");

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
          <HStack spacing={"20px"} w="100%" justifyContent={"space-between"}>
            <InputGroup>
              <InputLeftElement h="full">
                <AiOutlineSearch />
              </InputLeftElement>
              <FieldInput
                background={"#FFFF !important"}
                border="1px solid #D2FFEC"
                name="search"
                placeholder="Pesquisar entre mais de 5.000 empresas"
                _focus={{ boxShadow: "none", outline: "none" }}
                _placeholder={{
                  color: "rgba(0, 0, 0, 0.5)",
                }}
                fontWeight={"400"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                pl="35px"
              />
            </InputGroup>
          </HStack>

          <Services
            services={services?.filter((service) =>
              service.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )}
          />
        </VStack>
      </TemplateGrid>
    </Template>
  );
}
