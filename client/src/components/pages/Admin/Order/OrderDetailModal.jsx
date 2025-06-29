// components/OrderDetailModal.jsx

import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedOrder,
  selectCurrentOrder,
} from "../../../../features/order/orderAdminSlice";
import formatVND from "../../../../utils/formatCurrency";

export default function OrderDetailModal() {
  const dispatch = useDispatch();
  const order = useSelector(selectCurrentOrder);

  if (!order) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết đơn hàng #{order.orderid}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearSelectedOrder())}
            />
          </div>
          <div className="modal-body">
            <p><strong>👤 Khách hàng:</strong> {order.username}</p>
            <p><strong>📧 Email:</strong> {order.email}</p>
            <p><strong>📍 Địa chỉ:</strong> {order.address}</p>
            <p><strong>📞 SĐT:</strong> {order.phone}</p>
            <p><strong>📅 Ngày đặt:</strong> {new Date(order.orderdate).toLocaleString()}</p>

            <hr />
            <h6>📦 Sản phẩm:</h6>
            <ul className="list-group">
              {order.products.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.productName} x {item.orderedQuantity}
                  <span>{formatVND(item.unitPrice * item.orderedQuantity)} </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(clearSelectedOrder())}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
