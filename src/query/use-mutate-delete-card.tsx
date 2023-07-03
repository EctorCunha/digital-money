"use client";
import { getApi } from "@/libs/axios";
import { useMutation } from "react-query";

export type UserDataOutput = {
  account_id: number;
  card_id: number;
};

export async function DeleteCard(userData: UserDataOutput) {
  const api = await getApi();

  await api.delete(
    `/api/accounts/${userData.account_id}/cards/${userData.card_id}`
  );
}

export function useDeleteCard() {
  return useMutation(DeleteCard);
}
