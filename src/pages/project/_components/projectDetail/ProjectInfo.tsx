import ProjectInfoItem from '@/pages/project/_components/projectDetail/ProjectInfoItem';

interface ProjectBasicInfoProps {
  projectName: string;
  projectCreatedDate: string;
  projectEnd: string;
  projectAdmin: string;
  description: string;
  testExecutionTime: string;
}
export default function ProjectInfo({
  projectName,
  projectCreatedDate,
  projectEnd,
  projectAdmin,
  description,
  testExecutionTime
}: ProjectBasicInfoProps) {
  return (
    <section>
      <h2 className="font-bold text-[24px] pb-4">{projectName}</h2>
      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <ProjectInfoItem label="프로젝트 관리자" value={projectAdmin} />
          <ProjectInfoItem label="프로젝트 생성일" value={projectCreatedDate} />
          <ProjectInfoItem label="프로젝트 마감일" value={projectEnd} />
          <ProjectInfoItem
            label="테스트 실행일시"
            value={testExecutionTime === null ? '진행 중인 테스트가 없습니다' : testExecutionTime}
          />
        </div>
        <div>
          <ProjectInfoItem label="설명" value={description} />
        </div>
      </div>
    </section>
  );
}
