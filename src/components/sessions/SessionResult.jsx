import InfoItem from "../common/InfoItem";
import SuccessIcon from "../common/SuccessIcon";

// 세션 결과 컴포넌트
const SessionResult = ({ session, onCopyLink, onCopyInfo }) => (
  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
      <SuccessIcon />
      세션이 성공적으로 생성되었습니다!
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoItem label="미팅 ID" value={session.zoomMeetingId} mono />
      <InfoItem label="비밀번호" value={session.password} mono />

      <div className="md:col-span-2">
        <InfoItem label="참여 링크" value={session.joinUrl} isLink />
      </div>

      <InfoItem label="호스트 이메일" value={session.hostEmail} />
      <InfoItem label="시간대" value={session.timezone} />
    </div>

    <div className="mt-4 flex space-x-3">
      <ActionButton onClick={onCopyLink} variant="primary">
        링크 복사
      </ActionButton>
      <ActionButton onClick={onCopyInfo} variant="secondary">
        정보 복사
      </ActionButton>
    </div>
  </div>
);

export default SessionResult;
