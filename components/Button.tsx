'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonComponentProps {
  label: string;
  redirectTo: string;
  className?: string;
}

const Button: React.FC<ButtonComponentProps> = ({
  label,
  redirectTo,
  className,
}) => {
  const router = useRouter();

  const defaultClass =
    'bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors';
  const buttonClass = className ? `${defaultClass} ${className}` : defaultClass;

  return (
    <button onClick={() => router.push(redirectTo)} className={buttonClass}>
      {label}
    </button>
  );
};

export default Button;
