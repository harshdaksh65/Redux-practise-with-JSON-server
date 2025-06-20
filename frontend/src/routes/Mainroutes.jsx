import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CreateProduct from '../pages/admin/CreateProduct'
import UpdateProduct from '../pages/admin/UpdateProduct'
import ProductDetails from '../pages/user/ProductDetails'
function Mainroutes() {
  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/products' element={<Products/>}/>
       <Route path='/product/:id' element={<ProductDetails/>}/>
       <Route path='/admin/create-products' element={<CreateProduct/>}/>
       <Route path='/admin/update-products/:id' element={<UpdateProduct/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default Mainroutes