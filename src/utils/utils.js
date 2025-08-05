export const utils = {
  getKoreanDateTime: () => {
    const now = new Date();
    const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return koreanTime.toISOString().slice(0, 19);
  },

  validateSessionData: (session) => {
    const requiredFields = ["startDate", "type"];
    return requiredFields.every((field) => session[field]?.trim());
  },

  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      return false;
    }
  },

  toRequestData: (session) => ({
    type: session.type,
    th: session.th,
    title: session.title,
    startDate: session.startDate,
    userNo: session.userNo,
    lecNo: session.lecNo,
  }),

  toResponseData: (payload, originalTitle) => ({
    zoomMeetingId: payload.id,
    joinUrl: payload.join_url,
    password: payload.password,
    hostEmail: payload.host_email,
    timezone: payload.timezone,
    createdAt: payload.created_at,
    agenda: payload.agenda,
    title: payload.topic || originalTitle,
    start_time: payload.start_time,
  }),

  formatFileSize: (sizeInBytes) => {
    if (!sizeInBytes || sizeInBytes === 0) return "0 B";

    const size = parseFloat(sizeInBytes);

    if (size < 1024) {
      return `${Math.round(size)} B`;
    } else if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  },

  getCookie: (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  },

  formatDateTo12Hour: (dateString) => {
    if (!dateString) return "설정되지 않음";

    const date = new Date(dateString);

    // 날짜 부분
    const dateFormat = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // 시간 부분 (12시간 형식)
    const timeFormat = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateFormat} ${timeFormat}`;
  },
};
