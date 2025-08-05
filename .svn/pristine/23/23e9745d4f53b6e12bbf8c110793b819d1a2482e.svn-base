// 정보 항목 컴포넌트
const InfoItem = ({ label, value, mono = false, isLink = false }) => (
  <div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline break-all"
      >
        {value}
      </a>
    ) : (
      <p
        className={`text-gray-800 ${
          mono ? "font-mono text-lg font-semibold" : ""
        }`}
      >
        {value}
      </p>
    )}
  </div>
);

export default InfoItem;
