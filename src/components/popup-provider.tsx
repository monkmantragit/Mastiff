'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import EnquiryPopup from './enquiry-popup';

interface PopupContextType {
  isPopupOpen: boolean;
  openPopup: (source?: string) => void;
  closePopup: () => void;
  triggerSource: string;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within PopupProvider');
  }
  return context;
}

interface PopupProviderProps {
  children: ReactNode;
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [triggerSource, setTriggerSource] = useState('general');

  const openPopup = (source = 'general') => {
    setTriggerSource(source);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <PopupContext.Provider value={{
      isPopupOpen,
      openPopup,
      closePopup,
      triggerSource
    }}>
      {children}
      <EnquiryPopup 
        isOpen={isPopupOpen}
        onClose={closePopup}
        triggerSource={triggerSource}
      />
    </PopupContext.Provider>
  );
}