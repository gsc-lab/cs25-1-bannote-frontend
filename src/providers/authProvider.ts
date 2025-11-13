import { AuthProvider } from "react-admin";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const authProvider: AuthProvider = {
  login: () => {
    return Promise.reject(new Error("Use Google Login"));
  },

  logout: () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    sessionStorage.removeItem("user");

    return Promise.resolve();
  },

  checkAuth: () => {
    // sessionStorage에 사용자 정보가 있으면 로그인된 것으로 간주
    // 실제 토큰 검증은 API 요청 시 백엔드에서 HttpOnly 쿠키로 처리
    const user = sessionStorage.getItem("user");
    return user ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      sessionStorage.removeItem("user");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) return Promise.reject();

    const user = JSON.parse(userStr);
    return Promise.resolve({
      id: user.user_code,
      fullName: `${user.family_name} ${user.given_name}`,
      avatar: user.profile_image_url,
    });
  },
};
