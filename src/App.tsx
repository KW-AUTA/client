import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/redux/store';
import './styles/index.css';
import routes from '@/routes';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import ErrorModal from '@/components/modal/ErrorModal';
import axios from 'axios';
import { isJwtExpired } from '@/utils/validation';
import { ROUTES, API_ENDPOINTS } from '@/constants';
import { RefreshTokenResponse } from '@/types/auth.type';
import TestTokenButton from '@/components/ui/TestTokenButton';

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

function AppWithErrorModal({ children }: { children: React.ReactNode }) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // JWT 만료 체크 및 리프레시 토큰 시도
  useEffect(() => {
    const checkTokenAndRefresh = async () => {
      const token = localStorage.getItem('token');
      if (token && isJwtExpired(token)) {
        try {
          // 리프레시 토큰으로 새 액세스 토큰 발급 시도
          const response = await axios.post<RefreshTokenResponse>(
            `${import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1'}${API_ENDPOINTS.AUTH.REFRESH}`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = response.data.data?.accessToken;
          if (newAccessToken) {
            // 새 토큰 저장
            localStorage.setItem('token', newAccessToken);
            console.log('액세스 토큰이 성공적으로 갱신되었습니다.');
          } else {
            throw new Error('새 액세스 토큰을 받지 못했습니다.');
          }
        } catch (error) {
          // 리프레시 토큰도 만료되었거나 유효하지 않은 경우
          console.log('리프레시 토큰 만료 또는 유효하지 않음:', error);
          setErrorMessage('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          setShowErrorModal(true);
          localStorage.removeItem('token');
        }
      }
    };

    checkTokenAndRefresh();
  }, []);

  // 네트워크 연결 끊김 감지
  useEffect(() => {
    const handleOffline = () => {
      setErrorMessage('인터넷 연결이 끊어졌습니다.');
      setShowErrorModal(true);
    };
    window.addEventListener('offline', handleOffline);
    return () => window.removeEventListener('offline', handleOffline);
  }, []);

  // axios 요청 시간 초과 감지 (전역 인터셉터)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ECONNABORTED') {
          setErrorMessage('요청이 너무 오래 걸립니다. 잠시 후 다시 시도해 주세요.');
          setShowErrorModal(true);
        } else if (error.response) {
          // 서버에서 에러 응답이 온 경우
          if (error.response.status >= 500) {
            setErrorMessage('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            setShowErrorModal(true);
          } else if (error.response.status === 404) {
            setErrorMessage('요청하신 리소스를 찾을 수 없습니다.');
            setShowErrorModal(true);
          }
        } else if (error.message === 'Network Error') {
          setErrorMessage('네트워크 연결에 문제가 있습니다.');
          setShowErrorModal(true);
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleModalRetry = () => {
    // 만료 에러라면 로그인/랜딩페이지로 이동
    if (errorMessage.includes('로그인 세션이 만료')) {
      window.location.href = ROUTES.LANDING;
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {children}
      <TestTokenButton />
      <ErrorModal open={showErrorModal} message={errorMessage} onRetry={handleModalRetry} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default function WrappedApp() {
  return (
    <AppWithErrorModal>
      <App />
    </AppWithErrorModal>
  );
}
