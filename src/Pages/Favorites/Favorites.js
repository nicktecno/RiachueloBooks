import { unavailable } from "../../config/config";

import { useEffect, useState } from "react";

import FileList from "../../components/FileList/FileList";
import { ContainerGeneralPages } from "../GeneralStyledComponents/GeneralStyledPages";

const Favorites = () => {
  const [content, setContent] = useState([]);

  const fetchFavorites = async () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    setContent(favorites);
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
    </div>
  );
};

export default Favorites;
