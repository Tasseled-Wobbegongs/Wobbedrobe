import { useDispatch, useSelector } from 'react-redux';
import defaultUsers from '../../fakeData/user.json';
import React, { useState } from 'react';
import { goToPage, userLogin } from '../../utils/reducers/statusSlice';

// Page 2 & 3
export default function LogInSignUpBox() {
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  console.log(defaultUsers);
  console.log('login');
  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (!Object.keys(defaultUsers).includes(username))
          setMessage('Username not found, please sign up');
        else {
          const user = defaultUsers[username];
          console.log('password', password, user.password);
          if (password !== user.password) setMessage('Password Incorrect');
          else {
            setMessage('Login successfully');
            dispatch(userLogin({ ...user, username: username }));
            setTimeout(() => dispatch(goToPage('HOME')), 1000);
          }
        }
      }}
    >
      <form>
        <label>Username: </label>
        <input name='username' type='text' />
        <label>Password: </label>
        <input name='password' type='password' />
        <input type='submit' value={page === 'LOGIN' ? 'login' : 'Sign up'} />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
