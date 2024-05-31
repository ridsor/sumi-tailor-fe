import { login } from "@/services/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7200,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        try {
          const payload = {
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
            remember_me: (credentials?.remember as string) === "true",
          };

          const result = await login(payload);
          if (result.status === "success") {
            authOption.session = {
              maxAge: Number(result.refresh_token.expires_in),
            };
            return {
              ...result.user,
              refreshToken: result.refresh_token.token,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.refreshToken = token.refreshToken;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
