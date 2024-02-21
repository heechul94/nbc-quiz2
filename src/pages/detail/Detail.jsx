import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import {
  __deleteFanLetters,
  __patchFanLetters,
} from "../../redux/modules/fanLettersSlice";
import defaultImage from "../../assets/hi.webp";
import { useState } from "react";
import EditContent from "../../components/units/detailComponent/edit/EditContent";
import DetailContent from "../../components/units/detailComponent/content/DetailContent";

const Detail = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");

  const { id } = useParams();
  const { fanLetters } = useSelector((state) => state.fanLetters);
  const letter = fanLetters.find((letter) => letter.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickDelete = () => {
    const isDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (isDelete) {
      dispatch(__deleteFanLetters(id));
      navigate("/");
    }
  };

  const onClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickPatch = () => {
    dispatch(__patchFanLetters({ id, content }));
    navigate("/");
  };

  return (
    <div className={styles.articleWrapper}>
      <Link className={styles.anchor} to="/">
        <span>홈으로 가기</span>
      </Link>
      <article className={styles.article}>
        <div className={styles.articleTop}>
          <div>
            <img src={letter.avatar || defaultImage} alt="avatar" />
            <span>{letter.nickname}</span>
          </div>
          <span>{letter.createdAt.split(" ")[0]}</span>
        </div>
        <span>To : {letter.writedTo}</span>
        {isEdit ? (
          <EditContent
            content={letter.content}
            setContent={setContent}
            onClickEdit={onClickEdit}
            onClickPatch={onClickPatch}
          />
        ) : (
          <DetailContent
            content={letter.content}
            onEditClick={onClickEdit}
            onClickDelete={onClickDelete}
          />
        )}
      </article>
    </div>
  );
};

export default Detail;
