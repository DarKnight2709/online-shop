import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../utils';

// Sidebar component
const SideBar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // const success = await logout();
    // if (success) {
    //   dispatch(logOutUser());
    //   navigate('/admin/login');
    // } else {
    //   alert('Đăng xuất thất bại');
    // }
    navigate('admin/');
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Bảng Quản Trị</h2>
      <ul className="sidebar__menu">
        <li><Link to="/admin/dashboard" className="sidebar__link">Tổng quan</Link></li>
        <li><Link to="/admin/products" className="sidebar__link">Sản phẩm</Link></li>
        <li><Link to="/admin/categories" className="sidebar__link">Danh mục</Link></li>
        {/* <li><Link to="/admin/users" className="sidebar__link">Người dùng</Link></li> */}
        <li><Link to="/admin/orders" className="sidebar__link">Đơn hàng</Link></li>
        <li><button onClick={logoutHandler} className="sidebar__link">Đăng xuất</button></li>
      </ul>
    </aside>
  );
}

export default SideBar;
