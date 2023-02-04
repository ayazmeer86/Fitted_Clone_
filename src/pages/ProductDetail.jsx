import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ImageGallery from 'react-image-gallery';
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useNavigate} from "react-router-dom";
import { productList, selectedProduct, productDetail, cartAction } from "../actions";


const ProductDetail = () => {
    let navigate = useNavigate();
    const {getProductList: pList, getSortedProduct:sortedProduct, getProductDetail: pDetail, getCart:getcart, getCollapsed: getColl, getSubTotal} = useSelector(state => state.root);
    const dispatch = useDispatch();
    const fittedProvides = ["Limited Stock, Order Now!","FITTED provides:","✓ Express and fast delivery all over Pakistan","✓ Free exchange if there is any size issue","✓ Complete refund if you are not happy with your purchase - Refund is applicable on non-discounted items only"]
    
    const PImages = pDetail.images;
    const [localCart, setCart] = useState({
        id: pDetail.id,
        size: "",
        identity: "",
        quantity: 1,
        price: ""
    });

    const [size, setsize] = useState({});
    const [checkoutId, setcheckoutId] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        setCart(prevState => ({...prevState, quantity: 1}))
        setCart(prevState => ({...prevState, id: pDetail.id}))
        setCart(prevState => ({...prevState, identity: pDetail.identity}))
        setCart(prevState => ({...prevState, price: pDetail.price}))
        setsize(pDetail.size);
    }, [pDetail,size])
    useEffect(() => {
        getcart.map((e) => {
            if(e.id == pDetail.id){
                setcheckoutId(pDetail.id)
            }
        })
    }, [getcart]);

    


    
    


    useEffect(() => {
        Object.keys(size).map((res)=>{
            if(size[res] == 0 || res == "total_quantity")
            {
                delete size[res]
            }
        })
        setCart(prevState => ({...prevState, size: Object.keys(size)[0]}))
    }, [size]);
    
    const images = PImages.map((e)=> {
        return {original: e, thumbnail: e, originalHeight: "360px"}
    })

    const handleSize = (event)=>{
        setCart(prevState => ({
            ...prevState,
            quantity: 1
         }))
        setCart(prevState => ({
            ...prevState,
            size: event.target.value
         }))
    }

    

    const handleQuantity = (event)=>{
        let quant = parseInt(event.target.value)
        setCart(prevState => ({
            ...prevState,
            quantity: quant
         }))
    }
    const handleCartButton = ()=>{
        dispatch(cartAction([...getcart, localCart]));
    }
    const handleViewCart = ()=>{
        navigate(`/cart`);
    }
    return (
            <div className='p-main'>
                <div className='pl-main'>
                    <div className='p-image'>
                    <ImageGallery items={images} 
                        showThumbnails={true}
                        showFullscreenButton={false} 
                        showPlayButton={false} 
                        showNav={false}
                        autoPlay={true}
                    />
                    </div>
                    <div className='p-detail'>
                        <h1 className='p-name'>{pDetail.name}</h1>
                        <h1 className='p-price'>Rs. {pDetail.price}</h1>
                        <div className='shortDiscription'>
                        <b>Product Features:</b>
                        {
                            pDetail.description.map((e,i)=>{
                                return(
                                    <h3 key={i} className='p-discription'>{e}</h3>
                                )
                            })
                        }
                        </div>
                        { getcart.find(item => item.id == pDetail.id)?
                            <div className='checkout-div'>
                                <button onClick={handleViewCart} className='checkout-button'>VIEW IN CART</button>
                            </div>
                            :
                            <>
                            <div className='product-size-list'>
                                <div>Size:</div>
                                <div className='radio-boxes'>
                                    {
                                        Object.keys(size).map((res, i)=>{

                                                return(
                                                <>
                                                <input key={i} type='radio' id={res} name='size' checked={res === localCart.size} value={res} readOnly onClick={handleSize}/>
                                                <label htmlFor={res}>{res}</label>
                                                </>
                                                )
                                            // } 
                                        })
                                    }
                                </div>
                            </div>
                            <div className='product-cart'>
                                <div className='quantity'>
                                    <span>Quantity :</span>
                                    <input type="number" placeholder='1' min='1' max={pDetail.size[localCart.size]< 5?pDetail.size[localCart.size]: 5 } value={localCart.quantity} onChange={handleQuantity}/>
                                </div>
                                <button onClick={handleCartButton} className='cart-button'>ADD TO CART</button>
                            </div>
                            </>
                        }
                        <img className='quality' style={{width:"100%"}} src='https://fittedshop.com/img/cart_under_icons.jpg'></img>
                        <img className='measurement' style={{width:"100%"}} src={pDetail.measurement}></img>
                    </div>
                
           
            
            </div>
            <div className='designer-notes'>
                <div className='main-heading'>
                <a className='designer-heading'>Designer's Notes</a>
                </div>
                <p className='notes'>{pDetail.note}</p>
                <br/>
                <p className='provides'>
                {
                    fittedProvides.map((e,i)=>{
                        return(
                            <>
                            <p key={i}>{e}</p>
                            </>
                        )
                    })
                }
                </p>
                <img className='banner' style={{width:"100%"}} src='https://fittedshop.com/img/products/banner/gq-web.jpg'></img>
                <br/>
                <br/>
                
                
                
            </div>
            
            
        </div>
    );
};

export default ProductDetail;
