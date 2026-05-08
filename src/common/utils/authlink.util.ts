import crypto from "crypto";

export const CompareAuthToken = (
    plainToken: string,
    hashedToken: string,
): boolean => {

    const tokenHash = crypto
        .createHash("sha256")
        .update(plainToken)
        .digest("hex");

    return tokenHash === hashedToken;
};

export const GenerateAuthLink = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const authLink =
        `${process.env.BACKEND_SERVER}/api/auth/verify-authlink?token=${rawToken}`;

    return {
        authLink,
        tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    };
};