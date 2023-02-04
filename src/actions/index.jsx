export const productList = (list)=>{
    return {
        type: 'SET_PRODUCT_LIST',
        payload: [...list]
    }
}

export const selectedProduct = (list)=>{
    return {
        type: 'SET_SELECTED_PRODUCT',
        payload: [...list]
    }
} 

export const productDetail = (list)=>{
    return {
        type: 'SET_PRODUCT_DETAIL',
        payload: {...list}
    }
} 

export const sortedProduct = (list)=>{
    return {
        type: 'SET_SORTED_PRODUCT',
        payload: {...list}
    }
} 

export const collapsed = (list)=>{
    return {
        type: 'SET_COLLAPSED',
        payload: list
    }
}

export const cartAction = (list)=>{
    return {
        type: 'SET_CART',
        payload: list
    }
}

export const subTotal = (list)=>{
    return {
        type: 'SET_SUB_TOTAL',
        payload: list
    }
}