export const submitValidate = (data) => {
  if (data.nickname.trim("") === "" && data.content.trim("") === "") {
    alert("닉네임과 내용을 입력해주세요");
    return false;
  }
  if (data.nickname.trim("") === "") {
    alert("닉네임을 입력해주세요");
    return false;
  }
  if (data.content.trim("") === "") {
    alert("내용을 입력해주세요");
    return false;
  }
  return data;
};
