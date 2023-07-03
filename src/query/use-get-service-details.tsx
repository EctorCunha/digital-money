import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface ServiceWithValue {
  id: number;
  name: string;
  date: string;
  invoice_value: number;
}

interface Params {
  serviceId: number;
}

async function getServiceDetails(params: Params) {
  const api = await getApi();
  const { data } = await api.get<ServiceWithValue>(
    `api/service/${params.serviceId}`
  );

  return data;
}

export function useGetServiceDetails(params: Params) {
  return useQuery(
    ["getServiceDetails", params],
    () => getServiceDetails(params),
    {
      refetchOnWindowFocus: false,
    }
  );
}
