//page8

import React from 'react';
import { useSelector } from 'react-redux';

export default function getInspired() {
  const page = useSelector((state) => state.status.page);
  return (
    <div>
      <h3>getInspired</h3>
    </div>
  );
}
