import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fakeAuth } from '../auth';

const Login = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };

  if (redirectToReferrer) {
    navigate(from);
    return null;
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;
