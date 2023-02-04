import React from 'react';
import { useEffect, useState } from 'react';
import { productList, selectedProduct, productDetail, sortedProduct } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CheckOutBar from './CheckOutBar';
import { getProducts } from '../components/api';


const SlimFit = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {getCart:getcart, getProductList: pList, getSelectedProduct: sProduct, getProductDetail: pDetail, getCollapsed: getColl} = useSelector(state => state.root);

    
    const setSortedProducts = (AllProducts) => {
        dispatch(sortedProduct(AllProducts))
    }

    const setProductList = (data) => {
        dispatch(productList(data))    
    }

    const setSelectedProducts = (data, size) => {
        dispatch(selectedProduct(Array.from(new Set(data.slice(0, size)))))
    }
    useEffect(() => {
        getProducts(pList, setSortedProducts, setProductList, setSelectedProducts);
    }, []);

    const handleSelect = (res) => {
        let name = res.name;
        dispatch(productDetail(res));
        
        navigate(`/detail-of/${name}`)
    }
    return(

        <div>
            <div className='main' style={{marginLeft: getColl ? "100px" : "0px"}}>
                {
                    pList.filter(itm => (itm.identity.includes("slimFit"))).map((pro,i) => {
                        return(
                        <div key={i} className='card'>
                        <img className='img' onClick={() => handleSelect(pro)} src={pro.images[0]} alt='Picture'/>
                        <h4 onClick={() => handleSelect(pro)}>{pro.name}</h4>
                        <h3>Rs. {pro.price}</h3>
                        </div>  
                        )
                        
                    })
                }
            </div>
            {
                getcart?.length > 0 && <CheckOutBar/> 
            }
        </div>

    )
};
export default SlimFit;