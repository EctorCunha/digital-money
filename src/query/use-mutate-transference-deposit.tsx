"use client";
import { getApi } from "@/libs/axios";
import { useMutation } from "react-query";

interface CreatedTransferenceResponse {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}

export type UserCreateTransferenceParams = {
  amount: number;
  dated: any;
  destination: string;
  origin: string;
  account_id: string;
};

export async function CreateTransferenceDeposit(
  userData: UserCreateTransferenceParams
) {
  const api = await getApi();

  await api.post<CreatedTransferenceResponse>(
    `/api/accounts/${userData.account_id}/deposits`,
    userData
  );
}

export function useCreateTransferenceDeposit() {
  return useMutation(CreateTransferenceDeposit);
}
