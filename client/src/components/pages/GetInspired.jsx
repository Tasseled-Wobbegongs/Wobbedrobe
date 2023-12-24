//page8

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestGetUser } from '../../utils/fetchRequests/user';
import { requestOOTDAdd } from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';

export default function GetInspired() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  const wardrobe = user.wardrobe;
  console.log('wardrobe is', wardrobe);
  const { top, bottom, overall, shoes } = wardrobe;
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    overall: null,
  });
  const [selected, setSelected] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);

  if (page === 'GET_INSPIRED')
    return (
      <div>
        <button
          onClick={async () => {
            const randomOutfit = {};

            const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];
            randomOutfit.shoes = randomShoes;

            const ifOverall = Math.round(Math.random()) === 0;
            if (ifOverall) {
              const randomOverall =
                overall[Math.floor(Math.random() * overall.length)];
              randomOutfit.overall = randomOverall;
            } else {
              const randomTop = top[Math.floor(Math.random() * top.length)];
              const randomBottom =
                bottom[Math.floor(Math.random() * bottom.length)];
              randomOutfit.top = randomTop;
              randomOutfit.bottom = randomBottom;
            }
            console.log('random outfit is', randomOutfit);
            setOutfit(randomOutfit);
            setSelected(true);
            if (process.env.NODE_ENV === 'production') {
              const res = await requestOOTDAdd({
                ...randomOutfit,
                user_id: user.user_id,
              });
              setAiImageUrl(res.newOutfit.image_url);
              const updatedUser = await requestGetUser(user.user_id);
              dispatch(userLogin(updatedUser));
            }
          }}
        >
          Create a new OOTD with AI image
        </button>
        {selected && (
          <div>
            {Object.keys(outfit).map((key) => {
              console.log(key, outfit[key]);
              return (
                outfit[key] && (
                  <WobbedrobeItemCard itemType={key} item={outfit[key]} />
                )
              );
            })}
            {aiImageUrl && <img src={aiImageUrl} alt='Ai image' />}
          </div>
        )}
      </div>
    );
}
