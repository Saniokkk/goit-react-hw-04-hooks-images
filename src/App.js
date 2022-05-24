import { ToastContainer } from "react-toastify";
import { SearchBar } from "./Components/Searchbar";
import { ImageGallery } from "Components/ImageGallery";
import { Component } from "react";
import style from "./App.module.css";

class App extends Component {
  state = {
    searchValue: "",
  };

  changeSearchSubmit = (searchValue) => {
    this.setState({ searchValue }, () => {
      console.log(this.state.searchValue, "<---");
    });
  };

  render() {
    return (
      <div className={style.App}>
        <SearchBar onSubmit={this.changeSearchSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
