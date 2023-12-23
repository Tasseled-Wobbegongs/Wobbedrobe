// page 4

import { useSelector } from 'react-redux';
import Navbar from '../Navbar';

export default function Welcome() {
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  if (page === 'WELCOME')
    return (
      <div>
        <Navbar />
        {user && <h1>{`Welcome, ${username}!`}</h1>}
      </div>
    );
}
