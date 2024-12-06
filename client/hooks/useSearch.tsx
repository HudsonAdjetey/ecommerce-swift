"use client";
import { useCallback, useState } from "react";
import _ from "lodash";

const useSearch = () => {
  const [searchItem, setSearchItem] = useState("");

  // Debounce the search input
  const debounce = useCallback(
    _.debounce((value) => setSearchItem(value), 300),
    [searchItem]
  );

  const handleReset = () => {
    setSearchItem("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const el = event.target;
    debounce(el.value);
  };
  return {
    searchItem,
    handleChange,
    handleReset,
  };
};

export default useSearch;
