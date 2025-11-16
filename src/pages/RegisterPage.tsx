import { useEffect, useState } from "react";
import { decodeJWT, getCredentialFromURL } from "../utils/jwt";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

interface UserInfo {
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
}

// TODO: 会員登録の時は入力した情報とcredentialを一緒にバックエンドに送信する

export const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const credential = getCredentialFromURL();

    if (!credential) {
      setError("No credential found in URL");
      return;
    }

    const decoded = decodeJWT(credential);

    if (!decoded) {
      setError("Failed to decode credential");
      return;
    }

    setUserInfo({
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      given_name: decoded.given_name,
      family_name: decoded.family_name,
      email_verified: decoded.email_verified,
    });
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {/* TODO: 会員登録フォームに変更 */}
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            회원가입
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 3 }}>
            <Avatar
              src={userInfo.picture}
              alt={userInfo.name}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h6">{userInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userInfo.email}
              </Typography>
              {userInfo.email_verified && (
                <Typography variant="caption" color="success.main">
                  ✓ 이메일 인증됨
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>이름:</strong> {userInfo.given_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>성:</strong> {userInfo.family_name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
