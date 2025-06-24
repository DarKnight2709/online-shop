import { Link } from 'react-router-dom';

// Sidebar component
const SideBar = () => (
  <aside className="sidebar">
    <h2 className="sidebar__title">Admin Panel</h2>
    <ul className="sidebar__menu">
      <li><Link to="/admin/dashboard" className="sidebar__link">Dashboard</Link></li>
      <li><Link to="/admin/products" className="sidebar__link">Products</Link></li>
      <li><Link to="/admin/categories" className="sidebar__link">Categories</Link></li>
      <li><Link to="/admin/users" className="sidebar__link">Users</Link></li>
      <li><Link to="/admin/orders" className="sidebar__link">Orders</Link></li>
      <li>Logout</li>
    </ul>
  </aside>
);


export default SideBar;

