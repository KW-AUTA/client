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

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

function AppWithErrorModal({ children }: { children: React.ReactNode }) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <>
      {children}
      <ErrorModal open={showErrorModal} message={errorMessage} />
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
