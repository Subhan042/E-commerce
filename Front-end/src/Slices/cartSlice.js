import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    items:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const item = action.payload;
            const existing = state.items.find((e)=>e.id===item.id)
            console.log(item)
            if(existing){
                existing.quantity+=1;
            }else{
                state.items.push({...item,quantity:1})
            }
        },
        removeFromCart(state,action){
            const item = action.payload
            state.items = state.items.filter((e)=>e.id!==item.id)
        },
        addQuantity:(state,action)=>{
            const item = state.items.find((e)=>e.id===action.payload)
            if(item) item.quantity+=1;
        },
        decreaseQuantity:(state,action)=>{
             const itemIndex = state.items.findIndex(item => item.id === action.payload);
            if (itemIndex >= 0) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                state.items.splice(itemIndex, 1); 
                }
        }},
        clearCart:(state)=>{
            state.items=[];
        }
    }
})

export const {addToCart,removeFromCart,addQuantity,decreaseQuantity,clearCart}=cartSlice.actions;
export default cartSlice.reducer