import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember_me: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
              remember_me: credentials?.remember_me == "true" ? true : false,
            }),
          }
        ).catch((err) => {
          throw err;
        });

        if (res.ok) {
          const data = await res.json();
          return {
            ...data.user,
            refreshToken: data.refresh_token.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.refreshToken = user.refreshToken;
      }

      if (trigger === "update" && session?.name) {
        token.email = session.email;
        token.name = session.name;
        token.image = session.image;
      }

      return token;
    },
    async session({ session, token, newSession, trigger }) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("refreshToken" in token) {
        session.user.refreshToken = token.refreshToken;
      }

      if (trigger === "update" && newSession?.name) {
        session.user.name = newSession.name;
        session.user.email = newSession.email;
        session.user.image = newSession.name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
