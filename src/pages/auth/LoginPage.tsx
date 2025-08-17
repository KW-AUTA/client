import { useNavigate } from 'react-router-dom';
import { LoginRequest } from '@/types/auth.type';
import AuthForm from '@/pages/auth/_components/AuthForm';
import { useLogin } from '@/store/queries/auth/useAuthMutations';
import { ROUTES } from '@/constants';
import { useAppDispatch } from '@/store/redux/store';
import { setToken } from '@/store/redux/reducers/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();

  const handleLogin = (data: LoginRequest) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        // 토큰은 redux 상태에 저장
        if (response.data && response.data.accessToken) {
          dispatch(setToken(response.data.accessToken));
        }

        navigate(ROUTES.HOME);
      },
      onError: (error) => {
        console.error('로그인 실패', error);
        alert(error.message);
      }
    });
  };
  return (
    <>
      <AuthForm type="login" onSubmit={handleLogin} />
    </>
  );
}
