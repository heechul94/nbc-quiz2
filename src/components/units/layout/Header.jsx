import { useNavigate } from "react-router-dom";
import styles from "./layoutStyles.module.css";

const Header = () => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate("/login");
  };
  return (
    <header className={styles.header}>
      <div>
        <button onClick={onClickLogin}>로그인</button>
      </div>
    </header>
  );
};

export default Header;
