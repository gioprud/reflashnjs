import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import database from '@/services/database'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                const user = await database.userLogin(credentials.username, credentials.password);
                if (!user) return null
                const returnUser = {
                    ...JSON.parse(JSON.stringify(user)),
                    id: user._id.toString()
                }
                console.log(returnUser)
                return returnUser;
            },

        })
    ],
    session: {
        strategy: 'jwt',
    },

    secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    //whatever value we return here will be the value of the next-auth session
    async session({ session, token, user }) {
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! } // combine the session and db user
      }
    }
  }

}

export default NextAuth(authOptions);