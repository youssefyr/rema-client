// src/components/Login.tsx
import React, { useState, useEffect } from 'react';

interface LoginProps {
  theme: string;
  onAuthChoiceChange: (choice: "login" | "signin") => void;
}

const Login: React.FC<LoginProps> = ({ theme, onAuthChoiceChange }) => {
  
  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || ""; 
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    if (value === '') {
      setEmailError('');
    } else if (!isValidEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);
    if (value === '') {
      setPasswordError('');
    } else if (!isValidPassword(value)) {
      setPasswordError('Password must contain at least one uppercase letter, one digit, and be at least 7 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", email, password);

    if (email === 'yorba@gmail.com' && password === '1234567') {
      alert('Login successful');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-box bg-base-200 shadow-lg backdrop-blur-lg backdrop-filter p-8 max-w-lg w-full">
    <h1 className="text-3xl font-bold self-center">Log in</h1>

    <span className="self-center">
    Don't have an account? 
    <button onClick={() => onAuthChoiceChange("signin")} className="btn btn-link">Sign In</button>
    </span>

    <a className="btn btn-secondary btn-outline">
      <i className="fa-brands fa-google text-primary"></i>
      Log in with Google
    </a>

    <div className="divider">OR</div>

    <label className="form-control">
      <div className="label">
        <span className="label-text">Email</span>
      </div>
      <input
        type="email"
        className="input input-bordered bg-white text-black"
        placeholder="email@gmail.com"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
    </label>

    <label className="form-control">
      <div className="label">
        <span className="label-text">Password</span>
        <a className="label-text link link-accent">Forgot password?</a>
      </div>
      <input
        type="password"
        className="input input-bordered bg-white text-black"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
    </label>

    <div className="form-control">
      <label className="cursor-pointer label self-start gap-2">
        <input type="checkbox" className="checkbox" />
        <span className="label-text">Remember me</span>
      </label>
    </div>

    <button className="btn btn-primary" onClick={handleSubmit}>Log in</button>
  </div>
  );
};

export default Login;