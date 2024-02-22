import { useDispatch, useSelector } from "react-redux";
import { __postFanLetters } from "../../../../redux/modules/fanLettersSlice";
import { submitValidate } from "../../../../util/submitValidate";
import styles from "./SubmitForm.module.css";

const SubmitForm = () => {
  const { userId, avatar, nickname } = useSelector((state) => {
    console.log(state.user.userInfo);
    return state.user.userInfo;
  });
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      userId,
      avatar: avatar || "",
      nickname,
      content: event.target.content.value,
      writedTo: event.target.member.value,
      createdAt: new Date().toString(),
    };
    const validatedData = submitValidate(formData);
    if (validatedData) {
      dispatch(__postFanLetters(validatedData));
      event.target.reset();
    }
  };

  return (
    <form className={styles.submitForm} onSubmit={onSubmit}>
      <p className={styles.formTitle}>응원의 글을 남겨주세요!</p>
      <p className={styles.nickname}>{nickname}</p>
      <label>
        <textarea
          name="content"
          placeholder="내용을 입력해주세요"
          maxLength={"120"}
        />
      </label>
      <label>
        <select name="member">
          <option value={null}>보낼 멤버를 선택하세요</option>
          <option value={"아이네"}>아이네</option>
          <option value={"징버거"}>징버거</option>
          <option value={"릴파"}>릴파</option>
          <option value={"주르르"}>주르르</option>
          <option value={"고세구"}>고세구</option>
          <option value={"비챤"}>비챤</option>
        </select>
      </label>
      <button className={styles.submitButton} type="submit">
        등록
      </button>
    </form>
  );
};

export default SubmitForm;
