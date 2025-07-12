import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ayncsUpdateuser } from "../store/UserActions";
import axios from "axios";
import { toast } from "react-toastify";


function Products() {
  const products = useSelector((state) => state.productReducer.products);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = users && Object.keys(users).length > 0;

  const Addtocarthandle = (product) => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      console.log("Toast should show now");
      setTimeout(() => {
      navigate("/login");
    }, 2400); 
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
        className="md:w-1/5 flex flex-col w-full md:justify-between bg-white rounded p-6 shadow-2xl hover:shadow-xl transition ease-out md:h-[55vh] ">
        <Link  to={`/product/${product.id}`}>
          <img
            className="h-[26vh] w-full object-contain "
            src={product.image}
            alt=""
          />
          <h1 className="font-semibold mt-4">{product.title.slice(0,70)}</h1>
        </Link>
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold text-[var(--tri)]">${product.price}</h1>
          <button
            className="bg-[var(--pri)] font-bold text-white rounded-full px-4 py-2 hover:shadow-xl hover:scale(0.97) transition ease-out"
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
