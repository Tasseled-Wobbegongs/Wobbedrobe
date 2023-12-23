import React from 'react';
import { useSelector } from 'react-redux';

export default function AddOOTD() {
  const page = useSelector((state) => state.status.page);
  if (page === 'ADD_TO_OOTD')
    return (
      <div>
        <form>
          <label>Top:</label>
          <input />
          <label>Bottom:</label>
          <input />
          <label>Shoes:</label>
          <input />
        </form>
      </div>
    );
}
