import { ROUTES } from '@/constants';
import { setActiveProjectId } from '@/store/redux/reducers/project';
import { RootState } from '@/store/redux/store';
import { ProjectStatusType } from '@/types/project.type';
import { CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotStartedStatus = () => (
  <div className="bg-white border border-[#DDDDDD] rounded-[30px] max-w-56 w-full px-6 py-3">
    <span className="text-16 font-medium cursor-default">실행 중인 프로젝트 없음</span>
  </div>
);

const InProgressStatus = () => (
  <div className="border border-[#A8C2FF] rounded-[30px] max-w-56 w-full px-6 py-3 bg-gradient-to-r from-transparent to-[#A8C2FF]">
    <div className="flex items-center gap-3">
      <CircularProgress size={24} thickness={4} sx={{ color: '#A8C2FF' }} />
      <span className="text-16 font-medium cursor-default">테스트 실행 중...</span>
    </div>
  </div>
);

const ConnectionErrorStatus = ({ onRetry }: { onRetry: () => void }) => (
  <div className="bg-yellow-100 border border-yellow-400 rounded-[30px] max-w-56 w-full px-4 py-3">
    <div className="flex flex-col items-center gap-2">
      <span className="text-14 font-medium text-yellow-800">연결 실패</span>
      <button onClick={onRetry} className="text-12 underline text-yellow-600 hover:text-yellow-800">
        다시 시도
      </button>
    </div>
  </div>
);

const ConnectingStatus = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-[30px] max-w-56 w-full px-6 py-3">
    <div className="flex items-center gap-3">
      <CircularProgress size={20} thickness={4} sx={{ color: '#3B82F6' }} />
      <span className="text-14 font-medium text-blue-600">상태 연결 중...</span>
    </div>
  </div>
);

const CompletedStatus = ({ onAction, resetStatus }: { onAction: () => void; resetStatus: () => void }) => (
  <div className="border border-[#7DD87F] rounded-[30px] max-w-56 w-full px-4 py-2 bg-gradient-to-r from-transparent to-[#AEFFAF]">
    <div className="flex items-center gap-3">
      <div className="border-4 border-[#AEFFB0] rounded-full p-2 flex items-center justify-center bg-white w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
          <path
            d="M5.99999 10.2817L2.52999 6.81169C2.34302 6.62471 2.08942 6.51967 1.82499 6.51967C1.56057 6.51967 1.30697 6.62471 1.11999 6.81169C0.933015 6.99866 0.827972 7.25226 0.827972 7.51669C0.827972 7.64762 0.853761 7.77727 0.903866 7.89823C0.953971 8.01919 1.02741 8.12911 1.11999 8.22169L5.29999 12.4017C5.68999 12.7917 6.31999 12.7917 6.70999 12.4017L17.29 1.82169C17.477 1.63471 17.582 1.38111 17.582 1.11669C17.582 0.852261 17.477 0.598665 17.29 0.411688C17.103 0.22471 16.8494 0.119667 16.585 0.119667C16.3206 0.119667 16.067 0.22471 15.88 0.411688L5.99999 10.2817Z"
            fill="black"
          />
        </svg>
      </div>
      <div>
        <span className="text-16 font-medium cursor-default">테스트 완료</span>
        {onAction && (
          <button
            onClick={() => {
              onAction();
              resetStatus();
            }}
            className="ml-2 text-[10px] underline text-[#8c8c8c] hover:text-[#696969]">
            바로가기
          </button>
        )}
      </div>
    </div>
  </div>
);

