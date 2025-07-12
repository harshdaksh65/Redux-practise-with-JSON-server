import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser } from "../store/UserActions";
import carticon from "../Cart.svg";
import usericon from "../user.svg";
import { motion, AnimatePresence } from "framer-motion";

function Nav() {
  const user = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  const isLoggedIn = user && Object.keys(user).length > 0;

  const logouthandler = () => {
    dispatch(asynclogoutuser());
    setMobileMenuOpen(false);
    navigate("/");
  };

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="w-full sticky top-4 h-12 flex items-center font-semibold mb-10 bg-[var(--sec)] text-black px-4 shadow-md rounded-full mt-4 z-50">
        <div className="w-32 flex items-center">
          Cartora {" "}
          {isLoggedIn && user?.isAdmin && (
            <div className="text-red-500 ml-1 -mt-2 font-bold text-[10px]">ADMIN</div>
          )}
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center gap-4">
          <NavLink to="/products">Products</NavLink>
          {isLoggedIn && user?.isAdmin && (
            <NavLink to="/admin/create-products">Create Products</NavLink>
          )}
        </div>

        <div className="w-32 flex gap-4 items-center ml-auto justify-end">
          {isLoggedIn && (
            <NavLink className="relative" to="/cart">
              <img width={30} src={carticon} alt="cart" />
              <span className="absolute -top-1 -right-4 bg-[var(--pri)] text-white rounded-full px-2 py-1 text-xs">
                {user?.cart?.length || 0}
              </span>
            </NavLink>
          )}

          <div className="hidden md:block">
            {isLoggedIn ? (
              <button onClick={logouthandler}>Log Out</button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>

          <button
            className="block md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <img src={usericon} alt="User" width={28} />
          </button>
        </div>
      </nav>

      {/* Framer Motion Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="drawer"
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-[80px] right-0 h-[80vh] w-[65vw] max-w-xs bg-[var(--sec)] z-40 border rounded-l-4xl shadow-lg md:hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-black h-full">
              <button
                className="self-end text-3xl text-red-500 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                &times;
              </button>

              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4">
                <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-semibold hover:text-[var(--pri)]"
              >
                Products
              </NavLink>

              {isLoggedIn && user?.isAdmin && (
                <NavLink
                  to="/admin/create-products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-semibold hover:text-[var(--pri)]"
                >
                  Create Products
                </NavLink>
              )}
              </div>

              <div>
                {isLoggedIn ? (
                <button
                  onClick={logouthandler}
                  className="text-left bg-white px-3 py-1 rounded-full text-red-600 font-semibold"
                >
                  Log Out
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left bg-white text-xl px-5 py-2 rounded-full text-[var(--pri)] font-semibold"
                >
                  Login
                </NavLink>
              )}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
