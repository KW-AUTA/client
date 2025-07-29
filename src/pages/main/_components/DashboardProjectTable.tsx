import React from 'react';
import TableItem from '@/components/ui/table/CustomTable';
import StatusBadge from '@/pages/project/_components/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { ProjectStatusType } from '@/types/project.type';

interface DashboardProject {
  projectId: number;
  projectName: string;
  administrator: string;
  projectEnd: string;
  projectStatus: ProjectStatusType;
}

const columns = [
  { id: 'projectName', label: '프로젝트 명' },
  { id: 'administrator', label: '프로젝트 관리자' },
  { id: 'projectEnd', label: '마감일' },
  { id: 'projectStatus', label: '진행 상태' }
];

interface DashboardProjectTableProps {
  projects: Array<{
    projectId: number;
    projectName: string;
    administrator: string;
    projectEnd: string;
    projectStatus: string;
  }>;
}

const DashboardProjectTable: React.FC<DashboardProjectTableProps> = ({ projects }) => {
  const navigate = useNavigate();
  const handleDashboardProjectItem = (item: DashboardProject) => {
    navigate(ROUTES.PROJECT_DETAIL.replace(':projectId', item.projectId.toString()));
  };
  return (
    <TableItem<DashboardProject>
      columns={columns}
      items={projects.map((project) => ({
        ...project,
        projectStatus: project.projectStatus as ProjectStatusType
      }))}
      onItemClick={handleDashboardProjectItem}
      renderCell={(column, item) => {
        if (column.id === 'projectStatus') {
          return <StatusBadge status={item.projectStatus} />;
        }
        return item[column.id as keyof DashboardProject] ?? '-';
      }}
    />
  );
};

export default DashboardProjectTable;
