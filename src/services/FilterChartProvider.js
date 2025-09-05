import React, { createContext, useState } from 'react';

export const FilterChartContext = createContext();

export function FilterChartProvider({ children }) {
  const [selected, setSelected] = useState('Today');

  return (
    <FilterChartContext.Provider value={{ selected, setSelected }}>
      {children}
    </FilterChartContext.Provider>
  );
}
