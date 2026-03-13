import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Standard security utility for SinapCode.
 * Implements AES-256-GCM for sensitive data protection.
 */
export class Security {
    private static getEncryptionKey(): Buffer {
        const key = process.env.ENCRYPTION_KEY;
        if (!key) {
            throw new Error('ENCRYPTION_KEY is not defined in environment variables');
        }
        // Key should be 64 char hex string for 32 bytes
        return Buffer.from(key, 'hex');
    }

    /**
     * Encrypts plain text using AES-256-GCM
     */
    static encrypt(text: string): string {
        const iv = crypto.randomBytes(IV_LENGTH);
        const key = this.getEncryptionKey();
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        // Format: iv:authTag:encrypted
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }

    /**
     * Decrypts cipher text using AES-256-GCM
     */
    static decrypt(cipherText: string): string {
        const [ivHex, authTagHex, encryptedData] = cipherText.split(':');

        if (!ivHex || !authTagHex || !encryptedData) {
            throw new Error('Invalid cipher text format');
        }

        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const key = this.getEncryptionKey();

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }

    /**
     * Generates a SHA-256 hash for data integrity
     */
    static hash(data: string | Buffer): string {
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}
