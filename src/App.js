import { SearchBar } from "./Components/Searchbar";
import { ImageGallery } from "Components/ImageGallery";
import { useState } from "react";
import style from "./App.module.css";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const changeSearchSubmit = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <div className={style.App}>
      <SearchBar onSubmit={changeSearchSubmit} />
      <ImageGallery searchValue={searchValue} />
    </div>
  );
}
export default App;
