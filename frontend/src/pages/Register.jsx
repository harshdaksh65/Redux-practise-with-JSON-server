import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { asyncUsers  } from "../store/UserActions";
function Register() {
  const {register,reset,handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerSubmit = (user)=>{
    user.id = nanoid();
    user.isAdmin = false;
    dispatch(asyncUsers(user));
    navigate('/login')
    reset();
    console.log(user);
  }
  return (
    <div className="w-full h-[80%] flex justify-center items-center ">
        <form onSubmit={handleSubmit(registerSubmit)} className="flex flex-col border rounded bg-white text-black px-8 pb-10 gap-y-4">
          <h1 className="text-center font-bold text-xl mt-2">Create Account</h1>
          <hr />
          <input {...register("username")} type="text" placeholder="Username" />
          <input {...register("email")} type="email"  placeholder="email ID" />
          <input {...register("password")} type="password"placeholder="Password" />
          <button className="bg-blue-300 rounded font-semibold hover:scale-[0.97]">Create</button>
          <hr />
          <p>already have an account? <Link to={'/login'} className="text-blue-300 font-semibold">login</Link> </p>
          
        </form>
    </div>
  );
}

export default Register