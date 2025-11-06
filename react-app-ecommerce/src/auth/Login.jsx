import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostLoginMutation } from '../api/loginApi';
import styles from './login.module.css';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [postLogin, { isLoading, isError }] = usePostLoginMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await postLogin(user).unwrap();
      console.log(res);
      navigate('/landingpage', { replace: true });
    } catch (error) {
      console.log('Login failed. Please check your credentials and try again.', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input id="username" name="username" type="text" value={user.username} onChange={handleChange} placeholder="username" className={styles.input} autoComplete="username"/>
        </div>
        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input id="password" name="password" type="password" value={user.password} onChange={handleChange} placeholder="password" className={styles.input} autoComplete="current-password"/>
        </div>

        {isError && (
          <p className={styles.error}>Login failed. Please try again.</p>
        )}
        <button type="submit" className={styles.submit} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;