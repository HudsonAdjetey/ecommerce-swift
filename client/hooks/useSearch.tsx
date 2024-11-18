"use client";
import { useCallback, useState } from "react";
import _ from "lodash";

const useSearch = () => {
  const [searchItem, setSearchItem] = useState("");

  // Debounce the search input
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(
    _.debounce((value: string) => {
      setSearchItem(value);
    }, 600),
    [setSearchItem]
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
