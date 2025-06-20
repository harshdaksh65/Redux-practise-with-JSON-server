import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Products() {
  const products = useSelector((state)=> state.productReducer.products);

  const renderproduct = products.map((product)=>{
    return (<div key={product.id} className='w-1/5 bg-white text-black rounded p-6 '>
      <img className='h-[36vh] w-full object-contain ' src={product.image} alt="" />
      <h1>{product.title}</h1>
      <small>{product.description.slice(0,100)}...</small>
      <Link to={`/product/${product.id}`} className='block text-blue-600'>more info</Link>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold'>{product.price}</h1>
        <button>Add to Cart</button>
      </div>
    </div>)
  })
  return (
    <div className='w-full flex flex-wrap gap-4'>{renderproduct}</div>
  )
}

export default Products