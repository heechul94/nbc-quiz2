import { useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch } from "react-redux";
import { __patchProfile } from "../../redux/modules/authSlice";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState(userInfo.avatar);
  const [changedAvatar, setChangedAvatar] = useState(null);
  const [changedNickname, setChangedNickname] = useState("");

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const isEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickImage = () => {
    fileRef.current.click();
  };

  const onChangeFile = (event) => {
    const file = event.target.files[0];
    const tempUrl = URL.createObjectURL(file);
    setChangedAvatar(file);
    setImageUrl(tempUrl);
  };

  const onClickEdit = () => {
    if (changedAvatar === null && changedNickname === "") {
      alert("변경사항이 없습니다.");
      return;
    }

    const editData = {
      edited: {
        nickname: changedNickname,
        avatar: changedAvatar,
      },
      accessToken,
    };
    dispatch(__patchProfile(editData));
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className={styles.profileWrapper}>
        <h1>프로필 관리</h1>
        {isEdit ? (
          <>
            <img src={imageUrl} alt="avatar" onClick={onClickImage} />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={onChangeFile}
            />
            <input
              defaultValue={userInfo.nickname}
              onChange={(event) => setChangedNickname(event.target.value)}
            />
            <p className={styles.userId}>{userInfo.userId}</p>
            <div>
              <button onClick={onClickEdit}>수정완료</button>
              <button onClick={isEditToggle}>취소</button>
            </div>
          </>
        ) : (
          <>
            <img src={userInfo.avatar} alt="avatar" />
            <p className={styles.nickname}>{userInfo.nickname}</p>
            <p className={styles.userId}>{userInfo.userId}</p>
            <div>
              <button onClick={isEditToggle}>수정하기</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Profile;
