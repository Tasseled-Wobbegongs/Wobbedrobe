import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestOOTDAdd } from '../../utils/fetchRequests/outfit';

export default function AddOOTD() {
  const page = useSelector((state) => state.status.page);
  const user = useSelector((state) => state.status.user);
  console.log(user.wardrobe);
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    overall: null,
  });
  console.log('outfit', outfit);
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
                const body = {
                  user_id: user.user_id,
                  shoes_id: outfit.shoes.shoes_id,
                };
                if (outfit.overall) {
                  body.overall_id = outfit.overall.overall_id;
                } else {
                  body.top_id = outfit.top.top_id;
                  body.bottom_id = outfit.bottom.bottom_id;
                }
                console.log(body);
                if (process.env.NODE_ENV === 'production') {
                  const res = await requestOOTDAdd(body);
                  setAiImageUrl(res.imageUrl);
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
