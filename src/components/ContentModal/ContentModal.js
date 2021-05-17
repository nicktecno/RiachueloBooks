import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./ContentModal.css";
import "./button.css";

import { ContainerMedia } from "../FileList/FileListStyled";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({
  children,
  description,
  title,
  poster,
  publisher,
  date,
  pages,
  id,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function addFavorites(
    description,
    title,
    poster,
    publisher,
    date,
    pages,
    id
  ) {
    const dataCard = {
      id: id,
      title: title,
      description: description,
      poster: poster,
      publisher: publisher,
      date: date,
      pages: pages,
    };

    if (localStorage.getItem("favorites") === null) {
      // Adicionando um array com um objeto no localstorage
      localStorage.setItem("favorites", JSON.stringify([dataCard]));
    } else {
      // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
      localStorage.setItem(
        "favorites",
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("favorites")),
          dataCard,
        ])
      );
    }
  }

  async function removeFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    const filtered = favorites.filter((favorite) => favorite.id !== id);
    await localStorage.setItem("favorites", JSON.stringify(filtered));

    history.go("/favorites");
  }

  return (
    <>
      <ContainerMedia
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </ContainerMedia>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="ContentModal">
              <img
                src={poster}
                alt={title}
                className="ContentModal__portrait"
              />
              <div onClick={handleClose} className="close-container">
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <label className="close">close</label>
              </div>
              <img
                src={poster}
                alt={title}
                className="ContentModal__landscape"
              />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {title} ({(date || "-----").substring(0, 4)})
                </span>
                <i className="tagline">{publisher}</i>
                <i className="tagline">Total of pages: {pages}</i>

                <span className="ContentModal__description">{description}</span>

                <div
                  className="favoriteButton"
                  onClick={() =>
                    addFavorites(
                      description,
                      title,
                      poster,
                      publisher,
                      date,
                      pages,
                      id
                    )
                  }
                >
                  Adicionar ao Favoritos
                </div>
                <div
                  className="removeFavoriteButton"
                  onClick={() => removeFavorites(id)}
                >
                  Remover dos Favoritos
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
