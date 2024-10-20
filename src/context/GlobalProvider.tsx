import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useRouter } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { GlobalContextType } from '@/types';
import { GlobalContextInitialValues } from '@/types/initialValues';

const GlobalContext = createContext<GlobalContextType>({
  ...GlobalContextInitialValues,
});

const LOCK_TIME = 6000;

export default function GlobalProvider({ children }: PropsWithChildren<{}>) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [appInactive, setAppInactive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [User, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isLockPinSet, setIsLockPinSet] = useState(false);
  const [lockPin, setLockPin] = useState<any>();
  const [UserCurrency, setUserCurrency] = useState<any>('USD');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  const appState = useRef(AppState.currentState);
  const router = useRouter();

  // get current session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session: newSession },
        } = await supabase.auth.getSession();

        if (newSession?.user?.id !== session?.user?.id) {
          setSession(newSession);

          if (newSession) {
            const {
              error,
              data: { user },
            } = await supabase.auth.getUser();

            if (error) {
              console.log('error getting user data', error);
            } else {
              setUser(user?.user_metadata);
              setIsAuthenticated(true);
            }
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (newSession?.user?.id !== session?.user?.id) {
          setSession(newSession);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  // local authentication using biometrics or pattern
  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        console.log('Not supported');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        console.log('No biometrics enrolled');
        
       setIsBiometricEnabled(false);
      }

      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (!supportedTypes.includes(1)) {
        setIsBiometricSupported(false);
      }

      const res = await LocalAuthentication.authenticateAsync();

      if (res.success) {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
      }
    } catch (error) {
      setIsUnlocked(false);
      console.log('An error occurred during authentication', error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const recordStartTime = async () => {
    try {
      await AsyncStorage.setItem('startTime', Date.now().toString());
    } catch (error) {
      console.log('Error recording start time');
    }
  };

  const handleAppStateChange = async (nextAppState: any) => {
    // handle app going to background
    if (nextAppState === 'inactive') {
      setAppInactive(true);
    } else {
      if (router.canGoBack()) {
        setAppInactive(false);
        router.back();
      }
    }
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (
      nextAppState === 'active' &&
      appState.current.match(/background/)
    ) {
      const elapsedTime =
        Date.now() -
        parseInt((await AsyncStorage.getItem('startTime')) || '0', 10);
      if (elapsedTime >= LOCK_TIME) {
        setIsUnlocked(false);
      }
    }

    appState.current = nextAppState;
  };

  // get user's selected currency
  async function getUserCurrency() {
    try {
      const value = await AsyncStorage.getItem('selectedCurrency');
      if (value !== null) {
        setUserCurrency(JSON.parse(value).code);
      } else {
        setUserCurrency('USD');
      }
    } catch (e) {
      console.log('error getting user currency', e);
    }
  }
  //get lockPin
  async function getLockPin() {
    try {
      const value = await AsyncStorage.getItem('lockPassword');
      if (value !== null) {
        setIsLockPinSet(true);
        setLockPin(Number(value));
      }
    } catch (e) {
      console.log('error getting lock pin', e);
    }
  }

  useEffect(() => {
    getLockPin();

    // get user currency
    getUserCurrency();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isUnlocked,
        authenticate,
        setIsUnlocked,
        appInactive,
        isAuthenticated,
        session,
        User,
        setUser,
        loading,
        isLockPinSet,
        setIsLockPinSet,
        lockPin,
        setLockPin,
        UserCurrency,
        getUserCurrency,
        isBiometricSupported,
        isBiometricEnabled,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
