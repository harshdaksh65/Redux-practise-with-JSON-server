import { useDispatch, useSelector } from 'react-redux';
import { asyncCurrentuser, asyncUsers } from './store/UserActions'
import { useEffect } from 'react';
import Mainroutes from './routes/Mainroutes';
import Nav from './Components/Nav';
import { aysncloadproduct } from './store/ProductActions';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    
    dispatch(asyncCurrentuser());
    dispatch(aysncloadproduct());
  },[])
  return (
    <div className='overflow-auto w-screen h-screen px-[5%]'>
      <Nav/>
      <Mainroutes/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App