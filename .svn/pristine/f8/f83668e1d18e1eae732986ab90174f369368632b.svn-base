import { useState, useEffect, useCallback, useRef, useMemo } from "react";

export const useInfiniteScroll = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const currentData = useMemo(() => {
    return data.slice(0, currentPage * itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    setHasMore(currentPage * itemsPerPage < data.length);
  }, [currentPage, data.length, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 300);
  }, [loading, hasMore]);

  useEffect(() => {
    if (!loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(loadingRef.current);
    observerRef.current = observer;

    return () => {
      if (loadingRef.current) observer.unobserve(loadingRef.current);
      observer.disconnect();
    };
  }, [hasMore, loading, loadMore, currentData.length, data.length]);

  // 새 데이터가 들어왔을 때 초기화
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(data.length > itemsPerPage);
  }, [data, itemsPerPage]);

  return {
    currentData,
    loading,
    hasMore,
    loadingRef,
    totalItems: data.length,
    loadedItems: currentData.length,
  };
};
