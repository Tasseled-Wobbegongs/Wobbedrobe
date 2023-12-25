import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestOOTDAdd } from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';
import { requestGetUser } from '../../utils/fetchRequests/user';

export default function AddOOTD() {
  const page = useSelector((state) => state.status.page);
  const user = useSelector((state) => state.status.user);
  const dispatch = useDispatch();
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    overall: null,
  });
  const [selection, setSelection] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [aiImageUrl, setAiImageUrl] = useState(null);

  if (page === 'ADD_TO_OOTD')
    return (
      <div>
        <button onClick={() => setSelection('top')}>Tops</button>
        <button onClick={() => setSelection('bottom')}>Bottoms</button>
        <button onClick={() => setSelection('overall')}>Overalls</button>
        <button onClick={() => setSelection('shoes')}>Shoes</button>
        {selection && (
          <div>
            {user.wardrobe[selection].map((item) => (
              <div
                onClick={() => {
                  const temp = { ...outfit };
                  temp[selection] = item;
                  if (selection === 'overall') {
                    temp.top = null;
                    temp.bottom = null;
                  }
                  if (selection === 'top' || selection === 'bottom')
                    temp.overall = null;
                  if (temp.shoes && ((temp.top && temp.bottom) || temp.overall))
                    setCanSubmit(true);
                  setOutfit(temp);
                }}
              >
                <WobbedrobeItemCard itemType={selection} item={item} />
              </div>
            ))}
          </div>
        )}
        <div>
          <h3>Selected items are: </h3>
          {Object.keys(outfit).map((key) => {
            console.log(key, outfit[key]);
            return (
              outfit[key] && (
                <WobbedrobeItemCard itemType={key} item={outfit[key]} />
              )
            );
          })}
          {canSubmit && (
            <button
              onClick={async () => {
                const body = { ...outfit };
                body.user_id = user.user_id;
                console.log(body);
                if (process.env.NODE_ENV === 'production') {
                  const res = await requestOOTDAdd(body);
                  console.log('response is ', res);
                  setAiImageUrl(res.newOutfit.image_url);
                  const updatedUser = await requestGetUser(user.user_id);
                  dispatch(userLogin(updatedUser));
                }
                setCanSubmit(false);
              }}
            >
              Add to OOTD and generate an Ai Image
            </button>
          )}
        </div>
        {aiImageUrl && <img src={aiImageUrl} alt='Ai image' />}
      </div>
    );
}
