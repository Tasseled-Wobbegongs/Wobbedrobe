import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function UserWobbeDrobe() {
  const wardrobe = useSelector((state) => state.status.user.wardrobe);
  const [selection, setSelection] = useState(null);
  return (
    <div>
      <div onClick={() => setSelection(wardrobe.tops)}>Tops</div>
      <div onClick={() => setSelection(wardrobe.bottoms)}>Bottoms</div>
      <div onClick={() => setSelection(wardrobe.overalls)}>Overalls</div>
      <div onClick={() => setSelection(wardrobe.overalls)}>Overalls</div>
      {selection && (
        <div>
          {Object.keys(selection).map((key) => (
            <p>{`${key}: ${selection[key]}`}</p>
          ))}
        </div>
      )}
    </div>
  );
}
