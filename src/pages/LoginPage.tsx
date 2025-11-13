import { useNotify } from "react-admin";
import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";

export const LoginPage = () => {
  const notify = useNotify();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/code/google?credential=${credentialResponse.credential}`,
      { credentials: "include" },
    );

    const data = await response.json();

    // 로그인 성공 시 사용자 정보 저장
    // TODO : react admin 의 사용자 컨텍스트에 저장하도록 변경 (auth provider도 함께 수정 필요)
    if (data.can_login && data.user) {
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }

    // 루트로 리다이렉트
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Google Login</h1>
      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        onError={() => {
          notify("Login failed");
        }}
      />
    </div>
  );
};
