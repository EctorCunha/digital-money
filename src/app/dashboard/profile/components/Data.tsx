import React, { useState } from "react";
import { Box, Text, FormControl, InputGroup, InputRightElement, InputLeftElement, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiPencil, HiCheck } from "react-icons/hi";
import { FormProfileForm, TypeFormProfileForm } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditUser } from "@/query/use-mutate-edit-user";
import { FieldInputController } from "@/components/FieldInput/FieldInputController";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface DataProps {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: number;
}

export const Data = (props: DataProps) => {
  const { mutateAsync } = useEditUser();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormProfileForm>({
    resolver: zodResolver(FormProfileForm),
    defaultValues: {
      email: props.email,
      cpf: String(props.dni).replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"),
      name: props.firstName + " " + props.lastName,
      phone: props.phone,
      password: "123456",
    },
  });

  const onSubmit = async (userData: TypeFormProfileForm) => {
    try {
      await mutateAsync({
        user_id: props.user_id ?? "",
        dni: Number(userData.cpf),
        email: userData.email,
        firstName: userData.name.split(" ")[0] ?? "",
        lastName: userData.name.split(" ")[1] ?? "",
        password: userData.password,
        phone: userData.phone,
      });
      toast({
        title: "Sucesso",
        description: "Usuário atualizado.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar dados",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      height={{ base: "fit-content", md: "fit-content", lg: "fit-content" }}
      alignItems="center"
      justifyContent="center"
      width={{ base: "354px", md: "511px", lg: "1003px" }}
      p={"2em 1.5em"}
      bg={"#ffffff"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"10px"}
    >
      <Text fontWeight="700" fontSize={"20px"} lineHeight={"23px"} marginBlockEnd="1em">
        Seus dados
      </Text>
      <Box display={"flex"} flexDir={"column"}>
        <Box display={"flex"} flexDir={"row"} gap={"1em"} alignItems={"center"}>
          <Text w="7ch" fontWeight={"medium"}>
            Email
          </Text>
          <FormControl display={{ base: "", md: "flex", lg: "flex" }} alignItems={"center"} whiteSpace={"nowrap"}>
            <FieldInputController
              height={"40px"}
              paddingLeft="0.5em"
              borderBottom={"1px #e2e8f0 solid"}
              backgroundColor={"transparent"}
              borderRadius={0}
              name="email"
              type="text"
              control={control}
              error={errors.email}
              variant="flushed"
              isDisabled
            />
          </FormControl>
        </Box>
        <Box display={"flex"} flexDir={"row"} gap={"1em"} alignItems={"center"}>
          <Text w="7ch" fontWeight={"medium"}>
            CPF
          </Text>
          <FormControl display={{ base: "", md: "flex", lg: "flex" }} whiteSpace={"nowrap"}>
            <FieldInputController
              height={"40px"}
              paddingLeft="0.5em"
              borderBottom={"1px #e2e8f0 solid"}
              backgroundColor={"transparent"}
              borderRadius={0}
              name="cpf"
              type="text"
              control={control}
              error={errors.cpf}
              variant="flushed"
              isDisabled
            />
          </FormControl>
        </Box>
        <Box display={"flex"} flexDir={"row"} gap={"1em"} alignItems={"center"}>
          <Text w="7ch" fontWeight={"medium"}>
            Nome
          </Text>
          <FormControl display={{ base: "", md: "flex", lg: "flex" }} alignItems={"center"} whiteSpace={"nowrap"}>
            <InputGroup>
              <FieldInputController
                height={"40px"}
                paddingLeft="0.5em"
                borderBottom={"1px #e2e8f0 solid"}
                backgroundColor={"transparent"}
                borderRadius={0}
                name="name"
                type="text"
                control={control}
                error={errors.name}
                variant="flushed"
                isDisabled={!isEditingName}
              />
              <InputRightElement onClick={() => setIsEditingName(!isEditingName)}>
                {isEditingName ? (
                  <HiCheck size={22} cursor={"pointer"} onClick={handleSubmit(onSubmit)} />
                ) : (
                  <HiPencil size={22} cursor={"pointer"} />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box display={"flex"} flexDir={"row"} gap={"1em"} alignItems={"center"}>
          <Text w="7ch" fontWeight={"medium"}>
            Telefone
          </Text>
          <FormControl display={{ base: "", md: "flex", lg: "flex" }} alignItems={"center"} whiteSpace={"nowrap"}>
            <InputGroup>
              <FieldInputController
                height={"40px"}
                paddingLeft="0.5em"
                borderBottom={"1px #e2e8f0 solid"}
                backgroundColor={"transparent"}
                borderRadius={0}
                name="phone"
                type="text"
                control={control}
                error={errors.phone}
                variant="flushed"
                isDisabled={!isEditingPhone}
              />
              <InputRightElement onClick={() => setIsEditingPhone(!isEditingPhone)}>
                {isEditingPhone ? (
                  <HiCheck size={22} cursor={"pointer"} onClick={handleSubmit(onSubmit)} />
                ) : (
                  <HiPencil size={22} cursor={"pointer"} />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box display={"flex"} flexDir={"row"} gap={"1em"} alignItems={"center"}>
          <Text w="7ch" fontWeight={"medium"}>
            Senha
          </Text>
          <FormControl display={{ base: "", md: "flex", lg: "flex" }} alignItems={"center"} whiteSpace={"nowrap"}>
            <InputGroup>
              <InputLeftElement>
                {show ? <AiFillEye onClick={handleClickShow} size={20} /> : <AiFillEyeInvisible onClick={handleClickShow} size={20} />}
              </InputLeftElement>
              <FieldInputController
                height={"40px"}
                paddingLeft="2.5em"
                borderBottom={"1px #e2e8f0 solid"}
                backgroundColor={"transparent"}
                borderRadius={0}
                name="password"
                type={show ? "text" : "password"}
                control={control}
                error={errors.password}
                variant="flushed"
                isDisabled={!isEditingPassword}
              />
              <InputRightElement onClick={() => setIsEditingPassword(!isEditingPassword)}>
                {isEditingPassword ? (
                  <HiCheck size={22} cursor={"pointer"} onClick={handleSubmit(onSubmit)} />
                ) : (
                  <HiPencil size={22} cursor={"pointer"} />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
