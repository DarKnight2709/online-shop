import React from "react";
import './footer.css';

export default function Footer() {
    return (
        <div className="container-fluid bg-dark text-white">
            <div className="container shop-footer py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Công ty của chúng tôi</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Giới thiệu</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Liên hệ</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Chi nhánh</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Chính sách bảo mật</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Điều khoản</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Liên kết quan trọng</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Trang chủ</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Cửa hàng</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Vận chuyển</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Chính sách hoàn trả</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Đối tác</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Nhà đầu tư</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Đối tác giao hàng</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Cộng tác viên</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Người ảnh hưởng</a></li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Đăng ký để nhận ưu đãi mới nhất!</h5>
                            <p>Bản tin hàng tháng về các sản phẩm và ưu đãi hấp dẫn từ chúng tôi.</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Địa chỉ email</label>
                                <input id="newsletter1" type="text" className="form-control rounded-0" placeholder="Địa chỉ email" />
                                <button className="btn btn-primary rounded-0" type="button">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2024 ShopReact, Inc. Đã đăng ký bản quyền.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"></li>
                        <li className="ms-3"></li>
                        <li className="ms-3"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
