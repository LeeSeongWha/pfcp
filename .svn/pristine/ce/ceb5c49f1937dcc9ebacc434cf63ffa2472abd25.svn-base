import React, { forwardRef, useState } from "react";

// 유틸리티 함수 (Tailwind 클래스 이름 병합용)
import { cn } from "../../../lib/utils";

// Textarea 컴포넌트 정의
const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

// App 컴포넌트
const App = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Textarea Example</h1>
        <Textarea
          placeholder="Type your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-4"
        />
        <p className="text-sm text-gray-600">
          Current value: <span className="font-medium">{value || "Empty"}</span>
        </p>
      </div>
    </div>
  );
};

export default App;
