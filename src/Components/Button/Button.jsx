import PropTypes from "prop-types";
import style from "./Button.module.css";

export const ButtonLoadMore = ({ text, onClick }) => {
  return (
    <button className={style.buttonLoadMore} onClick={onClick}>
      {text}
    </button>
  );
};

ButtonLoadMore.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
