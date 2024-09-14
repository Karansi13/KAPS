import { Agent } from '@veramo/core';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { DIDManager } from '@veramo/did-manager';
import { MemoryPrivateKeyStore } from '@veramo/key-manager';
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
import { Resolver } from 'did-resolver';

const secretKey = 'your-encryption-secret'; // for key management system (store securely)

export const setupVeramoAgent = () => {
  const agent = new Agent({
    plugins: [
      new DIDManager({
        store: new MemoryPrivateKeyStore(),
        defaultProvider: 'did:ethr', // Ethereum-based DID method
        kms: new KeyManagementSystem(new SecretBox(secretKey)),
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({ /* Add DID resolvers for Ethereum, etc. */ }),
      }),
    ],
  });

  return agent;
};
