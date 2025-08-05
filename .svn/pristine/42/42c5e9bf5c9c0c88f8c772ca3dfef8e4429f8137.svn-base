import { SESSION_TYPES } from "../../services/sessionService";
import CheckboxField from "../common/CheckboxField";
import FormField from "../form/FormField";

const SessionForm = ({ session, isLoading, onInputChange, onSubmit }) => (
  <div className="space-y-4">
    <FormField
      label="제목"
      name="title"
      type="text"
      placeholder="세션 제목을 입력하세요"
      value={session.title}
      onChange={onInputChange}
      required
    />

    <FormField
      label="시작 시간"
      name="startDate"
      type="datetime-local"
      value={session.startDate}
      onChange={onInputChange}
      required
    />

    <FormField
      label="세션 타입"
      name="type"
      type="select"
      value={session.type}
      onChange={onInputChange}
      options={SESSION_TYPES}
      required
    />

    <button
      onClick={onSubmit}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {isLoading ? "생성 중..." : "세션 생성"}
    </button>
  </div>
);

export default SessionForm;
