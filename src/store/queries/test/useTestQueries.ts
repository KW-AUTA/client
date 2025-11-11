import { API_ENDPOINTS } from '@/constants';
import axiosInstance from '@/services/api/axios';
import { ProjectsParams } from '@/types/project.type';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// test 관련 get 요청 (무한스크롤로 변경)
export const useGetTestListInfinite = (params: Omit<ProjectsParams, 'cursor'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['tests', params],
    queryFn: async ({ pageParam = null }) => {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.TESTS.LIST, {
        params: { ...params, cursor: pageParam }
      });

      return response.data.data;
    },
    getNextPageParam: (lastPage) => {
      const tests = lastPage?.tests ?? [];
      if (tests.length === 0) return undefined;
      return tests[tests.length - 1].projectId; // 백엔드에서 요청한대로 마지막 id를 다음 cursor로 넘기기
    },
    initialPageParam: null
  });
};

export const useGetTestDetail = (projectId: number) => {
  return useQuery({
    queryKey: ['tests', projectId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PROJECTS.TESTS.DETAIL.replace(':projectId', String(projectId))
      );

      return response.data.data;
    },
    enabled: !!projectId
  });
};

export const useGetPageIssue = (pageId: number) => {
  return useQuery({
    queryKey: ['pageIssue', pageId],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.TESTS.PAGES.replace(':pageId', String(pageId)));

      return response.data.data;
    },
    enabled: !!pageId,
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 새로 fetch
    gcTime: 0 // 캐시 저장하지 않음
  });
};
