import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

export interface SSEMessage {
  projectId: number;
  projectName: string;
  projectStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  modifiedDateTime: string;
  isRead?: boolean;
}

interface UseSSEProps {
  url: string;
  token: string | null;
  enabled: boolean;
  onMessage?: (data: SSEMessage[]) => void;
}

export const useSSE = ({ url, token, enabled, onMessage }: UseSSEProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    let cancelled = false;
    let eventSource: EventSourcePolyfill;

    const connectSSE = () => {
      if (cancelled || !token) return;

      eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'text/event-stream',
          'Cache-Control': 'no-cache'
        },
        withCredentials: true
      });

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        if (cancelled) {
          eventSource.close();
          return;
        }
        setIsConnected(true);
      };

      eventSource.addEventListener('projectStatus', (event) => {
        if (cancelled) return;
        const messageEvent = event as MessageEvent;

        try {
          const data: SSEMessage[] = JSON.parse(messageEvent.data);
          onMessageRef.current?.(data);
        } catch (error) {
          console.error('SSE 파싱 에러:', error);
        }
      });

      eventSource.onerror = () => {
        if (cancelled) return;
        setIsConnected(false);
      };
    };

    if (enabled && token) {
      connectSSE();
    } else {
      setIsConnected(false);
    }

    return () => {
      cancelled = true;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [enabled, token, url]);

  return { isConnected };
};
