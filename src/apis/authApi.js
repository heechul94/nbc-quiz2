import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 요청 오류");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    const url = response.config.url.split("?")[0];
    if (url === "/register") alert(response.data.message);
    if (url === "/login") {
      const accessToken = response.data.accessToken;
      const userInfo = {
        userId: response.data.userId,
        avatar: response.data.avatar,
        nickname: response.data.nickname,
      };
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    return response;
  },
  // 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    alert(error.response.data.message);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    return Promise.reject(error);
  }
);

export default instance;
