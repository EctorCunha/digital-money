"use client";
import { getApi } from "@/libs/axios";
import { useMutation } from "react-query";

interface CreatedUserResponse {
  account_id: number;
  email: string;
  user_id: number;
}

export type UserDataOutput = {
  dni: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};

export async function CreateUser(userData: UserDataOutput) {
  const api = await getApi();

  await api.post<CreatedUserResponse>("/api/users", userData);
}

export function useCreateUser() {
  return useMutation(CreateUser);
}
