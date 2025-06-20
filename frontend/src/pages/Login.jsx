import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import {useForm} from 'react-hook-form'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncloginuser } from "../store/UserActions";

function Login() {
  const {register,reset,handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSubmit = (user)=>{
    console.log(user);
    dispatch(asyncloginuser(user));
    navigate('/')
  }
  return (
    <div className="w-full h-[80%] flex justify-center items-center ">
        <form onSubmit={handleSubmit(loginSubmit)} className="flex flex-col border rounded bg-white text-black px-8 pb-10 gap-y-4">
          <h1 className="text-center font-bold text-xl mt-2">Login</h1>
          <hr />
          <input {...register("username")} type="text" placeholder="Username" />
          <input {...register("password")} type="password"placeholder="Password" />
          <button className="bg-blue-300 rounded font-semibold hover:scale-[0.97]">Login</button>
          <hr />
          <p>Don't have an account? <Link to={'/register'} className="text-blue-300 font-semibold">register</Link> </p>
          
        </form>
    </div>
  );
}

export default Login;

{
  /* <form className="flex flex-col border rounded bg-white text-black">
        <input type="text" name="" placeholder="Username" />
        <input type="text" name="" placeholder="email ID" />
        <input type="password" name="" placeholder="Password" />
      </form> */
}
