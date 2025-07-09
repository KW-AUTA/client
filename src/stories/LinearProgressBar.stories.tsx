import LinearProgressBar from '@/components/ui/progressBar/LinearProgressBar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/LinearProgressBar',
  component: LinearProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '선형 진행률 표시 컴포넌트1입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    success: {
      control: 'number',
      description: '성공한 개수'
    },
    total: {
      control: 'number',
      description: '전체 개수'
    },
    color: {
      control: 'text',
      description: '진행률 바 색상'
    },
    className: {
      control: 'text',
      description: '커스텀 CSS 클래스'
    }
  }
} satisfies Meta<typeof LinearProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    success: 7,
    total: 10,
    color: 'bg-green-600'
  },
  render: (args) => {
    // value를 자동 계산 (현재 컴포넌트 단에서 로직 관리를 하지 않아 stories에서 value까지 조절하게 되면 계산이 안되기 대문)
    const success = args.success ?? 0;
    const total = args.total ?? 1;
    const calculatedValue = total > 0 ? Math.round((success / total) * 100) : 0;
    return (
      <div className="w-96">
        <h3 className="text-lg font-semibold mb-4">작업 완료 상태</h3>
        <LinearProgressBar {...args} value={calculatedValue} />
        <p className="text-sm text-gray-600 mt-2">
          전체 {args.total}개 작업 중 {args.success}개 완료 ({calculatedValue}%)
        </p>
      </div>
    );
  }
};
