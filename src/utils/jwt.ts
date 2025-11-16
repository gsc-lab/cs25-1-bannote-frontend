/**
 * JWT 토큰 디코딩 유틸리티
 */

interface GoogleCredentialPayload {
  iss: string; // Issuer
  azp: string; // Authorized party
  aud: string; // Audience
  sub: string; // Subject (user ID)
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number; // Issued at
  exp: number; // Expiration time
}

/**
 * JWT 토큰을 디코딩하여 페이로드 추출
 * @param token JWT 토큰 문자열
 * @returns 디코딩된 페이로드 객체
 */
export const decodeJWT = (token: string): GoogleCredentialPayload | null => {
  try {
    // JWT는 header.payload.signature 형식
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid JWT format");
      return null;
    }

    // Base64 URL 디코딩
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

/**
 * URL 쿼리 파라미터에서 credential 추출
 * React Admin의 해시 라우팅(#)을 고려하여 처리
 * @returns credential 문자열 또는 null
 */
export const getCredentialFromURL = (): string | null => {
  // window.location.hash에서 쿼리 파라미터 추출
  const hash = window.location.hash;
  const queryStart = hash.indexOf("?");

  if (queryStart === -1) {
    return null;
  }

  const queryString = hash.substring(queryStart + 1);
  const params = new URLSearchParams(queryString);
  return params.get("credential");
};
