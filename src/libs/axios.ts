import axios, { AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

interface ErrorAPI {
  error: string;
}

export async function api(token: any) {
  const baseURL =
    process.env.NEXT_API_URL || "https://digitalmoney.ctd.academy";

  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: token,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorAPI>) => {
      if (
        error?.response?.status === 401 &&
        error?.response?.data.error.includes("expired")
      ) {
        signOut({ redirect: true, callbackUrl: "/" });
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export async function getApi() {
  const session = await getSession();
  const token = session?.user?.token;

  return await api(token);
}
