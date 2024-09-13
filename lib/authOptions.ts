import {DefaultSession, NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;

        const userRecord = await prisma.user.findUnique({
          where: {id: user.id},
        });

        if (userRecord?.rol) {
          token.role = userRecord.rol;
        } else {
          const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {rol: "USUARIO"},
          });
          token.role = updatedUser.rol;
        }
      }
      return token;
    },
    async session({session, token}) {
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({user, account}) {
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: {email: user.email},
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              rol: "USUARIO",
            },
          });
        }

        if (existingUser && account) {
          // Link the account if it exists
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              id_token: account.id_token,
              refresh_token: account.refresh_token,
              scope: account.scope,
              token_type: account.token_type,
              expires_at: account.expires_at,
              session_state: account.session_state,
            },
          });
        }
      }

      return true;
    },
  },
};
