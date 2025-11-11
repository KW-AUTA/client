import { Link, useNavigate } from 'react-router-dom';
import smallLogo from '@/assets/logos/AUTA_small.svg';
import { ROUTES } from '@/constants';
import { useLogout } from '@/store/queries/auth/useAuthMutations';
import MenuItem from '@/components/layout/sidebar/_components/MenuItem';
import { menuItems, topMenuItem } from '@/components/layout/sidebar/_components/SidebarData';
import { useAppDispatch } from '@/store/redux/store';
import { logout } from '@/store/redux/reducers/auth';
import React from 'react';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());
        navigate(ROUTES.LANDING);
      }
    });
  };

  // 데스크탑: open, onClose 없이 고정 사이드바 렌더
  if (open === undefined && onClose === undefined) {
    return (
      <aside className="fixed left-0 top-0 max-w-[280px] w-full h-screen z-[999] bg-pointColor">
        <Link to="/" className="flex justify-center pt-8 pb-14">
          <img src={smallLogo} alt="logo" />
        </Link>
        <div className="my-4">
          <MenuItem item={topMenuItem} fontSize="text-16" />
        </div>
        <nav>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
        <div className="w-full flex justify-center py-12">
          <button
            onClick={handleLogout}
            className="border-0 border-b border-[#696969] text-[#696969] font-medium text-11">
            로그아웃
          </button>
        </div>
      </aside>
    );
  }

  // 모바일: 오버레이/슬라이드 인 사이드바 (현대적 개선)
  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] min-w-[280px] min-[450px]:min-w-[450px] bg-pointColor rounded-2xl shadow-xl z-[999] px-4 pt-24 pb-6 flex flex-col transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* 로고 */}
        <div className="w-full flex justify-center mb-6">
          <img src={smallLogo} alt="logo" className="h-10" />
        </div>
        {/* 메뉴 */}
        <nav className="flex flex-col gap-2 w-full items-start">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} onClick={onClose} />
          ))}
        </nav>
        {/* 로그아웃 버튼 */}
        <div className="w-full flex justify-center mt-auto pt-8">
          <button onClick={handleLogout} className="text-[#696969] border-b border-[#696969] font-medium text-11">
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
