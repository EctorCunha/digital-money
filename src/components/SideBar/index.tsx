"use client";
import { Stack, VStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { Link } from "@chakra-ui/next-js";
import { signOut } from "next-auth/react";

interface SideBarProps {
  key: string
}

interface Options {
  label: string;
  path: string;
  onClick?: () => void;
}

export const SideBar = ({}: SideBarProps) => {
  const sideBarItems: Options[] = useMemo(() => {
    return [
      {
        label: "Início",
        path: "/dashboard/home",
      },
      {
        label: "Atividade",
        path: "/dashboard/activity",
      },
      {
        label: "Seu perfil",
        path: "/dashboard/profile",
      },
      {
        label: "Carregar valor",
        path: "/dashboard/recharge-value",
      },
      {
        label: "Pagar serviços",
        path: "/dashboard/pay",
      },
      {
        label: "Cartões",
        path: "/dashboard/cards",
      },
      {
        label: "Encerrar sessão",
        path: "/",
        onClick: async () => {
          await signOut({ redirect: true, callbackUrl: "/" });
        },
      },
    ];
  }, []);

  const pathname = usePathname();

  return (
    <Stack
      w={{ base: "unset", sm: "221px", lg: "276px" }}
      display={{ base: "none", sm: "block" }}
      pl={"40px"}
      pt="49px"
      h="full"
      background={"green.500"}
    >
      <VStack spacing={"1rem"} align={"flex-start"}>
        {sideBarItems.map((item, index) => {
          return (
            <Link
              fontWeight={pathname.includes(item.path.split("/")[2]) ? "800" : "600"}
              fontSize={"17px"}
              key={`sidebar-item-${index}`}
              color="#201F22"
              href={item.path}
              _hover={{
                textDecoration: "none",
                color: "#201f22d8",
              }}
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          );
        })}
      </VStack>
    </Stack>
  );
};
