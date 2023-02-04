import React from 'react';
import CheckOutBar from './CheckOutBar';
import ProductDetail from './ProductDetail';
import RelatedProducts from './RelatedProducts';
import { useSelector, useDispatch } from "react-redux";


const Parent = () => {
    const {getCart:getcart} = useSelector(state => state.root);
    return (
        <div className='parent-main'>
            <div className='parent-head'>
                <ProductDetail/>
                <RelatedProducts main="side"/>
            </div>
            <RelatedProducts foot="footer"/>
            {
                getcart?.length > 0 && <CheckOutBar/>
            }
        </div>
    );
};

export default Parent;