import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    // Expiry in 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await prisma.verificationToken.findFirst({
        where: { identifier: email }
    });

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: email,
                    token: existingToken.token
                }
            }
        });
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            identifier: email,
            token,
            expires
        }
    });

    return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        });
        return verificationToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { identifier: email }
        });
        return verificationToken;
    } catch {
        return null;
    }
}
