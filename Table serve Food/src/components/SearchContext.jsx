import React, { createContext, useState } from 'react';

// Create the context
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
 // const [menuItems, setMenuItems] = useState([]);  // All menu items
  const [AutoSliderVisible,SetAutoSliderVisible] = useState(true);  // Filtered products

 

  return (
    <SearchContext.Provider value={{AutoSliderVisible,SetAutoSliderVisible }}>
      {children}
    </SearchContext.Provider>
  );
};
