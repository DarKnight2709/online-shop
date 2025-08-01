import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, selectCartItems, selectCartTotal, changeSingleQuantity, isLoadingCart } from "./cartSlice";
import { deleteItemCart, emptyCart, updateCart } from "../../utils";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './cartPage.css';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const isLoading = useSelector(isLoadingCart);

    const cartLength = Object.keys(cartItems).length;

    const [quantityVals, setQuantityVals] = useState({});
    const [timer, setTimer] = useState({ status: false, timerId: 0, itemId: null });

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    useEffect(() => {
        let obj = {};
        for (const item in cartItems) {
            obj[item] = cartItems[item].quantity;
        };
        setQuantityVals(obj);
    }, [cartItems]);

    const handleChange = (value, itemId) => {
        setQuantityVals((prevState) => ({ ...prevState, [itemId]: value }));

        if (timer.status && timer.itemId === itemId) {
            clearTimeout(timer.timerId);
        }

        const newQuantity = parseInt(value);
        const prevQuantity = cartItems[itemId].quantity;

        if (newQuantity && newQuantity > 0 && newQuantity !== prevQuantity && value % 1 === 0) {
            const quantityToChange = newQuantity - prevQuantity;

            let t = setTimeout(async () => {
                dispatch(changeSingleQuantity({ cartitemid: itemId, quantity: newQuantity }));
                const cartSuccess = await updateCart(itemId, quantityToChange);

                if (cartSuccess) {
                    alert("Cập nhật giỏ hàng thành công");
                } else {
                    alert("Lỗi khi cập nhật giỏ hàng");
                    dispatch(changeSingleQuantity({ cartitemid: itemId, quantity: prevQuantity }));
                }
            }, 2000);

            setTimer({ timerId: t, status: true, itemId: itemId });
        }
    }

    const handleIncrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if (currentVal && currentVal >= 0) {
            handleChange(currentVal + 1, itemId);
        }
    }

    const handleDecrement = (itemId) => {
        const currentVal = parseInt(quantityVals[itemId]);
        if (parseInt(currentVal) && currentVal > 1) {
            handleChange(currentVal - 1, itemId);
        }
    }

    const handleRemove = async (itemId) => {
        const removeSuccess = await deleteItemCart(itemId);
        if (removeSuccess) {
            dispatch(loadCart());
        } else {
            alert("Yêu cầu thất bại");
        }
    }

    const handleEmptyCart = async () => {
        if (Object.keys(cartItems).length) {
            const success = await emptyCart();
            if (!success) {
                alert("Yêu cầu thất bại");
            }
            dispatch(loadCart());
        }
    }

    const handleUnfocus = (e, itemId) => {
        const value = parseFloat(e.target.value);
        if (!value || value < 0 || value % 1 !== 0) {
            setQuantityVals((prevState) => ({ ...prevState, [itemId]: cartItems[itemId].quantity }));
            alert("Vui lòng nhập số hợp lệ!");
        }
    }

    const returnList = (obj) => {
        const returnArr = [];
        for (const item in obj) {
            returnArr.push(
                (
                    <CartItem
                        key={cartItems[item].productid}
                        itemObj={cartItems[item]}
                        handleChange={handleChange}
                        handleUnfocus={handleUnfocus}
                        incrementHandler={handleIncrement}
                        decrementhandler={handleDecrement}
                        removeHandler={handleRemove}
                        qty={quantityVals[item]}
                        timer={timer}
                    />
                ));
        }
        return returnArr;
    }

    if (isLoading) {
        return ("Đang tải dữ liệu...");
    }

    return (
        <div className="container px-0 mb-5">
            <div className="row mt-4 mb-5 mx-1">
                <div className="col-sm-6">
                    <h1 className="fs-4 text-uppercase fw-normal text-center text-sm-start">Giỏ hàng</h1>
                </div>
                {cartLength ?
                    <div className="col-sm-6 col-md-2 p-0 d-flex align-items-center justify-content-center justify-content-sm-end cart-empty mt-3 mt-sm-0">
                        <button onClick={handleEmptyCart} className="btn btn-secondary rounded-0 bg-white text-black cart-empty-btn">
                            <span>Xóa tất cả</span>
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#000" }} />
                        </button>
                    </div>
                    : ''}
                <div className="col-4"></div>
            </div>

            {cartLength ?
                <div className="row mx-1">
                    <div className="col-md-8 px-2">
                        {returnList(cartItems, handleChange)}
                    </div>
                    <div className="col-md-4 text-center cart-summary">
                        <div className="bg-light h-100 py-5 px-4">
                            <CartSummary total={cartTotal} shipping={0} tax={0} />
                            <button className="btn btn-dark checkout-btn rounded-0 w-100 mt-5">
                                <Link to="/checkout">Thanh toán</Link>
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className="row justify-content-center cart-empty-note">
                    <div className="col-md-5 text-center px-3">
                        <p className="fs-2">Giỏ hàng trống.</p>
                        <Link className="btn btn-dark rounded-0 py-3 px-4 fs-4 mt-4" to='/'>
                            Xem sản phẩm
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}
