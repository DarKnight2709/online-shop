import sessionReducer from "./features/session/sessionSlice.js";
import productsListReducer from "./features/productsList/productsListSlice";
import singleProductReducer from "./features/singleProduct/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import categoriesListReducer from "./features/category/categoriesListSlice.js";
import brandsListReducer from "./features/brand/brandsListSlice.js";
import  accountReducer  from "./features/account/accountSlice.js";
import orderSlice   from "./features/order/orderSlice.js";
import orderAdminSlice   from "./features/order/orderAdminSlice.js";

const reducer = {
    session: sessionReducer,
    productsList: productsListReducer,     
    singleProduct: singleProductReducer,  
    cart: cartReducer,
    categoriesList: categoriesListReducer,
    brandsList: brandsListReducer,
    account: accountReducer,
    orders: orderSlice,
    ordersAdmin: orderAdminSlice,

};

export default reducer;