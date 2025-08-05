import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { myLecture } from "../../services/userService";
import { utils } from "../../utils/utils";
import { useSearch } from "../../hooks/useSearch";

export default function MaterialRoom({ lecture }) {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const authority = user.roles[0].authority;
  const [materialList, setMaterialList] = useState([]);

  console.log(materialList);

  const sortedMaterials = materialList.sort((a, b) => {
    const dateA = new Date(a.uploadDate);
    const dateB = new Date(b.uploadDate);
    return dateB - dateA; // 최신순 정렬
  });

  const {
    searchTerm,
    filteredData: filteredMaterials,
    handleSearchChange,
    clearSearch,
    setSearchTerm,
  } = useSearch(sortedMaterials, ["materialTitle", "materialDesp"]);

  const { currentData, loading, hasMore, loadingRef } = useInfiniteScroll(
    searchTerm ? filteredMaterials : sortedMaterials,
    6
  );

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const materialData = await myLecture.getLectureMaterialList(
          params.lectureName
        );
        setMaterialList(materialData);
      } catch (error) {
        console.error("자료실 데이터 로딩 실패:", error);
      }
    };

    fetchMaterialData();
  }, [params.lectureName]);

  const [openMaterialId, setOpenMaterialId] = useState(null);

  const handleDownload = (e, material) => {
    e.stopPropagation();
    myLecture.fileDownload(material);
  };

  const handleDelete = (e, material) => {
    e.stopPropagation();
    myLecture.deleteLectureMaterial(material.materialNo);
    setMaterialList(material);
  };

  const handleEdit = (e, material) => {
    e.stopPropagation();
    // 수정 페이지로 이동하면서 기존 데이터를 state로 전달
    navigate(
      `/eclass/lecture/${params.userNo}/${params.lectureName}/material/edit`,
      {
        state: {
          lecture,
          materialData: material, // 기존 자료 데이터
          isEdit: true,
        },
      }
    );
  };

  const toggleMaterial = (materialNo) => {
    setOpenMaterialId((prev) => (prev === materialNo ? null : materialNo));
  };

  const getFileIcon = (fileName = "") => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 18h12V6l-4-4H4v16zm8-14v3h3l-3-3z" />
          </svg>
        );
      case "doc":
      case "docx":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 18h12V6l-4-4H4v16zm8-14v3h3l-3-3z" />
          </svg>
        );
      case "zip":
      case "rar":
        return (
          <svg
            className="w-5 h-5 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 18h12V6l-4-4H4v16zm8-14v3h3l-3-3z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 18h12V6l-4-4H4v16zm8-14v3h3l-3-3z" />
          </svg>
        );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">자료실</h1>
            <p className="text-sm text-gray-500">
              총 {materialList.length}개의 자료
            </p>
          </div>
        </div>
        {authority === "ROLE_PROF" && (
          <Link
            to={`/eclass/lecture/${user.username}/${params.lectureName}/material/new`}
            state={lecture}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            자료 업로드
          </Link>
        )}
      </div>

      {/* 검색바 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="자료 제목이나 내용으로 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => clearSearch()}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 자료실 카드 목록 */}
      <div className="grid gap-4 mb-8">
        {currentData.map((material) => (
          <div
            key={material.materialNo}
            className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => toggleMaterial(material.materialNo)}
          >
            {/* 카드 상단 */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getFileIcon(material.atchFile?.atchOriginName)}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                    {material.materialTitle}
                  </h3>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-4">
                  {/* 날짜, 크기, 다운로드 수 등 */}
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    업로드 날짜 : {material.uploadDate}
                  </p>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    크기 : {utils.formatFileSize(material.atchFile?.atchSize)}
                  </p>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    다운로드 수 : {material.downloadCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* 다운로드 버튼 */}
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openMaterialId === material.materialNo ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 드롭다운 상세 내용 */}
            {openMaterialId === material.materialNo && (
              <div className="mt-4 border-t pt-4 text-sm text-gray-600 animate-fadeIn">
                <p className="mb-2">
                  <strong>상세 내용:</strong>
                </p>
                <p className="whitespace-pre-wrap">{material.materialDesp}</p>
                {material.atchFile?.atchOriginName && (
                  <div className="mt-2">
                    <span className="text-gray-500">첨부파일:</span>{" "}
                    <span
                      className="underline cursor-pointer hover:text-green-600"
                      onClick={(e) => handleDownload(e, material)}
                    >
                      {material.atchFile?.atchOriginName}
                    </span>
                  </div>
                )}

                {/* 교수만 수정 버튼 표시 */}
                {authority === "ROLE_PROF" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={(e) => handleEdit(e, material)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      수정
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, material)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 빈 상태 표시 */}
      {filteredMaterials.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-lg">
            {searchTerm ? "검색 결과가 없습니다" : "등록된 자료가 없습니다"}
          </p>
        </div>
      )}

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center text-gray-500 py-4">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414M19.07 19.07l-1.414-1.414M4.93 4.93L6.344 6.344" />
            </svg>
            로딩 중...
          </div>
        </div>
      )}

      {/* 더 불러올 데이터가 없을 때 */}
      {!hasMore && !loading && currentData.length > 0 && (
        <div className="text-center text-gray-400 py-4">
          모든 자료를 불러왔습니다
        </div>
      )}

      {/* 무한스크롤 감지용 div */}
      <div ref={loadingRef} className="h-10" />
    </>
  );
}
