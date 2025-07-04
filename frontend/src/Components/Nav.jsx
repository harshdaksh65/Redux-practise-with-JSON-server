import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser } from "../store/UserActions";
import carticon from "../Cart-Icon.svg";

function Nav() {
  const user = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const isLoggedIn = user && Object.keys(user).length > 0;
  console.log(user);
  console.log(isLoggedIn);

  const logouthandler = ()=>{
    dispatch(asynclogoutuser());
    navigate('/');
  }
  return (
    <nav className="w-full sticky top-4 h-12 flex items-center font-semibold mb-10 bg-gray-200 text-black px-4 shadow-md rounded-full mt-4">
      <div className="w-1/3">Cartora</div>
      <div className=" w-1/3 flex justify-center items-center gap-4 ">
        <NavLink to={"/products"}>Products</NavLink>
        
        {isLoggedIn && user?.isAdmin && (
          <NavLink to="/admin/create-products">Create Products</NavLink>
        )}
      </div>
      <div className="w-1/3 flex gap-8 justify-end items-center">

          <NavLink className="relative" to="/cart"><img width={34} src={carticon} alt="cart" /><span className="absolute -top-1 -right-5 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{user?.cart?.length || 0}</span></NavLink>

        {isLoggedIn ? <button onClick={logouthandler}>Log Out</button> : <NavLink to="/login">Login</NavLink>}
      </div>
    </nav>
  );
}

export default Nav;
