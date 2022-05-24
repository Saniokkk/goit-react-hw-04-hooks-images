import PropTypes from "prop-types";
import style from "./Loader.module.css";

export const Loader = (props) => {
  return <div className={style.notFound}>{props.children}</div>;
};

Loader.propTypes = {
  props: PropTypes.node,
};
