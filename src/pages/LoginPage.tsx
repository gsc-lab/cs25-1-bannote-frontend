import { useNotify } from "react-admin";
import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { setUserSession } from "../utils/auth";

import { Box, Card, Typography, CircularProgress } from "@mui/material";

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
        { credentials: "include" }
      );

      const data = await response.json();

      console.log(data);
      

      // 회원가입이 필요한 경우 (백엔드에서 exists: false 응답)
      if (!data.exists) {
        // credential 토큰을 URL parameter로 전달
        window.location.href = `/#/register?credential=${encodeURIComponent(
          credential
        )}`;
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FEF6E4",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 380,
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
            border: "1px solid #172C66",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {/* Logo */}
          <img
            src="https://raw.githubusercontent.com/Saaatsuki/BanNote_Practice/main/frontend/src/assets/BanNote-logo.png"
            alt="BanNote Logo"
            style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
          />

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: "#172C66",
              fontWeight: 600,
            }}
          >
            Google 로그인
          </Typography>

          {!isProcessing && (
            <GoogleLoginButton
              onSuccess={handleGoogleSuccess}
              onError={() => {
                notify("Login failed");
              }}
            />
          )}

          {isProcessing && (
            <Box sx={{ mt: 2 }}>
              <CircularProgress sx={{ color: "#172C66" }} />
              <Typography sx={{ mt: 1, color: "#172C66" }}>
                Processing...
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </GoogleOAuthProvider>
  );
};
