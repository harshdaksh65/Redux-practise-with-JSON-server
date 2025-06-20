import axios from '../api/axiosconfig'
import { loadproduct } from './ProductSlice';

export const aysncupdateproduct = (product,id) => async(dispatch,getstate)=>{
    try {
        await axios.patch("/product/" +id , product);
        dispatch(aysncloadproduct());
    } catch (error) {
        console.log(error);
    }
}
export const aysncdeleteproduct = (id) => async(dispatch,getstate)=>{
    try {
        await axios.delete("/product/" +id);
        dispatch(aysncloadproduct());
    } catch (error) {
        console.log(error);
    }
}

export const aysncloadproduct = () => async(dispatch,getstate)=>{
    try {
        const {data} = await axios.get("/product");
        dispatch(loadproduct(data));
    } catch (error) {
        console.log(error);
    }
}

export const asynccreateproduct = (product)=> async(dispatch,getState)=> {
    try {
        await axios.post("/product" , product);
        dispatch(aysncloadproduct());
    } catch (error) {
        console.log(error);
    }
} 