import {
  Button,
  createMuiTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import { unavailable } from "../../config/config";
import "./Search.css";

import axios from "axios";
import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import FileList from "../../components/FileList/FileList";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { ContainerGeneralPages } from "../GeneralStyledComponents/GeneralStyledPages";

const Search = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}&maxResults=6&startIndex=${page}`
      );
      console.log(data.items);
      setContent(data.items);
      setNumOfPages(10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search" style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            styled={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <FiSearch size="20px" />
          </Button>
        </div>
      </ThemeProvider>
      <ContainerGeneralPages className="trending">
        {content &&
          content.map((contentFile) => (
            <FileList
              key={contentFile.id}
              id={contentFile.id}
              poster={
                contentFile.volumeInfo?.imageLinks?.thumbnail || unavailable
              }
              title={contentFile.volumeInfo.title}
              date={contentFile.volumeInfo.publishedDate || "No Date"}
              publisher={contentFile.volumeInfo.publisher}
              vote_average={contentFile.vote_average}
              pages={contentFile.volumeInfo.pageCount}
              description={contentFile.volumeInfo.description}
            />
          ))}
        {searchText && !content && <h2>No Books Found</h2>}
      </ContainerGeneralPages>
      {numOfPages >= 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
