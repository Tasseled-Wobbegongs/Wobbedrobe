import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function UserWobbeDrobe() {
  const wardrobe = useSelector((state) => state.status.user.wardrobe);
  const page = useSelector((state) => state.status.page);
  const [selection, setSelection] = useState(null);
  if (page === 'VIEW_WOBBEDROBE')
    return (
      <div>
        <button onClick={() => setSelection(wardrobe.tops)}>Tops</button>
        <button onClick={() => setSelection(wardrobe.bottoms)}>Bottoms</button>
        <button onClick={() => setSelection(wardrobe.overalls)}>
          Overalls
        </button>
        <button onClick={() => setSelection(wardrobe.overalls)}>
          Overalls
        </button>
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
