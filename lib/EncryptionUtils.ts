// utils/EncryptionUtils.ts

export const encryptMessage = async (message: string, publicKey: CryptoKey): Promise<string> => {
    const encodedMessage = new TextEncoder().encode(message);
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encodedMessage
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  };
  
  export const decryptMessage = async (encryptedMessage: string, privateKey: CryptoKey): Promise<string> => {
    const encodedMessage = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encodedMessage
    );
    return new TextDecoder().decode(decrypted);
  };