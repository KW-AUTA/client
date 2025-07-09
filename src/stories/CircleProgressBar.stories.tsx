import CircleProgressBar from '@/components/ui/progressBar/CircleProgressBar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/CircleProgressBar',
  component: CircleProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '원형 진행률 표시 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 값 (0-100)'
    },
    label: {
      control: 'text',
      description: '진행률 바 하단에 표시될 라벨'
    },
    color: {
      control: 'color',
      description: '진행률 바 색상'
    },
    size: {
      control: 'number',
      description: '진행률 바 크기'
    },
    thickness: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: '진행률 바 두께'
    },
    className: {
      control: 'text',
      description: '커스텀 CSS 클래스'
    }
  }
} satisfies Meta<typeof CircleProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    value: 6,
    label: 'TOTAL',
    color: '#f02424',
    size: 500
  }
};
