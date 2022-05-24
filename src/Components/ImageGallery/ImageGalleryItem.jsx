import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = (props) => {
  const { webformatURL, tags, largeImageURL } = props.data;

  const openLargeImg = () => {
    props.openModal(largeImageURL, tags);
  };

  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={openLargeImg}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
  openModal: PropTypes.func,
};
