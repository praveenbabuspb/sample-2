import React, {createContext, useContext, useState, ReactNode} from 'react';

interface SuperSaverContextType {
  isSuperSaver: boolean;
  toggleSuperSaver: () => void;
  setSuperSaver: (value: boolean) => void;
}

const SuperSaverContext = createContext<SuperSaverContextType | null>(null);

export const SuperSaverProvider = ({children}: {children: ReactNode}) => {
  const [isSuperSaver, setIsSuperSaver] = useState(false);

  const toggleSuperSaver = () => {
    setIsSuperSaver(!isSuperSaver);
  };

  const setSuperSaver = (value: boolean) => {
    setIsSuperSaver(value);
  };

  return (
    <SuperSaverContext.Provider
      value={{
        isSuperSaver,
        toggleSuperSaver,
        setSuperSaver,
      }}>
      {children}
    </SuperSaverContext.Provider>
  );
};

export const useSuperSaver = () => {
  const context = useContext(SuperSaverContext);
  if (!context) {
    throw new Error('useSuperSaver must be used within a SuperSaverProvider');
  }
  return context;
};