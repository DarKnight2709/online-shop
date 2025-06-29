import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { updateFailOrder } from "../../utils";
import './checkout.css';

// Form thanh toán bằng Stripe
export default function CheckoutForm({ dpmCheckerLink, handleNewOrder }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error) => {
    setIsLoading(false);
    setMessage(error.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const order = await handleNewOrder();

    if (!order) {
      setIsLoading(false);
      alert('Vui lòng kiểm tra lại thông tin');
      return;
    }

    const { orderId, client_secret: clientSecret } = order;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://ecommerce-pern-app-isam.onrender.com/payment-success',
      },
    });

    if (error) {
      await updateFailOrder(orderId);
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Đã xảy ra lỗi không mong muốn.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <div className="mt-4">
      

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="btn btn-dark mt-4 px-5 py-2" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán ngay"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>

      <div id="dpm-annotation">
        {/* Khu vực dành cho kiểm tra phương thức thanh toán động (nếu có) */}
      </div>
    </div>
  );
}
