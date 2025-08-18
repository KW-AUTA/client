import { SSEMessage, useSSE } from '@/components/layout/page-layout/_hooks/useSSE';
import { RootState } from '@/store/redux/store';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const NOTIFICATIONS_STORAGE_KEY = 'sse-notifications';
const MAX_NOTIFICATIONS = 20;

export const useNotifications = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://219.255.242.174:8080/api/v1/';

  // ------------------------------ localStorage에서 알림 불러오기 ------------------------------
  const getNotifications = () => {
    try {
      const savedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return savedNotifications ? JSON.parse(savedNotifications) : [];
    } catch {
      return [];
    }
  };

  const [notifications, setNotifications] = useState<SSEMessage[]>(getNotifications);

  // ------------------------------ localStorage에 알림 저장 ------------------------------
  const saveNotifications = (list: SSEMessage[]) => {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('알림 저장 실패:', error);
    }
  };

  // ------------------------------ SSE 메시지 처리 ------------------------------
  const handleNewMessage = useCallback((data: SSEMessage[]) => {
    if (!data?.length) return;

    // 알림에는 완료/에러만 보여줄 것이므로 COMPLETED/ERROR projectStatus만 필터링
    const completedProjects = data.filter((p) => p.projectStatus === 'COMPLETED' || p.projectStatus === 'ERROR');
    if (!completedProjects.length) return;

    setNotifications((current) => {
      const savedNotifications = getNotifications();

      // localStorage가 비어있으면 토스트 안 띄우고 알림 리스트에만 추가되게
      if (savedNotifications.length === 0) {
        const initialNotifications = completedProjects
          .map((p) => ({ ...p, isRead: false }))
          .sort((a, b) => new Date(b.modifiedDateTime).getTime() - new Date(a.modifiedDateTime).getTime());

        saveNotifications(initialNotifications);
        return initialNotifications;
      }

      // 새로 업뎃된 전체 배열(단, 완료/에러만)에서 새로운 알림만 찾기 (projectId로 찾은 후 projectStatus나 modifiedDateTime이 변경된 걸 확인)
      const newOnes = completedProjects.filter((project) => {
        const existing = savedNotifications.find((item: SSEMessage) => item.projectId === project.projectId);
        return (
          !existing ||
          existing.projectStatus !== project.projectStatus ||
          existing.modifiedDateTime !== project.modifiedDateTime
        );
      });

      if (!newOnes.length) return current;

      // 새로운 알림만 toast 표시 (전체 배열이 응답으로 넘어와서 구분해줘야 함)
      newOnes.forEach((project) => {
        const isCompleted = project.projectStatus === 'COMPLETED';
        const message = `${project.projectName} 프로젝트가 ${isCompleted ? '완료' : '오류 발생'}되었습니다.`;

        if (isCompleted) {
          toast.success(message, { autoClose: 2000 });
        } else {
          toast.error(message, { autoClose: 1000 });
        }
      });

      // 새 알림 배열에 추가, 삭제 기능은 없으므로 20개까지만 로컬스토리지에 저장되게 slice, 최신순 내림차순으로 정렬
      const newNotifications = newOnes.map((item) => ({ ...item, isRead: false }));
      const updated = [...newNotifications, ...current]
        .slice(0, MAX_NOTIFICATIONS)
        .sort((a, b) => new Date(b.modifiedDateTime).getTime() - new Date(a.modifiedDateTime).getTime());

      saveNotifications(updated);
      return updated;
    });
  }, []);

  // ------------------------------ 개별 알림 읽음 ------------------------------
  const notificationRead = useCallback((projectId: number, modifiedDateTime: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.projectId === projectId && notification.modifiedDateTime === modifiedDateTime
          ? { ...notification, isRead: true }
          : notification
      );
      saveNotifications(updated);
      return updated;
    });
  }, []);

  // ------------------------------ 한꺼번에 알림 읽음 ------------------------------
  const notificationAllRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((notification) => ({ ...notification, isRead: true }));
      saveNotifications(updated);
      return updated;
    });
  }, []);

  // ------------------------------ SSE 연결 ------------------------------
  const { isConnected } = useSSE({
    url: `${baseUrl}projects/status/stream`,
    token,
    enabled: isLoggedIn,
    onMessage: handleNewMessage
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    notificationRead,
    notificationAllRead
  };
};
