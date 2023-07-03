import { getApi } from "@/libs/axios";
import { randomUUID } from "crypto";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export interface UserResponse {
  alias: string;
  available_amount: number;
  cvu: string;
  id: number;
  user_id: number;
}

export interface UserData {
  dni: number;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      token: string;
      user_data: UserData;
      user_info: UserResponse;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const api = await getApi();
        try {
          const { data } = await api.post<{ token: string }>("/api/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { token } = data;

          const { data: userResponse } = await api.get<UserResponse>(
            "/api/account",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          const { data: userAPI } = await api.get<UserData>(
            `/api/users/${userResponse?.user_id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          const user = {
            id: randomUUID(),
            email: credentials.email,
            user_data: {
              ...userAPI,
            },
            user_info: {
              ...userResponse,
            },
            token,
          };

          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
    async jwt({ user, token }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          user: {
            id: u.id,
            token: u.token,
            email: u.email,
            user_data: { ...u.user_data },
            user_info: { ...u.user_info },
          },
        };
      }
      return token;
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
