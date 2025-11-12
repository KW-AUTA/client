import profileImg from '@/assets/images/짱구.jpg';
import { User } from '@/types/user.type';
import ProfileForm from '@/pages/setting/_components/ProfileForm';
import { useUserProfile } from '@/store/queries/user/useUserQueries';
import { useUpdateProfile } from '@/store/queries/user/useUserMutations';
import SettingCard from '@/pages/setting/_components/SettingCard';
import SettingTitle from '@/pages/setting/_components/SettingTitle';

export default function ProfileEditPage() {
  const { data: profile, isPending, isError } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const handleUpdateProfile = (formData: User) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: (response) => {
        // TODO: alert나 toast로 변경
        alert(response.message);
      },
      onError: () => {
        alert('입력하신 내용 중 형식에 맞지 않는 항목이 있습니다.');
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="inline-block bg-white/80 backdrop-blur-lg ring-1 ring-white/40 rounded-2xl px-8 py-4 text-neutral-600 shadow-md">
          프로필 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="inline-block bg-red-50/80 backdrop-blur-lg ring-1 ring-red-200/50 rounded-2xl px-8 py-4 text-red-600 shadow-md">
          프로필 정보를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] space-y-24 mx-auto">
      <section className="flex flex-col gap-8">
        <SettingTitle />
        <SettingCard title="Edit Profile Info" isClickable={false} />
      </section>
      <section className="flex w-full gap-10 max-sm:flex-col">
        <div className="flex flex-col items-center gap-6">
          <div className="w-72 h-72 rounded-full overflow-hidden ring-4 ring-white/40 shadow-lg">
            <img src={profileImg} alt="profileImg" className="w-full h-full object-cover" />
          </div>
          <p className="font-bm text-32 text-neutral-800">{profile.username}</p>
          <p className="font-medium text-14 text-neutral-600">Test Automation Developer</p>
        </div>
        <ProfileForm initialData={profile} onSubmit={handleUpdateProfile} />
      </section>
    </div>
  );
}
