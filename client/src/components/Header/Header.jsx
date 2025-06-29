import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { fetchCategoriesWithBrands, logout } from "../../utils";
import { logOutUser, selectUser } from "../../features/session/sessionSlice";
import SearchBar from "./SearchBar/SearchBar";
import { trim } from "validator";
import TopMenu from "./TopMenu/TopMenu";

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [categoryMenu, setCategoryMenu] = useState([]);

    useEffect(() => {
        const setMenu = async () => {
            setCategoryMenu(await fetchCategoriesWithBrands());
        }
        setMenu();
    }, []);

    // Xử lý đăng xuất và xóa trạng thái người dùng
    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            dispatch(logOutUser());
            navigate('/login');
        } else {
            alert('Đăng xuất thất bại');
        }
    }

    // Xử lý thay đổi nội dung ô tìm kiếm
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // Xử lý gửi từ khóa tìm kiếm
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (trim(searchTerm).length > 0) {
            navigate(`/search?terms=${searchTerm}`);
        }
        setSearchTerm('');
    }

    return (
        <div className="shop-header">
            <TopMenu user={user} logOutHandler={handleLogout} />
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex container-fluid">
                    <Link className="navbar-brand me-4" href="/">
                        <img className="shop-logo" alt="logo" src='images/logo.png' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="shop-main-menu navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Cửa hàng</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/checkout'>Thanh toán</Link>
                            </li>
                            <li className="nav-item has-submenu">
                                <Link className="nav-link" to="/">Danh mục</Link>
                                <ul className="submenu">
                                    {categoryMenu.map((cat, index) => (
                                        <li className="has-submenu" key={index}>
                                            <Link className="submenu-link" to={`/shop/category/${cat.category.id}/${cat.category.category_name}`}>
                                                {cat.category.category_name}
                                            </Link>
                                            <ul className="submenu">
                                                {cat.brand.map((brand, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            className="submenu-link"
                                                            to={`/shop/category/${cat.category.id}/${cat.category.category_name}/${brand.id}/${brand.brand_name}`}
                                                        >
                                                            {brand.brand_name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <SearchBar
                            term={searchTerm}
                            onChangeHandler={handleInputChange}
                            onSubmitHandler={handleSearchSubmit}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}
