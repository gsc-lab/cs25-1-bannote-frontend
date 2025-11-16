import { useNotify } from "react-admin";
import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { setUserSession } from "../utils/auth";

export const LoginPage = () => {
  const notify = useNotify();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const credential = credentialResponse.credential;
      const apiUrl = import.meta.env.VITE_API_URL;
      // TODO: 백엔드 요청 axios로 변경
      const response = await fetch(
        `${apiUrl}/auth/code/google?credential=${credential}`,
        { credentials: "include" },
      );

      const data = await response.json();

      // 회원가입이 필요한 경우 (백엔드에서 exists: false 응답)
      if (!data.exists) {
        // credential 토큰을 URL parameter로 전달
        window.location.href = `/#/register?credential=${encodeURIComponent(credential)}`;
        return;
      }

      // 로그인 성공 시 사용자 정보 저장
      if (data.can_login && data.user) {
        setUserSession(data.user);

        // 루트로 리다이렉트
        window.location.href = "/";
      } else {
        notify("Login failed: User data not found", { type: "error" });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      notify("Login failed. Please try again.", { type: "error" });
      setIsProcessing(false);
    }
  };

  const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div>
        <h1>Google Login</h1>
        {!isProcessing && (
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={() => {
              notify("Login failed");
            }}
          />
        )}
        {isProcessing && <div>Processing...</div>}
      </div>
    </GoogleOAuthProvider>
  );
};
