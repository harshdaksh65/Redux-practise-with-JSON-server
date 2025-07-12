import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ayncsUpdateuser } from "../store/UserActions";
import { useMediaQuery } from 'react-responsive';

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

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <div className="mt-10">
      {users?.cart?.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center p-12 text-[var(--pri)] text-5xl font-bold">
          Your cart is empty! <Link className="text-black text-lg mt-2 border-2 border-[var(--sec)] rounded-full px-3 py-1 hover:bg-[var(--sec)] hover:text-[var(--pri)] transition ease-out mt-8 " to='/products'>GO TO STORE</Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-[var(--sec)]">Cart.</h1>
          {isDesktop && (
            <>
              <div className="grid grid-cols-6 items-center mt-4 text-center font-semibold text-[var(--tri)]">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p className="ml-10">Remove</p>
              </div>
              <br />
              <hr />
              {users?.cart?.map((c) => (
                c.quantity > 0 && (
                  <div
                    className="grid grid-cols-6 items-center text-center mt-4"
                    key={c.product.id}>
                    <img
                      className="w-20 h-20 object-contain mx-auto"
                      src={c.product.image}
                      alt=""
                    />
                    <h2>{c.product.title.slice(0, 20)}...</h2>
                    <p>${c.product.price}</p>
                    <p>{c.quantity}</p>
                    <p>${c.quantity * c.product.price}</p>
                    <button onClick={() => removeFromCarthandle(c.product.id)} className="px-3 py-1 border border-2 border-[var(--sec)] rounded-full text-sm text-nowrap font-semibold hover:bg-[var(--sec)] hover:text-red-500 transition ease-out">
                      REMOVE FROM CART
                    </button>
                  </div>
                )
              ))}
            </>
          )}
          {isMobile && (
            <div className="flex flex-col gap-6 mt-6">
              {users?.cart?.map((c) => (
                c.quantity > 0 && (
                  <div
                    className="flex flex-col bg-white rounded-lg shadow-md p-4"
                    key={c.product.id}>
                    <div className="flex items-center gap-4">
                      <img
                        className="w-16 h-16 object-contain"
                        src={c.product.image}
                        alt=""
                      />
                      <div>
                        <h2 className="font-bold text-lg">{c.product.title.slice(0, 20)}...</h2>
                        <p className="text-[var(--tri)] font-semibold">${c.product.price}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>Qty: {c.quantity}</span>
                      <span>Total: ${c.quantity * c.product.price}</span>
                      <button onClick={() => removeFromCarthandle(c.product.id)} className="px-3 py-1 border border-2 border-[var(--sec)] rounded-full text-xs font-semibold hover:bg-[var(--sec)] hover:text-red-500 transition ease-out">
                        REMOVE
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
