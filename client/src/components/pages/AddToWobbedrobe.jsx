//page 5

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToPage } from '../../utils/reducers/statusSlice';

export default function AddToWobbeDrobe() {
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();
  const [selection, setSelection] = useState(null);
  if (page === 'ADD_TO_WOBBEDROBE')
    return (
      <div>
        {!selection && (
          <div>
            <button onClick={() => setSelection('Top')}>Top</button>
            <button onClick={() => setSelection('Bottom')}>Bottoms</button>
            <button onClick={() => setSelection('Overall')}>Overalls</button>
            <button onClick={() => setSelection('Shoes')}>Shoes</button>
          </div>
        )}
        {selection && (
          <div>
            <p>You are adding a new entry of {selection} to your Wobbedrobe</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSelection(null);
                dispatch(goToPage('HOME'));
              }}
            >
              <label>Color: </label>
              <input type='color' />
              <input type='submit' />
            </form>
          </div>
        )}
      </div>
    );
}
