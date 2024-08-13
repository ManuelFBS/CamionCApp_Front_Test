import React from 'react';

export function Label({ children, ...props }) {
  return (
    <label
      className="text-md font-bold mt-2 italic text-gray-600"
      {...props}
    >
      {children}
    </label>
  );
}
