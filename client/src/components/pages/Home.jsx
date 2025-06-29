import React, { useEffect } from "react";
import { Carousel } from 'bootstrap'; // ✅ import bootstrap js manually
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, selectAllProducts } from "../../features/productsList/productsListSlice.js";
import ProductsList from "../ProductsList/ProductsList.js";
import './home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        dispatch(loadProducts({ type: 'default' }));
    }, [dispatch]);

    // Kích hoạt Carousel của Bootstrap thủ công
    useEffect(() => {
        const carouselElement = document.querySelector('#carouselExampleIndicators');
        if (carouselElement) {
            new Carousel(carouselElement, {
                interval: 3000,
                ride: 'carousel'
            });
        }
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="column">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Trang 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Trang 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Trang 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="images/banner1-1.jpg" className="d-block w-100" alt="Ảnh banner 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src="images/banner2-1.jpg" className="d-block w-100" alt="Ảnh banner 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src="images/banner3-1.jpg" className="d-block w-100" alt="Ảnh banner 3" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Trước</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Tiếp</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
  <div className="row">
    {/* Cột banner quảng cáo bên trái */}
    <div className="col-md-3 mb-4">
      <div className="banner-roller text-white p-3 rounded shadow">
        <img
          src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSj0jUmugkT8ve-EpaGoNDDIhBQ18Chnsm3iURQ1NUXQHW8brO6rBxTZM5PjJkl3eayqkhbSl6H4EOhJCq1Tf9rtNaDW24kuxHVCkWn5GFyu7BX9QK6yhNd_Rsp5VEdbD172aZOIViUeOs&usqp=CAc"
          alt="Khuyến mãi Laptop"
          className="img-fluid rounded mb-3"
        />
        <h5 className="text-uppercase fw-bold">🔥 Giảm Giá Cực Sốc</h5>
        <h4 className="fw-bold">Khuyến Mãi Laptop</h4>
        <p className="small">Giảm tới <strong>40%</strong> cho các mẫu được chọn</p>
        <button className="btn btn-light btn-sm fw-bold mt-2" onClick={() => {
            navigate('/product/4/Lenovo%20ThinkPad%20X1');
        }}>Mua ngay</button>
      </div>
    </div>

    {/* Cột danh sách sản phẩm */}
    <div className="col-md-9">
      <ProductsList itemArr={products} filters={{}} />
    </div>
  </div>
</div>

        </>
    );
}
