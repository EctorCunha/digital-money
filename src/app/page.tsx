"use client";
import { Template } from "@/components/Template";
import { Flex, Image, Box, Center, Text, calc } from "@chakra-ui/react";

export default function Home() {
  return (
    <Template buttonOn variant="secondary">
      <Flex
        position={"relative"}
        w="100%"
        flexDir={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
        paddingBottom={"10px"}
        h="calc(100vh - 128px)"
      >
        <Box
          height={{ base: "145px", md: "170px", lg: "400px" }}
          alignItems="left"
          width={{ base: "354px", md: "90%", lg: "90%" }}
          marginBottom={"5rem"}
        >
          <Text
            color={"#ffffff"}
            fontWeight="600"
            fontSize={{ base: "27px", md: "48px", lg: "48px" }}
            lineHeight={{ base: "32pxx", md: "50px", lg: "50px" }}
            w={{ base: "50%", md: "60%", lg: "30%" }}
            borderBottom={{ base: "2px solid #C1FD35", md: "0", lg: "0" }}
          >
            De agora em diante, faça mais com seu dinheiro
          </Text>
          <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row", lg: "row" }}
          >
            <Text
              fontWeight="400"
              fontSize={{ base: "21.5px", md: "34px", lg: "34px" }}
              lineHeight={{ base: "30.5px", md: "50px", lg: "50px" }}
              color={"#C1FD35"}
              marginRight={"10px"}
            >
              Sua nova
            </Text>
            <Text
              fontWeight="700"
              fontSize={{ base: "21.5px", md: "34px", lg: "34px" }}
              lineHeight={{ base: "30.5px", md: "50px", lg: "50px" }}
              color={"#C1FD35"}
            >
              carteira virtual
            </Text>
          </Box>
        </Box>

        <Box
          display={"flex"}
          flexDir={{ base: "column", md: "column", lg: "row" }}
        >
          <Box
            borderRadius="25px"
            height={{ base: "170px", md: "224px", lg: "246px" }}
            alignItems="baseline"
            borderWidth="1px"
            width={{ base: "354px", md: "597px", lg: "500px" }}
            padding={"1rem"}
            marginBottom={"1rem"}
            marginRight={{ base: "0", md: "0", lg: "1rem" }}
            bg={"#ffffff"}
          >
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "36px", lg: "36px" }}
              lineHeight={{ base: "18px", md: "36px", lg: "49px" }}
              py={"0.5rem"}
              borderBottom={"2px solid #C1FD35"}
            >
              Transferência
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "15px", md: "20px", lg: "20px" }}
              lineHeight={{ base: "20.43px", md: "27.24px", lg: "27.24px" }}
              py={"1rem"}
            >
              Com a Digital Money House você pode transferir dinheiro para
              outras contas, bem como receber transferências e centralizar seus
              investimentos na nossa carteira virtual.
            </Text>
          </Box>
          <Box
            borderRadius="25px"
            height={{ base: "150px", md: "224px", lg: "246px" }}
            alignItems="baseline"
            borderWidth="1px"
            width={{ base: "354px", md: "597px", lg: "500px" }}
            padding={"1rem"}
            marginBottom={"1rem"}
            bg={"#ffffff"}
          >
            <Text
              fontWeight="700"
              fontSize={{ base: "24px", md: "36px", lg: "36px" }}
              lineHeight={{ base: "18px", md: "36px", lg: "49px" }}
              py={"0.5rem"}
              borderBottom={"2px solid #C1FD35"}
            >
              Pagamento de serviços
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "15px", md: "20px", lg: "20px" }}
              lineHeight={{ base: "20.43px", md: "27.24px", lg: "27.24px" }}
              py={"1rem"}
            >
              Pague mensalmente por serviços com apenas 3 clicks. Fácil, rápido
              e conveniente. Esqueça os boletos em papel.
            </Text>
          </Box>
        </Box>

        <Box
          position={"absolute"}
          bg={"#C1FD35"}
          w={"100%"}
          h={{ base: "46%", md: "40%", lg: "20%" }}
          bottom={"0"}
          zIndex={"-1"}
          borderRadius={"30px 30px 0 0"}
        ></Box>
        <Image
          alt="Mulher olhando o celular na mão"
          src="/Home.svg"
          position={"absolute"}
          zIndex={"-2"}
          width="100%"
          height="100%"
          overflow={"hidden"}
          objectFit={"cover"}
          top={"-35px"}
        />
      </Flex>
    </Template>
  );
}
