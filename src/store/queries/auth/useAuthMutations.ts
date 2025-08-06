import { API_ENDPOINTS } from '@/constants';
import axiosInstance from '@/services/api/axios';
import { LoginRequest, LoginResponse, SignupRequest } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { cleanupTokenManager } from '@/utils/tokenManager';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (signupData: SignupRequest) => {
      const response = await axiosInstance.post(API_ENDPOINTS.USER.SIGNUP, signupData);
      return response.data;
    }
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData: LoginRequest) => {
      const response = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, loginData, {
        withCredentials: true
      });
      return response.data;
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      // 토큰 관리자 정리
      cleanupTokenManager();
    }
  });
};
