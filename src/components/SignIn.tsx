// src/components/SignIn.tsx
import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

interface SignInProps {
  theme: string;
  onAuthChoiceChange: (choice: "login" | "signin") => void;
}

const SignIn: React.FC<SignInProps> = ({ theme, onAuthChoiceChange }) => {
  
  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || ""; 
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const isValidEmail = (email: string) => {
    if (email.trim() === '') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidName = (name: string) => {
    return name.trim().length >= 3;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    if (value === '') {
      setEmailError('Email cannot be empty');
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
      setPasswordError('Password must contain at least one uppercase letter, one digit, and be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setName(value);
    if (value === '') {
      setNameError('Name cannot be empty');
    } else if (!isValidName(value)) {
      setNameError('Name must be at least 3 characters long');
    } else {
      setNameError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const isPasswordMatch = password === confirmPassword && password !== "" && confirmPassword !== "";
  const isFormValid = isPasswordMatch && !emailError && !passwordError && !nameError;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`SignIn attempted with: ${email} , ${password}`);
    try {
      const result = await invoke('create_account', { email, password, name, rememberMe: rememberMe ? ["asw"] : [] });
    } catch (error) {
      if (error === "email already in use") {
        setEmailError(error.charAt(0).toUpperCase() + error.slice(1));
      } else {
        alert(error);
      }
    }
  };

  return (
    
    <div className="flex flex-col gap-6 rounded-box bg-base-200 shadow-lg backdrop-blur-lg backdrop-filter p-8 max-w-lg w-full">
     <h1 className="text-3xl font-bold self-center">Register</h1>

    <span className="self-center">
    Already have an account? 
        <button onClick={() => onAuthChoiceChange("login")} className="btn btn-link">Login</button>
      </span>

    <a className="btn btn-secondary btn-outline">
      <i className="fa-brands fa-google text-primary"></i>
      Log in with Google
    </a>

    <div className="divider">OR</div>

    <label className="form-control">
      <div className="label">
        <span className="label-text">Name</span>
      </div>
      <input
        type="text"
        className="input input-bordered bg-white text-black"
        placeholder="John Doe"
        value={name}
        onChange={handleNameChange}
      />
      {nameError && <p className="text-red-500">{nameError}</p>}
    </label>

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

    <label className="form-control">
    <div className="label">
        <span className="label-text">Confirm password</span>
      </div>
      <input
        type="password"
        className="input input-bordered bg-white text-black"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {!isPasswordMatch && <p className="text-red-500">Passwords don't match</p>}
    </label>

    <div className="form-control">
      <label className="cursor-pointer label self-start gap-2">
        <input type="checkbox" className="checkbox" 
          checked={rememberMe}
          onChange={handleCheckboxChange} 
          />
        <span className="label-text">Remember me</span>
      </label>
    </div>

    <button className="btn btn-primary" disabled={!isFormValid} onClick={handleSubmit}>Sign in</button>
    </div>
  );
};

export default SignIn;