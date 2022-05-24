import PropTypes from "prop-types";
import style from "./SearchBar.module.css";
import { SearchForm } from "./SearchForm";

export const SearchBar = ({ onSubmit }) => {
  return (
    <header className={style.SearchBar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
