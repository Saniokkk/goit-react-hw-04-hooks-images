// import { render } from "@testing-library/react";
import Notiflix from "notiflix";
import PropTypes from "prop-types";
import { useState } from "react";
import style from "./SearchForm.module.css";

export function SearchForm(props) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() === "") {
      Notiflix.Notify.warning("Введите данные для поиска");
      return;
    }
    props.onSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={style.searchFormButton}>
        <span className={style.searchFormButtonLabel}>Search</span>
      </button>

      <input
        className={style.searchFormInput}
        value={searchValue}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
