import profileImg from '@/assets/images/짱구.jpg';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

interface ProfileButtonProps {
  profileName: string;
}
export default function ProfileButton({ profileName }: ProfileButtonProps) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="flex items-center min-w-0 max-w-[120px] lg:max-w-44 gap-2 rounded-full px-3 py-1 bg-white shadow lg:shadow-none overflow-hidden"
        onClick={() => navigate(ROUTES.PROFILE)}>
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img src={profileImg} alt="profile img" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center items-start min-w-0">
          <p className="font-bm text-xs lg:text-sm truncate max-w-[60px] lg:max-w-[100px]">{profileName}</p>
          <p className="font-medium text-[10px] lg:text-7 text-typography-gray truncate max-w-[60px] lg:max-w-[100px]">
            Test Automation Developer
          </p>
        </div>
      </button>
    </div>
  );
}
