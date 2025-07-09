import Select from '@/components/ui/select/Select';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '현재 선택된 값'
    },
    placeholder: {
      control: 'text',
      description: '아무것도 선택되지 않았을 때 표시될 텍스트'
    },
    className: {
      control: 'text',
      description: '커스텀 CSS 클래스'
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션들의 배열'
    }
  },
  args: {
    onChange: fn()
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션들
const basicOptions = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' }
];

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    value: '',
    options: basicOptions,
    placeholder: '옵션을 선택하세요'
  }
};

// 값이 선택된 상태
export const WithSelectedValue: Story = {
  args: {
    value: 'option2',
    options: basicOptions,
    placeholder: '옵션을 선택하세요'
  }
};

// 커스텀 스타일링
export const CustomStyled: Story = {
  args: {
    value: '',
    options: basicOptions,
    placeholder: '커스텀 스타일 셀렉트',
    className: 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
  }
};

export const Interactive: Story = {
  args: {
    value: '',
    options: basicOptions,
    placeholder: '옵션을 선택하세요'
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
      <div className="space-y-4">
        <Select
          value={selectedValue}
          onChange={setSelectedValue}
          options={args.options}
          placeholder={args.placeholder}
          className="z-10 bg-white"
        />
        <p className="text-sm text-typography-gray">선택된 값: {selectedValue || '없음'}</p>
        <p className="text-sm text-typography-gray">
          선택된 라벨: {args.options.find((opt) => opt.value === selectedValue)?.label || '없음'}
        </p>
      </div>
    );
  }
};
