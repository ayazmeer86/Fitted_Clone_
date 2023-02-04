import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useNavigate} from "react-router-dom";
import { productList, selectedProduct, productDetail, Cart } from "../actions";

const RelatedProducts = (props) => {
    let mainStyling = props.main;
    let footerStyling = props.foot;
    let navigate = useNavigate();
    const {getProductList: pList, getSortedProduct:sortedProduct, getProductDetail: pDetail, getCart:getcart, getCollapsed: getColl} = useSelector(state => state.root);
    const dispatch = useDispatch();
    const related = sortedProduct[pDetail.identity]?.sort(() => Math.random() - Math.random()).slice(0, 4);
   
    
    const handleSelect = (res) => {
        let name = res.name;
        dispatch(productDetail(res));
        navigate(`/detail-of/${name}`)
    }

    return ( 
        <>
            {mainStyling == "side" &&
                <div className='relatedProducts'>
                    <h5 className='related-title'>Related Products</h5>
                    {
                    related.map((pro,i) => {
                            return(
                            <div key={i} className='related-card'>
                            <img className='related-img' onClick={() => handleSelect(pro)} src={pro.images[0]} alt='Picture'/>
                            <div className='related-info'>
                            <h4 className='related-name' onClick={() => handleSelect(pro)}>{pro.name}</h4>
                            <h3 className='related-price'>Rs.{pro.price}</h3>
                            </div>
                            </div>
                            )
                            
                        })
                    } 
                </div>
            }
            {footerStyling == "footer" &&
            <>
                <div className='related-heading'>
                <a className='heading'>Designer's Notes</a>
                </div>
                <div className='main' style={{marginLeft: getColl ? "100px" : "0px"}}>
                    
                    {
                        
                        related.map((pro,i) => {
                            return(
                            <div key={i} className='card'>
                            <img className='img' onClick={() => handleSelect(pro)} src={pro.images[0]} alt='Picture'/>
                            <h4 className='footer-related-name' onClick={() => handleSelect(pro)}>{pro.name}</h4>
                            <h3 className='footer-related-price'>Rs. {pro.price}</h3>
                            </div>
                            )
                            
                        })
                    }
                </div>
            </>
            }
        
            
            
        </>
     );
}
 
export default RelatedProducts;
