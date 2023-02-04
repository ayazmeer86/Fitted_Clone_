import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import {  subTotal } from "../actions";
import { Navigate, useNavigate } from 'react-router-dom';

function CheckOutBar() {
  let navigate = useNavigate();
    const {getProductDetail: pDetail, getCart:getcart, getCollapsed: getColl, getSubTotal} = useSelector(state => state.root);
    const dispatch = useDispatch();
    useEffect(() => {
        let grand=0;
        let vault =0;
        getcart.map((res) =>{
          vault = res.quantity * res.price;
          grand += vault;
        })
        dispatch(subTotal(grand))
      }, [getcart]);
      const handleEditCart = ()=>{
        navigate(`/cart`)
      }
      const handleViewCart = ()=>{
        navigate(`/cart`);
    }
    return ( 
        <div className='checkOutBar'>
            <span>TOTAL RS. {getSubTotal}</span>
            <div className='btns-class'>
            <button onClick={handleEditCart} className='edit-cart right-side'>Edit Cart</button>
            <button onClick={handleViewCart} className='checkout-btn right-side'>VIEW IN CART</button>
            
            </div>
            
          </div>
     );
}

export default CheckOutBar;