import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import TransitionsModal from "../ContentModal/ContentModal";
import { ContainerMedia, Poster, Subtitle, Title } from "./FileListStyled";

const FileList = ({
  id,
  poster,
  title,
  publisher,
  date,
  vote_average,
  description,
  pages,
}) => {
  return (
    <TransitionsModal
      id={id}
      poster={poster}
      title={title}
      publisher={publisher}
      date={date}
      vote_average={vote_average}
      description={description}
      pages={pages}
    >
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <Poster src={poster} alt={title} />
      <Title className="title">{title}</Title>
      <Subtitle className="subTitle">
        <Subtitle>{date}</Subtitle>
        <Subtitle className="subTitle">{publisher}</Subtitle>
      </Subtitle>
    </TransitionsModal>
  );
};

export default FileList;
