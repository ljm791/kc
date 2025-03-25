import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: '#5865F2',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 6,
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      {...props}
    >
      {children}
    </button>
  );
};
