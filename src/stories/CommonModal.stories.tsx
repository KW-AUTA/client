import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import CommonModal from '@/components/modal/CommonModal';

const meta = {
  title: 'Components/CommonModal',
  component: CommonModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '모달 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 여부'
    },
    title: {
      control: 'text',
      description: '모달 제목'
    },
    children: {
      control: 'text',
      description: '모달 내용'
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트'
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트'
    },
    showCancel: {
      control: 'boolean',
      description: '취소 버튼 표시 여부'
    },
    confirmButtonClassName: {
      control: 'text',
      description: '확인 버튼 커스텀 클래스'
    },
    cancelButtonClassName: {
      control: 'text',
      description: '취소 버튼 커스텀 클래스'
    }
  },
  args: {
    onClose: fn(),
    onConfirm: fn()
  }
} satisfies Meta<typeof CommonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    isOpen: true,
    title: '기본 모달',
    children: '이것은 기본 모달입니다. 확인 또는 취소를 선택해주세요.',
    confirmText: '확인',
    cancelText: '취소',
    showCancel: true,
    confirmButtonClassName: 'text-black'
  },
  parameters: {
    docs: {
      story: {
        inline: false, // iframe에서 렌더링
        iframeHeight: 500
      }
    }
  }
};

// 확인 전용 모달
export const ConfirmOnly: Story = {
  args: {
    isOpen: true,
    title: '알림',
    children: '작업이 완료되었습니다!',
    confirmText: '확인',
    showCancel: false
  }
};

// 로딩 모달
export const Loading: Story = {
  args: {
    isOpen: true,
    title: '처리중...',
    children: '잠시만 기다려주세요.',
    showCancel: false
  },
  render: (args) => (
    <CommonModal {...args} onConfirm={undefined}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p>{args.children}</p>
      </div>
    </CommonModal>
  )
};
