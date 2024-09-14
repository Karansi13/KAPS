import React, { createContext, useContext, useState } from 'react';
import { setupVeramoAgent } from '@/lib/veramoConfig';

interface DIDContextProps {
  did: string;
  createDID: () => Promise<void>;
  verifyDID: (did: string) => Promise<boolean>;
}

const DIDContext = createContext<DIDContextProps | undefined>(undefined);

export const DIDProvider = ({ children }: any) => {
  const [did, setDID] = useState<string>('');
  const agent = setupVeramoAgent();

  const createDID = async () => {
    try {
      const identifier = await agent.didManagerCreate();
      setDID(identifier.did); // Stores the DID in the state
    } catch (error) {
      console.error('Error creating DID', error);
    }
  };

  const verifyDID = async (didToVerify: string): Promise<boolean> => {
    try {
      const resolved = await agent.resolveDid({ didUrl: didToVerify });
      return resolved.didDocument ? true : false; // Return true if DID is valid
    } catch (error) {
        console.error('Error verifying DID', error);
        return false;
      }
    };
  
    return (
      <DIDContext.Provider value={{ did, createDID, verifyDID }}>
        {children}
      </DIDContext.Provider>
    );
  };
  
  export const useDID = () => useContext(DIDContext);
  
  