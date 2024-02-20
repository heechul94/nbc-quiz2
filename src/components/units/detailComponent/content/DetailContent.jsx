import styles from "./DetailContent.module.css";

const DetailContent = ({ content, onEditClick, onClickDelete }) => {
  return (
    <>
      <div className={styles.articleMiddle}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.articleBottom}>
        <button onClick={onEditClick}>수정</button>
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </>
  );
};

export default DetailContent;
