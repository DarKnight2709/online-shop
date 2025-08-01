import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ term, onChangeHandler, onSubmitHandler }) {
    return (
        <form className="d-flex" role="search" onSubmit={onSubmitHandler}>
            <input
                value={term}
                onChange={onChangeHandler}
                className="form-control rounded-0"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Tìm kiếm"
            />
            <button className="btn btn-dark rounded-0" type="submit"></button>
        </form>
    );
}
