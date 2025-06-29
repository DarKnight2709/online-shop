import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadOrders, selectOrders, isLoadingOrders } from '../../features/order/orderSlice';
import formatVND from '../../utils/formatCurrency';


const OrdersPage = ({ userId }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(isLoadingOrders);

  useEffect(() => {
    if (userId) dispatch(loadOrders(userId));
  }, [userId, dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧾 Đơn hàng của bạn</h2>

      {loading && <p>Đang tải...</p>}

      {!loading && orders.length === 0 && (
        <div className="alert alert-info">Bạn chưa có đơn hàng nào.</div>
      )}

      {!loading && orders.length > 0 && orders.map(order => (
        <div className="card mb-4 shadow-sm" key={order.orderId}>
          <div className="card-header d-flex justify-content-end align-items-center">
            <span className="badge bg-info text-dark">Đang chờ</span>
          </div>

          <div className="card-body">
            {order.products.map((product, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={product.imageURL}
                    alt={product.productName}
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    className="me-3 rounded"
                  />
                  <div>
                    <h6 className="mb-1">{product.productName}</h6>
                    <p className="text-muted mb-0">x {product.quantity}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-semibold text-success">{formatVND(product.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">🕒 Ngày đặt: {new Date(order.date).toLocaleString()}</small>
            <strong className="text-success">💰 Tổng: {formatVND(order.total)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
