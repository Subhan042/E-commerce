import React, { children } from 'react'
import { createContext ,useState} from 'react'

const CartContext = createContext();


function CartProvider({children}) {
    const [cartItems,setCartitems]=useState([]);

    function addToCart(product){
        setCartitems(prev => {
            const exist = prev.find(p => p.id === product.id)

            if(exist){
                return prev.map(p =>
                    p.id === product.id ? {...p, quantity : p.quantity +1}:p
                );
            }else{
                return[...prev,{...product,quantity:1}];
            }
        });
    }

  return (
    <CartContext.Provider value={{cartItems,addToCart}}>
        {children}
    </CartContext.Provider>
  )
}



export {CartContext,CartProvider};