export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER,
      applicationID: "convex",
    },
  ],
};
