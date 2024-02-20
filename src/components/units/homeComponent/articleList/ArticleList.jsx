import Article from "../article/Article";
import styles from "./ArticleList.module.css";

const ArticleList = ({ fanLetters }) => {
  return (
    <>
      <ul>
        {fanLetters?.map((item) => <Article key={item.id} item={item} />) || (
          <p className={styles.emptyMessage}>없어요 좀 뭐라고 적어봐요</p>
        )}
      </ul>
    </>
  );
};
export default ArticleList;
