import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import { img_300, unavailable } from "../../config/config";

import { useEffect, useState } from "react";

import FileList from "../../components/FileList/FileList";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { ContainerGeneralPages } from "../GeneralStyledComponents/GeneralStyledPages";

const Favorites = (params) => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(params);
  }, [params]);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchFavorites = async () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    setContent(favorites);

    // setNumOfPages(10);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchFavorites();
  }, []);

  return (
    <div>
      <span className="pageTitle">Favoritos</span>
      <ContainerGeneralPages className="trending">
        {content &&
          content.map((contentFile) => (
            <FileList
              key={contentFile.id}
              id={contentFile.id}
              poster={contentFile?.poster || unavailable}
              title={contentFile.title}
              date={contentFile.date}
              publisher={contentFile.publisher}
              pages={contentFile.pages}
              description={contentFile.description}
            />
          ))}
      </ContainerGeneralPages>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Favorites;
