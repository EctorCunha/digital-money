"use client";
import { getApi } from "@/libs/axios";
import { useMutation } from "react-query";

type UserData = {
  user_id: number;
  dni: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};

export async function EditUser(userData: UserData) {
  const api = await getApi();

  await api.patch<UserData>(`/api/users/${userData.user_id}`, {
    dni: userData.dni,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    phone: userData.phone,
  });
}

export function useEditUser() {
  return useMutation(EditUser);
}
