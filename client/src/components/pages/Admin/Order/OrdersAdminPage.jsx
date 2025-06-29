// pages/OrdersAdminPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderDetailModal from "./OrderDetailModal";
import {
  loadOrders,
  selectOrders,
  selectLoading,
  selectOrder,
} from "../../../../features/order/orderAdminSlice";
import formatVND from "../../../../utils/formatCurrency";



export default function OrdersAdminPage({ userId }) {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(loadOrders(userId));
  }, [dispatch, userId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Orders Management</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info">Không có đơn hàng nào.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Mã</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderid}>
                  <td>{order.orderid}</td>
                  <td>{order.username}</td>
                  <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                  <td>{formatVND(order.total)} </td>
                  <td>--</td>
                  <td>
                    <span className="badge bg-warning text-dark">{order.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => dispatch(selectOrder(order))}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderDetailModal />
    </div>
  );
}
