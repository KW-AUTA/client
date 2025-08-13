import axios from 'axios';
import { ROUTES } from '@/constants';
import { store } from '@/store/redux/store';
import { logout } from '@/store/redux/reducers/auth';
import { toast } from 'react-toastify';
import { refreshAccessToken, handleTokenExpiration, hasRefreshTokenCookie } from '@/utils/tokenManager';

// refresh 재요청 queue에 들어갈 요청 형태 정의
type FailQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.auta.com/api/v1';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // refresh token을 주고 받기 위해 필요한 설정
});

// 중복 refresh 요청 방지
let isRefreshing = false; // 현재 토큰 refresh 진행 중인지
let failQueue: FailQueueItem[] = []; // 토큰 만료로 실패한 요청들 저장하는 queue

// 토큰 재발급 성공/실패 후 queue에 대기 중인 요청들을 처리하는 함수
const processQueue = (error: unknown, token: string | null = null) => {
  failQueue.forEach((promise) => {
    if (error) {
      promise.reject(error); // 토큰 갱신 x -> 대기 중인 모든 요청들 실패 처리
    } else {
      promise.resolve(token); // 토큰 갱신 o -> 새 토큰으로 요청 재시도
    }
  });
  failQueue = []; // 처리 후 queue 초기화
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401(권한x)이면서 아직 재시도 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failQueue.push({
            resolve: (token: string | null) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: unknown) => reject(err)
          });
        });
      }

      // 토큰 갱신 플래그
      originalRequest._retry = true; // 재시도중
      isRefreshing = true; // 토큰 refresh 시작

      try {
        // 리프레시 토큰 쿠키 확인
        if (!hasRefreshTokenCookie()) {
          if (import.meta.env.DEV) {
            console.log('리프레시 토큰 쿠키가 없습니다.');
          }
          handleTokenExpiration();
          return Promise.reject(new Error('Refresh Token 쿠키가 없습니다.'));
        }

        // accessToken 재발급 시도 (reissue API 호출)
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          throw new Error('accessToken 재발급에 실패했습니다.');
        }

        processQueue(null, newAccessToken); // 대기 중인 다른 요청들 처리
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        // 에러 처리
        if (import.meta.env.DEV) {
          console.error('accessToken 재발급 실패:', refreshError);
        }
        processQueue(refreshError, null);

        // refreshToken이 만료되었거나 유효하지 않은 경우 로그아웃 처리
        if (refreshError.response?.status === 401) {
          handleTokenExpiration();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 403(권한 부족) 에러도 강제 로그아웃 처리 (이건 혹시나 해서...)
    if (error.response?.status === 403) {
      localStorage.removeItem('token'); // localStorage에서 토큰 삭제
      store.dispatch(logout());
      toast.error('접근 권한이 없습니다. 다시 로그인해주세요.');
      window.location.href = ROUTES.LANDING;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
