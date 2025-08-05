import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard.jsx";
import Label from "../form/Label.jsx";
import Input from "../form/input/InputField.jsx";
import TextArea from "../form/input/TextArea.jsx";
import Button from "../ui/button/Button.jsx";
import { myLecture } from "../../services/userService.js";
import { useNavigate, useParams, useLocation } from "react-router";

export default function MaterialForm() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 데이터 가져오기
  const { lecture, materialData, isEdit } = location.state || {};

  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDesp, setMaterialDesp] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (isEdit && materialData) {
      setMaterialTitle(materialData.materialTitle || "");
      setMaterialDesp(materialData.materialDesp || "");
      // 파일은 새로 선택하도록 함
      setFile(null);
    }
  }, [isEdit, materialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("lecNo", params.lectureName);
    formData.append("materialTitle", materialTitle);
    formData.append("materialDesp", materialDesp);
    formData.append("professorNo", params.userNo);

    if (file) {
      formData.append("uploadFile", file);
    }

    try {
      let success;

      if (isEdit) {
        // 수정 모드
        formData.append("materialNo", materialData.materialNo);
        success = await myLecture.updateLectureMaterial(formData);
        console.log("수정 성공:", success);
      } else {
        // 새 업로드 모드
        success = await myLecture.createLectureMaterial(formData);
        console.log("업로드 성공:", success);
      }

      // 성공 시 자료실로 이동
      navigate(
        `/eclass/lecture/${params.userNo}/${params.lectureName}/assignment`
      );
    } catch (error) {
      console.error(isEdit ? "수정 실패" : "업로드 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/eclass/lecture/${params.userNo}/${params.lectureName}/material`);
  };

  return (
    <ComponentCard title={isEdit ? "자료 수정" : "자료 업로드"}>
      <div className="space-y-6">
        {isEdit && materialData?.materialNo && (
          <div className="text-sm text-gray-500">
            자료 번호: {materialData.materialNo}
          </div>
        )}
        <div>
          <Label htmlFor="materialTitle">제목</Label>
          <Input
            type="text"
            id="materialTitle"
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="materialDesp">내용</Label>
          <TextArea
            value={materialDesp}
            onChange={(val) => setMaterialDesp(val)}
            placeholder="자료에 대한 상세한 설명을 입력하세요"
            required
          />
        </div>

        <div>
          <Label htmlFor="fileRefNo">파일 첨부 {isEdit ? "" : "*"}</Label>

          {/* 수정 모드일 때 기존 파일 정보 표시 */}
          {isEdit && materialData?.atchFile?.atchOriginName && (
            <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                현재 파일:
                <span className="font-medium ml-1">
                  {materialData.atchFile.atchOriginName}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                새 파일을 선택하면 기존 파일이 대체됩니다.
              </p>
            </div>
          )}

          <Input
            type="file"
            id="fileRefNo"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar,.jpg,.jpeg,.png,.gif"
            required={!isEdit} // 수정 모드가 아닐 때만 필수
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={handleCancel} disabled={loading}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "처리 중..." : isEdit ? "수정 완료" : "등록"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
