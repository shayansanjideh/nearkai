import React, { useState } from 'react';

interface Props {}

const List: React.FC<Props> = ({ children }) => {
  return <ul>{children}</ul>;
};

export default List;
