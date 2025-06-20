import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { aysncupdateproduct,aysncdeleteproduct } from "../../store/ProductActions";

function ProductDetails() {
  const { id } = useParams();
  

  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);

  const product = products?.find((product) => product.id == id);
  const { register, reset, handleSubmit } = useForm({
    defaultValues:{
        image:product?.image,
        title:product?.title,
        price:product?.price,
        description:product?.description,
        category:product?.category
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletehandler = ()=>{
    dispatch(aysncdeleteproduct(id));
    navigate('/products')
  }
  const updatehandler = (product)=>{
    dispatch(aysncupdateproduct(product,id))
  }

  return product ? (
    <>
    <div className="flex ">
      <div className="w-1/2">
        <img
          className="border rounded h-[80vh] object-contain"
          src={product.image}
          alt=""
        />
      </div>
      <div className="w-1/2 content-center">
        <h1 className="font-thin text-5xl">{product.title}</h1>
        <h2 className="mb-5 text-2xl text-green-400">${product.price}</h2>
        <p className="mb-5 ">{product.description}</p>
        <button>Add to cart</button>
      </div>
    </div>
    <hr className="m-8"/>
    {users && users?.isAdmin && (<form
        onSubmit={handleSubmit(updatehandler)}
        className="w-96 flex flex-col border rounded bg-white text-black p-8 gap-y-4 mb-10">
        <input
          className="outline-none border-b text-xl m-2"
          {...register("title")}
          type="text"
          placeholder="Title"
        />
        <input
          className="outline-none border-b text-xl m-2"
          {...register("price")}
          type="number"
          placeholder="Price"
        />
        <input
          className="outline-none border-b text-xl m-2"
          {...register("image")}
          type="url"
          placeholder="img URL"
        />
        <textarea
          className="outline-none border-b text-xl m-2"
          {...register("description")}>
          Description
        </textarea>
        <input
          className="outline-none border-b text-xl m-2"
          {...register("category")}
          type="text"
          placeholder="Category"
        />
        <button className="bg-blue-300 rounded font-semibold hover:scale-[0.97]">
          Update Product
        </button>
        <button onClick={deletehandler} type="button" className="bg-red-300 rounded font-semibold hover:scale-[0.97]">Delete Product</button>
      </form>)}
    
    </>
  ) : <div>Loading....</div>;
}

export default ProductDetails;
