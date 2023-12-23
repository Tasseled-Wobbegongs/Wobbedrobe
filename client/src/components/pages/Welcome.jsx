// page 4

import { useSelector } from 'react-redux';

export default function Welcome() {
  const username = useSelector((state) => state.status.user.username);
  return (
    <div>
      {/* <Navbar> */}
      <h1>{`Welcome, ${username}!`}</h1>
    </div>
  );
}
