import { createContext } from 'react';

// Credential context
export const CredContext = createContext({ storedCred: {}, setStoreCred: () => {} });
