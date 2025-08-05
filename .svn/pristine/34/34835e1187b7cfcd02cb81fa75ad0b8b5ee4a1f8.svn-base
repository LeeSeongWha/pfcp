function TableInfo({
  filteredCount,
  totalCount,
  startIndex,
  endIndex,
  searchTerm,
}) {
  const displayCount = Math.min(endIndex, filteredCount);

  return (
    <div className="mb-4 text-sm text-gray-600">
      {searchTerm ? (
        <>
          "{searchTerm}" 검색 결과: {filteredCount}개 중 {startIndex + 1}-
          {displayCount}개 표시
        </>
      ) : (
        <>
          총 {totalCount}개 중 {startIndex + 1}-{displayCount}개 표시
        </>
      )}
    </div>
  );
}

export default TableInfo;
