import { classList } from '@/utils';
import React from 'react';

type ButtonProps = {
  text: React.ReactNode;
  color: 'cyan' | 'gray' | 'red' | 'white-cyan' | 'none';
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: any;
  width?: 'normal' | 'full';
};

const Button = ({
  text,
  color,
  onClick,
  type = 'button',
  disabled = false,
  width = 'normal',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classList(
        'text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:bg-opacity-0 disabled:text-opacity-0 px-6 py-2 rounded-md',
        {
          'border-cyan-700 bg-cyan-800 text-white hover:bg-cyan-700':
            color === 'cyan',
          'border-gray-700 bg-gray-600 text-white hover:bg-gray-700':
            color === 'gray',
          'border-red-700 bg-red-600 text-white hover:bg-red-700':
            color === 'red',
          'border-cyan-700 bg-cyan-700 text-white hover:bg-cyan-700':
            color === 'white-cyan',
          'border-transparent bg-transparent text-cyan-700 hover:bg-cyan-700 hover:text-white px-0.5 py-0.5':
            color === 'none',
        },
        {
          'w-full': width === 'full',
          '': width === 'normal',
        },
      )}
    >
      {text}
    </button>
  );
};

export default Button;
