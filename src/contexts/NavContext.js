// src/contexts/NavContext.js (mới: share activePanel state)
import React, { createContext, useState, useContext } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activePanel, setActivePanel] = useState('suggestions');

  return (
    <NavContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);