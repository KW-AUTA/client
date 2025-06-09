import ProjectIcon from '@/assets/icons/dash-project.svg?react';
import TestIcon from '@/assets/icons/dash-projecting.svg?react';
import IncompleteIcon from '@/assets/icons/dash-test.svg?react';
import OverviewSection from './_components/OverviewSection';
import DashboardProjectTable from './_components/DashboardProjectTable';
import DashboardTestTable from './_components/DashboardTestTable';
import { useDashboardHome } from '@/store/queries/dashboard/useDashboardHomeQuery';

export default function DashboardPage() {
  const { data, isPending, isError } = useDashboardHome();

  if (isPending) return <div className="py-20 text-center">로딩 중...</div>;
  if (isError) return <div className="py-20 text-center text-red-500">오류가 발생했습니다.</div>;

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-0">
      <div className="w-[90%] flex flex-col m-auto">
        <OverviewSection
          overviewData={
            data
              ? [
                  {
                    icon: <ProjectIcon width={40} height={40} />,
                    title: '진행 중인 프로젝트 수',
                    value: data.totalProjects,
                    unit: '개'
                  },
                  {
                    icon: <TestIcon width={40} height={40} />,
                    title: '완료된 테스트 수',
                    value: data.completedTests,
                    unit: '개'
                  },
                  {
                    icon: <IncompleteIcon width={40} height={40} />,
                    title: '미완료된 테스트 수',
                    value: data.incompleteTests,
                    unit: '개'
                  }
                ]
              : []
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <div className="text-[22px] font-extrabold text-[#222] mb-6">프로젝트 관리</div>
            <DashboardProjectTable projects={data?.projects?.slice(0, 5) || []} />
          </section>
          <section>
            <div className="text-[22px] font-extrabold text-[#222] mb-6">테스트 관리</div>
            <DashboardTestTable tests={data?.tests?.slice(0, 5) || []} />
          </section>
        </div>
      </div>
    </div>
  );
}
