import { Link, useNavigate } from "react-router-dom";
import styles from "./layoutStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserInfo } from "../../../redux/modules/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    dispatch(setIsLoggedIn(false));
    dispatch(setUserInfo(null));
  };

  return (
    <header className={styles.header}>
      {isLoggedIn ? (
        <>
          <Link to={"/"} style={{ color: "white" }}>
            HOME
          </Link>
          <div>
            <Link to={"/profile"} style={{ color: "white" }}>
              내 프로필
            </Link>
            <button onClick={onClickLogout}>로그아웃</button>
          </div>
        </>
      ) : (
        <>
          <Link to={"/"} style={{ color: "white" }}>
            HOME
          </Link>
          <button className={styles.button} onClick={onClickLogin}>
            로그인
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
