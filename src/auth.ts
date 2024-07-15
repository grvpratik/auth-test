import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import github from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
	
	adapter: PrismaAdapter(prisma),

	providers: [
		github,
		// CredentialsProvider({
		// 	name: "Sign in",
		// 	id: "credentials",
		// 	credentials: {
		// 		email: {
		// 			label: "Email",
		// 			type: "email",
		// 			placeholder: "example@example.com",
		// 		},
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials) {
		// 		if (!credentials?.email || !credentials.password) {
		// 			return null;
		// 		}

		// 		const user = await prisma.user.findUnique({
		// 			where: {
		// 				email: String(credentials.email),
		// 			},
		// 		});

		// 		if (
		// 			!user ||
		// 			!(await bcrypt.compare(String(credentials.password), user.password!))
		// 		) {
		// 			return null;
		// 		}

		// 		return {
		// 			id: user.id,
		// 			email: user.email,
		// 			name: user.name,
		// 			randomKey: "Hey cool",
		// 		};
		// 	},
		// }),
	],
	callbacks: {
		
		session: ({ session, token }) => {
			console.log(session.user)
			return {
				...session,
				user: {
					email: session.user.email,
					image: session.user.image,

					
				}
			};
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					
					
				};
			}
			return token;
		},
	 },
});
