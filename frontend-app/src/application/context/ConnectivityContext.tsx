import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';

interface ConnectivityContextProps {
  isOnline: boolean;
}

const ConnectivityContext = createContext<ConnectivityContextProps>({ isOnline: true });

export const ConnectivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let unsubscribe: NetInfoSubscription;

    const subscribe = async () => {
      unsubscribe = NetInfo.addEventListener(state => {
        setIsOnline(state.isConnected === true);
      });
    };

    subscribe();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isOnline }}>
      {children}
    </ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);
