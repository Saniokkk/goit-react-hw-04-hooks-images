import axios from "axios";

const KEY = "25786434-348adb767e319176b4ad356ea";
export const searchQuery = async (searchQuery, page, PER_PAGE) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return response.data;
};
