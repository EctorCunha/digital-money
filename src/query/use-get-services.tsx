import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface Service {
  id: number;
  name: string;
  date: string;
}

async function getServices() {
  const api = await getApi();
  const { data } = await api.get<Service[]>(`/service`);

  return data;
}

export function useGetServices() {
  return useQuery(["getServices"], () => getServices(), {
    refetchOnWindowFocus: false,
  });
}
