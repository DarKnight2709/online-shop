import React from "react";
import './cartSummary.css';
import formatVND from "../../utils/formatCurrency";

export default function CartSummary({ total, shipping, tax }) {
    return (
        <>
            <h4 className="fs-6 text-uppercase">Tóm tắt đơn hàng</h4>
            <hr />
            <div className="row cart-summary mt-2">
                <div className="col d-flex justify-content-between">
                    <span>Tạm tính</span>
                    <span>{`${formatVND(total.toFixed(0))}`}</span>
                </div>
            </div>
            <div className="row cart-summary mt-2">
                <div className="col d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <span>{` ${formatVND(shipping)}`}</span>
                </div>
            </div>
            <div className="row cart-summary mt-2">
                <div className="col d-flex justify-content-between">
                    <span>Thuế ước tính</span>
                    <span>{` ${formatVND(tax)}`}</span>
                </div>
            </div>
        </>
    );
}
