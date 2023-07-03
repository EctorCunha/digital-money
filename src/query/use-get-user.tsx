import { getApi } from "@/libs/axios";
import { useQuery } from "react-query";

export interface User {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  user_id: number;
  id: number;
}

interface Params {
  user_id: number;
  cvu: string | number;
  alias: string | number;
}

async function getUser(params: Params): Promise<User> {
  const api = await getApi();

  const { data } = await api.get<User>(`/api/users/${params.user_id}`);

  return data;
}

export function useGetUser(params: Params) {
  return useQuery(["getUser", params], () => getUser(params), {
    refetchOnWindowFocus: false,
  });
}
