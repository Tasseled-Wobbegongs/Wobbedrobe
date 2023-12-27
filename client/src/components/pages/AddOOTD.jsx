import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { requestOOTDAdd } from '../../utils/fetchRequests/outfit';
import { userLogin } from '../../utils/reducers/statusSlice';
import { requestGetUser } from '../../utils/fetchRequests/user';
import '../../styles/AddOOTD.scss';

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
  const [canSubmit, setCanSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  console.log('imageUrl is', imageUrl);

  if (page === 'ADD_TO_OOTD')
    return (
      <div className='add-ootd'>
        {['top', 'bottom', 'overall', 'shoes'].map((itemType) => (
          <ItemsContainer
            key={itemType}
            itemType={itemType}
            items={user.wardrobe[itemType]}
            outfit={outfit}
            setOutfit={setOutfit}
            setCanSubmit={setCanSubmit}
          />
        ))}
        {canSubmit && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const file = e.target.userImage.files[0];
              console.log(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const dataUrl = reader.result;
                  const body = {
                    ...outfit,
                    user_id: user.user_id,
                    userImageUrl: dataUrl,
                  };
                  console.log(body);
                  if (process.env.NODE_ENV === 'production') {
                    const newOutfit = await requestOOTDAdd(body);
                    console.log(newOutfit);
                    setImageUrl(newOutfit.image_url);
                    const updatedUser = await requestGetUser(user.user_id);
                    dispatch(userLogin(updatedUser));
                    setCanSubmit(false);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            <label>Upload an image for you OOTD.</label>
            <input
              type='file'
              accept='image/png, image/jpeg'
              name='userImage'
            />
            <input type='submit' />
          </form>
        )}
        {imageUrl && <img src={imageUrl} alt='user_ootd' />}
      </div>
    );
}

function ItemsContainer({ itemType, items, setOutfit, outfit, setCanSubmit }) {
  return (
    <div className={`items-container ${itemType}`}>
      <div className='container-header'>
        <p>{itemType + (itemType === 'shoes' ? '' : 's')}</p>
      </div>
      <div className='cards-container'>
        {[...items]
          .sort((a, b) => a[`${itemType}_id`] - b[`${itemType}_id`])
          .map((item) => (
            <div
              className={
                'item-card-container' +
                (outfit[itemType] === item ? ' chosen' : '')
              }
              onClick={() => {
                const temp = { ...outfit };
                if (itemType === 'shoes') {
                  temp.shoes = item;
                } else if (itemType === 'overall') {
                  temp.top = null;
                  temp.bottom = null;
                  temp.overall = item;
                } else {
                  temp[itemType] = item;
                  temp.overall = null;
                }
                setOutfit(temp);
                if (temp.shoes && (temp.overall || (temp.top && temp.bottom))) {
                  setCanSubmit(true);
                }
              }}
            >
              <WobbedrobeItemCard
                itemType='top'
                item={item}
                key={`${itemType}_${item[`${itemType}_id`]}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
