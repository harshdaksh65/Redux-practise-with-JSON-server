import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser } from "../store/UserActions";

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
    <nav className="w-full h-12 flex items-center font-semibold mb-10">
      <div className="w-1/3">LOGO</div>
      <div className=" w-1/3 flex justify-center items-center gap-4 ">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"}>Products</NavLink>
        {isLoggedIn && (
          <NavLink to="/admin/create-products">Create Products</NavLink>
        )}
      </div>
      <div className="w-1/3 flex justify-end">
        {isLoggedIn ? <button onClick={logouthandler}>Log Out</button> : <NavLink to="/login">Login</NavLink>}
      </div>
    </nav>
  );
}

export default Nav;
