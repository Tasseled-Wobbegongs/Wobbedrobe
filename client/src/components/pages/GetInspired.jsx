//page8

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';

export default function GetInspired() {
  const page = useSelector((state) => state.status.page);
  const wardrobe = useSelector((state) => state.status.user).wardrobe;
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
            console.log(randomOutfit);
            setOutfit(randomOutfit);
            setSelected(true);
            if (process.env.NODE_ENV === 'build') {
              const res = await requestOOTDAdd(body);
              setAiImageUrl(res.imageUrl);
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
