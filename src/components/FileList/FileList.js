import TransitionsModal from "../ContentModal/ContentModal";
import { Poster, Subtitle, Title } from "./FileListStyled";

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
