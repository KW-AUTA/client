import PageLoader from '@/components/ui/loader/PageLoader';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BeatLoader, ClipLoader, PulseLoader } from 'react-spinners';

const meta = {
  title: 'Components/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페이지 로딩 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {};

export const CustomColor: Story = {
  render: () => (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#3B82F6" />
    </div>
  )
};

export const SmallSize: Story = {
  render: () => (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#B3C7AA" size={8} />
    </div>
  )
};

export const LargeSize: Story = {
  render: () => (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#B3C7AA" size={20} />
    </div>
  )
};

export const WithDarkBackground: Story = {
  render: () => (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <BeatLoader color="#B3C7AA" />
    </div>
  )
};

// 다른 react-spinners 로더들과 비교
export const DifferentSpinners: Story = {
  render: () => (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-center">
        <p className="mb-4 text-gray-600">BeatLoader (현재 사용중)</p>
        <BeatLoader color="#B3C7AA" />
      </div>
      <div className="text-center">
        <p className="mb-4 text-gray-600">다른 로더 옵션들</p>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="mb-2 text-sm">ClipLoader</p>
            <ClipLoader />
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm">PulseLoader</p>
            <PulseLoader />
          </div>
        </div>
      </div>
    </div>
  )
};
