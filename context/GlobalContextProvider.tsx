import { PropsWithChildren, createContext, useContext, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

type GlobalContext = {
  isUnlocked: boolean;
  authenticate: () => Promise<void>;
};

const GlobalContext = createContext<GlobalContext>({
  isUnlocked: false,
  authenticate: async () => {},
});

export default function GlobalProviderProvider({
  children,
}: PropsWithChildren) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert('Not supported');
      return;
    }

    const res = await LocalAuthentication.authenticateAsync();
    if (res.success) {
      setIsUnlocked(true);
    }
  };

  return (
    <GlobalContext.Provider value={{ isUnlocked, authenticate }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useBiometrics = () => useContext(GlobalContext);
