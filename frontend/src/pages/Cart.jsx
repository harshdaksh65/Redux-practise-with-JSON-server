import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ayncsUpdateuser } from "../store/UserActions";

function Cart() {
  const dispatch = useDispatch();
  const {
    userReducer: { users },
    productReducer: { products },
  } = useSelector((state) => state);

  const removeFromCarthandle = (productId) => {
    const copyuser = { ...users, cart: [...users.cart] };
    const index = copyuser.cart.findIndex((c) => c.product.id === productId);
    copyuser.cart.splice(index, 1);
    dispatch(ayncsUpdateuser(copyuser.id, copyuser));
  }
  return (
    <div className="mt-10">
      
      {users?.cart?.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center p-12 text-5xl font-bold">
          Your cart is empty! <Link className="text-red-400 text-lg mt-2 border rounded-full px-3 py-1 border-black hover:bg-red-100 transition ease-out " to='/products'>GO TO STORE</Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Cart.</h1>
          <div className="grid grid-cols-6 items-center mt-4 text-center font-semibold">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p className="ml-10">Remove</p>
          </div>
          <br />
          <hr />
          {users?.cart?.map((c) => {
            if (c.quantity > 0) {
              return (
                <div
                  className="grid grid-cols-6 items-center text-center mt-4"
                  key={c.product.id}>
                  <img
                    className="w-20 h-20 border border-2 border-white rounded-md object-cover mx-auto"
                    src={c.product.image}
                    alt=""
                  />
                  <h2>{c.product.title.slice(0, 20)}...</h2>
                  <p>${c.product.price}</p>
                  <p>{c.quantity}</p>
                  <p>${c.quantity * c.product.price}</p>
                  <button onClick={() => removeFromCarthandle(c.product.id)} className="px-3 py-1 border border-1 border-red-300 rounded-full text-sm text-nowrap font-semibold hover:border-2 transition ease-out">
                    REMOVE FROM CART
                  </button>
                </div>
              );
            }
          })}
        </div>
      )}

      {/* {renderCartItems} */}
    </div>
  );
}

export default Cart;
