import React, { useEffect, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import { toast } from "sonner";
import {useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

import { getGoogleSignUp } from "../utils/apiCalls";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../utils/uploadFile";

const SignupPage = () => {
  // auth
  // layout jsx
  // state data form + handleChange
  // validation form
  // state file picture
  // handle login gg: ...
  // handle submit
  // toaster: sonner
  // integrate

  const {setUser} = useStore();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    file && uploadFile(setFileURL,file)
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    
    try {
      //loading true
      //api
      data.image = fileURL;
      const resUserCreate = await axios.post('http://localhost:8800/auth/register', data)
      //loading false
      
      //lưu thông tin user,token
      // setUser(resUserCreate.data.user)
      // localStorage.setItem('userBlogMERN',JSON.stringify(resUserCreate.data.user));
      // localStorage.setItem('TokenUserBlogMERN',resUserCreate.data.token);

      toast.success("Signup email has been created");
      // navigate('/')
      window.location.replace('/sign-in');
    } catch (error) {
      toast.error(error?.message || 'lỗi logic')
    }
    
  };

  const isAuthenticated = true;
  if (!isAuthenticated) {
    window.location.replace("/");
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
        const resUserCreate = await axios.post('http://localhost:8800/auth/google-signup', data);

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
    <>
      <div className="md:max-w-[80%] mx-auto px-4 min-h-screen flex flex-col lg:flex-row justify-between items-center">
        {/* Left Side - Logo and Welcome Text */}
        <div className="mt-5 lg:mt-0 mb-8 lg:mb-0 text-center lg:text-left px-4 lg:px-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Blog<span className="text-red-500">MERN</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">Welcome!</p>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/3 px-4 lg:px-0 bg-transparent text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 lg:mb-8 text-center flex items-center justify-center space-x-2">
            {showForm && (
              <IoArrowBackCircleOutline
                className="cursor-pointer"
                onClick={() => setShowForm(false)}
              />
            )}
            <span>Sign up for an account</span>
          </h2>

          {/* Form Inputs */}
          {showForm && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input
                  type="First Name"
                  placeholder="First Name"
                  className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                />
                <input
                  type="Last Name"
                  placeholder="Last Name"
                  className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                className="bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-400 w-full py-2 text-white placeholder-gray-500"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <div className="flex items-center my-8">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center cursor-pointer"
                >
                  <AiFillPicture />
                  <span className="ml-2">Picture</span>
                </label>
                <input
                  className="hidden"
                  type="file"
                  name=""
                  id="imgUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full mt-6"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </form>
          )}
          {!showForm && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Google Sign In Button */}
              <div 
                className="flex items-center justify-center space-x-2 border border-gray-400 rounded-full px-4 py-2 mb-4 hover:bg-gray-900 cursor-pointer"
                onClick={() => login()}
              >
                <FcGoogle />
                <span className="text-white">Sign up with Google</span>
              </div>
              {/* Divider */}
              <div className="flex items-center space-x-4 my-4">
                <div className="border-b border-gray-600 w-full"></div>
                <span className="text-gray-400 text-nowrap">or</span>
                <div className="border-b border-gray-600 w-full"></div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full mt-6"
                onClick={() => setShowForm(true)}
              >
                Continue with email
              </button>
            </form>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-6">
            Already has an account?{" "}
            <Link to="/sign-in" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
