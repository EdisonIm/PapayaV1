import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface RefreshContextType {
  refreshing: boolean;
  onRefresh: (fetchData: () => Promise<void>) => Promise<void>;
}

const RefreshContext = createContext<RefreshContextType>({
  refreshing: false,
  onRefresh: async () => {},
});

export const useRefresh = (): RefreshContextType => useContext(RefreshContext);

interface RefreshProviderProps {
  children: ReactNode;
}

export const RefreshProvider: React.FC<RefreshProviderProps> = ({children}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(
    async (fetchData: () => Promise<void>): Promise<void> => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    },
    [],
  );

  return (
    <RefreshContext.Provider value={{refreshing, onRefresh}}>
      {children}
    </RefreshContext.Provider>
  );
};
