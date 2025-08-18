import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useUserProfile } from '@/store/queries/user/useUserQueries';
import HamburgerMenu from '@/components/layout/page-layout/_components/HamburgerMenu';
import ProfileButton from '@/components/layout/page-layout/_components/ProfileButton';
import ProjectSearchBar from '@/components/layout/page-layout/_components/ProjectSearchBar';
import AlertIcon from '@/assets/icons/alert-icon.svg';
import AlarmList from '@/components/layout/page-layout/_components/AlarmList';
import { useNotifications } from '@/components/layout/page-layout/_hooks/useNotifications';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: profile } = useUserProfile();
  const alertIconRef = useRef<HTMLImageElement>(null);
  const [isOpenAlertMenu, setIsOpenAlertMenu] = useState(false);

  const { notifications, unreadCount, isConnected, notificationRead, notificationAllRead } = useNotifications();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[95vw] max-w-2xl bg-background/90 backdrop-blur-md flex items-center justify-between px-4 py-2 rounded-full shadow-lg transition-all md:static md:top-0 md:left-0 md:translate-x-0 md:w-full md:max-w-full md:rounded-none md:shadow-none md:px-8 md:py-6">
      {onMenuClick && <HamburgerMenu onMenuClick={onMenuClick} />}
      <ProjectSearchBar />
      <div className="flex items-center gap-2 mr-8 lg:gap-4 min-w-0">
        <div className="relative">
          <img
            src={AlertIcon}
            ref={alertIconRef}
            alt="alert-icon"
            className="cursor-pointer"
            onClick={() => setIsOpenAlertMenu((prev) => !prev)}
          />
          {isConnected ? (
            unreadCount > 0 ? (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
              </div>
            ) : null
          ) : (
            <div className="absolute -top-3 -right-2">
              <ClipLoader color="#a09d9d" size={15} speedMultiplier={0.9} />
            </div>
          )}
          <AlarmList
            open={isOpenAlertMenu}
            anchorEl={alertIconRef.current}
            onClose={() => setIsOpenAlertMenu(false)}
            notifications={notifications}
            notificationRead={notificationRead}
            notificationAllRead={notificationAllRead}
          />
        </div>
        <ProfileButton profileName={profile?.username} />
      </div>
    </header>
  );
}
