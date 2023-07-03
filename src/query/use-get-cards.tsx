import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface Card {
  account_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  id: number;
  number_id: number;
}

interface Params {
  account_id: number;
}

async function getCards(params: Params): Promise<Card[]> {
  if (!params.account_id) {
    return [];
  }
  const api = await getApi();

  const { data } = await api.get<Card[]>(
    `/api/accounts/${params.account_id}/cards`
  );

  return data;
}

export function useGetCards(params: Params) {
  return useQuery(["getCards", params], () => getCards(params), {
    refetchOnWindowFocus: false,
  });
}