const ErrorStatus = ({ onAction, resetStatus }: { onAction: () => void; resetStatus: () => void }) => (
  <div className="border border-[#E8706F] rounded-[30px] max-w-56 w-full px-5 py-2 bg-gradient-to-r from-transparent to-[#FF9998]">
    <div className="flex items-center gap-3">
      <div className="border-4 border-[#FF9C9B] rounded-full p-2 flex items-center justify-center bg-white w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1.758 12.3547L7.001 7.11169L12.244 12.3547M12.244 1.86869L7 7.11169L1.758 1.86869"
            stroke="#EE0000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-16 font-medium cursor-default">테스트 실패</span>
        {onAction && (
          <button
            onClick={() => {
              onAction();
              resetStatus();
            }}
            className="ml-2 text-[10px] underline text-[#8c8c8c] hover:text-[#696969]">
            바로가기
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function ProjectStatusIndicator() {
  // ✅ Redux 상태 접근 경로 (store 설정에 맞춤)
  const activeProjectId = useSelector((state: RootState) => state.searchReducer.activeProjectId);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 시 sessionStorage에서 실행 중인 테스트 복구
  useEffect(() => {
    const savedActiveProjectId = sessionStorage.getItem('activeProjectId');
    if (savedActiveProjectId && !activeProjectId) {
      dispatch(setActiveProjectId(savedActiveProjectId));
    }
  }, [activeProjectId, dispatch]);

  const [message, setMessage] = useState<ProjectStatusType | null>(null);
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>(
    'disconnected'
  );
  const [finalStatus, setFinalStatus] = useState<ProjectStatusType | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const navigate = useNavigate();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_RETRY_COUNT = 3;
  const RETRY_DELAY = 2000; // 2초

  const closeConnection = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setConnectionState('disconnected');
  }, []);

  const connectSSE = useCallback(() => {
    if (!activeProjectId || finalStatus) return;

    // 기존 연결이 있다면 닫기
    closeConnection();

    setConnectionState('connecting');

    try {
      const eventSource = new EventSource(
        `http://219.255.242.174:8080/api/v1/projects/${activeProjectId}/status/stream`,
        {
          withCredentials: false // CORS 이슈가 있다면 false로 설정
        }
      );

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        setConnectionState('connected');
        setRetryCount(0); // 성공 시 재시도 카운트 리셋
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('SSE 메시지 수신:', data);

          setMessage(data.event);

          // 최종 상태 처리
          if (data.event === 'COMPLETED' || data.event === 'ERROR') {
            setFinalStatus(data.event);
            closeConnection();
            // 전역 상태 초기화는 사용자가 상태를 확인한 후에 하는 것이 좋음
            // dispatch(setActiveProjectId(null));
          }
        } catch (error) {
          console.error('SSE 메시지 파싱 오류:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE 오류:', error);
        setConnectionState('error');
        closeConnection();

        // 재연결 시도
        if (retryCount < MAX_RETRY_COUNT) {
          console.log(`SSE 재연결 시도 ${retryCount + 1}/${MAX_RETRY_COUNT}`);
          reconnectTimeoutRef.current = setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            connectSSE();
          }, RETRY_DELAY);
        }
      };
    } catch (error) {
      console.error('SSE 연결 생성 실패:', error);
      setConnectionState('error');
    }
  }, [activeProjectId, finalStatus, closeConnection, retryCount]);

  // activeProjectId 변경 시 SSE 연결
  useEffect(() => {
    if (!activeProjectId || finalStatus) {
      closeConnection();
      if (!finalStatus) {
        setMessage(null);
        setRetryCount(0);
      }
      return;
    }

    // activeProjectId가 설정되면 sessionStorage에 저장
    sessionStorage.setItem('activeProjectId', activeProjectId);
    connectSSE();

    return () => {
      closeConnection();
    };
  }, [activeProjectId, finalStatus, connectSSE, closeConnection]);

  const onAction = useCallback(() => {
    if (!message || !activeProjectId) return;

    if (message === 'COMPLETED') {
      navigate(ROUTES.TEST_DETAIL.replace(':projectId', activeProjectId));
    }
    if (message === 'ERROR') {
      navigate(ROUTES.PROJECTS.replace(':projectId', activeProjectId));
    }
  }, [message, activeProjectId, navigate]);

  const resetStatus = useCallback(() => {
    setFinalStatus(null);
    setMessage(null);
    sessionStorage.removeItem('activeProjectId'); // sessionStorage도 정리
    dispatch(setActiveProjectId(null)); // 상태 리셋 시 activeProjectId도 초기화
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    connectSSE();
  }, [connectSSE]);

  // 렌더링 로직
  if (finalStatus === 'COMPLETED') {
    return <CompletedStatus onAction={onAction} resetStatus={resetStatus} />;
  }

  if (finalStatus === 'ERROR') {
    return <ErrorStatus onAction={onAction} resetStatus={resetStatus} />;
  }

  if (!activeProjectId) {
    return <NotStartedStatus />;
  }

  // SSE 연결 상태에 따른 렌더링
  switch (connectionState) {
    case 'connecting':
      return <ConnectingStatus />;
    case 'connected':
      return <InProgressStatus />;
    case 'error':
      return <ConnectionErrorStatus onRetry={handleRetry} />;
    default:
      return <NotStartedStatus />;
  }
}
