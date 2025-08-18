import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const PrivateRoute = ()=>{
    const user = useSelector(state => state.user.user)
    console.log(user)
    useEffect(() => {
    if (!user) {
      alert("Please login to continue");
    }
    }, [user]);
    if(!user){
        return < Navigate to='/' replace />
    }
    
    return <Outlet/>
    
}


export default PrivateRoute