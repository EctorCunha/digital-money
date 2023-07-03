import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface ServiceDetail {
  id: number;
  name: string;
  date: string;
  invoice_value: string;
}

interface Params {
  id: number;
}

async function getServiceById(params: Params): Promise<ServiceDetail | null> {
  if (!params.id) {
    return null;
  }
  const api = await getApi();

  const { data } = await api.get<ServiceDetail>(`/service/${params.id}`);

  return data;
}

export function useGetServiceById(params: Params) {
  return useQuery(["getServiceById", params], () => getServiceById(params), {
    refetchOnWindowFocus: false,
  });
}
