import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

export default function UserInfoModal({ userData, onSubmit, isOpen, onClose }) {
    const [formState, setFormState] = useState(userData);

    useEffect(() => {
        setFormState(userData);
    }, [userData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
        onSubmit(formState);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formState.email || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formState.username || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formState.phone || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formState.address || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-secondary mt-3" type="submit">
                        Cập nhật
                    </button>
                </div>
            </form>
        </Modal>
    );
}
