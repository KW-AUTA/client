import Textarea from '@/components/ui/textarea/TextArea';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '텍스트 영역 라벨'
    },
    value: {
      control: 'text',
      description: '텍스트 영역 값'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부'
    },
    disabled: {
      control: 'boolean',
      description: '텍스트 영역 비활성화'
    },
    rows: {
      control: 'number',
      description: '텍스트 영역 행 수'
    },
    className: {
      control: 'text',
      description: '텍스트 영역 커스텀 CSS 클래스'
    },
    labelClassName: {
      control: 'text',
      description: '라벨 커스텀 CSS 클래스'
    }
  },
  args: {
    onChange: fn(),
    onEnterPress: fn()
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    label: '기본 텍스트 영역',
    placeholder: '내용을 입력하세요'
  }
};

export const WithoutLabel: Story = {
  args: {
    placeholder: '라벨 없는 텍스트 영역'
  }
};

export const Required: Story = {
  args: {
    label: '의견',
    placeholder: '의견을 입력하세요',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 텍스트 영역',
    value: '수정할 수 없는 내용입니다.',
    disabled: true
  }
};

export const WithValue: Story = {
  args: {
    label: '피드백',
    value: '이것은 미리 입력된 내용입니다.\n여러 줄로 작성할 수 있습니다.',
    placeholder: '피드백을 입력하세요'
  }
};

export const SmallRows: Story = {
  args: {
    label: '짧은 텍스트 영역',
    placeholder: '간단한 메모',
    rows: 2
  }
};

export const LargeRows: Story = {
  args: {
    label: '긴 텍스트 영역',
    placeholder: '자세한 설명을 입력하세요',
    rows: 8
  }
};

export const CustomStyled: Story = {
  args: {
    label: '커스텀 스타일',
    placeholder: '커스텀 스타일 텍스트 영역',
    className: 'border-2 border-blue-300 bg-blue-50 focus:border-blue-500',
    labelClassName: 'text-blue-700 font-bold'
  }
};

export const ContactForm: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">제목</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="문의 제목을 입력하세요" />
      </div>

      <Textarea label="문의 내용" placeholder="문의 내용을 자세히 작성해주세요" rows={6} required />

      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">문의하기</button>
    </div>
  )
};

export const ErrorState: Story = {
  args: {
    label: '필수 입력 (에러 상태)',
    placeholder: '내용을 입력하세요',
    required: true,
    className: 'border-red-500 bg-red-50 focus:border-red-600'
  },
  render: (args) => (
    <div>
      <Textarea {...args} />
      <p className="text-red-500 text-sm mt-1 ml-2">이 필드는 필수입니다.</p>
    </div>
  )
};
