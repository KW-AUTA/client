import LinearProgressBar2 from '@/components/ui/progressBar/LinearProgressBar2';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/LinearProgressBar2',
  component: LinearProgressBar2,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '선형 진행률 컴포넌트2입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 값 (0-100%)'
    },
    label: {
      control: 'text',
      description: '진행률 바 상단에 표시될 라벨'
    },
    color: {
      control: 'color',
      description: '진행률 바 색상'
    },
    className: {
      control: 'text',
      description: '커스텀 CSS 클래스'
    }
  }
} satisfies Meta<typeof LinearProgressBar2>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    value: 80,
    label: '기본'
  },
  render: (args) => (
    <div className="space-y-6 w-96">
      <LinearProgressBar2 {...args} />
    </div>
  )
};

export const WithoutLabel: Story = {
  args: {
    value: 75,
    label: '',
    color: '#8B5CF6'
  },
  render: (args) => (
    <div className="w-96">
      <LinearProgressBar2 {...args} />
      <p className="text-sm text-gray-600 mt-2 text-center">라벨이 없는 진행률 바입니다</p>
    </div>
  )
};
