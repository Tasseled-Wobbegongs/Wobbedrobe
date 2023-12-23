import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage } from '../utils/reducers/statusSlice';

export default function Navbar() {
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();
  return (
    <div>
      {user && (
        <div>
          <button onClick={() => dispatch(goToPage('ADD_TO_WOBBEDROBE'))}>
            Add to Wobbedrobe
          </button>
          <button onClick={() => dispatch(goToPage('VIEW_WOBBEDROBE'))}>
            View your Wobbedrobe
          </button>
          <button onClick={() => dispatch(goToPage('ADD_TO_OOTD'))}>
            Add OOTD
          </button>
          <button onClick={() => dispatch(goToPage('GET_INSPIRED'))}>
            Get Inspired
          </button>
          <button onClick={() => dispatch(goToPage('VIEW_LOOKBOOK'))}>
            View your Lookbook
          </button>
          <button onClick={() => dispatch(goToPage('HOME'))}>BackToHome</button>
        </div>
      )}
      {!user && (
        <div>
          <button>Login</button>
          <button>Sign up</button>
        </div>
      )}
    </div>
  );
}
