import React from 'react';
import ImageGallery from 'react-image-gallery';
import { useEffect } from 'react';
import { productList, selectedProduct, productDetail, sortedProduct } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import CheckOutBar from './CheckOutBar';
import { getProducts } from '../components/api';

const Home = () => {
    
    let navigate = useNavigate();

    const {getProductList: pList,
            getSelectedProduct: sProduct, 
            getProductDetail: pDetail, 
            getCart:getcart,
            getCollapsed: getColl} = useSelector(state => state.root);

    
    const dispatch = useDispatch();

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

      }, [])
      
      const images = [
        {
          original: 'https://fittedshop.com/img/home/slider/19-05/1.jpg',
          thumbnail: 'https://fittedshop.com/img/home/slider/19-05/1.jpg'
        },
        {
          original: 'https://fittedshop.com/img/home/slider/19-05/2.jpg',
          thumbnail: 'https://fittedshop.com/img/home/slider/19-05/2.jpg',
        },
        {
            original: 'https://fittedshop.com/img/home/slider/19-05/3.jpg',
            thumbnail: 'https://fittedshop.com/img/home/slider/19-05/3.jpg',
        }
      ];

    const handleSelect = (res) => {
        let name = res.name;
        dispatch(productDetail(res));
        
        navigate(`/detail-of/${name}`)
    }
    
    return (
        <>
        
             
        <div className='homeMain' >
           
            
            <ImageGallery items={images} 
            showThumbnails={false}
            showFullscreenButton={false} 
            showPlayButton={false} 
            showNav={false}
            autoPlay={true}

            />

            <div className='main' style={{marginLeft: getColl ? "100px" : "0px"}}>
                {
                    sProduct.map((pro,i) => {
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
        
        </>
    );
};

export default (Home);