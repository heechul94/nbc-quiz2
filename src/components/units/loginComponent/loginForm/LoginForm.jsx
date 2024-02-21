import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginForm.module.css";
import { __postLogin } from "../../../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = ({ formToggle }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitLogin = (event) => {
    event.preventDefault();
    const loginData = {
      id: event.target.id.value,
      password: event.target.password.value,
    };
    dispatch(__postLogin(loginData));
    event.target.reset();
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={onSubmitLogin}>
        <label>
          아이디
          <input type="text" name="id" minLength={4} maxLength={10} />
        </label>
        <label>
          비밀번호
          <input type="password" name="password" minLength={4} maxLength={15} />
        </label>
        <button className={styles.loginButton}>로그인</button>
      </form>
      <button className={styles.loginLinkButton} onClick={formToggle}>
        회원가입
      </button>
    </div>
  );
};

export default LoginForm;
