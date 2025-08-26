  import React, { useContext, useEffect } from 'react'
  import { Link } from 'react-router-dom';
  import { useState } from "react";
  import './productlist.css'
  import Cart from './cart.jsx'
  import { CartContext } from './CartProvider.jsx';
  import { useDispatch } from 'react-redux';
  import { addToCart } from '../Slices/cartSlice.js';
  import axios from 'axios'

  function ProductList() {

    const[products,setProducts]=useState([]);
    const [showform,setShowform] = useState(false);
    const[newProduct,setNewProduct] = useState({productphoto:null,name:'',price:''});
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
      axios.get('https://e-commerce-wtdr.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err=>{console.error(`error fetching products:${err}`)})
      
    },[])

    async function addProduct(e){
      e.preventDefault();
      if(!newProduct.name||!newProduct.price||!newProduct.productphoto){
        alert("please fill all fields");
        return;
      }

      const formdata = new FormData();
      formdata.append('name',newProduct.name)
      formdata.append('price',newProduct.price)
      formdata.append('photo',newProduct.productphoto)
      try{
      const res = await axios.post('https://e-commerce-wtdr.onrender.com/api/products',formdata)
      setProducts(prev => [res.data,...prev]);
      setNewProduct({name:'',price:'',productphoto:null});
      setShowform(false);
      }catch(err){
        console.error(`Error adding product${err}`)
        alert('Failed to add product')
      }
    }

    
    return (
      <div id = 'container'>
          <Link to="/cart">
        <button id ='cart'>🛒</button>
        </Link>
        <h2>Product List</h2>
        <button id = 'addprobtn' onClick = {() => {setShowform(true);}}>Add Product</button><br/>
        {showform && (<div id = 'popupform'>
          <h3>Enter Product Details</h3>
          <form onSubmit={addProduct}>
            
            <label htmlFor ='productphoto'>Product Photo :</label><br/>
            <input type='file' accept= 'image/*' name='productphoto' onChange={(e)=>{setNewProduct({...newProduct,productphoto:e.target.files[0]})}}></input><br/>  
            <label htmlFor ='name'>Name :</label><br/>
            <input type='text'name='name' value={newProduct.name} onChange={(e)=>{setNewProduct({...newProduct,name:e.target.value})}} ></input><br/>
            <label htmlFor ='price'>Price :</label><br/>
            <input type='number'name='price' value={newProduct.price} onChange={(e)=>{setNewProduct({...newProduct,price:e.target.value})}} ></input><br/><br/>
            <div id='button-grp'>
            <button type='submit'style={{marginRight:'10px'}}>Save</button>
            <button onClick={()=>{setShowform(false)}}>Cancel</button>
            </div>
          </form>
        </div>)}{products.length === 0 ?(
          <p>No products</p>
        ):(
          <div className='productlist'>
            {products.map((product)=>(
              <div className='productcard' key={product.id}>
                <img
                src={product.photoUrl}
                alt={product.name}
                className="product-image"
                />
                <div className='productdetails'>
                  <h3>{product.name}</h3>
                  <p>₹ {product.price}</p>
                  <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    )
      }

  export default ProductList