//page8

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestGetUser } from '../../utils/fetchRequests/user';
import {
  requestOOTDAdd,
  requestOOTDAiImage,
} from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';
import { Audio } from 'react-loader-spinner';
import '../../styles/GetInspired.scss';
import OutfitCard from '../OutfitCard';

export default function GetInspired() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  const wardrobe = user.wardrobe;
  const { top, bottom, overall, shoes } = wardrobe;
  const [outfit, setOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null,
    overall: null,
  });
  console.log('outfit is', outfit);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [stage, setStage] = useState('generate_random_outfit');

  function generateRandomOutfit() {
    const randomOutfit = {};

    const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];
    randomOutfit.shoes = randomShoes;

    const ifOverall =
      Math.random() * (Math.min(top.length, bottom.length) + overall.length) <=
      overall.length;
    if (ifOverall) {
      const randomOverall = overall[Math.floor(Math.random() * overall.length)];
      randomOutfit.overall = randomOverall;
    } else {
      const randomTop = top[Math.floor(Math.random() * top.length)];
      const randomBottom = bottom[Math.floor(Math.random() * bottom.length)];
      randomOutfit.top = randomTop;
      randomOutfit.bottom = randomBottom;
    }
    console.log('random outfit is', randomOutfit);
    setOutfit(randomOutfit);
    setStage('generate_ai_image');
  }

  async function generateAiImage() {
    const body = outfit;
    console.log('body is', body);
    if (process.env.NODE_ENV === 'production') {
      const res = await requestOOTDAiImage(body);
      setAiImageUrl(res.image_url);
    }
    setFetching(false);
  }

  async function saveNewOOTD() {
    if (process.env.NODE_ENV === 'production') {
      const body = {
        ...outfit,
        user_id: user.user_id,
        onlineImageUrl: aiImageUrl,
      };
      console.log(body);
      await requestOOTDAdd(body);
      const updatedUser = await requestGetUser(user.user_id);
      dispatch(userLogin(updatedUser));
      setStage('generate_random_outfit');
      setOutfit({
        top: null,
        bottom: null,
        shoes: null,
        overall: null,
      });
      setAiImageUrl(null);
    }
  }

  if (page === 'GET_INSPIRED')
    return (
      <div className='get-inspired'>
        <button onClick={generateRandomOutfit}>
          {stage === 'generate_random_outfit'
            ? 'Generate a random outfit from your wobbedrobe.'
            : "Don't like it? Regenerate!"}
        </button>
        {stage === 'generate_ai_image' && (
          <button
            onClick={() => {
              setFetching(true);
              generateAiImage();
              setStage('save_ootd');
            }}
          >
            Generate an Ai image for your new outfit.
          </button>
        )}
        {fetching && (
          <div>
            <p>Fetching Ai image...</p>
            <Audio
              height='80'
              width='100'
              radius='9'
              color='#9a9394'
              ariaLabel='three-dots-loading'
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
        {stage === 'save_ootd' && !fetching && (
          <button onClick={saveNewOOTD}>
            Save this outfit to your Wobbedrobe
          </button>
        )}
        {stage !== 'generate_random_outfit' && !aiImageUrl && (
          <div>
            {['top', 'bottom', 'overall', 'shoes'].map((key) => {
              return (
                outfit[key] && (
                  <WobbedrobeItemCard itemType={key} item={outfit[key]} />
                )
              );
            })}
          </div>
        )}
        {aiImageUrl && (
          <OutfitCard
            aiCard={true}
            userId={user.user_id}
            outfit={{
              top_id: outfit.top ? outfit.top.top_id : undefined,
              bottom_id: outfit.bottom ? outfit.bottom.bottom_id : undefined,
              overall_id: outfit.overall
                ? outfit.overall.overall_id
                : undefined,
              shoes_id: outfit.shoes.shoes_id,
              image_url: aiImageUrl,
            }}
          />
        )}
      </div>
    );
}
