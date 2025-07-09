import TableItem from '@/components/ui/table/CustomTable';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

// 타입 정의
interface TableColumn {
  id: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

const meta = {
  title: 'Components/TableItem',
  component: TableItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '테이블 컴포넌트입니다.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  argTypes: {
    columns: {
      control: 'object',
      description: '테이블 컬럼 정의 배열'
    },
    items: {
      control: 'object',
      description: '테이블에 표시할 데이터 배열'
    },
    className: {
      control: 'text',
      description: '테이블 커스텀 CSS 클래스'
    },
    renderCell: {
      control: false,
      description: '각 셀을 렌더링하는 함수'
    },
    onItemClick: {
      control: false,
      description: '행 클릭 시 호출되는 함수'
    }
  },
  args: {
    onItemClick: fn()
  }
} satisfies Meta<typeof TableItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 더미 테이블 데이터
const userData: UserData[] = [
  { id: 1, name: '오준혁', email: 'kim@example.com', age: 25, role: '개발자' },
  { id: 2, name: '송인섭', email: 'lee@example.com', age: 30, role: '디자이너' },
  { id: 3, name: '최현준', email: 'park@example.com', age: 28, role: '기획자' },
  { id: 4, name: '홍유진', email: 'park@example.com', age: 27, role: '기획자' }
];

const userColumns: TableColumn[] = [
  { id: 'name', label: '이름', align: 'center' },
  { id: 'email', label: '이메일', align: 'center' },
  { id: 'age', label: '나이', align: 'center' },
  { id: 'role', label: '역할', align: 'center' }
];

const userRenderCell = (column: TableColumn, item: unknown) => {
  const userData = item as UserData;
  switch (column.id) {
    case 'name':
      return <span>{userData.name}</span>;
    case 'email':
      return <span>{userData.email}</span>;
    case 'age':
      return <span>{userData.age}세</span>;
    case 'role':
      return <span>{userData.role}</span>;
    default:
      return String(userData[column.id as keyof UserData]);
  }
};

// -------------------- 스토리 시작 -----------------------
export const Default: Story = {
  args: {
    columns: userColumns,
    items: userData,
    renderCell: userRenderCell
  }
};

// 빈 테이블 (원하는대로 커스텀하면 됨)
export const EmptyTable: Story = {
  args: {
    columns: userColumns,
    items: [],
    renderCell: userRenderCell
  }
};
