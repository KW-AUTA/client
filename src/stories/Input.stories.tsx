import Input from '@/components/ui/input/Input';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 라벨'
    },
    value: {
      control: 'text',
      description: '입력 필드 값'
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
      description: '입력 필드 비활성화'
    },
    className: {
      control: 'text',
      description: '입력 필드 커스텀 CSS 클래스'
    },
    labelClassName: {
      control: 'text',
      description: '라벨 커스텀 CSS 클래스'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '입력 타입'
    }
  },
  args: {
    onChange: fn(),
    onEnterPress: fn()
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    label: '기본 입력',
    placeholder: '텍스트를 입력하세요'
  }
};

export const WithoutLabel: Story = {
  args: {
    placeholder: '라벨 없는 입력 필드'
  }
};

export const Required: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력',
    value: '수정할 수 없는 값',
    disabled: true
  }
};

export const WithValue: Story = {
  args: {
    label: '사용자명',
    value: 'AUTA',
    placeholder: '사용자명을 입력하세요'
  }
};

export const EmailInput: Story = {
  args: {
    label: '이메일 주소',
    type: 'email',
    placeholder: 'test@auta.com',
    required: true
  }
};

export const PasswordInput: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    required: true
  }
};

export const CustomStyled: Story = {
  args: {
    label: '커스텀 스타일',
    placeholder: '커스텀 스타일 입력',
    className: 'border-2 border-blue-300 bg-blue-50 focus:border-blue-500',
    labelClassName: 'text-blue-700 font-bold'
  }
};

export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="이메일" type="email" placeholder="이메일을 입력하세요" required />
      <Input label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" required />
    </div>
  )
};

export const ErrorState: Story = {
  args: {
    label: '필수 입력 (에러 상태)',
    placeholder: '값을 입력하세요',
    required: true,
    className: 'border-red-500 bg-red-50 focus:border-red-600'
  },
  render: (args) => (
    <div>
      <Input {...args} />
      <p className="text-red-500 text-sm mt-1 ml-2">이 필드는 필수입니다.</p>
    </div>
  )
};
