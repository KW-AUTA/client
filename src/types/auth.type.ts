import { User } from '@/types/user.type';

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
  code: number;
}

// 토큰 정보 타입
export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
}

// 토큰 재발급 response의 data 부분
export interface RefreshTokenResponseData {
  accessToken: string;
}

// 토큰 재발급 응답 타입
export interface RefreshTokenResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
  code: number;
}

// 토큰 재발급 에러 응답 타입
export interface RefreshTokenErrorResponse {
  status: string;
  message: string;
  code: number;
}
