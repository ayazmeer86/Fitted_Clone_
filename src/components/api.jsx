import axios from "axios";
import { productList, selectedProduct, productDetail, sortedProduct } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export const getProducts = (pList, setSortedProducts, setProductList, setSelectedProducts) => {

        let AllProducts={}
        var size = 11;
        pList.length == 0 &&
        axios.get('http://localhost:3000/products')
        .then(response =>{
            let identityList = Array.from(new Set(response.data.map((e) => e.identity)))

            identityList.forEach((a)=> {
                AllProducts = {...AllProducts, [a]: response.data.filter(itm => (itm.identity.includes(a))) };
            });
            setSortedProducts(AllProducts);
            setProductList(response.data);
            setSelectedProducts(response.data, size);
        });
    }