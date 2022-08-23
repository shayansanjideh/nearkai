import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  label: string;
  link: string;
  secondary?: string;
  onClick?: () => unknown;
}

const ListItem: React.FC<Props> = ({
  children,
  label,
  secondary,
  onClick,
  link,
}) => {
  return (
    <Link
      to={link}
      className="nav-selectable"
      tw="hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-400 "
    >
      <li
        tw="flex flex-col flex-grow py-2 px-2 overflow-hidden"
        onClick={onClick}
      >
        <div tw="text-sm">{label}</div>
        {secondary ? <div tw="text-xs">{secondary}</div> : null}
      </li>
    </Link>
  );
};

export default ListItem;
