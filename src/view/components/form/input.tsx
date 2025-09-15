"use client";

import { cn } from "@/lib/utils/style-functions";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
        "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className,
      )}
      {...props}
    />
  );
}
