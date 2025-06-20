import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { asynccreateproduct } from "../../store/ProductActions";

function CreateProduct() {
  const {register,reset,handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Createhandle = (product)=>{
    product.id = nanoid();
    dispatch(asynccreateproduct(product));
    reset();
    navigate('/products')
  }
  return (
    <div className="w-full h-[80%] flex justify-center items-center ">
        <form onSubmit={handleSubmit(Createhandle)} className="w-96 flex flex-col border rounded bg-white text-black px-8 pb-10 gap-y-4">
          <h1 className="text-center font-bold text-xl mt-2">Create Product</h1>
          <hr />
          <input {...register("title")} type="text" placeholder="Title" />
          <input {...register("price")} type="number"  placeholder="Price" />
          <input {...register("image")} type="url"placeholder="img URL" />
          <textarea {...register("description")} >Description</textarea>
          <input {...register("category")} type="text" placeholder="Category"/>
          <button className="bg-blue-300 rounded font-semibold hover:scale-[0.97]">Create</button>
          
        </form>
    </div>
  )
}

export default CreateProduct