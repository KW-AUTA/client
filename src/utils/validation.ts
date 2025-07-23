export const validatePassword = (newPassword: string, confirmNewPassword: string) => {
  const errors: { newPassword?: string; confirmNewPassword?: string } = {};
  if (newPassword.length < 8) {
    errors.newPassword = '새 비밀번호는 8자 이상이어야 합니다.';
  }
  if (newPassword !== confirmNewPassword) {
    errors.confirmNewPassword = '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.';
  }
  return errors;
};

// JWT 토큰 만료 여부 확인 함수
export function isJwtExpired(token: string): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return true;
    // exp는 초 단위, Date.now()는 ms 단위
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
