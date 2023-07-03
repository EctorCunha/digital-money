import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface Account {
  alias: string;
  available_amount: number;
  cvu: string;
  id: number;
  user_id: number;
}

async function getAccount(): Promise<Account> {
  const api = await getApi();
  const { data } = await api.get<Account>(`/api/account`);

  return data;
}

export function useGetAccount() {
  return useQuery(["getAccount"], getAccount, {
    refetchOnWindowFocus: false,
  });
}
