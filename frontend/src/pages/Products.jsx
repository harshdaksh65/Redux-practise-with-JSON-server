import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ayncsUpdateuser } from "../store/UserActions";
import axios from "axios";


function Products() {
  const products = useSelector((state) => state.productReducer.products);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  };

  const renderproduct = products.map((product) => {
    return (
      <div
        key={product.id}
        className="w-1/5 flex flex-col justify-between bg-white text-black rounded p-6 shadow-2xl hover:shadow-xl transition ease-out">
        <Link  to={`/product/${product.id}`}>
          <img
            className="h-[26vh] w-full object-contain "
            src={product.image}
            alt=""
          />
          <h1 className="font-semibold mt-4">{product.title.slice(0,70)}</h1>
        </Link>
        <div className="flex justify-between items-center mt-4 ">
          <h1 className="font-semibold text-green-500">${product.price}</h1>
          <button
            className="bg-yellow-500 font-bold text-white rounded-full px-4 py-2 hover:shadow-xl hover:scale(0.97) transition ease-out"
            onClick={() => Addtocarthandle(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  });
  return <div className="w-full flex flex-wrap gap-4">{renderproduct}</div>;
}

export default Products;
