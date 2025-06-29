import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import './checkout.css';
import { isLoadingAccount, loadAccount, selectInfo } from "../../features/account/accountSlice";
import { loadCart, selectCartTotal } from "../../features/cart/cartSlice";
import { selectUser } from "../../features/session/sessionSlice";
import CartSummary from "../CartSummary/CartSummary";
import CheckoutForm from "./CheckoutForm";
import { createNewOrder, emptyCart } from "../../utils";

const stripePromise = loadStripe('pk_test_51PdHgVRwTg3AQ4v27vhivxxKyvA1j2GZk78sljfiVCEHhHt69dUngpT5byN8jFZppGVOt8GA471BUIFdlrUawI8G00QN18OPQt');

const addressSamp = {
  firstName: '',
  lastName: '',
  address1: '',
  city: '',
  country: '',
  state: '',
  postalCode: ''
};

export default function Checkout() {
  console.log('start render')
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const personalInfo = useSelector(selectInfo) || null;
  const isAccountLoading = useSelector(isLoadingAccount);
  const cartTotal = useSelector(selectCartTotal);

  const [paymentMethod, setPaymentMethod] = useState("online"); // 'online' | 'cod'
  const [orderShipId, setOrderShipId] = useState('');
  const [newShipObj, setNewShipObj] = useState(addressSamp);
  const [orderBillId, setOrderBillId] = useState('');
  const [newBillObj, setNewBillObj] = useState(addressSamp);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(null);


  // thay đoi đia chi
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    console.log('load user')
    dispatch(loadAccount(user));
    dispatch(loadCart());
  }, [dispatch, user]);

  useEffect(() => {
    console.log('load edit infor')
    if (personalInfo) {
      console.log('actually load edit infor')
      setEditedInfo({
        username: personalInfo.username || '',
        phone: personalInfo.phone || '',
        address: personalInfo.address || ''
      });
    }

  }, [personalInfo])

  console.log('render');

  const handleShippingInput = (e) => {
    const { name, value } = e.target;
    setNewShipObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingInput = (e) => {
    const { name, value } = e.target;
    setNewBillObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingRadio = ({ target }) => {
    setSameAsShipping(target.value === '1');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreateOrder = async () => {
    const shipping = { ...newShipObj };
    const billing = sameAsShipping ? { ...newShipObj } : { ...newBillObj };

    const reqObj = {
      shipping,
      billing,
      paymentMethod,
    };

    try {
      const order = await createNewOrder(reqObj);
    if (paymentMethod === 'cod' && order.orderId) {
      setOrderSuccess(true);
      alert("Đặt hàng thành công. Bạn sẽ thanh toán khi nhận hàng.");
      navigate('/');
      const success = await emptyCart();
    }
    return order;
      
    } catch (error) {
      alert('Failed');
    }
    
  };

  const stripeOptions = {
    mode: 'payment',
    amount: cartTotal ? cartTotal * 100 : 1000,
    currency: 'usd',
    appearance: { theme: 'stripe' },
  };

  const onHandleUpdateAddress = async () => {
    // Cập nhật thông tin giao hàng
    const username = editedInfo.username;
    const phone = editedInfo.phone;
    const address = editedInfo.address;
    try {
      const endpoint = `http://localhost:5000/api/user/${personalInfo.userid}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, phone, address })
      });
      if (response.ok) {
        dispatch(loadAccount(user))
        setIsEditingAddress(false);
        return;
      }
    } catch (e) {
      console.error('Error');
    }
    // setNewShipObj((prev) => ({
    //   ...prev,
    //   firstName: editedInfo.username.split(' ')[0] || '',
    //   lastName: editedInfo.username.split(' ').slice(1).join(' ') || '',
    //   address: editedInfo.address,
    //   city: '',
    //   country: 'Vietnam',
    //   state: '',
    //   postalCode: '',
    // }));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-4">
          <h1 className="fs-2 text-uppercase display-6 fw-semibold text-center">Thanh toán</h1>
          <p className="text-center checkout-nav">
            <span><Link to='/'>Trang chủ</Link></span>{'  >  '}
            <span><Link to='/cart'>Giỏ hàng</Link></span>{'  >  '}
            <span>Thanh toán</span>
          </p>
        </div>
      </div>

      <div className="row mt-4 mb-5 mx-1 justify-content-center">
        <div className="col col-lg-8 col-xl-5 order-2">
          <div className="py-4 border-bottom">
            <h4 className="fs-4 d-flex justify-content-between align-items-center">
              Địa chỉ nhận hàng
              <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditingAddress(!isEditingAddress)}>
                {isEditingAddress ? "Hủy" : "Thay đổi"}
              </button>
            </h4>

            {!isEditingAddress ? (
              personalInfo ? (
                <p>
                  <strong>{personalInfo.username}</strong><br />
                  <strong>
                    {personalInfo.phone?.startsWith('0')
                      ? `(+84)${personalInfo.phone.slice(1)}`
                      : personalInfo.phone}
                  </strong><br />
                  {personalInfo.address}
                </p>
              ) : (
                <p>Đang tải dữ liệu...</p>
              )
            ) : (
              <div className="row">
                <div className="col-12 mb-2">
                  <label className="form-label">Tên người nhận</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedInfo.username || ''}
                    onChange={(e) => setEditedInfo({ ...editedInfo, username: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 mb-2">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedInfo.phone || ''}
                    onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 mb-2">
                  <label className="form-label">Địa chỉ</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editedInfo.address || ''}
                    onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 mt-2 text-end">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      onHandleUpdateAddress();
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            )}
          </div>


          <div className="py-4 border-bottom">
            <h4 className="fs-4">Chọn hình thức thanh toán</h4>
            <div className="form-check">
              {/* <input className="form-check-input" type="radio" id="payOnline" value="online" checked={paymentMethod === 'online'} onChange={handlePaymentMethodChange} />
              <label className="form-check-label" htmlFor="payOnline">Thanh toán Online </label> */}
            </div>
            <div className="form-check mt-2">
              <input className="form-check-input" type="radio" id="payCod" value="cod" checked={paymentMethod === 'cod'} onChange={handlePaymentMethodChange} />
              <label className="form-check-label" htmlFor="payCod">Thanh toán khi nhận hàng</label>
            </div>
          </div>

          <div className="py-4 border-bottom">

            {/* {paymentMethod === "online" ? (
              <>
                <h4 className="fs-4">Thông tin thanh toán</h4>
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm handleNewOrder={handleCreateOrder} />
                </Elements></>

            ) : ( */}
              <div className="mt-4">
                <button className="btn btn-dark px-5 py-2" onClick={handleCreateOrder}>
                  Đặt hàng
                </button>
              </div>
            {/* )} */}
          </div>
        </div>

        <div className="col-lg-4 order-1 order-lg-3 text-center cart-summary">
          <div className="bg-light h-100 py-5 px-4 pt-6">
            <CartSummary total={cartTotal} shipping={0} tax={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
