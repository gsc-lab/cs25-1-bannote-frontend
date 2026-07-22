import { AuthProvider } from "react-admin";
import { getUserSession, isTokenValid, performFullLogout } from "../utils/auth";

export const authProvider: AuthProvider = {
  login: () => {
    return Promise.reject(new Error("Use Google Login"));
  },

  logout: () => {
    performFullLogout();
    return Promise.resolve();
  },

  checkAuth: () => {
    // 토큰의 만료 시간 확인
    if (!isTokenValid()) {
      return Promise.reject(new Error("Session expired"));
    }

    // 로컬스토리지에서 사용자 정보 확인
    if (!getUserSession()) {
      return Promise.reject(new Error("User not found"));
    }

    // 만료 시간이 유효하고 사용자 정보가 있으면 인증 성공
    // 실제 토큰 검증은 API 요청 시 백엔드에서 HttpOnly 쿠키로 처리
    // 토큰이 실제로 만료되면 API가 401을 반환하고 checkError에서 처리
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    // if (status === 401 || status === 403) {
    //   return Promise.reject();
    // }
    return Promise.resolve();
  },

  getIdentity: () => {
    const user = getUserSession();
    if (!user) {
      return Promise.reject(new Error("User not found"));
    }
    return Promise.resolve({
      id: user.user_code,
      fullName: `${user.family_name} ${user.given_name}`,
      avatar: user.profile_image_url,
    });
  },
};
