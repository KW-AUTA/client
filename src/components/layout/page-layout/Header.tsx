import { useUserProfile } from '@/store/queries/user/useUserQueries';
import HamburgerMenu from '@/components/layout/page-layout/_components/HamburgerMenu';
import ProfileButton from '@/components/layout/page-layout/_components/ProfileButton';
import ProjectSearchBar from '@/components/layout/page-layout/_components/ProjectSearchBar';
import ProjectStatusIndicator from '@/components/layout/page-layout/_components/ProjectStatusIndicator';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: profile } = useUserProfile();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[95vw] max-w-2xl bg-background/90 backdrop-blur-md flex items-center justify-between px-4 py-2 rounded-full shadow-lg transition-all md:static md:top-0 md:left-0 md:translate-x-0 md:w-full md:max-w-full md:rounded-none md:shadow-none md:px-8 md:py-6">
      {/* 모바일 햄버거 메뉴 */}
      {onMenuClick && <HamburgerMenu onMenuClick={onMenuClick} />}
      <ProjectSearchBar />
      <div className="flex items-center gap-2 mr-8 lg:gap-4 min-w-0">
        {/* 프로젝트 상태 */}
        <ProjectStatusIndicator />
        {/* 프로필 버튼 */}
        <ProfileButton profileName={profile?.username} />
      </div>
    </header>
  );
}
