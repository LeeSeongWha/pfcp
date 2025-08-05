import { useMemo, useState } from "react";

export const useSearch = (data, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) => {
      const search = searchTerm.toLowerCase();

      return searchFields.some((field) => {
        const value = getNestedValue(item, field);
        return value && value.toString().toLowerCase().includes(search);
      });
    });
  }, [data, searchTerm, searchFields]);

  const handleSearchChange = (e) => {
    // e가 이벤트 객체인지 확인하고, 아니면 직접 값으로 처리
    const value = e && e.target ? e.target.value : e;
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    filteredData,
    handleSearchChange,
    clearSearch,
    setSearchTerm, // 직접 설정할 수 있도록 추가
  };
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};
