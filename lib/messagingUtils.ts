import EthCrypto from 'eth-crypto';
import { useDID } from '@/context/DIDContext';

// Encrypt message using the receiver's DID public key
export const encryptMessageWithDID = async (message: string, recipientPublicKey: string) => {
  const encrypted = await EthCrypto.encryptWithPublicKey(recipientPublicKey, message);
  return EthCrypto.cipher.stringify(encrypted);
};

// Decrypt message using the sender's private key
export const decryptMessageWithDID = async (encryptedMessage: string, privateKey: string) => {
  const encryptedObject = EthCrypto.cipher.parse(encryptedMessage);
  const decrypted = await EthCrypto.decryptWithPrivateKey(privateKey, encryptedObject);
  return decrypted;
};
