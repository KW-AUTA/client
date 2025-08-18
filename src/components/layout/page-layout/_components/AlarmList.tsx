import { Link } from 'react-router-dom';
import { Menu, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatDateTime } from '@/utils/format';
import StatusBadge from '@/pages/project/_components/StatusBadge';
import { SSEMessage } from '@/components/layout/page-layout/_hooks/useSSE';

interface AlarmListProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: SSEMessage[];
  notificationRead: (projectId: number, modifiedDateTime: string) => void;
  notificationAllRead: () => void;
}

const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    minWidth: 320,
    maxWidth: 400,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    border: '1px solid #f0f0f0'
  }
}));

const AlarmItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isRead'
})<{ isRead?: boolean }>(({ isRead }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid #f5f5f5',
  textDecoration: 'none',
  color: 'inherit',
  transition: '0.3s',
  backgroundColor: isRead ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
  border: '1px solid transparent',
  borderRadius: '12px',
  margin: '5px',
  '&:hover': {
    backgroundColor: isRead ? '#f8f9fa' : 'rgba(25, 118, 210, 0.12)',
    border: '1px solid #d9d9d9'
  },
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const AlarmHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px 12px',
  borderBottom: '1px solid #f0f0f0'
}));

export default function AlarmList({
  open,
  anchorEl,
  onClose,
  notifications,
  notificationRead,
  notificationAllRead
}: AlarmListProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationAllReadClick = () => {
    notificationAllRead();
  };

  return (
    <StyledMenu
      id="alarm-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      autoFocus={false}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      slotProps={{
        paper: {
          style: {
            marginTop: 8,
            maxHeight: 500
          }
        }
      }}>
      <AlarmHeader>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
          알림 ({notifications.length})
          {unreadCount > 0 && (
            <Typography
              component="span"
              sx={{
                ml: 1,
                fontSize: '12px',
                color: 'primary.main',
                fontWeight: 500
              }}>
              {unreadCount}개 읽지 않음
            </Typography>
          )}
        </Typography>
        {unreadCount > 0 && (
          <Button
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={handleNotificationAllReadClick}
            sx={{
              fontSize: '12px',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }
            }}>
            모두 읽음
          </Button>
        )}
      </AlarmHeader>
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.map((notification) => (
          <AlarmItem
            key={`${notification.projectId}-${notification.modifiedDateTime}`}
            to={`/projects/${notification.projectId}`}
            isRead={notification.isRead}
            onClick={() => {
              if (!notification.isRead) {
                notificationRead(notification.projectId, notification.modifiedDateTime);
              }
              onClose();
            }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
                  lineHeight: 1.4,
                  color: notification.isRead ? 'text.secondary' : '#000000',
                  fontWeight: notification.isRead ? 400 : 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                {notification.projectName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '11px',
                  color: 'text.secondary',
                  display: 'block',
                  mt: 0.5
                }}>
                {formatDateTime(notification.modifiedDateTime)}
              </Typography>
            </Box>
            <StatusBadge status={notification.projectStatus} />
          </AlarmItem>
        ))}
      </Box>
      {notifications.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            새로운 알림이 없습니다.
          </Typography>
        </Box>
      )}
    </StyledMenu>
  );
}
