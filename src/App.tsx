import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

export default function Component() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme!);
    const localTheme = localStorage.getItem("theme") || ""; 

    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };


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
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Welcome */}
      <div className="flex flex-1 flex-col justify-center bg-gradient-to-r from-purple-700 via-sky-500 to-blue-500 background-animate p-8 text-white">
        <h1 className="mb-4 text-4xl font-bold">Welcome To Rema!</h1>
        <p className="mb-6 text-xl">
          Log in to access your personalized dashboard and continue your
          journey.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Track your progress</li>
          <li>Connect with others</li>
          <li>Explore new features</li>
        </ul>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-base-100 p-8">
      <label className="absolute top-4 right-4 swap swap-rotate">
  <input type="checkbox" className="theme-controller" onChange={handleToggle}
          checked={theme === "light" ? false : true} />

  <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  <svg
    className="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>
        <div className="flex flex-col gap-6 rounded-box bg-base-200 shadow-lg backdrop-blur-lg backdrop-filter p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold self-center">Log in</h1>

          <span className="self-center">
            Don't have an account? 
            <a className="link link-secondary">Register</a>
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
      </div>
    </div>
  );
}
