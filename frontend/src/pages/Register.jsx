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
    user.cart = [];
    dispatch(asyncUsers(user));
    navigate('/login')
    reset();
    console.log(user);
  }
  return (
    <div className="w-full h-[80%] flex justify-center items-center ">
        <form onSubmit={handleSubmit(registerSubmit)} className="flex flex-col border-2 rounded-xl bg-[var(--sec)] text-black px-8 pb-10 gap-y-4">
          <h1 className="text-center text-[var(--tri)] font-bold text-xl mt-2">Create Account</h1>
          <hr />
          <input className="outline-none  text-xl bg-[var(--sec)]" {...register("username")} type="text" placeholder="Username" />
          <input className="outline-none  text-xl bg-[var(--sec)]" {...register("email")} type="email"  placeholder="email ID" />
          <input className="outline-none  text-xl bg-[var(--sec)]" {...register("password")} type="password"placeholder="Password" />
          <button className="bg-[var(--pri)] rounded font-semibold hover:scale-[0.97]">Create</button>
          <hr />
          <p>already have an account? <Link to={'/login'} className="text-[var(--pri)] font-semibold">login</Link> </p>

        </form>
    </div>
  );
}

export default Register