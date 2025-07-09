import Button from '@/components/ui/button/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '버튼 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '버튼에 표시될 텍스트'
    },
    children: {
      control: 'text',
      description: '버튼 내부 컨텐츠 (text 대신 사용 가능)'
    },
    className: {
      control: 'text',
      description: '커스텀 CSS 클래스'
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태'
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태'
    },
    leftIcon: {
      control: 'text',
      description: '왼쪽 아이콘 (이모지나 텍스트 입력 가능)'
    },
    rightIcon: {
      control: 'text',
      description: '오른쪽 아이콘 (이모지나 텍스트 입력 가능)'
    }
  },
  args: { onClick: fn() }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    text: 'Default Button'
  }
};

/**
 * 사용 예시
 * 아래와 같은 식으로 하나의 story를 만들어서 터미널에 npm run storybook을 입력하면 storybook 환경에서 간편하게 테스트할 수 있습니다.
 * 여기서 className을 조절할 수도 있긴 한데 테스트 환경에서도 className을 입력할 수 있어서 거기서 테스트 하고 코드 복사해서 바로 사용 가능하다고 해요
 */

export const LoadingToggle: Story = {
  args: {
    text: '로딩전',
    isLoading: false
  },
  // render 함수로 조건부 렌더링
  render: (args) => <Button {...args} text={args.isLoading ? '로딩중...' : args.text} />
};

export const Delete: Story = {
  args: {
    text: '삭제',
    className: 'text-white border-0 bg-red_1'
  }
};

export const Disabled: Story = {
  args: {
    text: '비활성화',
    disabled: true
  }
};

export const WithChildren: Story = {
  args: {
    children: 'text말고 children 사용'
  }
};

export const WithLeftIcon: Story = {
  args: {
    text: 'Download',
    leftIcon: '📥'
  }
};

export const WithRightIcon: Story = {
  args: {
    text: 'Next',
    rightIcon: '→'
  }
};

export const WithBothIcons: Story = {
  args: {
    text: 'Save',
    leftIcon: '💾',
    rightIcon: '✓'
  }
};
