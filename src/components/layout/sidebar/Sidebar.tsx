import { Link, useNavigate } from 'react-router-dom';
import autaNewLogo from '@/assets/logos/auta-new-small.png';
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

  // 사이드바 배경: 반투명 초록 + 글래스
  const sidebarStyles = 'bg-[#5CA585]/15 backdrop-blur-2xl ring-1 ring-white/30 shadow-xl';

  // 데스크탑: 고정 사이드바
  if (open === undefined && onClose === undefined) {
    return (
      <aside className={`fixed left-0 top-0 max-w-[350px] w-full h-screen z-[999] ${sidebarStyles}`}>
        <Link to="/" className="flex justify-center pt-8 pb-14">
          <img src={autaNewLogo} alt="logo" />
        </Link>

        <div className="my-4 px-4">
          <MenuItem item={topMenuItem} fontSize="text-16" />
        </div>

        <nav className="px-4">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>

        <div className="w-full flex justify-center py-12">
          <button
            onClick={handleLogout}
            className="border-0 border-b border-neutral-400 text-neutral-700 hover:text-[#5CA585] hover:border-[#5CA585] font-medium text-11 transition-colors duration-300">
            로그아웃
          </button>
        </div>
      </aside>
    );
  }

  // 모바일: 오버레이/슬라이드 인 사이드바
  return (
    <>
      <div
        className={`fixed inset-0 bg-[#5CA585]/15 backdrop-blur-sm z-[998] transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] min-w-[280px] min-[450px]:min-w-[450px] ${sidebarStyles} rounded-r-2xl z-[999] px-6 pt-24 pb-6 flex flex-col transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="w-full flex justify-center mb-8">
          <img src={autaNewLogo} alt="logo" className="h-20" />
        </div>

        <nav className="flex flex-col gap-2 w-full items-start">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} onClick={onClose} />
          ))}
        </nav>

        <div className="w-full flex justify-center mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="text-neutral-700 hover:text-[#5CA585] border-b border-neutral-400 hover:border-[#5CA585] font-medium text-11 transition-colors duration-300">
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
