import React from 'react'
import {useState,useEffect,useCallback} from 'react'
import OrderItem from '../../components/User/OrderItem'
import { getCurrentUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

function OrderHistory(){

  const [order,setorder]= useState([])
  const navigate = useNavigate();
  const user = getCurrentUser();

 const fetch_order=useCallback(async()=>{
  try{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/order?profile_id=${user.pf_id}`)
    const data= await response.json()
if(data.success){
  setorder(data.order)
}
else{
  console.error("error occured")
}
  }
  catch(err){
    console.error(err)

  }
 }, [user])

  useEffect(()=> { if (getCurrentUser()) fetch_order() },[fetch_order])

  return(
    <div className="page-section container py-5">
      {!user ? <div className="account-panel"><p className="eyebrow">YOUR ORDERS</p><h2>Sign in to see your orders.</h2><button className="hero-button" onClick={() => navigate("/login")}>Sign in</button></div> : <>
      <h2 className="text-white mx-4">Showing Order</h2>
      {order.length>0?
      (order.map((
        item,index)=>(
        <OrderItem
        key={item.o_id}
        {...item}
        status="confirmed"

        />
      ))

      ):(
        <h2 className="text-white">No Order </h2>
      )}
      </>}
    </div>
  )

}
export default OrderHistory