import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/constants';
import axiosInstance from '@/services/api/axios';
import { ProjectsParams } from '@/types/project.type';

export const useGetProjectList = (params: ProjectsParams = {}, options = {}) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.LIST, {
        params: {
          projectName: params.projectName,
          sortBy: params.sortBy
        }
      });

      return response.data.data.projectSummaries ?? [];
    },
    ...options
  });
};

export const useGetProjectDetail = (projectId: number) => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.DETAIL.replace(':projectId', String(projectId)));

      return response.data.data;
    },
    enabled: !!projectId,
    refetchInterval: 10000
  });
};
