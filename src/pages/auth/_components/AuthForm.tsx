import autaNewLogo from '@/assets/logos/auta-newlogo.svg';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { ROUTES } from '@/constants';
import { LoginRequest, SignupRequest } from '@/types/auth.type';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: LoginRequest | SignupRequest) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmitAuthForm = (e: React.FormEvent) => {
    e.preventDefault();

    // 앞뒤 공백 제거
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();

    if (type === 'login') {
      if (!trimmedEmail || !trimmedPassword) {
        // TODO: alert 변경 필요
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
      }
      onSubmit({ email: trimmedEmail, password: trimmedPassword });
    } else {
      if (!trimmedEmail || !trimmedPassword || !trimmedUsername) {
        // TODO: alert 변경 필요
        alert('이메일, 비밀번호, 이름을 모두 입력해주세요.');
        return;
      }
      onSubmit({ email: trimmedEmail, password: trimmedPassword, username: trimmedUsername });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 max-xl2:px-8 max-xl2:py-0">
      <div className="flex flex-col items-center">
        <Link
          to={ROUTES.LANDING}
          className="block overflow-hidden mb-8 mx-auto mt-8"
          style={{ height: '140px', width: '420px', maxWidth: '90vw' }}>
          <img
            src={autaNewLogo}
            alt="AUTA logo"
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'scale(1.6)'
            }}
          />
        </Link>
        <form onSubmit={handleSubmitAuthForm} className="flex flex-col gap-8 max-w-[446px] w-full">
          <Input label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {type === 'signup' && (
            <Input label="이름" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          )}

          <Button
            text={type === 'login' ? '로그인' : '회원가입'}
            type="submit"
            className="w-[90px] mx-auto font-medium text-11 my-7"
          />
        </form>

        <div className="flex justify-center font-medium text-11 text-typography-dark">
          {type === 'login' ? (
            <div className="flex gap-3">
              <Link to={ROUTES.SIGNUP}>회원가입</Link>
              <span className="text-typography-gray">|</span>
              <Link to="#">PW 찾기</Link>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN} className="">
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
