import styles from "./EditContent.module.css";

const EditContent = ({ content, onClickEdit, onClickPatch, setContent }) => {
  return (
    <>
      <div className={styles.articleMiddle}>
        <textarea
          className={styles.content}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className={styles.articleBottom}>
        <button onClick={onClickPatch}>수정완료</button>
        <button onClick={onClickEdit}>취소</button>
      </div>
    </>
  );
};

export default EditContent;
