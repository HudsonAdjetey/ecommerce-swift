"use client";

import { ChangeEvent, createContext, useContext, useState } from "react";
import useSearch from "./useSearch";

type SearchContextProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchItem: string;
  handleReset: () => void;
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { searchItem, handleChange, handleReset } = useSearch();

  const [filter, setFilter] = useState({
    type: "",
    color: "",
    size: "",
    priceRange: "",
    category: "",
    brand: [],
    activities: [],
  });
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  return (
    <SearchContext.Provider
      value={{
        handleChange,
        searchItem,
        handleReset,
        handleFilterChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useGlobalSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useGlobalSearch must be used within a SearchProvider");
  }
  return context;
};
