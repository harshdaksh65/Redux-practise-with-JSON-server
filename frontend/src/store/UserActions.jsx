import axios from '../api/axiosconfig'
import { loadUser, removeUser } from './UserSlice';

export const asyncCurrentuser = (user) => async (dispatch,state)=>{
    try {
        const user  = JSON.parse(localStorage.getItem("user"));
        if(user) dispatch(loadUser(user));
        else console.log("user not logged in!")
    } catch (error) {
        console.log(error);
    }
}
export const ayncsUpdateuser = (id,user) => async (dispatch,state)=>{
    try {
        const {data} = await axios.patch("/user/" + id, user);
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loadUser(data));
    } catch (error) {
        console.log(error);
    }
}
export const asynclogoutuser = () => async (dispatch,state)=>{
    try {
        localStorage.removeItem('user');
        dispatch(removeUser());
        console.log("User logged Out!");
    } catch (error) {
        console.log(error);
    }
}
export const asyncloginuser = (user) => async (dispatch,state)=>{
    try {
        const {data} = await axios.get(`/user?username=${user.username}&password=${user.password}`);
        localStorage.setItem('user',JSON.stringify(data[0]));
        dispatch(loadUser(data[0]));
    } catch (error) {
        console.log(error);
    }
}

export const asyncUsers = (user)=> async(dispatch,getState)=> {
    try {
        const res =  await axios.post("/user" , user);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
} 