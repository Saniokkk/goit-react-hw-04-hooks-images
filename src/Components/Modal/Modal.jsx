import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");
console.log(modalRoot);

export function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", onClose);
    return window.removeEventListener("keydown", onClose);
  }, []);

  const onClose = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      props.toggleModal();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal}>{props.children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
