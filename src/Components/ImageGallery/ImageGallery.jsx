import { Component } from "react";
import PropTypes from "prop-types";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { searchQuery } from "API/searchQuery";
import { ButtonLoadMore } from "../Button";
import { Modal } from "../Modal";
import { Loader } from "../Loader";
import style from "./ImageGallery.module.css";
const PER_PAGE = 12;

export class ImageGallery extends Component {
  static propTypes = {
    searchValue: PropTypes.string,
  };

  state = {
    searchValue: "",
    responseBySearch: null,
    page: 1,
    button: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
    status: "idle",
  };

  async componentDidMount() {
    console.log(this.state);
  }

  componentWillUnmount() {
    this.setState({ page: 1 });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: "pending" });
      const data = await searchQuery(
        this.props.searchValue,
        this.state.page,
        PER_PAGE
      );
      if (data.total === 0) {
        this.setState({ status: "reject" });
      } else {
        this.setState({
          responseBySearch: [...data.hits],
          searchValue: this.props.searchValue,
          button: true,
          page: 1,
          status: "resolve",
        });
        window.scrollTo(0, 0);
      }
    }

    if (
      prevProps.searchValue === this.state.searchValue &&
      prevState.page !== this.state.page
    ) {
      const data = await searchQuery(
        this.props.searchValue,
        this.state.page,
        PER_PAGE
      );

      if (Math.ceil(data.totalHits / PER_PAGE) <= this.state.page) {
        this.setState({
          button: false,
          responseBySearch: [...this.state.responseBySearch, ...data.hits],
        });
        return;
      }
      this.setState({
        responseBySearch: [...this.state.responseBySearch, ...data.hits],
        status: "resolve",
      });
    }
  }

  handleLoadMore = async () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState({ showModal: !this.state.showModal, largeImageURL, tags });
  };

  render() {
    const { showModal, largeImageURL, tags, responseBySearch, button, status } =
      this.state;
    if (status === "idle") {
      return <Loader>Введите что хочеться найти</Loader>;
    }
    if (status === "pending") {
      return <Loader>Загрузка данных...</Loader>;
    }
    if (status === "resolve") {
      return (
        <>
          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              {<img src={largeImageURL} alt={tags}></img>}
            </Modal>
          )}
          <ul className={style.imageGallery}>
            {responseBySearch &&
              responseBySearch.map((data) => {
                return (
                  <ImageGalleryItem
                    key={data.id}
                    data={{ ...data }}
                    openModal={this.toggleModal}
                  />
                );
              })}
          </ul>
          {button ? (
            <ButtonLoadMore text={"Load more"} onClick={this.handleLoadMore} />
          ) : (
            <div className={style.end}>Картинки закончились</div>
          )}
        </>
      );
    }
    if (status === "reject") {
      return <Loader>Упс...По вашему запросу ничего не найдено</Loader>;
    }
  }
}
