import React, { useState } from 'react';

interface Props {}

const TextInput: React.FC<React.HTMLProps<HTMLInputElement>> = ({
  children,
  label,
  ...props
}) => {
  return (
    <div tw="flex flex-col">
      <label tw="text-sm mb-1">{label}</label>
      <input {...props}>{children}</input>
    </div>
  );
};

export default TextInput;
