const ActionButton = ({ onClick, variant = "primary", children }) => {
  const baseClasses =
    "text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
