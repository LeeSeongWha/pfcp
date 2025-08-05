import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";

export const useTableData = (data, searchFields, itemsPerPage = 10) => {
  const { searchTerm, filteredData, handleSearchChange, clearSearch } =
    useSearch(data, searchFields);
  const paginationHook = usePagination(filteredData, itemsPerPage);

  // 검색 시 페이지 리셋
  const handleSearchWithReset = (e) => {
    handleSearchChange(e);
    paginationHook.resetPage();
  };

  return {
    searchTerm,
    filteredData,
    handleSearchChange: handleSearchWithReset,
    clearSearch,
    ...paginationHook,
  };
};
