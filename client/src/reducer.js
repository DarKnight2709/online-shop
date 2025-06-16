import sessionReducer from "./features/session/sessionSlice.js";
import productsListReducer from "./features/productsList/productsListSlice";
import singleProductReducer from "./features/singleProduct/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";

const reducer = {
    session: sessionReducer,
    productsList: productsListReducer,     
    singleProduct: singleProductReducer,  
    cart: cartReducer,

};

export default reducer;