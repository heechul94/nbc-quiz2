import { useSelector } from "react-redux";
import styles from "./DetailContent.module.css";

const DetailContent = ({ userId, content, onEditClick, onClickDelete }) => {
  const { userId: myId } = useSelector((state) => state.user.userInfo);
  return (
    <>
      <div className={styles.articleMiddle}>
        <p className={styles.content}>{content}</p>
      </div>
      {userId === myId && (
        <div className={styles.articleBottom}>
          <button onClick={onEditClick}>수정</button>
          <button onClick={onClickDelete}>삭제</button>
        </div>
      )}
    </>
  );
};

export default DetailContent;
