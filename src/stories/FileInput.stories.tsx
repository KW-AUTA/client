import FileInput from '@/components/ui/input/FileInput';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'JSON 파일 업로드를 위한 FileInput 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 라벨'
    },
    name: {
      control: 'text',
      description: '입력 필드 name 속성'
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부'
    },
    className: {
      control: 'text',
      description: '파일 입력 박스 커스텀 CSS 클래스'
    },
    labelClassName: {
      control: 'text',
      description: '라벨 커스텀 CSS 클래스'
    },
    disableLabelClick: {
      control: 'boolean',
      description: '라벨 클릭으로 파일 선택 비활성화'
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화'
    },
    fileName: {
      control: 'text',
      description: '초기 파일명 (미리 선택된 파일명 표시)'
    },
    labelButton: {
      control: false,
      description: '라벨 옆에 표시할 버튼이나 요소'
    }
  },
  args: {
    onChange: fn(),
    name: 'file-upload'
  }
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    label: '파일 업로드'
  }
};

// 초기 파일명이 있는 경우
export const WithInitialFile: Story = {
  args: {
    label: '파일 업로드',
    fileName: 'request_1.json',
    required: true
  }
};

// 에러 상태 시뮬레이션용 (실제로는 잘못된 파일을 업로드해야 에러가 나타남)
export const ErrorSimulation: Story = {
  args: {
    label: '파일 업로드 (JSON 파일만 허용)',
    name: 'error-demo'
  },
  render: (args) => (
    <div>
      <FileInput {...args} />
      <p className="text-red-500 text-sm mt-1 ml-2">*.json 파일만 업로드 가능합니다.</p>
    </div>
  )
};
