import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getMasterKey(): Buffer {
  const secret = process.env.KEY_ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error("KEY_ENCRYPTION_SECRET env var is not set");
  }
  const key = Buffer.from(secret, "base64");
  if (key.length !== 32) {
    throw new Error(
      "KEY_ENCRYPTION_SECRET must decode to exactly 32 bytes (base64-encoded)",
    );
  }
  return key;
}

export type EncryptedSecret = {
  ciphertext: string;
  iv: string;
  authTag: string;
};

export function encryptSecret(plaintext: string): EncryptedSecret {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getMasterKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}

export function decryptSecret(encrypted: EncryptedSecret): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    getMasterKey(),
    Buffer.from(encrypted.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(encrypted.authTag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(encrypted.ciphertext, "base64")),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}
