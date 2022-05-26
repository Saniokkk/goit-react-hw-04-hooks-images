import { useState, useEffect } from "react";
import Notiflix from "notiflix";
import PropTypes from "prop-types";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { searchQuery } from "API/searchQuery";
import { ButtonLoadMore } from "../Button";
import { Modal } from "../Modal";
import { Loader } from "../Loader";
import style from "./ImageGallery.module.css";
const PER_PAGE = 12;

export function ImageGallery(props) {
  const [searchValue, setSearchValue] = useState("");
  const [responseBySearch, setResponseBySearch] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [page, setPage] = useState(1);
  const [button, setButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    setSearchValue(props.searchValue);
    setPage(1);
  }, [props.searchValue]);

  useEffect(() => {
    if (searchValue && page === 1) {
      Notiflix.Loading.pulse();
      searchQuery(searchValue, page, PER_PAGE)
        .then((data) => {
          if (data.total === 0) {
            setResponseBySearch(null);
            Notiflix.Notify.failure(
              "Упс...По вашему запросу ничего не найдено"
            );
            setButton(false);
            return;
          } else {
            setResponseBySearch([...data.hits]);
            setButton(true);
            window.scrollTo(0, 0);
            return data;
          }
        })
        .then((data) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(
            `Найденно: ${data.totalHits} Загруженно: ${data.hits.length}`
          );
        });
    } else if (page > 1) {
      Notiflix.Loading.circle();
      searchQuery(searchValue, page, PER_PAGE)
        .then((data) => {
          if (Math.ceil(data.totalHits / PER_PAGE) <= page) {
            setButton(false);
            setResponseBySearch([...responseBySearch, ...data.hits]);
            Notiflix.Notify.failure("По вашему запросу картинок больше нет");
            return;
          }
          setResponseBySearch([...responseBySearch, ...data.hits]);

          return data;
        })
        .then((data) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(
            `Найденно: ${data.totalHits} Загруженно: ${
              PER_PAGE + responseBySearch.length
            }`
          );
        });
    }
  }, [searchValue, page]);

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <>
      {!props.searchValue && <Loader>Введите что хочеться найти</Loader>}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          {<img src={largeImageURL} alt={tags}></img>}
        </Modal>
      )}
      {responseBySearch && (
        <ul className={style.imageGallery}>
          {responseBySearch.map((data) => {
            return (
              <ImageGalleryItem
                key={data.id}
                data={{ ...data }}
                openModal={toggleModal}
              />
            );
          })}
        </ul>
      )}
      {button && <ButtonLoadMore text={"Load more"} onClick={handleLoadMore} />}
    </>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};

Notiflix.Notify.init({
  timeout: 3000,
});
Notiflix.Loading.init({
  className: "notiflix-loading",
  zindex: 4000,
  backgroundColor: "rgba(0,0,0,0.8)",
  rtl: false,
  fontFamily: "Quicksand",
  cssAnimation: true,
  cssAnimationDuration: 600,
  svgSize: "150px",
  svgColor: "blue",
});
