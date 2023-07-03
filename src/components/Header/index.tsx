import { Badge, Flex, FlexProps, HStack, Text, useBreakpointValue, useDisclosure, Box } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useMemo } from "react";
import MobileDrawer from "../MobileDrawer";
import { AiOutlineMenu } from "react-icons/ai";
import { DefaultButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export type Variants = "primary" | "secondary";

type HeaderProps = {
  buttonOn?: boolean;
  variant?: Variants;
  shouldShowUser?: boolean;
} & Omit<FlexProps, "variant">;

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { buttonOn, variant = "primary", shouldShowUser } = props;

  const { push } = useRouter();

  const { data: session } = useSession();

  const stylesByVariant = useMemo((): Record<Variants, HeaderProps> => {
    return {
      primary: {
        background: "green.500",
        height: "64px",
        padding: "15.5px 20px",
      },

      secondary: {
        background: "gray.500",
        height: "64px",
        padding: "20px",
      },
    };
  }, []);

  const { isOpen, onClose, onToggle } = useDisclosure();
  const isMd = useBreakpointValue({ base: true, md: false });

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} {...props} {...stylesByVariant[variant]}>
      {variant === "primary" && <Image alt="logo" src="/logo.svg" width={86} height={33} style={{ cursor: "pointer" }} onClick={() => push("/dashboard/home")} />}
      {variant === "secondary" && (
        <Image alt="logo" src="/logo-alt.svg" width={86} height={33} style={{ cursor: "pointer" }} onClick={() => push("/dashboard/home")} />
      )}

      {buttonOn && (
        <>
          <Box display={"flex"} alignItems={"center"} w={{ base: "60%", md: "40%", lg: "20%" }} h={"40px"}>
            <DefaultButton variant="home1" label="Entrar" marginRight={"8%"} onClick={() => push("/login")} />
            <DefaultButton variant="home2" label="Criar conta" onClick={() => push("/signup")} />
          </Box>
        </>
      )}

      {shouldShowUser && session?.user?.user_data && (
        <>
          <HStack spacing={"1rem"} onClick={() => push("/dashboard/home")} cursor={"pointer"}>
            <Badge
              display={"flex"}
              alignContent={"center"}
              justifyContent={"center"}
              borderRadius="12px"
              h={{ base: "33px", sm: "43px" }}
              w="40px"
              background="green.500"
              alignItems={"center"}
              fontSize={"20px"}
              color={"#201F22"}
              fontWeight={700}
              _hover={{ filter: "brightness(105%)" }}
            >{`${session?.user?.user_data?.firstname[0].toUpperCase()}${session?.user?.user_data?.lastname[0].toUpperCase()}`}</Badge>

            <Text display={{ base: "none", sm: "block" }} fontWeight={700} fontSize={"16px"} color={"#FFFF"}>
              {`Olá, ${session?.user?.user_data?.firstname} ${session?.user?.user_data?.lastname}`}
            </Text>

            <AiOutlineMenu
              onClick={onToggle}
              color={"#FFFF"}
              size={30}
              cursor={"pointer"}
              style={isMd ? { display: "block" } : { display: "none" }}
            />
          </HStack>
        </>
      )}

      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
