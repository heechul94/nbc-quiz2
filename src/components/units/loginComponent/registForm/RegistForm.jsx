import { useDispatch, useSelector } from "react-redux";
import styles from "./RegistForm.module.css";
import { __postRegister } from "../../../../redux/modules/authSlice";
import { useEffect } from "react";

const RegistForm = ({ formToggle }) => {
  const { success } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onSubmitRegister = (event) => {
    event.preventDefault();
    const registerData = {
      id: event.target.id.value,
      password: event.target.password.value,
      nickname: event.target.nickname.value,
    };
    dispatch(__postRegister(registerData));
    event.target.reset();
  };

  useEffect(() => {
    if (success) formToggle();
  }, [success]);

  return (
    <div className={styles.registWrapper}>
      <form className={styles.registForm} onSubmit={onSubmitRegister}>
        <label>
          아이디
          <input type="text" name="id" minLength={4} maxLength={10} />
        </label>
        <label>
          비밀번호
          <input type="password" name="password" minLength={4} maxLength={15} />
        </label>
        <label>
          닉네임
          <input type="text" name="nickname" minLength={1} maxLength={10} />
        </label>
        <button className={styles.registButton}>회원가입</button>
      </form>
      <button className={styles.registLinkButton} onClick={formToggle}>
        로그인
      </button>
    </div>
  );
};

export default RegistForm;
