import { func } from 'prop-types';
import React, { useState } from 'react';
import {
  requestWobbedrobeDelete,
  requestWobbedrobeUpdate,
} from '../utils/fetchRequests/wobbedrobe';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUser } from '../utils/fetchRequests/user';
import { userLogin } from '../utils/reducers/statusSlice';
import '../styles/WobbedrobeItemCard.scss';
import styles from '../clothesData/style.json';
import materials from '../clothesData/materials.json';

export default function WobbedrobeItemCard({ itemType, item }) {
  const { color, category, style, material } = item;
  const userId = useSelector((state) => state.status.user).user_id;

  const [editColor, setEditColor] = useState(false);
  const [editStyle, setEditStyle] = useState(false);
  const [editMaterial, setEditMaterial] = useState(false);

  const colorProps = {
    color,
    userId,
    itemType: itemType + (itemType === 'shoes' ? '' : 's'),
    itemId: item[`${itemType}_id`],
    editColor,
    setEditColor,
  };
  const styleProps = {
    style,
    userId,
    itemType: itemType + (itemType === 'shoes' ? '' : 's'),
    itemId: item[`${itemType}_id`],
    editStyle,
    setEditStyle,
  };
  const materialProps = {
    material,
    userId,
    itemType: itemType + (itemType === 'shoes' ? '' : 's'),
    itemId: item[`${itemType}_id`],
    editMaterial,
    setEditMaterial,
  };

  return (
    <div className='item-card'>
      <div className='header'>
        <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
        <button
          className='delete'
          onClick={async () => {
            if (process.env.NODE_ENV === 'production') {
              await requestWobbedrobeDelete(
                itemType + (itemType === 'shoes' ? '' : 's'),
                item[`${itemType}_id`]
              );
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
          }}
        >
          DELETE
        </button>
      </div>

      <ColorRow {...colorProps} />
      <StyleRow {...styleProps} />
      {itemType !== 'shoes' && <MaterialRow {...materialProps} />}
    </div>
  );
}

function ColorRow({
  color,
  userId,
  itemType,
  itemId,
  editColor,
  setEditColor,
}) {
  const dispatch = useDispatch();
  const [updatedColor, setUpdatedColor] = useState(color);
  console.log(itemId);
  return (
    <div className='flex-row'>
      <div className='flex-item key color'>
        <p>color</p>
      </div>
      {editColor && (
        <form
          className='form'
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: 'color',
              updatedProperty: e.target.updatedColor.value,
            };
            if (process.env.NODE_ENV === 'production') {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditColor(false);
          }}
        >
          <input
            type='color'
            className='flex-item value color'
            value={updatedColor}
            onChange={(e) => setUpdatedColor(e.target.value)}
            name='updatedColor'
          />
          <input type='submit' value='SAVE' className='flex-item edit' />
        </form>
      )}
      {!editColor && (
        <div
          className='flex-item value color'
          style={{
            backgroundColor: color,
          }}
        ></div>
      )}
      {!editColor && (
        <button className='flex-item edit' onClick={() => setEditColor(true)}>
          EDIT
        </button>
      )}
    </div>
  );
}

function StyleRow({
  style,
  userId,
  itemType,
  itemId,
  editStyle,
  setEditStyle,
}) {
  return (
    <div className='flex-row'>
      <div className='flex-item key style'>
        <p>style</p>
      </div>
      {editStyle && (
        <form
          className='form'
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: 'color',
              updatedProperty: e.target.updatedStyle.value,
            };
            if (process.env.NODE_ENV === 'production') {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditStyle(false);
          }}
        >
          <select name='updatedStyle'>
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input type='submit' value='SAVE' className='flex-item edit' />
        </form>
      )}
      {!editStyle && (
        <div className='flex-item value color'>
          <p>{style}</p>
        </div>
      )}
      {!editStyle && (
        <button className='flex-item edit' onClick={() => setEditStyle(true)}>
          EDIT
        </button>
      )}
    </div>
  );
}

function MaterialRow({
  material,
  userId,
  itemType,
  itemId,
  editMaterial,
  setEditMaterial,
}) {
  return (
    <div className='flex-row'>
      <div className='flex-item key material'>
        <p>material</p>
      </div>
      {editMaterial && (
        <form
          className='form'
          onSubmit={async (e) => {
            e.preventDefault();
            const body = {
              propertyToChange: 'color',
              updatedProperty: e.target.updatedMaterial.value,
            };
            if (process.env.NODE_ENV === 'production') {
              await requestWobbedrobeUpdate(itemType, itemId, body);
              const updatedUser = await requestGetUser(userId);
              dispatch(userLogin(updatedUser));
            }
            setEditMaterial(false);
          }}
        >
          <select name='updatedMaterial'>
            {materials.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
          <input type='submit' value='SAVE' className='flex-item edit' />
        </form>
      )}
      {!editMaterial && (
        <div className='flex-item value color'>
          <p>{material}</p>
        </div>
      )}
      {!editMaterial && (
        <button
          className='flex-item edit'
          onClick={() => setEditMaterial(true)}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
