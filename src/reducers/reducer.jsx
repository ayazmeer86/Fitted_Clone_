const initialState = {
    getProductList: [],
    getSelectedProduct: [],
    getProductDetail: [],
    getSortedProduct:[],
    getCollapsed: false,
    getCart: [],
    getSubTotal:""
}

const reducer = (state = initialState, action)=>{

    switch(action.type){
        case "SET_PRODUCT_LIST": 
            return {...state, getProductList: action.payload}
        case "SET_SELECTED_PRODUCT":
            return {...state, getSelectedProduct: action.payload}
        case "SET_PRODUCT_DETAIL":
            return {...state, getProductDetail: action.payload}
        case "SET_SORTED_PRODUCT":
           return {...state, getSortedProduct: action.payload}
        case "SET_COLLAPSED":
            return {...state, getCollapsed: action.payload}
        case "SET_CART":
            console.log("testing yes aaho: ", action.payload);
            return {...state, getCart: action.payload}
        case "SET_SUB_TOTAL":
            return {...state, getSubTotal: action.payload}
               default: return state;
    }

}
export default reducer;