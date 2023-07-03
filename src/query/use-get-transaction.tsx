import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface Transaction {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: "transfer" | "deposit";
}

interface Params {
  account_id: number;
  transaction_id: number;
}

async function getTransaction(params: Params): Promise<Transaction | null> {
  if (!params.account_id) return null;
  const api = await getApi();

  const { data } = await api.get<Transaction>(
    `/api/accounts/${params.account_id}/transactions/${params.transaction_id}`
  );

  return data;
}

export function useGetTransaction(params: Params) {
  return useQuery(["getTransaction", params], () => getTransaction(params), {
    refetchOnWindowFocus: false,
  });
}
