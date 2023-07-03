"use client";
import { Box, Text } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

interface AccountProps {
  cvu: string;
  alias: string;
}

export const Account = (props: AccountProps) => {
  const { data: session } = useSession();
  const toast = useToast();
  return (
    <Box
      borderRadius="10px"
      height={{ base: "220px", md: "224px", lg: "246px" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      borderWidth="1px"
      width={{ base: "354px", md: "511px", lg: "1003px" }}
      p={"2em 1.5rem"}
      bg={"#201F22"}
      textColor={"#ffffff"}
    >
      <Text fontWeight="600" fontSize={"14px"} lineHeight={"19px"}>
        Copiar seu CVU ou alias para adicionar ou transferir valor a partir de outra conta
      </Text>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"column"}>
          <Text fontSize={{ base: "18px", md: "20px" }} lineHeight={"23.54px"} padding={"0"} color={"#C1FD35"}>
            CVU
          </Text>
          <Text fontWeight="400" fontSize={{ base: "14px", md: "16px" }} lineHeight={"21.8px"}>
            {props.cvu}
          </Text>
        </Box>
        <MdContentCopy
          size={"24"}
          onClick={() => {
            if (session?.user?.user_info?.cvu) {
              navigator.clipboard.writeText(session?.user?.user_info?.cvu);
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
        />
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"column"}>
          <Text fontSize={{ base: "18px", md: "20px" }} lineHeight={"23.54px"} padding={"0"} color={"#C1FD35"}>
            Alias
          </Text>
          <Text fontWeight="400" fontSize={{ base: "14px", md: "16px" }} lineHeight={"21.8px"}>
            {props.alias}
          </Text>
        </Box>
        <MdContentCopy
          size={"24"}
          onClick={() => {
            if (session?.user?.user_info?.alias) {
              navigator.clipboard.writeText(session?.user?.user_info?.alias);
            }

            toast({
              title: "Sucesso",
              description: "Alias copiado para área de transferência.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }}
          color="#C1FD35"
          cursor={"pointer"}
        />
      </Box>
    </Box>
  );
};
