import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { toast } from "sonner";
import {useGoogleLogin } from "@react-oauth/google";
import { useStore } from "../store";
import { getGoogleSignUp } from "../utils/apiCalls";

const LoginPage = () => {
  const [data, setData] = useState({});

  const {setUser} = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async() => {
    try {
      const resUserCreate = await axios.post('http://localhost:8800/auth/login', data);

      setUser(resUserCreate.data.user)
      localStorage.setItem('userBlogMERN',JSON.stringify(resUserCreate.data.user));
      localStorage.setItem('TokenUserBlogMERN',resUserCreate.data.token);

      toast.success('create user gg successfully')
      // navigate('/')
      window.location.replace('/')
    } catch (error) {
      toast.error(error?.message || 'lỗi logic')
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //Get info từ api gg
      const userInfo  = await getGoogleSignUp(tokenResponse);
      console.log('userInfo',userInfo);
      
      // create user 
      const data = {
        firstName:userInfo.given_name,
        lastName:userInfo.family_name,
        email:userInfo.email,
        image:userInfo.picture,
        emailVerified:userInfo.verified_email
      }
      try {
        const resUserCreate = await axios.post('http://localhost:8800/auth/login', data);

        setUser(resUserCreate.data.user)
        localStorage.setItem('userBlogMERN',JSON.stringify(resUserCreate.data.user));
        localStorage.setItem('TokenUserBlogMERN',resUserCreate.data.token);

        toast.success('create user gg successfully')
        // navigate('/')
        window.location.replace('/')
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message || 'service error')
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
  });

  return (
    <div className="md:max-w-[80%] px-4 mx-auto min-h-screen flex flex-col lg:flex-row justify-between items-center ">
      {/* Left Side - Logo and Welcome Text */}
      <div className="mt-5 lg:mt-0 mb-8 lg:mb-0 text-center lg:text-left px-4 lg:px-0">
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          Blog<span className="text-red-500">MERN</span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg">Welcome, back!</p>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/3 px-4 lg:px-0 bg-transparent text-white">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6 lg:mb-8 text-center">
          Sign in to your account
        </h2>

        {/* Google Sign In Button */}
        <div 
          className="flex items-center justify-center space-x-2 border border-gray-400 rounded-full px-4 py-2 mb-4 hover:bg-gray-900 cursor-pointer"
          onClick={() => login()}
        >
          <FcGoogle />
          <span className="text-white">Sign in with Google</span>
        </div>

        {/* Divider */}
        <div className="flex items-center space-x-4 my-4">
          <div className="border-b border-gray-600 w-full"></div>
          <span className="text-gray-400 text-nowrap">
            or sign in with email
          </span>
          <div className="border-b border-gray-600 w-full"></div>
        </div>

        {/* Form Inputs */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full mt-6"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
