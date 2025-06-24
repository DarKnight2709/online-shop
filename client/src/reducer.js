import sessionReducer from "./features/session/sessionSlice.js";
import productsListReducer from "./features/productsList/productsListSlice";
import singleProductReducer from "./features/singleProduct/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import categoriesListReducer from "./features/category/categoriesListSlice.js";
import brandsListReducer from "./features/brand/brandsListSlice.js";

const reducer = {
    session: sessionReducer,
    productsList: productsListReducer,     
    singleProduct: singleProductReducer,  
    cart: cartReducer,
    categoriesList: categoriesListReducer,
    brandsList: brandsListReducer

};

export default reducer;