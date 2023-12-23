// Page 9

import React from 'react';
import { useSelector } from 'react-redux';

export default function Lookbook() {
  const lookbook = useSelector((state) => state.status.user.lookbook);
  const page = useSelector((state) => state.status.page);
  return (
    <div>
      {lookbook.map((look) => (
        <Look look={look} />
      ))}
    </div>
  );
}

function Look({ look }) {
  return <div></div>;
}
