
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: '879586637662-g3v612m81nt3lktccs13nvfg63v8qoqg.apps.googleusercontent.com',
//       clientSecret: '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',
//     }),
//   ],
// });

// export { handler as GET, handler as POST };



import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '879586637662-g3v612m81nt3lktccs13nvfg63v8qoqg.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
