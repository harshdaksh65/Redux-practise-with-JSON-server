import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { aysncupdateproduct,aysncdeleteproduct } from "../../store/ProductActions";
import { ayncsUpdateuser } from "../../store/UserActions";

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

  const Addtocarthandle = (product) => {
    if (!users) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    const copyuser = { ...users, cart: [...users.cart] };
    const index = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
    if (index == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[index] = {
        product,
        quantity: copyuser.cart[index].quantity + 1,
      };
    }
    dispatch(ayncsUpdateuser(copyuser.id, copyuser));
  }

  return product ? (
    <>
    <div className="flex ">
      <div className="w-1/2 flex justify-center items-center">
        <img
          className="rounded h-[80vh] object-contain"
          src={product.image}
          alt=""
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-start p-10">
        <h1 className="text-5xl mb-2">{product.title}</h1>
        <h2 className="mb-5 text-2xl text-green-500">${product.price}</h2>
        <p className="mb-5 ">{product.description}</p>
        <button className="bg-yellow-500 font-bold text-white rounded-full px-4 py-2 hover:shadow-xl hover:scale(0.97) transition ease-out" onClick={() => Addtocarthandle(product)}>Add to cart</button>
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
          {...register("description") } placeholder="Description">
          
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
