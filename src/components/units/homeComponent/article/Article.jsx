import { Link } from "react-router-dom";
import styles from "./Article.module.css";
import defaultImage from "../../../../assets/hi.webp";
import { getDate } from "../../../../util/getDate";

const Article = ({ item }) => {
  return (
    <li className={styles.wrapper}>
      <Link to={`detail/${item.id}`}>
        <div className={styles.letterHeader}>
          <div className={styles.userWrapper}>
            <img src={item.avatar || defaultImage} alt="avatar" />
            <p>{item.nickname}</p>
          </div>
          <div className={styles.titleWrapper}>
            <h1>{item.title}</h1>
            <p>{getDate(item.createdAt).split(" ")[0]}</p>
          </div>
        </div>
        <div>
          <p className={styles.content}>{item.content}</p>
        </div>
      </Link>
    </li>
  );
};
export default Article;
