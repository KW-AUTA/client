import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import Layout from '@/components/layout/page-layout/Layout';
// 유저가 바로 보는 or 가벼운 페이지는 즉시 로딩
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import LandingPageV4 from '@/pages/landing/LandingPageV4';
import ProductPage from '@/pages/product/ProductPage';
import DashboardPage from '@/pages/main/DashboardPage';
import ManualPage from '@/pages/manual/ManualPage';
import ManualPrivatePage from '@/pages/manual/ManualPrivatePage';
// 무거운 페이지, 로딩 잘 걸리는, 중요도 우선순위에서 먼 페이지는 지연 로딩
const ProjectDetailPage = lazy(() => import('@/pages/project/ProjectDetailPage'));
const ProjectCreatePage = lazy(() => import('@/pages/project/ProjectCreatePage'));
const ProjectModifyPage = lazy(() => import('@/pages/project/ProjectModifyPage'));
const ProjectMangePage = lazy(() => import('@/pages/project/ProjectMangePage'));
const TestManagePage = lazy(() => import('@/pages/test/TestManagePage'));
const TestDetailPage = lazy(() => import('@/pages/test/TestDetailPage'));
const SettingPage = lazy(() => import('@/pages/setting/SettingPage'));
const ProfileEditPage = lazy(() => import('@/pages/setting/ProfileEditPage'));
const PasswordEditPage = lazy(() => import('@/pages/setting/PasswordEditPage'));

const routes = [
  { path: ROUTES.LANDING, element: <LandingPageV4 /> },
  { path: ROUTES.PRODUCT, element: <ProductPage /> },
  {
    element: <Layout />,
    children: [
      // 공개 라우트
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.MANUAL, element: <ManualPage /> },
      { path: '/main/manual', element: <ManualPrivatePage /> },

      // 비공개 라우트 (인증이 필요한 라우트)
      { path: ROUTES.HOME, element: <DashboardPage /> },
      { path: ROUTES.PROJECTS, element: <ProjectMangePage /> },
      { path: ROUTES.NEW_PROJECT, element: <ProjectCreatePage /> },
      { path: ROUTES.PROJECT_DETAIL, element: <ProjectDetailPage /> },
      { path: ROUTES.TESTS, element: <TestManagePage /> },
      { path: ROUTES.TEST_DETAIL, element: <TestDetailPage /> },
      { path: ROUTES.SETTINGS, element: <SettingPage /> },
      { path: ROUTES.PROFILE, element: <ProfileEditPage /> },
      { path: ROUTES.PASSWORD, element: <PasswordEditPage /> },
      { path: ROUTES.EDIT_PROJECT, element: <ProjectModifyPage /> },

      // 404 페이지
      { path: '*', element: <Navigate to={ROUTES.HOME} replace /> }
    ]
  }
];

export default routes;
