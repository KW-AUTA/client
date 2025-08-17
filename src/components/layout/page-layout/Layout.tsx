import Footer from '@/components/layout/page-layout/Footer';
import Header from '@/components/layout/page-layout/Header';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { ROUTES } from '@/constants';
import { useAppSelector, useAppDispatch } from '@/store/redux/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { logout } from '@/store/redux/reducers/auth';
import PageLoader from '@/components/ui/loader/PageLoader';

export default function Layout() {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux 상태와 localStorage 동기화
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && isLoggedIn) {
      // 토큰이 없는데 로그인 상태라면 로그아웃 처리
      dispatch(logout());
    }
  }, [dispatch, isLoggedIn]);

  // 현재 경로
  const currentPath = location.pathname;

  // 사이드바, 헤더가 필요하지 않은 경로
  const noSidebarAndHeaderRoutes = [ROUTES.LANDING, ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.MANUAL];
  // 비로그인 사용자만 접근 가능한 경로
  const authOnlyRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
  // 로그인 사용자만 접근 가능한 경로
  const privateRoutes = [
    ROUTES.HOME,
    ROUTES.NEW_PROJECT,
    ROUTES.PROFILE,
    ROUTES.PROJECTS,
    ROUTES.SETTINGS,
    ROUTES.TESTS
  ];

  // 동적 라우트들 (TODO: 추후에 싹 다 수정)
  const privateDynamicRoutes = ['/projects/', '/tests/'];

  const isPrivateRoute =
    privateRoutes.includes(currentPath) ||
    privateDynamicRoutes.some((route) => currentPath.startsWith(route) && currentPath !== route.slice(0, -1));

  // 현재 경로가 noSidebarAndHeaderRoutes에 있는지 확인
  const shouldHideSidebarAndHeader = noSidebarAndHeaderRoutes.some((route) => currentPath.startsWith(route));

  // 로그인한 사용자가 authOnlyRoutes 접근 시도하는 경우
  if (isLoggedIn && authOnlyRoutes.includes(currentPath)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // 비로그인 사용자가 privateRoutes에 접근 시도하는 경우
  else if (!isLoggedIn && privateRoutes.includes(currentPath) && isPrivateRoute) {
    return <Navigate to={ROUTES.LANDING} replace />;
  }

  return (
    <div className={`min-h-screen bg-background min-w-[450px] ${shouldHideSidebarAndHeader ? '' : 'flex'}`}>
      {/* 데스크탑: 기존 사이드바, 모바일: 오버레이 사이드바 */}
      {!shouldHideSidebarAndHeader && (
        <>
          {/* 데스크탑 사이드바 */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          {/* 모바일 오버레이 사이드바 */}
          <div className="block lg:hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}
      <div className={`flex flex-col w-full ${shouldHideSidebarAndHeader ? '' : 'lg:ml-[280px]'}`}>
        <div className="w-full">
          {!shouldHideSidebarAndHeader && <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />}
          <main className="flex-grow py-4 pt-[90px] lg:pt-0 max-md:pt-28">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
