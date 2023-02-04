import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import  { FaMinus, FaPlus} from 'react-icons/fa'; 
import {MdDelete} from 'react-icons/md';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productList, selectedProduct, sortedProduct, cartAction, subTotal } from "../actions";



const Cart = () => {
  // const {getProductList: pList,
  //         getSortedProduct: sortProduct,
  //         getProductDetail: pDetail,
  //         getCollapsed: getColl,
  //         getSubTotal,
  //         getCart:getcart} = useSelector(state => state.reducer, shallowEqual);

  const { pList, sortProduct, pDetail, getColl, getSubTotal, getcart } = useSelector((state) => ({
    pList: state.root.getProductList,
    sortProduct: state.root.getSortedProduct,
    pDetail: state.root.getProductDetail,
    getColl: state.root.getCollapsed,
    getSubTotal: state.root.getSubTotal,
    getcart: state.root.getCart
  }));

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [localCart, setLocalCart] = useState();
  const [productSize, setProductSize] = useState();
  const [productQuantity, setProductQuantity] = useState();
  // const [productPrice, setProductPrice] = useState();
  



  useEffect(() => {
    
    let idList = getcart.map((e) => e.id)
    setProductSize(getcart.map((e) => e.size))
    setProductQuantity(getcart.map((e) => e.quantity))
    
    let cartProducts = [];
    idList.map((a)=> {
      cartProducts.push(pList.find(itm => itm.id == a));
      
    });
    setLocalCart(cartProducts)
  }, [getcart]);

  useEffect(() => {
    let grand=0;
    let vault =0;
    getcart.map((res) =>{
      vault = res.quantity * res.price;
      grand += vault;
    })
    dispatch(subTotal(grand))
  }, [getcart]);
 
  let increment = (quant,i)=>{
    const list = [...getcart];

    if(quant < 5)
    {
      if(list[i].quantity < quant)
      {
        list[i].quantity += 1;
        dispatch(cartAction([...list]));
      }
    }
    else if(list[i].quantity < 5)
    {
      list[i].quantity += 1;
      dispatch(cartAction([...list]));

    }

  }

  let decrement = (i)=>{
    const list = [...getcart];
    if(list[i].quantity >1)
    {

      list[i].quantity -= 1;
      dispatch(cartAction([...list]));
    }
  }

  let handleDelete = (i)=>{
    const list = [...getcart];
    if (i > -1) {
      list.splice(i, 1);
    }
    dispatch(cartAction([...list]));
  }

  let handleCheckOut = () => {

    const copyPlist = structuredClone(pList);
    const CopySortedList = structuredClone(sortProduct)
    getcart.map((res) => {
      const temp = pList.find((data) => data.id == res.id)
      copyPlist.find((data) => data.id == res.id).size[res.size] -= res.quantity;
      CopySortedList[res.identity].find((data) => data.id == res.id).size[res.size] -= res.quantity;
      temp.size[res.size] -= res.quantity;
      
      axios.put(`http://localhost:3000/products/${res.id}`, temp)
      .then(response =>{
        // status = response.status;
        dispatch(productList(copyPlist))
        dispatch(sortedProduct({...CopySortedList})) 
        dispatch(selectedProduct(Array.from(new Set(pList.slice(0, 11)))))
        dispatch(cartAction([]))
        setTimeout(()=>{
          navigate(`/`)
        }, 3000)
      })
    })
  }

  let handleContinueShopping = ()=>{
    navigate(`/`)
  }

    return (
        getcart.length?
        <>
        <div className="cart-main" style={{height: getcart?.length > 2 ? "" : "100vh", marginLeft: getColl ? "100px" : "0px"}}>
          
          <div className='cart-main2'>
          <h4>SHOPPING CART</h4>
          <div className='table-div'>
           <table className='cart-table'>
              <thead>
              <tr>
                <th>Product</th>
                <th>Product Name</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>QTY</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
              </thead>
             <tbody>
              {localCart?.map((pro,i) => {
                  return(
                    <tr key= {i}>
                    <td className='tdImage'>
                      <img className='cart-image' src={pro.images[0]} />
                    </td>
                    <td className='tdName'>
                      <h6>{pro.name}</h6>
                    </td>
                    <td className='tdSize'>{productSize[i]}</td>
                    <td className='tdPrice'>Rs. {pro.price}</td>
                    <td className='tdQuantity'>
                    <FaMinus onClick={()=> decrement(i)} style={{cursor:"pointer"}}/>
                    <input type="number" placeholder='0' min='1' max='5' value={productQuantity[i]}/>
                    {productQuantity[i] == pro.size[productSize[i]] || productQuantity[i] == 5 ?
                    <FaPlus color="#808080"  style={{opacity:"0.5"}}/>
                    :
                    <FaPlus onClick={()=> increment(pro.size[productSize[i]],i)} style={{cursor:"pointer"}}/>
                    }
                    </td>
                    <td className='tdSubTotal'>Rs. {productQuantity[i] * pro.price}</td>
                    <td className='tdDelete'> 
                      <MdDelete onClick={()=> handleDelete(i)} size={25} style={{cursor:"pointer"}}/>
                    </td>
                  </tr>
                  )
                })
              }
              
              <tr>
                <td className='footer-td' colSpan={7}>
                  <div className='main-cart-footer'>
                    <div className='cart-footer-left'>
                      <p>GRAND TOTAL: Rs. {getSubTotal}</p>
                    </div>
                    <div className='cart-footer-right'>
                      <div className='btn'><button onClick={handleContinueShopping}>CONTINUE SHOPPING </button></div>
                      <div className='btn'><button onClick={handleCheckOut} >CHECKOUT</button></div>
                      
                    </div>
                  </div>
                </td>
              </tr>
             </tbody>
            </table> 
          </div>
          </div>
          
        </div>
        
        </>
        :
        <>
        <div className='cart-empty-div'>
          <div className='cart-bar'>SHOPPING CART</div>
        <h5 className='cart-empty'>Cart is Empty</h5>
        <span className='cart-bottom-border'></span>
        <p>Your cart is currently empty.</p>
        </div>
        
        </>
        
      )
};

export default Cart;




