import { useDispatch, useSelector } from 'react-redux';
import defaultUsers from '../../fakeData/user.json';
import React, { useState } from 'react';
import { goToPage, userLogin } from '../../utils/reducers/statusSlice';
import '../../styles/Login.scss';

// Page 2 & 3
export default function LogInSignUpBox() {
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  // for toggling between signup and signin
  const [isSignUp, setIsSignUp] = useState(false);
  // const [formState, setFormState] = useState(isSignUp);
  const [showSignUp, setShowSignUp] = useState(null);

  console.log(defaultUsers);
  console.log('login');

  const handleSubmit = (e) => { // this will be async
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!Object.keys(defaultUsers).includes(username)) {
      setMessage('Username not found, please sign up.');
      setShowSignUp(true);
    } else {
      const user = defaultUsers[username];
      if (password !== user.password) {
        setMessage('Password incorrect');
        setShowSignUp(true); // show sign up option if password is incorrect
      } else {
        setMessage('Login succesful');
        dispatch(userLogin({ ...user, username }));
        setTimeout(() => dispatch(goToPage('HOME')), 1000);
      }
    }

    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    //   });

    //   const data = await.response.json();

    //   if (response.ok) {
    //     // handle successful login
    //     setMessage('Login successful');
    //     dispatch(userLogin(data.user)); // dispatch user data
    //     setTimeout(() => dispatch(goToPage('HOME')), 1000);
    //   } else {
    //     setMessage(data.message || 'An error occured during login');
    //   }
    // } catch(err) {
    //   setMessage('Network error, please try again');
    //   console.error('Login error', err);
    // }
  }

  const toggleForm = () => {
    // toggle between sign up and login
    setIsSignUp(!isSignUp);
    // clear any existing messages
    setMessage('');
  };

  return (
      <div className="page-container">
        <div className="form-container">
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form onSubmit={ handleSubmit } className="login-form">
            <div className="input-group">
              <label>Username </label>
              <input name='username' type='text' />
            </div>
            <div className="input-group">
              <label>Password </label>
              <input name='password' type='password' />
            </div>
              <div className="button-group">
              <input type='submit' value={isSignUp ? 'Sign Up' : 'Log In'} />
              {!isSignUp && (
                <button type="button" className="signup-link" onClick={toggleForm}>
                  Sign up
                </button>
              )}
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
  );
}
