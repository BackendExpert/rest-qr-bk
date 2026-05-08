import crypto from "crypto";

export const GenerateAuthLink = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const authLink =
        `${ process.env.BACKEND_SERVER}/auth/verify?token=${rawToken}`;

    return {
        authLink,
        tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10), 
    };
};