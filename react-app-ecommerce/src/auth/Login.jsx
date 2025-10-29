import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePostLoginMutation } from '../api/loginApi';

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
      console.log(res)
      navigate('/', { replace: true });
    } catch (error) {
      console.log('Login failed. Please check your credentials and try again.', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input id="username" name="username" type="text" value={user.username} onChange={handleChange} placeholder="username" className="w-full border rounded px-3 py-2" autoComplete="username"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input id="password" name="password" type="password" value={user.password} onChange={handleChange} placeholder="password" className="w-full border rounded px-3 py-2" autoComplete="current-password"/>
        </div>

        {isError && (
          <p className="text-red-600 text-sm">Login failed. Please try again.</p>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;