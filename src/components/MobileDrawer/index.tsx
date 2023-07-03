import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Text,
  DrawerHeader,
  DrawerOverlay,
  Box,
  VStack,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Link } from "@chakra-ui/next-js";
import { signOut, useSession } from "next-auth/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Options {
  label: string;
  path: string;
  onClick?: () => void;
}

export const MobileDrawer = (props: MobileDrawerProps) => {
  const { isOpen, onClose } = props;

  const { data: session } = useSession();

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
        path: "/",
      },
      {
        label: "Carregar valor",
        path: "/dashboard/recharge-value",
      },
      {
        label: "Pagar serviços",
        path: "/",
      },
      {
        label: "Cartões",
        path: "/dashboard/create-card",
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
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxW={"219px"} w="100%">
        <DrawerCloseButton color="#C1FD35" background="#3A393E" />
        <DrawerHeader h={"129px"} pt="0px" background="#3A393E">
          <Box mt="59px" px="34px" pb="23px">
            <Text
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
              color="#C1FD35"
            >
              Olá,
            </Text>
            <Text
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
              color="#C1FD35"
            >{`${session?.user?.user_data?.firstname} ${session?.user?.user_data?.lastname}`}</Text>
          </Box>
        </DrawerHeader>

        <DrawerBody background="#C1FD35">
          <VStack px="34px" pt="17px" spacing={"1rem"} align={"flex-start"}>
            {sideBarItems.map((item, index) => {
              return (
                <Link
                  fontWeight={pathname === item.path ? "800" : "600"}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
