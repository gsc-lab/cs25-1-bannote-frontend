/**
 * 인증 관련 유틸리티 함수들
 * - 토큰 만료 시간 관리 (로컬스토리지)
 * - 사용자 정보 관리 (세션스토리지)
 * - 쿠키 관리
 */

const TOKEN_EXPIRATION_KEY = "token_expiration";
const USER_KEY = "user";

// 토큰 만료 시간: 15분 (밀리초)
const TOKEN_EXPIRATION_DURATION = 15 * 60 * 1000;

/**
 * 현재 시간 기준으로 토큰 만료 시간 설정 (15분)
 */
export const setTokenExpiration = (): void => {
  const expirationTime = Date.now() + TOKEN_EXPIRATION_DURATION;
  localStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.toString());
};

/**
 * 토큰 만료 시간 확인
 * @returns true: 유효함, false: 만료됨
 */
export const isTokenValid = (): boolean => {
  const expiration = localStorage.getItem(TOKEN_EXPIRATION_KEY);
  if (!expiration) return false;

  const now = Date.now();
  return parseInt(expiration) > now;
};

/**
 * 토큰 만료까지 남은 시간 (밀리초)
 * @returns 남은 시간 (ms), 만료되었거나 없으면 0
 */
export const getTimeUntilExpiration = (): number => {
  const expiration = localStorage.getItem(TOKEN_EXPIRATION_KEY);
  if (!expiration) return 0;

  const remaining = parseInt(expiration) - Date.now();
  return remaining > 0 ? remaining : 0;
};

/**
 * 사용자 정보를 로컬스토리지에 저장하고 토큰 만료 시간 설정
 * @param user 사용자 정보 객체
 */
export const setUserSession = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setTokenExpiration();
};

/**
 * 로컬스토리지에서 사용자 정보 가져오기
 * @returns 사용자 정보 객체 또는 null
 */
export const getUserSession = (): any | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * 모든 인증 데이터 삭제 (로컬스토리지)
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(TOKEN_EXPIRATION_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * 완전한 로그아웃 처리 (쿠키 + 로컬스토리지)
 */
export const performFullLogout = (): void => {
  // TODO: 백엔드에 리프레시 토큰 화이트리스트 삭제 요청
  clearAuthData();
};
