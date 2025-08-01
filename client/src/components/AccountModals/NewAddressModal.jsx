import React, { useState } from 'react';
import Modal from '../Modal/Modal';

export default function NewAddressModal({ onSubmit, isOpen, onClose }) {

    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        country: '',
        state: '',
        postal_code: '',
        isdefault: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevObj) => ({ ...prevObj, [name]: value }));
    };

    const checkHandler = (e) => {
        const checked = e.target.checked;
        setFormState((prev) => ({ ...prev, isdefault: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSubmit(formState);
        if (success) {
            setFormState({
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                city: '',
                country: '',
                state: '',
                postal_code: '',
                isdefault: false
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!formState ? '' :
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="na_first_name" className="form-label">Họ</label>
                            <input type="text" className="form-control" id="na_first_name" name="first_name" value={formState.first_name} onChange={handleInputChange} required />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="na_last_name" className="form-label">Tên</label>
                            <input type="text" className="form-control" id="na_last_name" name="last_name" value={formState.last_name} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="na_address_1" className="form-label">Địa chỉ</label>
                            <input type="text" className="form-control" id="na_address_1" name="address_1" value={formState.address_1} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="na_address_2" className="form-label">Căn hộ, số tầng, v.v. (tùy chọn)</label>
                            <input type="text" className="form-control" id="na_address_2" name="address_2" value={formState.address_2} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="na_city" className="form-label">Thành phố</label>
                            <input type="text" className="form-control" id="na_city" name="city" value={formState.city} onChange={handleInputChange} />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="na_country" className="form-label">Quốc gia</label>
                            <input type="text" className="form-control" id="na_country" name="country" value={formState.country} onChange={handleInputChange} />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="na_state" className="form-label">Tỉnh/Bang</label>
                            <input type="text" className="form-control" id="na_state" name="state" value={formState.state} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="na_postal_code" className="form-label">Mã bưu điện</label>
                            <input type="text" className="form-control" id="na_postal_code" name="postal_code" value={formState.postal_code} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <input className="form-check-input" type="checkbox" id="na_isdefault" checked={formState.isdefault} onChange={checkHandler} />
                            <label className="form-check-label" htmlFor="na_isdefault">
                                Đặt làm địa chỉ mặc định?
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 d-flex justify-content-center">
                            <button className="btn btn-secondary mt-3" type="submit">Thêm địa chỉ</button>
                        </div>
                    </div>
                </form>
            }
        </Modal>
    );
}
