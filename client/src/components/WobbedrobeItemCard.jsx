import { func } from 'prop-types';

const emoji = {
  shoes: '👞',
  top: '👕',
  bottom: '👖',
  overall: '👗',
};

export default function WobbedrobeItemCard({ itemType, item }) {
  const { color, category, style, material } = item;
  console.log(item);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        border: 'solid 1px black',
        paddingBottom: '20px',
        margin: '10px',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px gray',
      }}
    >
      <h3>{emoji[itemType]}</h3>
      <LabelText label='Category' text={category} />
      <LabelText label='Color' text={color} />
      {itemType !== 'shoes' && <LabelText label='Material' text={material} />}
      <LabelText label='Style' text={style} />
    </div>
  );
}

function LabelText({ label, text }) {
  return (
    <p style={{ margin: '2px' }}>
      <strong>{label}: </strong>
      {text}
    </p>
  );
}
