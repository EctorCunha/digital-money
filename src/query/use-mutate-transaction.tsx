"use client";
import { getApi } from "@/libs/axios";
import { useMutation } from "react-query";

interface CreatedTransactionResponse {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}

export type UserCreateTransactionOutput = {
  amount: number;
  dated: string;
  description: string;
  account_id: string;
};

export async function CreateTransaction(userData: UserCreateTransactionOutput) {
  const api = await getApi();

  await api.post<CreatedTransactionResponse>(
    `/api/accounts/${userData.account_id}/transactions`,
    userData
  );
}

export function useCreateTransaction() {
  return useMutation(CreateTransaction);
}
